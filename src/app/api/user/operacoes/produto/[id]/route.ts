import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getOperacoesPorProduto } from "@/services/operacoes";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const uuidProduto = params.id;
    const operacoes = await getOperacoesPorProduto(
      uuidProduto,
      auth.ctx.idCurso,
    );
    return NextResponse.json(operacoes, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
