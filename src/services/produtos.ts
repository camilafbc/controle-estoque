import prisma from "@/lib/prisma";

export const getProdutos = async (idCurso: number, turmaUuid: string) => {
  const turma = await prisma.turma.findFirst({
    where: { uuid: turmaUuid, idCurso },
    select: { idTurma: true },
  });

  if (!turma) {
    return [];
  }

  const produtos = await prisma.produto.findMany({
    where: {
      prodCurso: Number(idCurso),
      prodTurma: Number(turma.idTurma),
    },
    orderBy: {
      idProduto: "desc",
    },
  });
  return produtos;
};

export const getProdutoById = async (uuidProduto: string, idCurso?: number) => {
  const produto = await prisma.produto.findFirst({
    where: {
      uuid: uuidProduto,
      ...(idCurso ? { prodCurso: Number(idCurso) } : {}),
    },
    include: {
      turma: {
        select: {
          uuid: true,
        },
      },
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
  });

  return produtos || 0;
};
