"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye, ListPlus, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

import MyTooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import {
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
        <MyTooltip content="Movimentações">
          <ListPlus
            onClick={() => handleMovimentacoes(row.original.uuid || "")}
            className="size-5 cursor-pointer hover:text-orange-500/90 dark:text-yellow-600"
          />
        </MyTooltip>
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
    size: 7,
  },
  {
    accessorKey: "prodLote",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lote" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "30" },
    size: 10,
  },
  {
    accessorKey: "prodValidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validade" />
    ),
    enableSorting: true,
    meta: { type: "date", minWidth: "20" },
    size: 8,
  },
  {
    accessorKey: "prodFabricante",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fabricante" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "20" },
    size: 10,
  },

  {
    accessorKey: "prodQuantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qtd." />
    ),
    // cell: ({ row }) => (
    //   <p className="pe-4 text-end">{row.getValue("prodQuantidade")}</p>
    // ),
    enableSorting: true,
    meta: { type: "number", minWidth: "20" },
    size: 7,
  },
  {
    accessorKey: "prodDescricao",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Produto"
        className="w-[200px]"
      />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
