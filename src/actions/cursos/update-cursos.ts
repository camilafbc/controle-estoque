"use server";

import prisma from "@/lib/prisma";
import { Curso } from "@/types/Curso";

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
