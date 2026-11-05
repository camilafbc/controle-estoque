import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getProdutos } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { turmaUuid: string } },
) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    if (!params.turmaUuid) {
      return NextResponse.json(
        { error: true, message: "Parâmetros ausentes!" },
        { status: 400 },
      );
    }

    // Usa sempre o curso derivado da sessão do usuário autenticado
    const produtos = await getProdutos(auth.ctx.idCurso, params.turmaUuid);
    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
