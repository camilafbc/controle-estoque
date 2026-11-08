import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import GreetingUser from "@/components/home/GreetingUser";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
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
    throw new Error("Erro ao carregar dados do curso!");
  }

  const [
    cursoData,
    turmasCount,
    produtosCount,
    estoqueCount,
    validadeCount,
    last12Months,
    last10Ops,
  ] = await Promise.all([
    prisma.curso.findUnique({
      where: { idCurso },
      select: { nomeCurso: true },
    }),
    countTurmas(idCurso),
    countProdutos(idCurso),
    getEstoquePorCurso(idCurso),
    getProdutosExpirando(idCurso),
    getRelatorioUltimosDozeMeses(idCurso),
    getLastDezOperacoes(idCurso),
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
      {/* Banner de Boas-Vindas */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card to-orange-500/5 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4">
          <GreetingUser />
          {cursoData?.nomeCurso && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-lg bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400">
                Curso: {cursoData.nomeCurso}
              </span>
            </div>
          )}
        </div>
      </div>

      <Dashboard initialData={initialData} idCurso={idCurso} />
    </div>
  );
}
