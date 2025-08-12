import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { deleteCurso, getCursoById, updateCurso } from "@/services/cursos";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: number } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Parâmetro id não identificado!" },
        { status: 400 },
      );
    }
    const curso = await getCursoById(params.id);
    return NextResponse.json(curso, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: number } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Parâmetro id não identificado!" },
        { status: 400 },
      );
    }

    const curso = await deleteCurso(params.id);

    return NextResponse.json(
      { message: "Curso deletado com sucesso!", curso: curso },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function PUT(
  request: NextRequest,
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
    const { nomeCurso, status } = await request.json();

    if (!nomeCurso || status === undefined) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios!" },
        { status: 400 },
      );
    }

    const curso = {
      nomeCurso: nomeCurso,
      status: status,
      idCurso: Number(params.id),
    };

    const updatedCurso = await updateCurso(curso);

    return NextResponse.json(
      { message: "Dados atualizados com sucesso!", curso: updatedCurso },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
