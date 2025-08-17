"use client";

import { Boxes, CalendarDays, GraduationCap, Package } from "lucide-react";
import { getServerSession } from "next-auth";

import DashboardCard from "@/components/dashboard/DashboardCard";
import GraficoDozeMeses from "@/components/dashboard/GraficoDozeMeses";
import TableOperacoes from "@/components/dashboard/TabelaOperacoes";
import { authOptions } from "@/lib/auth";
import { useDashRelatorioDozeMeses } from "@/queries/dashboard";

interface DashboardProps {
  initialData: {
    turmas: number;
    produtos: number;
    estoque: number;
    validade: number;
    lastMonths: any;
    lastOps: any;
  };
  idCurso: number | undefined;
}

export default function Dashboard({ initialData, idCurso }: DashboardProps) {
  const lastMonthsData = useDashRelatorioDozeMeses(
    idCurso ?? 0,
    initialData.lastMonths,
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          delay={0}
          showHeader={true}
          title="Turmas"
          description="cadastradas e ativas"
          loading={false}
          data={initialData.turmas.toString()}
          icon={
            <div className="rounded-md bg-lime-500 p-2 text-white dark:bg-lime-900">
              <GraduationCap />
            </div>
          }
        />

        <DashboardCard
          delay={1}
          showHeader={true}
          title="Produtos"
          description="cadastrados para esse curso"
          loading={false}
          data={initialData.produtos.toString()}
          icon={
            <div className="rounded-md bg-yellow-500 p-2 text-white dark:bg-yellow-900">
              <Package />
            </div>
          }
        />

        <DashboardCard
          delay={2}
          showHeader={true}
          title="Validade"
          description="produtos expirando em 30 dias"
          loading={false}
          data={initialData.validade.toString()}
          icon={
            <div className="rounded-md bg-orange-500 p-2 text-white dark:bg-orange-900">
              <CalendarDays />
            </div>
          }
        />

        <DashboardCard
          delay={3}
          showHeader={true}
          title="Estoque"
          description="produtos em estoque"
          loading={false}
          data={initialData.estoque.toString()}
          icon={
            <div className="rounded-md bg-blue-600 p-2 text-white dark:bg-blue-900">
              <Boxes />
            </div>
          }
        />
        <GraficoDozeMeses
          data={lastMonthsData.data}
          isLoading={lastMonthsData.isFetching}
          delay={4}
          className="sm:col-span-2"
        />
        <TableOperacoes
          data={initialData.lastOps}
          isLoading={false}
          delay={5}
          className="sm:col-span-2"
        />
      </div>
    </>
  );
}
