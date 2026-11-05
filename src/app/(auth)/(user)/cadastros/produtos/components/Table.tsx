"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Produto } from "@/types/Produto";

import { columns } from "./TableColumns";

interface ProductTableProps {
  data: Produto[];
  isLoading: boolean;
  filterValue: string;
  onMovimentacoes: (uuidProduto: string) => void;
  onEdit: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}

export default function ProductTable({
  data,
  isLoading,
  filterValue,
  onMovimentacoes,
  onEdit,
  onDelete,
}: ProductTableProps) {
  // A lógica de filtragem, que estava no componente pai, agora mora aqui
  const filteredData = useMemo(
    () =>
      Array.isArray(data)
        ? data.filter((produto) => {
        return produto.prodDescricao
          .toLowerCase()
          .includes(filterValue.toLowerCase());
          })
        : [],
    [data, filterValue],
  );
  const tableColumns = useMemo(
    () => columns(onMovimentacoes, onEdit, onDelete),
    [onDelete, onEdit, onMovimentacoes],
  );

  return (
    <DataTable
      columns={tableColumns}
      data={filteredData || []} // Usa os dados filtrados
      isLoading={isLoading}
    />
  );
}
