import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { authOptions } from "@/lib/auth";
import {
  getLastDezOperacoes,
  getRelatorioUltimosDozeMeses,
} from "@/services/operacoes";
import {
  countProdutos,
  getEstoquePorCurso,
  getProdutosExpirando,
} from "@/services/produtos";
import { countTurmas } from "@/services/turmas";

import Dashboard from "./components/Dashboard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const idCurso = session?.user.curso;

  if (!session || session.user?.role !== "user") {
    redirect("/acesso-negado");
  }

  if (!idCurso) {
    throw new Error("Erro ao carregar dados!");
  }

  const [
    turmasCount,
    produtosCount,
    estoqueCount,
    validadeCount,
    last12Months,
    last10Ops,
  ] = await Promise.all([
    await countTurmas(idCurso),
    await countProdutos(idCurso),
    await getEstoquePorCurso(idCurso),
    await getProdutosExpirando(idCurso),
    await getRelatorioUltimosDozeMeses(idCurso),
    await getLastDezOperacoes(idCurso),
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
