import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

import { createProduto } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body.prodDescricao ||
      !body.prodFabricante ||
      !body.prodQuantidade ||
      !body.prodValidade ||
      !body.prodLote ||
      !body.prodCurso ||
      !body.turmaUuid
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
      prodDescricao: body.prodDescricao.trim(),
      prodFabricante: body.prodFabricante.trim(),
      prodQuantidade: body.prodQuantidade,
      prodValidade: body.prodValidade,
      prodLote: body.prodLote.trim(),
      prodCurso: body.prodCurso,
    };

    const newProduto = await createProduto(produto, body.turmaUuid);
    return NextResponse.json(
      { produto: newProduto, message: "Produto cadastrado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
