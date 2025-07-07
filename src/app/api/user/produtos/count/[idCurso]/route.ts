import { NextRequest, NextResponse } from "next/server";

import { countProdutos } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  try {
    const count = await countProdutos(+params.idCurso);
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
