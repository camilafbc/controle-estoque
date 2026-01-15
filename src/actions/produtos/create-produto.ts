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

    const userDo = session.user.id;

    await produtoValidationSchema.validate(
      { ...produto, turma: uuidTurma },
      { abortEarly: false },
    );

    const turma = await prisma.turma.findUnique({
      where: { uuid: uuidTurma as string },
      select: { idTurma: true },
    });

    if (!turma) return { error: "Turma vinculada não existe." };

    // CRIAR TRANSACTION

    const produtoCreated = await prisma.$transaction(async (tx) => {
      const prod = await tx.produto.create({
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

      if (prod) {
        await tx.operacao.create({
          data: {
            tipoOperacao: 1,
            idUsuario: userDo,
            idProduto: prod.idProduto,
            data: new Date(),
            quantidade: produto.prodQuantidade,
          },
        });
      }
    });

    return { message: "Produto criado com sucesso!", data: produtoCreated };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro ao criar produto: ", error);
    return { error: "Erro interno do servidor" };
  }
};
