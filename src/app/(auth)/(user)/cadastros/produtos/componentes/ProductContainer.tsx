"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MySelect } from "@/components/MySelect";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { useDeleteProductMutation } from "@/mutations/produtos";
import { useProdutos } from "@/queries/produtos";
import { useTurmas } from "@/queries/turmas";
import { useTurmaStore } from "@/stores/useTurmaStore";
import { Turma } from "@/types/Turma";

import { ProductRegistrationDialog } from "./ProductRegistrationDialog";
import { columns } from "./TableColumns";

import { Produto } from "@/types/Produto";

export default function ProductContainer() {
  const { control, setValue } = useForm({
    defaultValues: {
      turma: "",
    },
  });

  const router = useRouter();
  // const selectedTurma = watch("turma");
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<Produto[] | undefined>(
    undefined,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { selectedTurma, setSelectedTurma } = useTurmaStore();
  const { data: turmas, isLoading: turmasLoading } = useTurmas();
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

  useEffect(() => {
    if (turmas?.length > 0) {
      const defaultValue = turmas[0].idTurma.toString();
      if (!selectedTurma) {
        setSelectedTurma(defaultValue);
      }
      // Verifica se o formulário já tem um valor definido, se não, define o valor inicial
      if (setValue) {
        setValue("turma", selectedTurma || defaultValue);
      }
    }
  }, [turmas, setValue, selectedTurma, setSelectedTurma]);

  // Função para aplicar o filtro nos dados
  // const filteredData = produtos?.data?.filter((produto) => {
  //   return produto.prodDescricao
  //     .toLowerCase()
  //     .includes(filterValue.toLowerCase());
  // });
  useEffect(() => {
    setFilteredData(
      produtos?.data?.filter((produto) => {
        return produto.prodDescricao
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      }),
    );
  }, [filterValue, produtos?.data]);

  return (
    <>
      <div className="my-8 flex w-full flex-wrap items-end justify-between gap-4 md:flex-row md:flex-nowrap">
        <form className="my-4 flex w-full flex-wrap items-end gap-4 md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/4">
            <Controller
              name="turma"
              control={control}
              render={({ field }) => (
                <MySelect
                  {...field}
                  label="Turma"
                  id="select-turma"
                  loading={turmasLoading}
                  options={turmas?.map((turma: Turma) => ({
                    label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                    value: String(turma.idTurma),
                  }))}
                  value={selectedTurma}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedTurma(value);
                  }}
                />
              )}
            />
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
          <PlusCircle className="size-4 md:size-8" />
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
    </>
  );
}
