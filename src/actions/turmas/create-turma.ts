"use server";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { turmaValidationSchema } from "@/schemas/turma-schema";
import { Turma } from "@/types/Turma";
import { getValidationMessages } from "@/utils/getValidationMessages";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createTurma = async (turma: Omit<Turma, "idTurma">) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };

    const validation = turmaValidationSchema.safeParse(turma);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

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
    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar nova turma: ", dbError);
    return { error: dbError.message };
  }
};
