import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Boxes,
  Scale,
} from "lucide-react";
import React from "react";

import { Card } from "@/components/ui/card";
import { RelatorioResumo } from "@/types/Relatorio";

interface RelatorioResumoCardsProps {
  resumo: RelatorioResumo;
}

export function RelatorioResumoCards({ resumo }: RelatorioResumoCardsProps) {
  const isSaldoPositivo = resumo.saldoGeral >= 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total de Itens */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
          <Boxes className="size-6" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Itens Movimentados
          </p>
          <p className="text-2xl font-bold tracking-tight text-foreground">
            {resumo.totalItens}
          </p>
        </div>
      </Card>

      {/* Total Entradas */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
          <ArrowDownToLine className="size-6" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Entradas
          </p>
          <p className="text-2xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
            +{resumo.totalEntradas}
          </p>
        </div>
      </Card>

      {/* Total Saídas */}
      <Card className="flex items-center gap-4 p-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400">
          <ArrowUpFromLine className="size-6" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Saídas
          </p>
          <p className="text-2xl font-bold tracking-tight text-red-600 dark:text-red-400">
            -{resumo.totalSaidas}
          </p>
        </div>
      </Card>

      {/* Saldo Líquido */}
      <Card className="flex items-center gap-4 p-5">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
            isSaldoPositivo
              ? "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
              : "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
          }`}
        >
          <Scale className="size-6" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Saldo do Período
          </p>
          <p
            className={`text-2xl font-bold tracking-tight ${
              isSaldoPositivo
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-amber-600 dark:text-amber-400"
            }`}
          >
            {resumo.saldoGeral > 0
              ? `+${resumo.saldoGeral}`
              : resumo.saldoGeral}
          </p>
        </div>
      </Card>
    </div>
  );
}
