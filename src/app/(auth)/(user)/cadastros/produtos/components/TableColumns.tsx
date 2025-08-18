"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ListPlus } from "lucide-react";

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
      <DataTableColumnHeader
        column={column}
        title="Ações"
        className="text-center text-base font-semibold text-gray-950 dark:text-white"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center px-2">
        <DataTableAction
          tooltipText="Movimentações"
          onClick={() => handleMovimentacoes(row.original.uuid || "")}
        >
          <ListPlus className="size-4 text-orange-500 hover:text-orange-500/90 dark:text-yellow-600" />
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
    meta: { minWidth: "60" },
  },
  {
    accessorKey: "prodDescricao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Produto" />
    ),
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
    accessorKey: "prodLote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lote" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "80" },
  },
  {
    accessorKey: "prodValidade",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validade"
        className="justify-end"
      />
    ),
    enableSorting: true,
    meta: { type: "date", minWidth: "90" },
  },

  {
    accessorKey: "prodQuantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" />
    ),
    enableSorting: true,
    meta: { type: "number", minWidth: "70" },
  },
];
