"use client";

import { PlusCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { MySelect } from "@/components/MySelect";
import {
  FormProdutoFields,
  FormProdutoRef,
} from "@/components/produtos/FormProduto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox/VirtualizedCombobox";
import {
  useCreateProdutoMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/mutations/produtos";
import { useProduto, useProdutos } from "@/queries/produtos";
import { useTurmas } from "@/queries/turmas";
import { useTurmaStore } from "@/stores/useTurmaStore";
import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";
import { getErrorMessage } from "@/utils/getErrorMessage";

import ProductDialog from "./Dialog";
import ProductTable from "./Table";

interface ProductContainerProps {
  turmas: Turma[];
  idCurso: number;
}

export default function ProductContainer({
  turmas,
  idCurso,
}: ProductContainerProps) {
  const router = useRouter();
  const params = useSearchParams();
  const { selectedTurma, setSelectedTurma } = useTurmaStore();

  const initialTurma =
    selectedTurma || params.get("turma") || turmas.at(0)?.uuid || "";

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      turma: initialTurma,
    },
  });

  // Atualiza a URL e a url quando a turma muda
  const currentTurma = watch("turma");
  useEffect(() => {
    if (currentTurma) {
      router.replace(`/cadastros/produtos?turma=${currentTurma}`, undefined);

      setSelectedTurma(currentTurma);
    }
  }, [selectedTurma, currentTurma, router]);

  // ref
  const formRef = useRef<FormProdutoRef>(null);
  // states
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // queries e mutations
  const fetchTurmas = useTurmas(Number(idCurso), turmas);
  const produtos = useProdutos(currentTurma, Number(idCurso));
  const produto = useProduto(Number(editingId));
  const deleteMutation = useDeleteProductMutation();
  const createProduto = useCreateProdutoMutation(currentTurma);
  const updateProduto = useUpdateProductMutation();

  const handleMovimentacoes = (uuidProduto: string) => {
    router.push(`/cadastros/produtos/${uuidProduto}/movimentacoes`);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setOpenDialog(true);
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
    setOpenDialog(true);
  };

  const handleClose = () => {
    setEditingId(null);
    setOpenDialog(false);
  };

  const handleCreateProduto = (
    data: Omit<Produto, "idProduto" | "prodTurma">,
  ) => {
    createProduto.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        formRef.current?.resetForm();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateProduto = (data: Omit<Produto, "prodTurma">) => {
    updateProduto.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const onSubmit: SubmitHandler<FormProdutoFields> = (data) => {
    const payload = {
      prodDescricao: data.produto.trim(),
      prodFabricante: data.fabricante.trim(),
      prodQuantidade: +data.quantidade,
      prodValidade: data.dataValidade,
      prodLote: data.lote.trim(),
      turmaUuid: data.turma,
      prodCurso: Number(idCurso),
    };

    if (editingId) {
      handleUpdateProduto({ ...payload, idProduto: +editingId });
    } else {
      handleCreateProduto(payload);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex w-full flex-wrap items-end justify-between gap-4 md:flex-row md:flex-nowrap">
        <form className="flex w-full flex-wrap items-end gap-4 md:flex-row md:flex-nowrap">
          <div className="w-full md:w-1/4">
            <Controller
              name="turma"
              control={control}
              render={({ field }) => (
                <VirtualizedCombobox
                  {...field}
                  required
                  label="Turma"
                  id="select-turma"
                  height={100}
                  options={
                    fetchTurmas.data.map((turma: Turma) => ({
                      label: `${turma.codigoTurma} - ${turma.turnoTurma}`,
                      id: turma.uuid,
                    })) || []
                  }
                  placeholder="Buscar turma"
                  loading={fetchTurmas.isFetching}
                  error={errors.turma?.message}
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
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

      <ProductTable
        onMovimentacoes={handleMovimentacoes}
        onDelete={handleDelete}
        onEdit={handleEdit}
        filterValue={filterValue}
        data={produtos.data || []}
        isLoading={produtos.isLoading || produto.isFetching}
      />

      <ProductDialog
        formRef={formRef}
        onSubmit={onSubmit}
        open={openDialog}
        setOpen={setOpenDialog}
        onClose={handleClose}
        onClick={() => formRef.current?.submitForm()}
        turmas={fetchTurmas.data}
        initialValues={produto.data}
        isLoading={createProduto.isPending || updateProduto.isPending}
      />
    </div>
  );
}
