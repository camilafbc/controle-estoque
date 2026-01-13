"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const deleteUser = async (idUser: number) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin")
      return { error: "Usuário não autorizado" };

    if (!idUser)
      return { error: "Erro ao excluir dados; item não selecionado." };

    const user = await prisma.user.delete({
      where: {
        idUser: Number(idUser),
      },
    });
    return { message: "Dados excluídos com sucesso!", data: user };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao criar usuário: ", error);
    return { error: "Erro interno do servidor" };
  }
};
