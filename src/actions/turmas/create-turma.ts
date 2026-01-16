"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { turmaValidationSchema } from "@/schemas/turma-schema";
import { Turma } from "@/types/Turma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createTurma = async (turma: Omit<Turma, "idTurma">) => {
  console.log("CHEGANDO: ", turma);
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    const teste = await turmaValidationSchema.validate(turma, {
      abortEarly: false,
    });

    console.log("VALIDATE: ", teste);

    const turmaCreated = await prisma.turma.create({
      data: {
        codigoTurma: turma.codigoTurma.trim(),
        idCurso: Number(turma.idCurso),
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
