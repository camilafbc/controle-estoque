"use server";

import prisma from "@/lib/prisma";

export const deleteCurso = async (idCurso: number) => {
  const curso = await prisma.curso.delete({
    where: {
      idCurso: Number(idCurso),
    },
  });
  return curso;
};
