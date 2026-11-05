import prisma from "@/lib/prisma";

export const getTurmas = async (idCurso: number) => {
  const turmas = await prisma.turma.findMany({
    where: {
      idCurso: Number(idCurso),
    },
    orderBy: {
      idTurma: "desc",
    },
  });
  return turmas;
};

export const getTurmaById = async (idTurma: number, idCurso?: number) => {
  const turma = await prisma.turma.findFirst({
    where: {
      idTurma: Number(idTurma),
      ...(idCurso ? { idCurso: Number(idCurso) } : {}),
    },
  });
  return turma;
};

export const countTurmas = async (idCurso: number) => {
  const turmas = await prisma.turma.count({
    where: {
      idCurso: Number(idCurso),
      status: true,
    },
  });
  return turmas;
};
