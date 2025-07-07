import { hasEmail } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) return NextResponse.json({ exists: false }, { status: 400 });

  const has = await hasEmail(email);

  if (!has) return NextResponse.json({ exists: false }, { status: 200 });

  return NextResponse.json({ exists: true }, { status: 200 });
}
