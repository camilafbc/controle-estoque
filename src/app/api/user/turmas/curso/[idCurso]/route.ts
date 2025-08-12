import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getTurmas } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { idCurso: number } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

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
