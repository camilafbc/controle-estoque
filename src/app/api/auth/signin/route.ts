import { NextResponse } from "next/server";

import { createAccessToken, validateAuth } from "@/services/auth";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 },
      );
    }

    const user = await validateAuth(email, password);
    if (!user) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    if (user && user.status == false) {
      return NextResponse.json({ error: "Usuário inativo." }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
