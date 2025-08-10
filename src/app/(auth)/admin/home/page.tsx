import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import WelcomeUser from "@/components/home/GreetingUser";
import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { authOptions } from "@/lib/auth";

import Dashboard from "./components/Dahsboard";

export default async function Page() {
  // 1. Obtém a sessão do usuário no servidor
  const session = await getServerSession(authOptions);
  console.log("SESSION HOME ADMIN: ", session);

  // 2. Verifica se a sessão existe e se o usuário tem a role 'admin'
  if (!session || session.user?.role !== "admin") {
    // Redireciona imediatamente se o usuário não tiver permissão
    redirect("/acesso-negado");
  }

  // 3. Obtém o cookie de sessão do NextAuth.js
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(
    "next-auth.senac-estoque-session-token",
  );

  const [cursosCount, usersCount] = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/cursos/count`, {
      cache: "no-store",
      headers: {
        Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    }).then((res) => res.json()),
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/users/count`, {
      cache: "no-store",
      headers: {
        Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    }).then((res) => res.json()),
  ]);

  const initialData = {
    cursos: cursosCount.count,
    users: usersCount.count,
  };

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/adm/home" />
      <GreetingUser />
      <Dashboard initialData={initialData} />
    </div>
  );
}
