"use server";

import prisma from "@/lib/prisma";
import { Curso } from "@/types/Curso";

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  const cursoCreated = await prisma.curso.create({
    data: {
      nomeCurso: curso.nomeCurso.trim(),
      status: curso.status,
    },
  });
  return cursoCreated;
};
