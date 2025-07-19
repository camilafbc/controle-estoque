import dayjs from "dayjs";

import prisma from "@/lib/prisma";
import { Produto } from "@/types/Produto";

export const getProdutos = async (idCurso: number, idTurma: number) => {
  const produtos = await prisma.produto.findMany({
    where: {
      prodCurso: Number(idCurso),
      prodTurma: Number(idTurma),
    },
  });
  return produtos;
};

export const getProdutoById = async (idProduto: number) => {
  const produto = await prisma.produto.findUnique({
    where: {
      idProduto: Number(idProduto),
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

export const createProduto = async (produto: Omit<Produto, "idProduto">) => {
  const produtoCreated = await prisma.produto.create({
    data: {
      prodDescricao: produto.prodDescricao.trim(),
      prodFabricante: produto.prodFabricante.trim(),
      prodLote: produto.prodLote.trim(),
      prodQuantidade: produto.prodQuantidade,
      prodValidade: dayjs(produto.prodValidade, "DD/MM/YYYY").toISOString(),
      prodCurso: produto.prodCurso,
      prodTurma: produto.prodTurma,
    },
  });
  return produtoCreated;
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
