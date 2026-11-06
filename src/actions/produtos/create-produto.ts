"use server";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { produtoValidationSchema } from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";
import { getValidationMessages } from "@/utils/getValidationMessages";
import { handleDatabaseError } from "@/utils/handleDbError";

export const createProduto = async (
  produto: Omit<Produto, "idProduto" | "prodTurma">,
  uuidTurma: string,
) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };
    const { userId, idCurso } = auth.ctx;

    if (!uuidTurma) return { error: "Turma não selecionada." };

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

    // A turma precisa pertencer ao curso do usuário autenticado
    const turma = await prisma.turma.findFirst({
      where: { uuid: uuidTurma, idCurso },
      select: { idTurma: true },
    });

    if (!turma) return { error: "Turma vinculada não existe." };

    const produtoCreated = await prisma.$transaction(async (tx) => {
      const prod = await tx.produto.create({
        data: {
          prodCodigoBarras: produto.prodCodigoBarras?.trim() || null,
          prodDescricao: produto.prodDescricao.trim(),
          prodFabricante: produto.prodFabricante.trim(),
          prodQuantidade: produto.prodQuantidade,
          prodValidade: new Date(produto.prodValidade),
          // O curso é sempre derivado da sessão, nunca do cliente
          prodCurso: idCurso,
          prodTurma: turma.idTurma,
        },
      });

      await tx.operacao.create({
        data: {
          tipoOperacao: 1,
          idUsuario: userId,
          idProduto: prod.idProduto,
          data: new Date(),
          quantidade: produto.prodQuantidade,
        },
      });

      return prod;
    });

    return { message: "Produto criado com sucesso!", data: produtoCreated };
  } catch (error) {
    const dbError = handleDatabaseError(error);

    console.error("Erro ao criar produto: ", dbError);
    return { error: dbError.message };
  }
};
