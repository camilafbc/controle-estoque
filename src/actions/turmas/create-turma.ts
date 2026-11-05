"use server";

import * as yup from "yup";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { turmaValidationSchema } from "@/schemas/turma-schema";
import { Turma } from "@/types/Turma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createTurma = async (turma: Omit<Turma, "idTurma">) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };

    await turmaValidationSchema.validate(turma, {
      abortEarly: false,
    });

    const turmaCreated = await prisma.turma.create({
      data: {
        codigoTurma: turma.codigoTurma.trim(),
        // O curso é sempre derivado da sessão, nunca do cliente
        idCurso: auth.ctx.idCurso,
        turnoTurma: turma.turnoTurma.trim(),
        status: turma.status,
      },
    });
    return { message: "Turma criada com sucesso!", data: turmaCreated };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar nova turma: ", dbError);
    return { error: dbError.message };
  }
};
