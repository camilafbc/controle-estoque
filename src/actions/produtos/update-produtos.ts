"use server";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { produtoValidationSchema } from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";
import { getValidationMessages } from "@/utils/getValidationMessages";
import { handleDatabaseError } from "@/utils/handleDbError";

export const updateProduto = async (
  produto: Omit<Produto, "idProduto" | "prodTurma">,
  uuidTurma: string,
) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };
    const { idCurso } = auth.ctx;

    if (!uuidTurma) return { error: "Turma não selecionada." };
    if (!produto.uuid) return { error: "Produto não selecionado." };

    const validation = produtoValidationSchema.safeParse({
      ...produto,
      prodQuantidade: String(produto.prodQuantidade),
      turma: uuidTurma,
    });
    if (!validation.success) {
      return {
        error: "Dados inválidos",
        messages: getValidationMessages(validation.error),
      };
    }

    // Produto e turma precisam pertencer ao curso do usuário autenticado
    const [produtoAtual, turma] = await Promise.all([
      prisma.produto.findFirst({
        where: { uuid: produto.uuid, prodCurso: idCurso },
        select: { idProduto: true },
      }),
      prisma.turma.findFirst({
        where: { uuid: uuidTurma, idCurso },
        select: { idTurma: true, uuid: true },
      }),
    ]);

    if (!produtoAtual) return { error: "Produto não encontrado!" };
    if (!turma) return { error: "Turma vinculada não existe." };

    const produtoUpdated = await prisma.produto.update({
      where: { idProduto: produtoAtual.idProduto },
      data: {
        prodDescricao: produto.prodDescricao.trim(),
        prodFabricante: produto.prodFabricante.trim(),
        prodLote: produto.prodLote.trim(),
        prodQuantidade: produto.prodQuantidade,
        prodValidade: produto.prodValidade,
        prodTurma: turma.idTurma,
      },
    });
    return { data: { ...produtoUpdated, turma: { uuid: turma.uuid } } };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao atualizar produto: ", dbError);
    return { error: dbError.message };
  }
};
