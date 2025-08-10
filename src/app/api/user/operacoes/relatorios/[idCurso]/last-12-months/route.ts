import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  getRelatorioOperacoes,
  getRelatorioUltimosDozeMeses,
} from "@/services/operacoes";
import { getTurmaById } from "@/services/turmas";
import { handleDatabaseError } from "@/utils/handleDbError";

export async function GET(
  req: NextRequest,
  { params }: { params: { idCurso: string } },
) {
  try {
    const idCurso = Number(params.idCurso);

    if (!idCurso) {
      return NextResponse.json(
        { error: true, message: "Dados inválidos ou incompletos!" },
        { status: 400 },
      );
    }

    const data = await getRelatorioUltimosDozeMeses(idCurso);

    if (!data)
      return NextResponse.json(
        { error: true, message: "Erro ao buscar dados!" },
        { status: 500 },
      );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
