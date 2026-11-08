import { NextResponse } from "next/server";

import { authErrorResponse, authorizeAdmin } from "@/lib/authz";
import { getUsers } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  const auth = await authorizeAdmin();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const users = await getUsers(auth.ctx.userId);
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
