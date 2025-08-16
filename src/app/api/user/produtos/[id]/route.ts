import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
  deleteProduto,
  getProdutoById,
  updateProduto,
} from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const uuiProduto = params.id;
    const produto = await getProdutoById(uuiProduto);
    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const produto = await deleteProduto(params.id);
    if (produto) {
      return NextResponse.json(
        { message: "Produto deletado com sucesso!" },
        { status: 200 },
      );
    }
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    if (
      !body.prodDescricao ||
      !body.prodFabricante ||
      !body.prodQuantidade ||
      !body.prodValidade ||
      !body.prodLote ||
      !body.turmaUuid ||
      !body.prodCurso
    )
      return NextResponse.json(
        {
          error: true,
          message:
            "Todos os campo são obrigatórios! Verifique as informações inseridas.",
        },
        { status: 400 },
      );

    const produto = {
      uuid: params.id,
      prodDescricao: body.prodDescricao.trim(),
      prodFabricante: body.prodFabricante.trim(),
      prodQuantidade: body.prodQuantidade,
      prodValidade: body.prodValidade,
      prodLote: body.prodLote.trim(),
      prodCurso: body.prodCurso,
    };

    const uuidTurma = body.turmaUuid;

    const updated = await updateProduto(produto, uuidTurma);
    if (updated) {
      return NextResponse.json(
        { updated, message: "Produto atualizado com sucesso!" },
        { status: 200 },
      );
    }
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
