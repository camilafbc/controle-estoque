"use server";

import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { cursoUpdateSchema } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";
import { getValidationMessages } from "@/utils/getValidationMessages";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateCurso = async (curso: Curso) => {
  try {
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    const validation = cursoUpdateSchema.safeParse(curso);
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    const cursoUpdated = await prisma.curso.update({
      where: {
        idCurso: Number(curso.idCurso),
      },
      data: {
        nomeCurso: curso.nomeCurso.trim(),
        status: curso.status,
      },
    });
    return cursoUpdated;
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar dados de curso: ", dbError);
    return { error: dbError.message };
  }
};
