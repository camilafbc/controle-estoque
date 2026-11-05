"use server";

import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const deleteCurso = async (idCurso: number) => {
  try {
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    if (!idCurso)
      return { error: "Erro ao excluir dados; item não selecionado." };

    const curso = await prisma.curso.delete({
      where: {
        idCurso: Number(idCurso),
      },
    });
    return curso;
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao excluir curso: ", dbError);
    return { error: dbError.message };
  }
};
