import { authOptions } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function checkRole(requiredRole: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/"); // Redireciona se não estiver autenticado
  }

  const token = session?.user?.token;

  if (!token) {
    redirect("/"); // Redireciona se não houver token
  }

  try {
    const decodedToken: any = jwtDecode(token); // Decodifica o token JWT

    if (!decodedToken || decodedToken.role !== requiredRole) {
      redirect("/unauthorized"); // Redireciona para uma página de acesso negado
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    redirect("/"); // Redireciona no caso de erro
  }
}
