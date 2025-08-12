import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { updateProfile } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
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
      password: body.password ? body.password : null,
    };

    if (!user.nome || !user.idUser) {
      return NextResponse.json(
        { error: "Erro ao atualizar dados. Dados incompletos!" },
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

    const updated = await updateProfile(user);
    if (!updated) {
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
