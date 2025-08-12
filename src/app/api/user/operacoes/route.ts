import { error } from "console";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { getProduto } from "@/api/produtos";
import { authOptions } from "@/lib/auth";
import { createOperacao } from "@/services/operacoes";
import { getProdutoById, updateQuantidadeProduto } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const idUser = session.user.id;

    const { uuidProduto, tipoOp, quantidade } = await req.json();

    if (
      typeof uuidProduto !== "string" ||
      typeof tipoOp !== "number" ||
      typeof quantidade !== "number"
    ) {
      return NextResponse.json(
        { error: true, message: "Dados inválidos ou incompletos!" },
        { status: 400 },
      );
    }

    const produto = await getProdutoById(uuidProduto);

    if (!produto) {
      return NextResponse.json(
        { error: true, message: "Produto não encontrado!" },
        { status: 404 },
      );
    }

    const idProduto = produto?.idProduto;

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
