import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getTurmaById } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const turma = await getTurmaById(Number(params.id), auth.ctx.idCurso);

    if (!turma) {
      return NextResponse.json(
        { error: true, message: "Turma não encontrada." },
        { status: 404 },
      );
    }

    return NextResponse.json(turma, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
