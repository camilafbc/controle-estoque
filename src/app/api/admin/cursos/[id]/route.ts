import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeAdmin } from "@/lib/authz";
import { getCursoById } from "@/services/cursos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const auth = await authorizeAdmin();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    if (!params.id) {
      return NextResponse.json(
        { error: true, message: "Parâmetro id não identificado!" },
        { status: 400 },
      );
    }
    const curso = await getCursoById(Number(params.id));
    return NextResponse.json(curso, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
