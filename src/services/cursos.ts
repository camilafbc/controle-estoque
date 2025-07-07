import prisma from "@/lib/prisma";
import { Curso } from "@/types/Curso";

export const getCursos = async () => {
  const cursos = await prisma.curso.findMany({
    orderBy: {
      idCurso: "desc",
    },
  });
  return cursos;
};

export const getCursoById = async (idCurso: number) => {
  const curso = await prisma.curso.findUnique({
    where: {
      idCurso: Number(idCurso),
    },
  });
  return curso;
};

export const countCursos = async () => {
  const cursos = await prisma.curso.count();
  return cursos;
};

export const deleteCurso = async (idCurso: number) => {
  const curso = await prisma.curso.delete({
    where: {
      idCurso: Number(idCurso),
    },
  });
  return curso;
};

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  const cursoCreated = await prisma.curso.create({
    data: {
      nomeCurso: curso.nomeCurso.trim(),
      status: curso.status,
    },
  });
  return cursoCreated;
};

export const updateCurso = async (curso: Curso) => {
  const cursoUpdated = await prisma.curso.update({
    where: {
      idCurso: Number(curso.idCurso),
    },
    data: {
      nomeCurso: curso.nomeCurso.trim(),
      status: curso.status,
    },
  });
  return cursoUpdated;
};
