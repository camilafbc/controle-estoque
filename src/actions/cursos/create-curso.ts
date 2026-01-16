"use server";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cursoValidationSchema } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin")
      return { error: "Usuário não autorizado" };

    await cursoValidationSchema.validate(curso, {
      abortEarly: false,
    });

    const cursoCreated = await prisma.curso.create({
      data: {
        nomeCurso: curso.nomeCurso.trim(),
        status: curso.status,
      },
    });
    return cursoCreated;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar novo curso: ", dbError);
    return { error: dbError.message };
  }
};
