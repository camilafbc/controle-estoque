"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DataTableDeleteAction,
  DataTableEditAction,
} from "@/components/ui/data-table/data-table-action-buttons";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Turma } from "@/types/Turma";

export const columns = (
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
): ColumnDef<Turma>[] => [
  {
    accessorKey: "acoes",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ações"
        className="text-center text-base font-semibold text-gray-950 dark:text-white"
      />
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <DataTableEditAction onClick={() => handleEdit(row.original.idTurma)} />
        <DataTableDeleteAction
          title="Turma"
          item={row.original.codigoTurma}
          onClick={() => handleDelete(row.original.idTurma)}
        />
      </div>
    ),
    size: 5,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ativa"
        className="justify-center"
      />
    ),
    enableSorting: true,
    meta: { type: "boolean", minWidth: "20" },
    size: 5,
  },
  {
    accessorKey: "turnoTurma",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turno" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "10" },
    size: 10,
  },
  {
    accessorKey: "codigoTurma",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
