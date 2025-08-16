import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
const customCookie = "next-auth.senac-estoque-session-token";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret, cookieName: customCookie });

  if (path === "/" && token) {
    const newUrl = token.role === "admin" ? "/admin/home" : "/home";
    return NextResponse.redirect(new URL(newUrl, req.url));
  }

  // // 1. Rotas públicas (acesso sem autenticação)
  const publicPaths = ["/", "/api/auth/signin", "/recuperar-senha"];

  // se a rota desejada está inclusa no array de rotas públicas, deixa acesar
  if (publicPaths.includes(path) || path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // se a rota não está inclusa nas rotas públicas e não há token, encaminha para o login
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // 2. Proteção para rotas administrativas (frontend e backend)
  const isAdminRoute =
    path.startsWith("/admin") || path.startsWith("/api/admin");

  if ((isAdminRoute && !token) || (isAdminRoute && token?.role !== "admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // // 3. Proteção para outras rotas autenticadas (não-admin)
  if (!token && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Configuração para aplicar em todas as rotas exceto arquivos estáticos
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|squares-in-squares.svg|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico).*)",
  ],
};
