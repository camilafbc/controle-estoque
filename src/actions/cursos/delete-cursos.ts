"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const deleteCurso = async (idCurso: number) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin")
      return { error: "Usuário não autorizado" };

    if (!idCurso)
      return { error: "Erro ao excluir dados; item não selecionado." };

    const curso = await prisma.curso.delete({
      where: {
        idCurso: Number(idCurso),
      },
    });
    return curso;
  } catch (error) {
    console.error("Erro ao excluir curso: ", error);
    return { error: "Erro interno do servidor" };
  }
};
