import { NextResponse } from "next/server";

import { authErrorResponse, authorizeAdmin } from "@/lib/authz";
import { getCursos } from "@/services/cursos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  const auth = await authorizeAdmin();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const cursos = await getCursos();
    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
