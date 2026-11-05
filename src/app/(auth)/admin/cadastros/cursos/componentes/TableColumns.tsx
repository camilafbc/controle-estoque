"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  DataTableDeleteAction,
  DataTableEditAction,
} from "@/components/ui/data-table/data-table-action-buttons";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Curso } from "@/types/Curso";
import { formatarCodigo } from "@/utils/utils";

export const columns = (
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  deletingId?: number,
): ColumnDef<Curso>[] => [
  {
    accessorKey: "acoes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <DataTableEditAction onClick={() => handleEdit(row.original.idCurso)} />
        <DataTableDeleteAction
          title="Curso"
          item={row.original.nomeCurso}
          onClick={() => handleDelete(row.original.idCurso)}
          loading={deletingId === row.original.idCurso}
        />
      </div>
    ),
    enableSorting: false,
    size: 5,
  },
  {
    accessorKey: "idCurso",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium text-muted-foreground">
        {formatarCodigo(row.getValue("idCurso"), 2)}
      </span>
    ),
    enableSorting: true,
    meta: { type: "number" },
    size: 5,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ativo" />
    ),
    cell: ({ row }) => <StatusBadge active={row.original.status} />,
    enableSorting: true,
    meta: { type: "string", minWidth: "20" },
    size: 5,
  },
  {
    accessorKey: "nomeCurso",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curso" />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
