import { error } from "console";

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { createOperacao } from "@/services/operacoes";
import { updateQuantidadeProduto } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || !token.id)
      return NextResponse.json(
        { error: true, message: "Usuário não autorizado!" },
        { status: 401 },
      );

    const idUser = token.id;

    const { idProduto, tipoOp, quantidade } = await req.json();

    if (
      typeof idProduto !== "number" ||
      typeof tipoOp !== "number" ||
      typeof quantidade !== "number"
    ) {
      return NextResponse.json(
        { error: true, message: "Dados inválidos ou incompletos!" },
        { status: 400 },
      );
    }

    const operacao = await createOperacao(
      +idUser,
      +idProduto,
      +tipoOp,
      quantidade,
    );

    if (!operacao)
      return NextResponse.json(
        { error: true, message: "Erro ao inserir operação!" },
        { status: 500 },
      );

    const tipoOperacao = +tipoOp === 0 ? "decrement" : "increment";
    const atualizarProduto = await updateQuantidadeProduto(
      +idProduto,
      quantidade,
      tipoOperacao,
    );

    if (!atualizarProduto)
      return NextResponse.json(
        {
          error: true,
          message: "Erro ao atualizar dados do produto após operação!",
        },
        { status: 500 },
      );

    return NextResponse.json(
      { operacao, message: "Registro inserido com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
