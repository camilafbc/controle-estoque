"use client";

import { ColumnDef } from "@tanstack/react-table";

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
): ColumnDef<Curso>[] => [
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
        <DataTableEditAction onClick={() => handleEdit(row.original.idCurso)} />
        <DataTableDeleteAction
          title="Curso"
          item={row.original.nomeCurso}
          onClick={() => handleDelete(row.original.idCurso)}
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
    cell: ({ row }) => formatarCodigo(row.getValue("idCurso"), 2),
    enableSorting: true,
    meta: { type: "number" },
    size: 5,
  },
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
    accessorKey: "nomeCurso",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Curso" />
    ),
    enableSorting: true,
    meta: { type: "string" },
  },
];
