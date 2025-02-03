"use client";

import {
  useDashTotal,
  useDashTotalEstoque,
  useDashTotalTurmas,
  useDashTotalVencimento,
} from "@/queries/dashboard";
import { Boxes, CalendarDays, GraduationCap, Package } from "lucide-react";
import GraficoDozeMeses from "./GraficoDozeMeses";
import TabelaOperacoes from "./TabelaOperacoes";
import LoaderComponent from "@/components/LoaderComponent";
import DashCard from "@/components/DashCard";

export default function DashboardContent() {
  const { data: totalProdutos, isLoading, error } = useDashTotal();
  const {
    data: totalTurmas,
    isLoading: isTotalTurmasLoading,
    error: totalTurmasErro,
  } = useDashTotalTurmas();
  const {
    data: totalVencimento,
    isLoading: isTotalVencimentoLoading,
    error: totalVencimentoError,
  } = useDashTotalVencimento();
  const {
    data: totalEstoque,
    isLoading: isTotalEstoqueLoading,
    error: totalEstoqueError,
  } = useDashTotalEstoque();

  // if (
  //   isLoading ||
  //   isTotalVencimentoLoading ||
  //   isTotalTurmasLoading ||
  //   isTotalEstoqueLoading
  // )
  //   return <LoaderComponent />;

  // if (error || totalEstoqueError || totalTurmasErro || totalVencimentoError)
  //   return <p>Erro ao carregar Dashboard</p>;

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <DashCard
          className="bg-green-500 text-white"
          title="Produtos"
          subtitle="Produtos cadastrados"
          data={totalProdutos?.count}
          loading={isLoading}
        >
          <Package />
        </DashCard>
        <DashCard
          className="bg-blue-400 text-white"
          title="Turmas"
          subtitle="Turmas ativas"
          data={totalTurmas?.count}
          loading={isTotalTurmasLoading}
        >
          <GraduationCap />
        </DashCard>
        <DashCard
          className="bg-yellow-400 text-white"
          title="Validade"
          subtitle="Produtos expiram em 30 dias"
          data={totalVencimento?.length}
          loading={isTotalVencimentoLoading}
        >
          <CalendarDays />
        </DashCard>
        <DashCard
          className="bg-orange-400 text-white"
          title="Estoque"
          subtitle="Unidades em estoque"
          data={totalEstoque?.totalEstoque || 0}
          loading={isTotalEstoqueLoading}
        >
          <Boxes />
        </DashCard>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <GraficoDozeMeses />
        <TabelaOperacoes />
      </div>
    </div>
  );
}
