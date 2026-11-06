"use client";

import { useMemo } from "react";

import { DataTable } from "@/components/ui/data-table/data-table";
import { Produto } from "@/types/Produto";

import { columns } from "./TableColumns";

interface ProductTableProps {
  data: Produto[];
  isLoading: boolean;
  filterValue: string;
  onClearFilter?: () => void;
  onMovimentacoes: (uuidProduto: string) => void;
  onEdit: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}

export default function ProductTable({
  data,
  isLoading,
  filterValue,
  onClearFilter,
  onMovimentacoes,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    if (!filterValue || filterValue.trim() === "") return data;

    const term = filterValue.toLowerCase().trim();
    return data.filter(
      (produto) =>
        produto.prodDescricao.toLowerCase().includes(term) ||
        produto.prodFabricante.toLowerCase().includes(term) ||
        produto.prodCodigoBarras?.includes(term)
    );
  }, [data, filterValue]);

  const tableColumns = useMemo(
    () => columns(onMovimentacoes, onEdit, onDelete),
    [onDelete, onEdit, onMovimentacoes]
  );

  return (
    <DataTable
      columns={tableColumns}
      data={filteredData}
      isLoading={isLoading}
      filterValue={filterValue}
      onClearFilter={onClearFilter}
      totalRawCount={data.length}
      emptyTitle="Nenhum produto cadastrado"
      emptyDescription="Esta turma ainda não possui produtos cadastrados. Clique em 'Novo Produto' acima para adicionar."
    />
  );
}
