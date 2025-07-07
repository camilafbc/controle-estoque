import prisma from "@/lib/prisma";
import { Turma } from "@/types/Turma";

export const getTurmas = async (idCurso: number) => {
  const turmas = await prisma.turma.findMany({
    where: {
      idCurso: Number(idCurso),
    },
  });
  return turmas;
};

export const createTurma = async (turma: Omit<Turma, "idTurma">) => {
  const turmaCreated = await prisma.turma.create({
    data: {
      codigoTurma: turma.codigoTurma.trim(),
      idCurso: Number(turma.idCurso),
      turnoTurma: turma.turnoTurma.trim(),
      status: turma.status,
    },
  });
  return turmaCreated;
};

export const getTurmaById = async (idTurma: number) => {
  const turma = await prisma.turma.findUnique({
    where: {
      idTurma: Number(idTurma),
    },
  });
  return turma;
};

export const deleteTurma = async (idTurma: number) => {
  const turma = await prisma.turma.delete({
    where: {
      idTurma: Number(idTurma),
    },
  });
  return turma;
};

export const countTurmas = async (idCurso: Number) => {
  const turmas = await prisma.turma.count({
    where: {
      idCurso: Number(idCurso),
      status: true,
    },
  });
  return turmas;
};

export const updateTurma = async (turma: Turma) => {
  const turmaUpdated = await prisma.turma.update({
    where: {
      idTurma: Number(turma.idTurma),
    },
    data: turma,
  });
  return turmaUpdated;
};
