import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getTurmas } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(_: NextRequest) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    // Retorna as turmas do curso do usuário da sessão, ignorando id externo
    const turmas = await getTurmas(auth.ctx.idCurso);
    return NextResponse.json(turmas, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
