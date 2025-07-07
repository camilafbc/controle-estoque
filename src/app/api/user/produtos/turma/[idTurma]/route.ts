import { NextRequest, NextResponse } from "next/server";

import { getProdutos } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    if (!params.id)
      return NextResponse.json(
        { error: true, message: "Parâmetro idTurma ausente!" },
        { status: 400 },
      );

    const idCurso = await req.json();

    const produtos = await getProdutos(+idCurso, +params.id);
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
