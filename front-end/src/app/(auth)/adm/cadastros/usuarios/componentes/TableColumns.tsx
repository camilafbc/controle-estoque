"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { User } from "@/types/User";
import { formatarCodigo } from "@/utils/utils";
import {
  DataTableDeleteAction,
  DataTableEditAction,
} from "@/components/ui/data-table/data-table-action-buttons";

export const columns = (
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
): ColumnDef<User>[] => [
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
      <div className="flex items-center justify-center">
        <DataTableEditAction onClick={() => handleEdit(row.original.idUser)} />
        <DataTableDeleteAction
          title="Usuário"
          item={row.original.nome}
          onClick={() => handleDelete(row.original.idUser)}
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
    cell: ({ row }) => formatarCodigo(row.getValue("idUser"), 2),
    enableSorting: true,
    meta: { type: "number" },
    size: 5,
  },
  // {
  //   accessorKey: "idCurso",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Código" />
  //   ),
  //   enableSorting: true,
  // },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ativo"
        className="justify-center"
      />
    ),
    enableSorting: true,
    meta: { type: "boolean", minWidth: "20" },
    size: 5,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuário" />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
