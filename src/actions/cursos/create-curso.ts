"use server";

import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { cursoValidationSchema } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";
import { handleDatabaseError } from "@/utils/handleDbError";
import { getValidationMessages } from "@/utils/getValidationMessages";

export const createCurso = async (curso: Omit<Curso, "idCurso">) => {
  try {
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    const validation = cursoValidationSchema.safeParse(curso);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    const cursoCreated = await prisma.curso.create({
      data: {
        nomeCurso: curso.nomeCurso.trim(),
        status: curso.status,
      },
    });
    return cursoCreated;
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar novo curso: ", dbError);
    return { error: dbError.message };
  }
};
