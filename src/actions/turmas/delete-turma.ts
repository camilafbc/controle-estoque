"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const deleteTurma = async (idTurma: number) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    if (!idTurma)
      return { error: "Erro ao excluir dados; item não selecionado." };

    const turma = await prisma.turma.delete({
      where: {
        idTurma: Number(idTurma),
      },
    });
    return turma;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao excluir turma: ", error);
    return { error: "Erro interno do servidor" };
  }
};
