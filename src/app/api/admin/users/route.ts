import { NextResponse } from "next/server";

import { createUser, getUsers, hasUserEmail } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  try {
    const users = await getUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { nome, email, role, status, idCurso, senha } = body;

    if (!nome || !email || !role || status == undefined || !senha) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    if (role === "user" && !idCurso) {
      return NextResponse.json(
        { error: "Usuário deve estar vinculado a um curso!" },
        { status: 400 },
      );
    }

    const userExist = await hasUserEmail(email);
    if (userExist) {
      return NextResponse.json(
        { error: "Usuário já cadastrado!" },
        { status: 400 },
      );
    }

    const newUser = await createUser(
      nome,
      email,
      senha,
      role,
      1,
      status,
      idCurso,
    );
    if (!newUser) {
      return NextResponse.json(
        { error: "Erro ao criar usuário!" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Usuário criado com sucesso!", user: newUser },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
