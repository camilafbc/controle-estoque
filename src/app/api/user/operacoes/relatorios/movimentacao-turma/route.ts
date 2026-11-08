import { NextRequest, NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { getCursoById } from "@/services/cursos";
import { getRelatorioOperacoes } from "@/services/operacoes";
import { getTurmaById } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const { idTurma, dataInicial, dataFinal } = await req.json();

    if (!idTurma || !dataInicial || !dataFinal) {
      return NextResponse.json(
        { error: true, message: "Dados inválidos ou incompletos!" },
        { status: 400 },
      );
    }

    // A turma deve pertencer ao curso do usuário autenticado
    const turma = await getTurmaById(Number(idTurma), auth.ctx.idCurso);

    if (!turma) {
      return NextResponse.json(
        { error: true, message: "Turma não encontrada para seu curso!" },
        { status: 404 },
      );
    }

    const [relatorio, curso] = await Promise.all([
      getRelatorioOperacoes(
        auth.ctx.idCurso,
        turma.idTurma,
        new Date(dataInicial),
        new Date(dataFinal),
      ),
      getCursoById(auth.ctx.idCurso),
    ]);

    return NextResponse.json(
      {
        curso: curso?.nomeCurso ?? "Curso Senac",
        turma: turma.codigoTurma,
        turnoTurma: turma.turnoTurma,
        data: relatorio,
      },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
