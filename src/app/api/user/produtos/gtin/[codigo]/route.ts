import { NextResponse } from "next/server";

import { authErrorResponse, authorizeUser } from "@/lib/authz";
import { GtinServiceError, getProductByGtin } from "@/services/gtin";

export async function GET(
  _: Request,
  { params }: { params: { codigo: string } },
) {
  const auth = await authorizeUser();
  if (!auth.ok) return authErrorResponse(auth);

  try {
    const produto = await getProductByGtin(params.codigo);
    return NextResponse.json(produto);
  } catch (error) {
    if (error instanceof GtinServiceError) {
      return NextResponse.json(
        { error: true, message: error.message },
        { status: error.status },
      );
    }
    console.error("Erro inesperado na consulta GTIN:", error);
    return NextResponse.json(
      {
        error: true,
        message: "Não foi possível consultar o código de barras.",
      },
      { status: 502 },
    );
  }
}
