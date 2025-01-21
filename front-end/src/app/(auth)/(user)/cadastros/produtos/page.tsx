"use client";

import { toast } from "react-toastify";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useEffect, useState } from "react";
import { TurmaSelect } from "@/components/TurmasSelect";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProductRegistrationDialog } from "./componentes/ProductRegistrationDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useProdutos } from "@/queries/produtos";
import { useDeleteProductMutation } from "@/mutations/produtos";
import { columns } from "./componentes/TableColumns";
import { useTurmaStore } from "@/stores/useTurmaStore";

export default function ProdutosPage() {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      turma: "",
    },
  });

  const router = useRouter();
  // const selectedTurma = watch("turma");
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { selectedTurma, setSelectedTurma } = useTurmaStore();

  const produtos = useProdutos(+selectedTurma);
  const deleteMutation = useDeleteProductMutation();

  const handleMovimentacoes = (id: number) => {
    router.push(`/cadastros/produtos/${id}/movimentacoes`);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Produto excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir produto!");
      },
    });
  };

  const handleNew = () => {
    setEditingId(null);
    setIsOpen(true);
  };

  useEffect(() => {
    produtos.refetch();
  }, [selectedTurma, produtos]);

  // Função para aplicar o filtro nos dados
  const filteredData = produtos?.data?.filter((produto) => {
    return produto.prodDescricao
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  });

  return (
    <div>
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Produtos", href: "/cadastros/produtos" },
        ]}
      />
      <h2 className="mt-4 text-lg font-bold md:text-2xl">Produtos</h2>
      <Separator orientation="horizontal" className="mb-4" />
      <div className="my-8 flex w-full items-end justify-between gap-4">
        <form className="my-4 flex w-full items-end gap-4">
          <div className="w-full md:w-1/4">
            <TurmaSelect name="turma" control={control} />
          </div>
          <Input
            placeholder="Filtrar produtos"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
            className="h-9 max-w-sm bg-card"
          />
        </form>
        <Button
          className="flex items-center gap-2 hover:bg-orange-500/90"
          onClick={handleNew}
        >
          <PlusCircle className="size-8" />
          Novo Produto
        </Button>
      </div>

      <DataTable
        columns={columns(handleMovimentacoes, handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={produtos.isLoading}
      />

      {isOpen && (
        <ProductRegistrationDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          editingId={editingId}
          turmaSelect={+selectedTurma}
        />
      )}
    </div>
  );
}
