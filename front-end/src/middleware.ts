import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Obtém o token usando getToken
  const token = await getToken({ req });
  console.log("TOKEN", token);

  // Verifica se o token existe e se contém o accessToken
  if (!token || !token.accessToken) {
    console.log("ENTROU No !token");
    return NextResponse.redirect(new URL("/redirect", url.origin));
  }

  try {
    const accessToken = token;

    // Verifica a role do usuário
    if (accessToken.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", url.origin));
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return NextResponse.redirect(new URL("/", url.origin));
  }

  // Permite acesso se tudo estiver correto
  return NextResponse.next();
}

// Define o matcher para as rotas protegidas
export const config = {
  matcher: ["/adm/:path*"], // Inclua outras rotas, se necessário
};

// export async function middleware(req: NextRequest) {
//   // Obtém o token usando getToken
//   const token = await getToken({ req });

//   // Verifica se o token não existe ou se não tem um accessToken válido
//   if (!token || !token.accessToken) {
//     return NextResponse.redirect(new URL("/redirect", req.url));
//   }

//   try {
//     // Verifica se o accessToken é uma string
//     const accessToken = token.accessToken;
//     if (typeof accessToken !== "string") {
//       throw new Error("Token não é uma string válida");
//     }

//     // Decodifica o token JWT usando o accessToken
//     const decodedToken: any = jwtDecode(accessToken);

//     console.log("DECODE TOKEN NO MIDDLEWARE: ", decodedToken);

//     // Verifica a role do usuário
//     if (decodedToken.role !== "admin") {
//       return NextResponse.redirect(new URL("/unauthorized", req.url));
//     }
//   } catch (error) {
//     console.error("Erro ao decodificar o token:", error);
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/adm/:path*"], // Define as rotas protegidas
// };
