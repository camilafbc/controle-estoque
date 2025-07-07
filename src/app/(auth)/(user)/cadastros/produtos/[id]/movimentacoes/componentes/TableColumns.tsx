"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Produto } from "@/types/Produto";

export const columns: ColumnDef<Produto>[] = [
  {
    accessorKey: "tipoOperacao",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
    cell: ({ row }) => {
      const operacao = row.getValue("tipoOperacao");
      if (operacao === 1)
        return <p className="font-semibold text-green-700">Entrada</p>;
      if (operacao === 0)
        return <p className="font-semibold text-red-700">Saída</p>;
    },
    enableSorting: true,
    meta: { type: "string", minWidth: "30" },
    size: 15,
  },
  // {
  //   accessorKey: "data",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Data"
  //       className="justify-center"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const getData = row.getValue("data") as string;
  //     const data = getData.split(" ")[0];
  //     // const prodValidade = row.getValue("prodValidade") as string;
  //     return data;

  //     // return (
  //     //   <p className="pe-4 text-center">{dayjs(data).format("DD/MM/YYYY")}</p>
  //     // );
  //   },
  //   enableSorting: true,
  //   meta: { type: "date", minWidth: "30" },
  //   size: 10,
  // },
  {
    accessorKey: "data",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Data e Hora"
        className="justify-center"
      />
    ),
    enableSorting: true,
    meta: { type: "dateTime", minWidth: "30" },
    size: 10,
  },
  {
    accessorKey: "quantidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
    enableSorting: true,
    meta: { type: "number", minWidth: "30" },
    size: 10,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuário" />
    ),
    enableSorting: true,
    meta: { type: "string", minWidth: "30" },
  },
];
