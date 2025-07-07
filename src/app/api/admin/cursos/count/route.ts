import { countCursos } from "@/services/cursos";
import { handleDatabaseError } from "@/utils/handleDbError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await countCursos();

    return NextResponse.json({ count: count }, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
