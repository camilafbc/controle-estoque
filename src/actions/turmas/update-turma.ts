"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { turmaUpdateValidationSchema } from "@/schemas/turma-schema";
import { Turma } from "@/types/Turma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateTurma = async (turma: Turma) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    await turmaUpdateValidationSchema.validate(turma, { abortEarly: false });

    const turmaUpdated = await prisma.turma.update({
      where: {
        idTurma: Number(turma.idTurma),
      },
      data: turma,
    });
    return { message: "Dados atualizados com sucesso!", data: turmaUpdated };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar dados de turma: ", dbError.message);
    return { error: "Erro interno do servidor" };
  }
};
