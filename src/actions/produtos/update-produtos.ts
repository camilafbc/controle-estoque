"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { produtoValidationSchema } from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateProduto = async (
  produto: Omit<Produto, "idProduto" | "prodTurma">,
  uuidTurma: string,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    if (!uuidTurma)
      return { error: "Erro ao excluir dados; item não selecionado." };

    await produtoValidationSchema.validate(
      { ...produto, turma: uuidTurma },
      { abortEarly: false },
    );

    const turma = await prisma.turma.findUnique({
      where: {
        uuid: uuidTurma,
      },
      select: {
        idTurma: true,
        uuid: true,
      },
    });

    if (!turma) return { error: "Turma vinculada não existe." };

    const produtoUpdated = await prisma.produto.update({
      where: {
        uuid: produto.uuid,
      },
      data: {
        prodDescricao: produto?.prodDescricao?.trim(),
        prodFabricante: produto?.prodFabricante?.trim(),
        prodLote: produto?.prodLote?.trim(),
        prodQuantidade: produto.prodQuantidade,
        prodValidade: produto.prodValidade,
        prodCurso: produto.prodCurso,
        prodTurma: turma.idTurma,
      },
    });
    return { data: { ...produtoUpdated, turma: { uuid: turma.uuid } } };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar produto: ", dbError);
    return { error: dbError.message };
  }
};
