import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getProdutoById } from "@/services/produtos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const uuidProduto = params.id;
    const produto = await getProdutoById(uuidProduto, auth.ctx.idCurso);

    if (!produto) {
      return NextResponse.json(
        { error: true, message: "Produto não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
