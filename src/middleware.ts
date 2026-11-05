import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: secret });

  // Redireciona usuário autenticado que entra na raiz para a home correspondente
  if (path === "/" && token) {
    const newUrl = token.role === "admin" ? "/admin/home" : "/home";
    return NextResponse.redirect(new URL(newUrl, req.url));
  }

  // Rotas públicas (acesso sem autenticação)
  const publicPaths = ["/", "/api/auth/signin", "/recuperar-senha"];
  if (publicPaths.includes(path) || path.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Não autenticado tentando acessar rota protegida
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Proteção para rotas administrativas
  const isAdminRoute =
    path.startsWith("/admin") || path.startsWith("/api/admin");

  if (isAdminRoute && token.role !== "admin") {
    // Redireciona para tela de acesso negado sem deslogar
    return NextResponse.redirect(new URL("/acesso-negado", req.url));
  }

  return NextResponse.next();
}

// Configuração para aplicar em todas as rotas exceto arquivos estáticos
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo.png|squares-in-squares.svg|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.ico).*)",
  ],
};
