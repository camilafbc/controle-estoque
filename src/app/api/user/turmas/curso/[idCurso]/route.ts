import { NextRequest, NextResponse } from "next/server";

import { getTurmas } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { idCurso: number } },
) {
  if (!params.idCurso)
    return NextResponse.json(
      { error: true, message: "Parâmetro id ausente" },
      { status: 400 },
    );

  try {
    const turmas = await getTurmas(params.idCurso);
    return NextResponse.json(turmas, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
