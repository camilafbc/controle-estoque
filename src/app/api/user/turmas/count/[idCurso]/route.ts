import { NextRequest, NextResponse } from "next/server";

import { countTurmas } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  try {
    const count = await countTurmas(Number(params.idCurso));
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
