import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { createUser, getUsers, hasUserEmail } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const users = await getUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    const { nome, email, role, status, idCurso, password } = body;

    if (!nome || !email || !role || status == undefined || !password) {
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

    const createdBy = session.user.id;

    const newUser = await createUser(
      nome,
      email,
      password,
      role,
      createdBy,
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
