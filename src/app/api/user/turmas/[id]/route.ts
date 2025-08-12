import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { deleteTurma, getTurmaById, updateTurma } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const turma = await getTurmaById(Number(params.id));
    return NextResponse.json(turma, { status: 200 });
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
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const turma = await deleteTurma(Number(params.id));
    if (turma)
      return NextResponse.json(
        { message: "Turma deletada com sucesso" },
        { status: 200 },
      );
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
  if (!session || session.user?.role !== "user") {
    return NextResponse.json(
      { error: true, message: "Acesso negado." },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    const turma = {
      idTurma: Number(params.id),
      codigoTurma: body.codigoTurma.trim(),
      idCurso: Number(body.idCurso),
      turnoTurma: body.turnoTurma.trim(),
      status: body.status,
    };

    if (
      !turma.codigoTurma ||
      !turma.idCurso ||
      !turma.turnoTurma ||
      !turma.status
    ) {
      return NextResponse.json(
        { error: "Nome e descrição são obrigatórios" },
        { status: 400 },
      );
    }

    const updatedTurma = await updateTurma(turma);
    if (updatedTurma)
      return NextResponse.json(
        { message: "Turma atualizada com sucesso" },
        { status: 200 },
      );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
