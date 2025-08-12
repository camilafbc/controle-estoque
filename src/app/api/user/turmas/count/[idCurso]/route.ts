import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { countTurmas } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const count = await countTurmas(Number(params.idCurso));
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
