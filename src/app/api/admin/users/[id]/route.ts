import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeAdmin } from "@/lib/authz";
import { getUserById } from "@/services/users";
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
        { error: true, message: "Usuário não encontrado!" },
        { status: 404 },
      );
    }
    const user = await getUserById(Number(params.id));
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
