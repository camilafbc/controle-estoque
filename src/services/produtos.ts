import dayjs from "dayjs";

import prisma from "@/lib/prisma";
import { Produto } from "@/types/Produto";

export const getProdutos = async (idCurso: number, turmaUuid: string) => {
  const turma = await prisma.turma.findUnique({
    where: { uuid: turmaUuid as string },
    select: { idTurma: true },
  });

  const produtos = await prisma.produto.findMany({
    where: {
      prodCurso: Number(idCurso),
      prodTurma: Number(turma?.idTurma),
    },
  });
  return produtos;
};

export const getProdutoById = async (uuidProduto: string) => {
  const produto = await prisma.produto.findUnique({
    where: {
      uuid: uuidProduto,
    },
  });
  return produto;
};

export const countProdutosPorCurso = async (idCurso: number) => {
  const produtos = await prisma.produto.count({
    where: {
      prodCurso: Number(idCurso),
    },
  });
  return produtos;
};

export const getEstoquePorCurso = async (idCurso: number) => {
  const produtos = await prisma.produto.aggregate({
    _sum: {
      prodQuantidade: true,
    },
    where: {
      prodCurso: idCurso,
    },
  });

  return produtos._sum.prodQuantidade || 0;
};

export const deleteProduto = async (idProduto: number) => {
  const produto = await prisma.produto.delete({
    where: {
      idProduto: Number(idProduto),
    },
  });
  return produto;
};

export const createProduto = async (
  produto: Omit<Produto, "idProduto" | "prodTurma">,
  turmaUuid: string,
) => {
  const turma = await prisma.turma.findUnique({
    where: { uuid: turmaUuid as string },
    select: { idTurma: true },
  });

  if (turma) {
    const produtoCreated = await prisma.produto.create({
      data: {
        prodDescricao: produto.prodDescricao.trim(),
        prodFabricante: produto.prodFabricante.trim(),
        prodLote: produto.prodLote.trim(),
        prodQuantidade: produto.prodQuantidade,
        prodValidade: new Date(produto.prodValidade),
        prodCurso: produto.prodCurso,
        prodTurma: turma?.idTurma,
      },
    });
    return produtoCreated;
  }
};

export const updateProduto = async (produto: Produto) => {
  const produtoUpdated = await prisma.produto.update({
    where: {
      idProduto: produto.idProduto,
    },
    data: {
      prodDescricao: produto.prodDescricao.trim(),
      prodFabricante: produto.prodFabricante.trim(),
      prodLote: produto.prodLote.trim(),
      prodQuantidade: produto.prodQuantidade,
      prodValidade: produto.prodValidade,
      prodCurso: produto.prodCurso,
      prodTurma: produto.prodTurma,
    },
  });
  return produtoUpdated;
};

export const updateQuantidadeProduto = async (
  idProduto: number,
  quantidade: number,
  tipo: "increment" | "decrement",
) => {
  const produto = await prisma.produto.findUnique({
    where: {
      idProduto: idProduto,
    },
  });

  if (!produto) throw new Error("Produto não encontrado.");

  // impedir valores negativos
  if (tipo === "decrement" && produto.prodQuantidade < quantidade) {
    throw new Error("Quantidade insuficiente para retirada.");
  }

  const produtoUpdated = await prisma.produto.update({
    where: {
      idProduto: produto.idProduto,
    },
    data: {
      prodQuantidade: {
        [tipo]: Number(quantidade),
      },
    },
  });
  return produtoUpdated;
};

export const countProdutos = async (idCurso: number) => {
  const produtos = await prisma.produto.count({
    where: {
      prodCurso: Number(idCurso),
    },
  });
  return produtos;
};

export const getProdutosExpirando = async (cursoId: number) => {
  const today = new Date();
  const limitDate = new Date();
  limitDate.setDate(today.getDate() + 30);

  const produtos = await prisma.produto.count({
    where: {
      prodCurso: cursoId,
      prodValidade: {
        lte: limitDate,
      },
    },
    orderBy: {
      prodValidade: "asc",
    },
  });

  return produtos || 0;
};
