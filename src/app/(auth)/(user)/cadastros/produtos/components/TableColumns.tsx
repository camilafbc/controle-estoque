"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye, ListPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

import MyTooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
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
      <DataTableColumnHeader
        column={column}
        title="Produto"
        // className="w-[200px]"
      />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "180" },
    // size: 200,
  },
  {
    accessorKey: "prodFabricante",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fabricante" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "120" },
    // size: 140,
  },
  {
    accessorKey: "prodLote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lote" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "80" },
    // size: 100,
  },
  {
    accessorKey: "prodValidade",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validade"
        className="justify-center"
      />
    ),
    enableSorting: true,
    meta: { type: "date", minWidth: "90" },
    // size: 110,
  },

  {
    accessorKey: "prodQuantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estoque" />
    ),
    // cell: ({ row }) => (
    //   <p className="pe-4 text-end">{row.getValue("prodQuantidade")}</p>
    // ),
    enableSorting: true,
    meta: { type: "number", minWidth: "70" },
    // size: 90,
  },
];
