import { NextRequest, NextResponse } from "next/server";

import { getProdutos } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { turmaUuid: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const idCurso = searchParams.get("idCurso");

    if (!params.turmaUuid || !idCurso)
      return NextResponse.json(
        { error: true, message: "Parâmetros ausentes!" },
        { status: 400 },
      );

    const produtos = await getProdutos(+idCurso, params.turmaUuid);
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
