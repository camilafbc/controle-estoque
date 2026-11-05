"use server";

import * as yup from "yup";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { turmaUpdateValidationSchema } from "@/schemas/turma-schema";
import { Turma } from "@/types/Turma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateTurma = async (turma: Turma) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };

    await turmaUpdateValidationSchema.validate(turma, { abortEarly: false });

    // Atualiza somente se a turma pertencer ao curso do usuário autenticado
    const { count } = await prisma.turma.updateMany({
      where: {
        idTurma: Number(turma.idTurma),
        idCurso: auth.ctx.idCurso,
      },
      // Apenas campos editáveis; idCurso e uuid nunca vêm do cliente
      data: {
        codigoTurma: turma.codigoTurma.trim(),
        turnoTurma: turma.turnoTurma.trim(),
        status: turma.status,
      },
    });

    if (count === 0) return { error: "Turma não encontrada!" };

    const turmaUpdated = await prisma.turma.findUnique({
      where: { idTurma: Number(turma.idTurma) },
    });
    return { message: "Dados atualizados com sucesso!", data: turmaUpdated };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar dados de turma: ", dbError.message);
    return { error: dbError.message };
  }
};
