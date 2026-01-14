import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { authOptions } from "@/lib/auth";
import { countProdutos } from "@/services/produtos";
import { countTurmas } from "@/services/turmas";

import Dashboard from "./components/Dashboard";

const customCookie = process.env.NEXT_PUBLIC_CUSTOM_COOKIE;

export default async function Page() {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  if (!session || session.user?.role !== "user") {
    redirect("/acesso-negado");
  }

  if (!idCurso) {
    throw new Error("Erro ao carregar dados!");
  }

  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(customCookie || "");

  const [estoqueCount, validadeCount, last12Months, last10Ops] =
    await Promise.all([
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/produtos/estoque/${idCurso}`,
        {
          cache: "no-store",
          headers: {
            Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
          },
        },
      ).then((res) => res.json()),
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/produtos/validade/${idCurso}`,
        {
          cache: "no-store",
          headers: {
            Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
          },
        },
      ).then((res) => res.json()),
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/operacoes/relatorios/${idCurso}/last-12-months`,
        {
          cache: "no-store",
          headers: {
            Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
          },
        },
      ).then((res) => res.json()),
      fetch(
        `${process.env.NEXTAUTH_URL}/api/user/operacoes/relatorios/${idCurso}/last-10-op`,
        {
          cache: "no-store",
          headers: {
            Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
          },
        },
      ).then((res) => res.json()),
    ]);

  const [turmasCount, produtosCount] = await Promise.all([
    await countTurmas(idCurso),
    await countProdutos(idCurso),
  ]);

  const initialData = {
    turmas: turmasCount,
    produtos: produtosCount,
    estoque: estoqueCount,
    validade: validadeCount,
    lastMonths: last12Months,
    lastOps: last10Ops,
  };

  return (
    <div className="space-y-6">
      <MyBreadcrumb />
      <GreetingUser />
      <Dashboard initialData={initialData} idCurso={idCurso} />
    </div>
  );
}
