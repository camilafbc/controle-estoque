import { createCurso, getCursos } from "@/services/cursos";
import { handleDatabaseError } from "@/utils/handleDbError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cursos = await getCursos();
    return NextResponse.json(cursos, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}

export async function POST(request: Request) {
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
    };

    const newCurso = await createCurso(curso);

    return NextResponse.json(
      { message: "Curso adicionado com sucesso!", curso: newCurso },
      { status: 201 },
    );
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
