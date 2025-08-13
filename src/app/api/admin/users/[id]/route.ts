import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { deleteUser, getUserById, updateUser } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    if (!params.id)
      return NextResponse.json(
        { error: "Usuário não encontrado!" },
        { status: 404 },
      );
    const user = await getUserById(Number(params.id));
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const deleted = await deleteUser(Number(params.id));
    if (!deleted)
      return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    let user = {
      idUser: Number(params.id),
      nome: body.nome,
      email: body.email,
      status: body.status,
      role: body.role,
      idCurso: body.idCurso ? Number(body.idCurso) : undefined,
      password: body.password ? body.password : null,
    };

    if (!user.nome || !user.email || user.status == undefined || !user.role) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios!" },
        { status: 400 },
      );
    }

    if (user.role === "user" && !user.idCurso) {
      return NextResponse.json(
        { error: "Usuário deve estar vinculado a um curso!" },
        { status: 400 },
      );
    }

    if (user.password) {
      if (user.password.length < 6) {
        return NextResponse.json(
          { error: "A senha deve ter pelo menos 6 caracteres." },
          { status: 400 },
        );
      }

      const passwordHash = await bcrypt.hash(user.password, 10);
      user.password = passwordHash;
    }

    const updated = await updateUser(user);
    if (!updateUser) {
      return NextResponse.json(
        { error: "Erro ao atualizar usuário!" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { updated, message: "Dados de usuário atualizados com sucesso!" },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
