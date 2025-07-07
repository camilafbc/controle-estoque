import { NextRequest, NextResponse } from "next/server";

import { createTurma } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const turma = {
      codigoTurma: body.codigoTurma.trim(),
      idCurso: Number(body.idCurso),
      turnoTurma: body.turnoTurma.trim(),
      status: body.status,
    };

    const newTurma = await createTurma(turma);
    return NextResponse.json(
      { turma: newTurma, message: "Turma cadastrada com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
