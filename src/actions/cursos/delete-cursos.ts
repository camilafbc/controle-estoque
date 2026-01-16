"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

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
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao excluir curso: ", dbError);
    return { error: dbError.message };
  }
};
