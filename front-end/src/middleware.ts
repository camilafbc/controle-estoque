import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Obtém o token usando getToken
  const token = await getToken({ req });

  // Verifica se o token existe e se contém o accessToken
  if (!token || !token.accessToken) {
    return NextResponse.redirect(new URL("/redirect", url.origin));
  }

  try {
    const accessToken = token;

    // Se for uma rota de admin, verifica se o usuário é admin
    if (url.pathname.startsWith("/adm") && accessToken.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", url.origin));
    }

    // Se for uma rota não-admin, verifica se o usuário é admin (e impede acesso)
    if (!url.pathname.startsWith("/adm") && accessToken.role === "admin") {
      return NextResponse.redirect(new URL("/unauthorized", url.origin));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  // Permite acesso se tudo estiver correto
  return NextResponse.next();
}

// Define o matcher para as rotas protegidas
export const config = {
  matcher: ["/adm/:path*"],
};
