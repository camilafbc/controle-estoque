"use server";

import { authorizeAdmin } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

export const deleteUser = async (idUser: number) => {
  try {
    const auth = await authorizeAdmin();
    if (!auth.ok) return { error: auth.error };

    if (!idUser)
      return { error: "Erro ao excluir dados; item não selecionado." };

    if (Number(idUser) === auth.ctx.userId)
      return { error: "Não é possível excluir o próprio usuário." };

    const user = await prisma.user.delete({
      where: {
        idUser: Number(idUser),
      },
    });
    return { message: "Dados excluídos com sucesso!", data: user };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao excluir usuário: ", dbError);
    return { error: dbError.message };
  }
};
