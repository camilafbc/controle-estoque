import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request });

  console.log("Middleware token:", token);

  // // 1. Rotas públicas (acesso sem autenticação)
  const publicPaths = ["/", "/api/auth/signin", "/recuperar-senha"];

  console.log("Path now: ", path);
  // if (publicPaths.includes(path)) {
  //   return NextResponse.next();
  // }

  // if (!publicPaths.includes(path) && !token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  // // 2. Proteção para rotas administrativas (frontend e backend)
  // const isAdminRoute =
  //   path.startsWith("/admin") || path.startsWith("/api/admin");

  // if (isAdminRoute) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   if (token.role !== "admin") {
  //     // Para APIs, retorna 403. Para páginas, redireciona
  //     if (path.startsWith("/api")) {
  //       return new NextResponse("Acesso negado", { status: 403 });
  //     }
  //     return NextResponse.redirect(new URL("/acesso-negado", request.url));
  //   }
  // }

  // // 3. Proteção para outras rotas autenticadas (não-admin)
  // if (!token && !publicPaths.includes(path)) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Configuração para aplicar em todas as rotas exceto arquivos estáticos
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
