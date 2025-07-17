import dayjs from "dayjs";

import prisma from "@/lib/prisma";

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
  });

  return operacao;
};

export const getOperacoesPorProduto = async (idProduto: number) => {
  const operations = await prisma.operacao.findMany({
    where: {
      idProduto: idProduto,
    },
    orderBy: {
      data: "desc",
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
  turma: number,
  inicio: string, // formato: 'YYYY-MM-DD'
  final: string, // formato: 'YYYY-MM-DD'
) => {
  const result = await prisma.$queryRaw<any[]>`
  SELECT 
    prod.prodDescricao, 
    prod.prodFabricante, 
    SUM(CASE WHEN op.tipoOperacao = 1 THEN op.quantidade ELSE 0 END) AS entradas, 
    SUM(CASE WHEN op.tipoOperacao = 0 THEN op.quantidade ELSE 0 END) AS saidas 
  FROM produtos prod 
  INNER JOIN operacoes op ON prod.idProduto = op.idProduto 
  WHERE prod.prodCurso = ${idCurso}
    AND prod.prodTurma = ${turma}
    AND op.data BETWEEN ${`${inicio} 00:00:00`} AND ${`${final} 23:59:59`}
  GROUP BY prod.prodDescricao, prod.prodFabricante 
  ORDER BY saidas DESC
`;

  return result;
};

export const getRelatorioUltimosDozeMeses = async (idCurso: number) => {
  const result = await prisma.$queryRaw<any[]>`
      SELECT 
        MONTH(op.data) AS mes, 
        YEAR(op.data) AS ano, 
        SUM(CASE WHEN op.tipoOperacao = 1 THEN op.quantidade ELSE 0 END) AS entradas, 
        SUM(CASE WHEN op.tipoOperacao = 0 THEN op.quantidade ELSE 0 END) AS saidas 
      FROM produtos prod 
      INNER JOIN operacoes op ON prod.idProduto = op.idProduto 
      WHERE prod.prodCurso = ${idCurso} 
        AND op.data >= DATE_SUB(CURRENT_DATE, INTERVAL 12 MONTH) 
      GROUP BY ano, mes 
      ORDER BY ano ASC, mes ASC
    `;

  return result;
};
