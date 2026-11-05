"use server";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const deleteTurma = async (idTurma: number) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };

    if (!idTurma)
      return { error: "Erro ao excluir dados; item não selecionado." };

    // Só remove turmas do curso do usuário autenticado
    const turma = await prisma.turma.findFirst({
      where: { idTurma: Number(idTurma), idCurso: auth.ctx.idCurso },
      select: { idTurma: true },
    });

    if (!turma) return { error: "Turma não encontrada!" };

    const deleted = await prisma.turma.delete({
      where: { idTurma: turma.idTurma },
    });
    return deleted;
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao excluir turma: ", dbError);
    return { error: dbError.message };
  }
};
