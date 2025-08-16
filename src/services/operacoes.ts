import dayjs from "dayjs";

import prisma from "@/lib/prisma";

import { getProdutoById } from "./produtos";

export const createOperacao = async (
  idUser: number,
  idProduto: number,
  tipoOp: number,
  qtd: number,
) => {
  const currentData = dayjs().format("YYYY-MM-DD HH:mm:ss");

  const operacao = await prisma.operacao.create({
    data: {
      tipoOperacao: tipoOp,
      idUsuario: idUser,
      idProduto: idProduto,
      data: new Date(currentData),
      quantidade: qtd,
    },
    include: {
      produto: {
        select: {
          prodCurso: true,
          uuid: true,
          turma: {
            select: { uuid: true },
          },
        },
      },
    },
  });

  return operacao;
};

export const getOperacoesPorProduto = async (uuidProduto: string) => {
  const produto = await getProdutoById(uuidProduto);

  const operations = await prisma.operacao.findMany({
    where: {
      idProduto: produto?.idProduto,
    },
    orderBy: {
      idOperacao: "desc",
    },
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
    },
  });

  // Mapeia para retornar os dados no mesmo formato do SQL original
  return operations.map((op) => ({
    tipoOperacao: op.tipoOperacao,
    nome: op.usuario.nome,
    data: op.data,
    quantidade: op.quantidade,
  }));
};

export const getLastDezOperacoes = async (idCurso: number) => {
  const operations = await prisma.operacao.findMany({
    where: {
      produto: {
        prodCurso: idCurso,
      },
    },
    orderBy: {
      data: "desc",
    },
    take: 10,
    include: {
      usuario: {
        select: {
          nome: true,
        },
      },
      produto: {
        select: {
          prodDescricao: true,
        },
      },
    },
  });

  return operations.map((op) => ({
    tipoOperacao: op.tipoOperacao,
    nome: op.usuario.nome,
    data: op.data,
    quantidade: op.quantidade,
    prodDescricao: op.produto.prodDescricao,
  }));
};

export const getRelatorioOperacoes = async (
  idCurso: number,
  idTurma: number,
  dataInicial: Date,
  dataFinal: Date,
) => {
  const inicio = new Date(dataInicial);
  inicio.setHours(0, 0, 0, 0);

  const fim = new Date(dataFinal);
  fim.setHours(23, 59, 59, 999);

  const result = await prisma.$queryRaw<any[]>`
  SELECT 
    prod."prodDescricao", 
    prod."prodFabricante", 
    SUM(CASE WHEN op."tipoOperacao" = 1 THEN op.quantidade ELSE 0 END) AS entradas, 
    SUM(CASE WHEN op."tipoOperacao" = 0 THEN op.quantidade ELSE 0 END) AS saidas 
  FROM "Produto" prod 
  INNER JOIN "Operacao" op ON prod."idProduto" = op."idProduto" 
  WHERE prod."prodCurso" = ${idCurso}
    AND prod."prodTurma" = ${idTurma}
    AND op.data BETWEEN ${inicio} AND ${fim}
  GROUP BY prod."idProduto", prod."prodDescricao", prod."prodFabricante"
  ORDER BY saidas DESC
`;

  const parsed = result.map((row) => ({
    ...row,
    entradas: Number(row.entradas),
    saidas: Number(row.saidas),
  }));
  return parsed;
};

export const getRelatorioUltimosDozeMeses = async (idCurso: number) => {
  const result = await prisma.$queryRaw<any[]>`
      SELECT 
      EXTRACT(MONTH FROM op.data) AS mes,
      EXTRACT(YEAR FROM op.data) AS ano,
      SUM(CASE WHEN op."tipoOperacao" = 1 THEN op.quantidade ELSE 0 END) AS entradas,
      SUM(CASE WHEN op."tipoOperacao" = 0 THEN op.quantidade ELSE 0 END) AS saidas
    FROM "Produto" prod
    INNER JOIN "Operacao" op ON prod."idProduto" = op."idProduto"
    WHERE prod."prodCurso" = ${idCurso}
      AND op.data >= CURRENT_DATE - INTERVAL '12 months'
    GROUP BY ano, mes
    ORDER BY ano ASC, mes ASC
    `;

  const parsed = result.map((row) => ({
    ...row,
    entradas: Number(row.entradas),
    saidas: Number(row.saidas),
  }));
  return parsed;
};
