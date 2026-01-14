"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const deleteProduto = async (uuidProduto: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    if (!uuidProduto)
      return { error: "Erro ao excluir dados; item não selecionado." };

    const produto = await prisma.produto.delete({
      where: {
        uuid: uuidProduto,
      },
    });
    return produto;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao excluir produto: ", error);
    return { error: "Erro interno do servidor" };
  }
};
