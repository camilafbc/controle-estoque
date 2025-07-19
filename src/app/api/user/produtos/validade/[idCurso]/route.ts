import { NextRequest, NextResponse } from "next/server";

import { getEstoquePorCurso, getProdutosExpirando } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  try {
    const produtos = await getProdutosExpirando(+params.idCurso);
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
