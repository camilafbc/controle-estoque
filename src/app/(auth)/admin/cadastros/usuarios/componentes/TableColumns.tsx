"use client";

import { ColumnDef } from "@tanstack/react-table";

import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  DataTableDeleteAction,
  DataTableEditAction,
} from "@/components/ui/data-table/data-table-action-buttons";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { User } from "@/types/User";
import { formatarCodigo } from "@/utils/utils";

export const columns = (
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
  deletingId?: number,
): ColumnDef<User>[] => [
  {
    accessorKey: "acoes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ações" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <DataTableEditAction onClick={() => handleEdit(row.original.idUser)} />
        <DataTableDeleteAction
          title="Usuário"
          item={row.original.nome}
          onClick={() => handleDelete(row.original.idUser)}
          loading={deletingId === row.original.idUser}
        />
      </div>
    ),
    enableSorting: false,
    size: 5,
  },
  {
    accessorKey: "idUser",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs font-medium text-muted-foreground">
        {formatarCodigo(row.getValue("idUser"), 2)}
      </span>
    ),
    enableSorting: true,
    meta: { type: "number" },
    size: 5,
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) =>
      row.getValue("role") === "admin" ? (
        <span className="inline-flex rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 dark:bg-orange-950 dark:text-orange-300">
          Administrador
        </span>
      ) : (
        <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          Usuário
        </span>
      ),
    enableSorting: true,
    meta: { type: "string", minWidth: "20" },
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
    id: "curso",
    accessorFn: (row) => row?.curso?.nomeCurso ?? "-",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curso" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "20" },
    size: 10,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuário" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "20" },
    size: 10,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
