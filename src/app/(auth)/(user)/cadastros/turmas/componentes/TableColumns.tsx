"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "@/components/common/StatusBadge";
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
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center">
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
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <StatusBadge active={row.original.status} />,
    enableSorting: true,
    size: 10,
  },
  {
    accessorKey: "codigoTurma",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código da Turma" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "turnoTurma",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Turno" />
    ),
    cell: ({ row }) => (
      <span className="inline-flex rounded-lg bg-muted/60 px-2.5 py-1 text-xs font-medium text-foreground">
        {row.original.turnoTurma}
      </span>
    ),
    enableSorting: true,
    size: 15,
  },
];
