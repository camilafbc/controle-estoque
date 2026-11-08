"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { AlertTriangle, Clock, ListPlus } from "lucide-react";

import {
  DataTableAction,
  DataTableDeleteAction,
  DataTableEditAction,
} from "@/components/ui/data-table/data-table-action-buttons";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Produto } from "@/types/Produto";

export const columns = (
  handleMovimentacoes: (uuid: string) => void,
  handleEdit: (uuid: string) => void,
  handleDelete: (uuid: string) => void,
): ColumnDef<Produto>[] => [
  {
    accessorKey: "acoes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <DataTableAction
          tooltipText="Movimentações de Estoque"
          onClick={() => handleMovimentacoes(row.original.uuid || "")}
        >
          <ListPlus className="size-4 text-orange-500 hover:text-orange-600 dark:text-orange-400" />
        </DataTableAction>
        <DataTableEditAction
          onClick={() => handleEdit(row.original.uuid || "")}
        />
        <DataTableDeleteAction
          title="Produto"
          item={row.original.prodDescricao}
          onClick={() => handleDelete(row.original.uuid || "")}
        />
      </div>
    ),
    enableSorting: false,
    size: 10,
    meta: { minWidth: "80" },
  },
  {
    accessorKey: "prodDescricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produto" />
    ),
    cell: ({ row }) => row.original.prodDescricao.toUpperCase(),
    enableSorting: true,
    meta: { type: "string", minWidth: "180" },
  },
  {
    accessorKey: "prodFabricante",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fabricante" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "120" },
  },
  {
    accessorKey: "prodValidade",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validade"
        className="justify-start"
      />
    ),
    cell: ({ row }) => {
      const validade = new Date(row.original.prodValidade);
      const hoje = new Date();
      const em30Dias = new Date();
      em30Dias.setDate(hoje.getDate() + 30);

      const isVencido = validade < hoje;
      const isExpirando = !isVencido && validade <= em30Dias;

      return (
        <div className="flex items-center gap-1.5">
          <span>{dayjs(validade).format("DD/MM/YYYY")}</span>
          {isVencido && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400"
              title="Produto vencido"
            >
              <AlertTriangle className="size-3" />
              Vencido
            </span>
          )}
          {isExpirando && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-600 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400"
              title="Vencimento próximo"
            >
              <Clock className="size-3" />
              Próximo
            </span>
          )}
        </div>
      );
    },
    enableSorting: true,
    meta: { type: "date", minWidth: "120" },
  },
  {
    accessorKey: "prodQuantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" />
    ),
    cell: ({ row }) => {
      const qtd = row.original.prodQuantidade;
      if (qtd === 0) {
        return (
          <span className="inline-flex rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold text-rose-600 ring-1 ring-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400">
            0 un
          </span>
        );
      }
      return (
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            qtd <= 5
              ? "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-400"
              : "bg-muted font-bold text-foreground"
          }`}
        >
          {qtd} un
        </span>
      );
    },
    enableSorting: true,
    meta: { type: "number", minWidth: "80" },
  },
];
