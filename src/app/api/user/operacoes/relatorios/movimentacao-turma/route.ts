import { NextRequest, NextResponse } from "next/server";

import { getRelatorioOperacoes } from "@/services/operacoes";
import { getTurmaById } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function POST(req: NextRequest) {
  try {
    const { idCurso, idTurma, dataInicial, dataFinal } = await req.json();

    if (!idCurso || !idTurma || !dataInicial || !dataFinal) {
      return NextResponse.json(
        { error: true, message: "Dados inválidos ou incompletos!" },
        { status: 400 },
      );
    }

    const relatorio = await getRelatorioOperacoes(
      idCurso,
      idTurma,
      dataInicial,
      dataFinal,
    );

    if (!relatorio)
      return NextResponse.json(
        { error: true, message: "Erro ao gerar relatório!" },
        { status: 500 },
      );

    const turma = await getTurmaById(idTurma);

    return NextResponse.json(
      {
        turma: turma?.codigoTurma,
        turnoTurma: turma?.turnoTurma,
        data: relatorio,
      },
      { status: 200 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
