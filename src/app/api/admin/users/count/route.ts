import { countUsers } from "@/services/users";
import { handleDatabaseError } from "@/utils/handleDbError";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await countUsers();

    return NextResponse.json({ count: count - 1 }, { status: 200 });
  } catch (error) {
    const { status, message } = handleDatabaseError(error);
    return NextResponse.json({ error: true, message }, { status });
  }
}
