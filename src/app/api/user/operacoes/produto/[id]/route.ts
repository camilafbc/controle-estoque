import { NextRequest, NextResponse } from "next/server";

import { getOperacoesPorProduto } from "@/services/operacoes";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const produto = await getOperacoesPorProduto(+params.id);
    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
