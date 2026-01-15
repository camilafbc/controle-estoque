"use server";

import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import * as yup from "yup";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const operacaoValidationSchema = yup.object({
  // idUser: yup.number().required("Parâmetro obrigatório"),
  uuidProduto: yup.string().required("Parâmetro obrigatório"),
  tipoOp: yup.number().required("Parâmetro obrigatório"),
  qtd: yup
    .number()
    .min(1, "Quantidade mínima para movimentação é 1.")
    .required("Parâmetro obrigatório"),
});

export const createOperacao = async (
  uuidProduto: string,
  tipoOp: number,
  qtd: number,
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "user") {
      return { error: "Usuário não autorizado" };
    }

    await operacaoValidationSchema.validate(
      { uuidProduto, tipoOp, qtd },
      { abortEarly: false },
    );

    // 1. Buscamos o produto primeiro para validar estoque
    const produtoData = await prisma.produto.findUnique({
      where: { uuid: uuidProduto },
    });

    if (!produtoData) {
      return { error: "Produto não encontrado!" };
    }

    const tipoOperacao = tipoOp === 0 ? "decrement" : "increment";

    if (tipoOperacao === "decrement" && qtd > produtoData.prodQuantidade) {
      return { error: "Quantidade insuficiente para movimentação de saída!" };
    }

    const userDo = session.user.id;

    // --- INÍCIO DA TRANSAÇÃO ---
    const [operacao, produtoAtualizado] = await prisma.$transaction([
      // Criar a operação
      prisma.operacao.create({
        data: {
          tipoOperacao: tipoOp,
          idUsuario: userDo,
          idProduto: produtoData.idProduto,
          data: new Date(),
          quantidade: qtd,
        },
      }),

      // Atualiza o estoque do produto
      prisma.produto.update({
        where: { idProduto: produtoData.idProduto },
        data: {
          prodQuantidade: {
            [tipoOperacao]: Number(qtd),
          },
        },
      }),
    ]);
    // --- FIM DA TRANSAÇÃO ---

    return {
      message: "Movimentação registrada e estoque atualizado com sucesso!",
      data: produtoAtualizado,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return { error: "Dados inválidos", messages: error.errors };
    }

    console.error("Erro na transação: ", error);
    return {
      error: "Erro ao processar movimentação. Nenhuma alteração foi feita.",
    };
  }
};

// export const createOperacao = async (
//   // idUser: number,
//   uuidProduto: string,
//   tipoOp: number,
//   qtd: number,
// ) => {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session || session.user.role !== "user") {
//       return { error: "Usuário não autorizado" };
//     }

//     await operacaoValidationSchema.validate(
//       { uuidProduto, tipoOp, qtd },
//       { abortEarly: false },
//     );

//     const produtoData = await prisma.produto.findUnique({
//       where: {
//         uuid: uuidProduto,
//       },
//     });
//     const tipoOperacao = tipoOp === 0 ? "decrement" : "increment";

//     if (!produtoData) {
//       return { error: "Produto não encontrado!" };
//     }

//     if (tipoOperacao === "decrement" && qtd > produtoData.prodQuantidade) {
//       return { error: "Quantidade insuficiente para movimentação de saída!" };
//     }

//     const currentData = dayjs().format("YYYY-MM-DD HH:mm:ss");
//     const userDo = session?.user.id;

//     const operacao = await prisma.operacao.create({
//       data: {
//         tipoOperacao: tipoOp,
//         idUsuario: userDo,
//         idProduto: produtoData.idProduto,
//         data: new Date(currentData),
//         quantidade: qtd,
//       },
//       include: {
//         produto: {
//           select: {
//             prodCurso: true,
//             uuid: true,
//             turma: {
//               select: { uuid: true },
//             },
//           },
//         },
//       },
//     });

//     if (!operacao) {
//       return { error: "Erro ao concluir operação!" };
//     }

//     const produtoUpdated = await prisma.produto.update({
//       where: {
//         idProduto: produtoData.idProduto,
//       },
//       data: {
//         prodQuantidade: {
//           [tipoOperacao]: Number(qtd),
//         },
//       },
//     });

//     if (!produtoUpdated) {
//       return {
//         error: "Erro ao atualizar campo quantidade no registro de produto!",
//       };
//     }

//     return {
//       message: "Movimentação registrada com sucesso!",
//       data: produtoUpdated,
//     };
//   } catch (error) {
//     if (error instanceof yup.ValidationError) {
//       return { error: "Dados inválidos", messages: error.errors };
//     }

//     console.error("Erro ao registrar movimentação de produto: ", error);
//     return { error: "Erro interno do servidor" };
//   }
// };
