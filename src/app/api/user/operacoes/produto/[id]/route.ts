import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getOperacoesPorProduto } from "@/services/operacoes";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const uuidProduto = params.id;
    const produto = await getOperacoesPorProduto(uuidProduto);
    return NextResponse.json(produto, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
