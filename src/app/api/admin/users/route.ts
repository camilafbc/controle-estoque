import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUsers } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { error: true, message: "Acesso negado." },
        { status: 401 },
      );
    }

    const users = await getUsers(session.user.id);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
