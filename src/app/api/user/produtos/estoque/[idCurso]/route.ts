import { NextRequest, NextResponse } from "next/server";

import { getEstoquePorCurso } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  try {
    const estoque = await getEstoquePorCurso(+params.idCurso);
    return NextResponse.json(estoque, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
