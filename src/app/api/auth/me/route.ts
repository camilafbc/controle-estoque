import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserById } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "user") {
      return NextResponse.json(
        { error: true, message: "Acesso negado." },
        { status: 401 },
      );
    }

    const user = await getUserById(session.user.id);

    if (!user)
      return NextResponse.json(
        { error: true, message: "Usuário não encontrado!" },
        { status: 404 },
      );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
