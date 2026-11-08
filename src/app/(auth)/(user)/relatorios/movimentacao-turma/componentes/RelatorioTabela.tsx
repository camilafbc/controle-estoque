"use client";

import { PackageOpen, Search, X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RelatorioMovimentacaoItem, RelatorioResumo } from "@/types/Relatorio";

interface RelatorioTabelaProps {
  items: RelatorioMovimentacaoItem[];
  totalItens: number;
  search: string;
  onSearchChange: (value: string) => void;
  resumo: RelatorioResumo;
}

export function RelatorioTabela({
  items,
  totalItens,
  search,
  onSearchChange,
  resumo,
}: RelatorioTabelaProps) {
  return (
    <div className="space-y-4">
      {/* Barra de Busca de Produtos dentro do Relatório */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filtrar por nome ou fabricante..."
            className="rounded-xl pl-9 pr-9"
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onSearchChange("")}
              className="absolute right-1 top-1/2 size-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>

        <p className="text-xs font-medium text-muted-foreground">
          Exibindo{" "}
          <span className="font-semibold text-foreground">{items.length}</span>{" "}
          de{" "}
          <span className="font-semibold text-foreground">{totalItens}</span>{" "}
          itens
        </p>
      </div>

      {/* Tabela de Produtos */}
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Produto</TableHead>
              <TableHead className="font-semibold">Fabricante</TableHead>
              <TableHead className="text-right font-semibold">Entradas</TableHead>
              <TableHead className="text-right font-semibold">Saídas</TableHead>
              <TableHead className="text-right font-semibold">Saldo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-44 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <PackageOpen className="size-8 text-muted-foreground/60" />
                    <p className="font-medium text-muted-foreground">
                      Nenhum produto encontrado para este filtro
                    </p>
                    {search && (
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={() => onSearchChange("")}
                        className="text-xs"
                      >
                        Limpar filtro de busca
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => {
                const entradas = Number(item.entradas) || 0;
                const saidas = Number(item.saidas) || 0;
                const saldo = entradas - saidas;
                const isSaldoPositivo = saldo >= 0;

                return (
                  <TableRow
                    key={`${item.prodDescricao}-${index}`}
                    className="hover:bg-muted/30"
                  >
                    <TableCell className="font-medium text-foreground">
                      {item.prodDescricao}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.prodFabricante || "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-lg bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400">
                        +{entradas}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center rounded-lg bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-700 ring-1 ring-red-500/20 dark:bg-red-500/15 dark:text-red-400">
                        -{saidas}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      <span
                        className={`text-xs ${
                          isSaldoPositivo
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {saldo > 0 ? `+${saldo}` : saldo}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          {items.length > 0 && (
            <TableFooter className="bg-muted/60 font-semibold">
              <TableRow>
                <TableCell colSpan={2} className="text-xs uppercase tracking-wider text-muted-foreground">
                  Totais Consolidados do Período
                </TableCell>
                <TableCell className="text-right text-emerald-700 dark:text-emerald-400">
                  +{resumo.totalEntradas}
                </TableCell>
                <TableCell className="text-right text-red-700 dark:text-red-400">
                  -{resumo.totalSaidas}
                </TableCell>
                <TableCell
                  className={`text-right ${
                    resumo.saldoGeral >= 0
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {resumo.saldoGeral > 0
                    ? `+${resumo.saldoGeral}`
                    : resumo.saldoGeral}
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
