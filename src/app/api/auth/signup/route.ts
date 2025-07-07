import { hasEmail } from "@/services/auth";
import { createUser } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, password, curso, role } = await request.json();

    if (!email || !name || !password || !role) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    const has = await hasEmail(email);
    if (has)
      return NextResponse.json(
        { error: "E-mail já cadastrado." },
        { status: 400 },
      );

    const user = await createUser(name, email, password, curso, role);
    if (!user)
      return NextResponse.json(
        { error: "Erro ao criar usuário." },
        { status: 500 },
      );

    return NextResponse.json(
      { message: "Usuário criado com sucesso." },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
