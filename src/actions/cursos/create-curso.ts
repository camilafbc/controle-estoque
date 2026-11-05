"use server";

import * as yup from "yup";

import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { cursoValidationSchema } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  try {
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

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
