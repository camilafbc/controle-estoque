import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getUserById } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(req: NextRequest) {
  const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

  try {
    const token = await getToken({ req, cookieName: customCookie });

    if (!token || !token.id)
      return NextResponse.json(
        { error: true, message: "Não autorizado!" },
        { status: 401 },
      );

    const user = await getUserById(+token.id);

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
