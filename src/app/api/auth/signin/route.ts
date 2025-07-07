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
    if (!user)
      return NextResponse.json(
        { error: "E-mail ou senha inválidos." },
        { status: 401 },
      );

    const token = await createAccessToken(user.id);

    // const response = NextResponse.json({ user }, { status: 200 });

    // response.cookies.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   path: "/",
    //   maxAge: 60 * 60 * 4, // 4h, por exemplo
    // });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
