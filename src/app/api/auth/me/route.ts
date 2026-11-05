import { NextResponse } from "next/server";

import { authErrorResponse, authorizeAuthenticated } from "@/lib/authz";
import { getUserById } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  const auth = await authorizeAuthenticated();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const user = await getUserById(auth.ctx.userId);

    if (!user) {
      return NextResponse.json(
        { error: true, message: "Usuário não encontrado!" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
