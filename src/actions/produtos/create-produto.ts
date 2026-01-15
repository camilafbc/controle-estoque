"use server";

import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { produtoValidationSchema } from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";

export const createProduto = async (
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
      where: { uuid: uuidTurma as string },
      select: { idTurma: true },
    });

    if (!turma) return { error: "Turma vinculada não existe." };

    const produtoCreated = await prisma.produto.create({
      data: {
        prodDescricao: produto.prodDescricao.trim(),
        prodFabricante: produto.prodFabricante.trim(),
        prodLote: produto.prodLote.trim(),
        prodQuantidade: produto.prodQuantidade,
        prodValidade: new Date(produto.prodValidade),
        prodCurso: produto.prodCurso,
        prodTurma: turma?.idTurma,
      },
    });
    return { data: produtoCreated };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao criar produto: ", error);
    return { error: "Erro interno do servidor" };
  }
};
