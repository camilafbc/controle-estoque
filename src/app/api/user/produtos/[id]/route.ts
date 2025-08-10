import { NextRequest, NextResponse } from "next/server";

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
  try {
    const produto = await deleteProduto(+params.id);
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
  try {
    const body = await req.json();

    if (
      !body.prodDescricao ||
      !body.prodFabricante ||
      !body.prodQuantidade ||
      !body.prodValidade ||
      !body.prodLote ||
      !body.prodTurma ||
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
      idProduto: +params.id,
      prodDescricao: body.prodDescricao.trim(),
      prodFabricante: body.prodFabricante.trim(),
      prodQuantidade: body.prodQuantidade.trim(),
      prodValidade: body.prodValidade.trim(),
      prodLote: body.prodLote.trim(),
      prodTurma: body.prodTurma,
      prodCurso: body.prodCurso,
    };

    const updated = await updateProduto(produto);
    if (updated) {
      return NextResponse.json(
        { message: "Produto atualizado com sucesso!" },
        { status: 200 },
      );
    }

    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
