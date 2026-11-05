"use server";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const deleteProduto = async (uuidProduto: string) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };

    if (!uuidProduto)
      return { error: "Erro ao excluir dados; item não selecionado." };

    // Só remove produtos do curso do usuário autenticado
    const produto = await prisma.produto.findFirst({
      where: { uuid: uuidProduto, prodCurso: auth.ctx.idCurso },
      select: { idProduto: true },
    });

    if (!produto) return { error: "Produto não encontrado!" };

    const deleted = await prisma.produto.delete({
      where: { idProduto: produto.idProduto },
    });
    return deleted;
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao excluir produto: ", dbError);
    return { error: dbError.message };
  }
};
