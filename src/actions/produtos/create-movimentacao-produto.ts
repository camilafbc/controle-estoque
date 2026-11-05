"use server";

import * as yup from "yup";

import { authorizeUser } from "@/lib/authz";
import prisma from "@/lib/prisma";
import { handleDatabaseError } from "@/utils/handleDbError";

const operacaoValidationSchema = yup.object({
  uuidProduto: yup.string().required("Parâmetro obrigatório"),
  tipoOp: yup
    .number()
    .oneOf([0, 1], "Tipo de operação inválido.")
    .required("Parâmetro obrigatório"),
  qtd: yup
    .number()
    .integer("A quantidade deve ser um número inteiro.")
    .min(1, "Quantidade mínima para movimentação é 1.")
    .required("Parâmetro obrigatório"),
});

class EstoqueInsuficienteError extends Error {}

export const createOperacao = async (
  uuidProduto: string,
  tipoOp: number,
  qtd: number,
) => {
  try {
    const auth = await authorizeUser();
    if (!auth.ok) return { error: auth.error };
    const { userId, idCurso } = auth.ctx;

    await operacaoValidationSchema.validate(
      { uuidProduto, tipoOp, qtd },
      { abortEarly: false },
    );

    // O produto precisa pertencer ao curso do usuário autenticado
    const produtoData = await prisma.produto.findFirst({
      where: { uuid: uuidProduto, prodCurso: idCurso },
      select: { idProduto: true },
    });

    if (!produtoData) {
      return { error: "Produto não encontrado!" };
    }

    const isSaida = tipoOp === 0;

    const produtoAtualizado = await prisma.$transaction(async (tx) => {
      // Atualização condicional e atômica: impede estoque negativo mesmo
      // com movimentações simultâneas.
      const { count } = await tx.produto.updateMany({
        where: {
          idProduto: produtoData.idProduto,
          ...(isSaida && { prodQuantidade: { gte: qtd } }),
        },
        data: {
          prodQuantidade: isSaida ? { decrement: qtd } : { increment: qtd },
        },
      });

      if (count === 0) throw new EstoqueInsuficienteError();

      await tx.operacao.create({
        data: {
          tipoOperacao: tipoOp,
          idUsuario: userId,
          idProduto: produtoData.idProduto,
          data: new Date(),
          quantidade: qtd,
        },
      });

      return tx.produto.findUniqueOrThrow({
        where: { idProduto: produtoData.idProduto },
      });
    });

    return {
      message: "Movimentação registrada e estoque atualizado com sucesso!",
      data: produtoAtualizado,
    };
  } catch (error) {
    if (error instanceof EstoqueInsuficienteError) {
      return { error: "Quantidade insuficiente para movimentação de saída!" };
    }

    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    const dbError = handleDatabaseError(error);

    console.error("Erro na transação: ", dbError);
    return {
      error: dbError.message,
    };
  }
};
