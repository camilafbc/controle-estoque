"use client";

import { Boxes, CalendarDays, GraduationCap, Package } from "lucide-react";

import DashboardCard from "@/components/dashboard/DashboardCard";
import GraficoDozeMeses from "@/components/dashboard/GraficoDozeMeses";
import TableOperacoes from "@/components/dashboard/TabelaOperacoes";
import { useDashRelatorioDozeMeses } from "@/queries/dashboard";
import { DashboardOperacao, RelatorioDozeMeses } from "@/types/Operacao";

interface DashboardProps {
  initialData: {
    turmas: number;
    produtos: number;
    estoque: number;
    validade: number;
    lastMonths: RelatorioDozeMeses[];
    lastOps: DashboardOperacao[];
  };
  idCurso: number | undefined;
}

export default function Dashboard({ initialData, idCurso }: DashboardProps) {
  const lastMonthsData = useDashRelatorioDozeMeses(
    idCurso ?? 0,
    initialData.lastMonths,
  );

  return (
    <div className="space-y-6">
      {/* Grid de Cards de Estatísticas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          delay={0}
          showHeader={true}
          title="Turmas"
          description="Turmas ativas no curso"
          loading={false}
          data={initialData.turmas.toString()}
          icon={
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400">
              <GraduationCap className="size-5" />
            </div>
          }
        />

        <DashboardCard
          delay={1}
          showHeader={true}
          title="Produtos"
          description="Cadastrados no catálogo"
          loading={false}
          data={initialData.produtos.toString()}
          icon={
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20 dark:bg-blue-500/15 dark:text-blue-400">
              <Package className="size-5" />
            </div>
          }
        />

        <DashboardCard
          delay={2}
          showHeader={true}
          title="Validade Próxima"
          description="Vencendo em até 30 dias"
          loading={false}
          data={initialData.validade.toString()}
          icon={
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400">
              <CalendarDays className="size-5" />
            </div>
          }
        />

        <DashboardCard
          delay={3}
          showHeader={true}
          title="Estoque Total"
          description="Unidades totais disponíveis"
          loading={false}
          data={initialData.estoque.toString()}
          icon={
            <div className="flex size-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400">
              <Boxes className="size-5" />
            </div>
          }
        />
      </div>

      {/* Grid de Gráfico e Tabela de Operações */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GraficoDozeMeses
          data={lastMonthsData.data ?? []}
          isLoading={lastMonthsData.isFetching}
          delay={4}
          className="w-full"
        />
        <TableOperacoes
          data={initialData.lastOps}
          isLoading={false}
          delay={5}
          className="w-full"
        />
      </div>
    </div>
  );
}
