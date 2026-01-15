"use client";

import { PlusCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { FormProdutoRef } from "@/components/produtos/FormProduto";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { VirtualizedCombobox } from "@/components/ui/virtualized-combobox/VirtualizedCombobox";
import {
  useCreateProdutoMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "@/mutations/produtos";
import { useProduto, useProdutos } from "@/queries/produtos";
import { useTurmas } from "@/queries/turmas";
import { FormProdutoFields } from "@/schemas/produto-schema";
import { Produto } from "@/types/Produto";
import { Turma } from "@/types/Turma";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getErrorMessageFromAction } from "@/utils/getErrorMessageFromAction";

import ProductDialog from "./Dialog";
import ProductTable from "./Table";

interface ProductContainerProps {
  turmas: Turma[];
  idCurso: number;
}

export default function ProductContainer({
  idCurso,
  turmas,
}: ProductContainerProps) {
  const router = useRouter();
  const params = useSearchParams();
  const initialTurma = params.get("turma");

  if (!initialTurma) {
    throw new Error("Erro");
  }

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      turma: initialTurma,
    },
  });

  // Atualiza a URL quando a turma muda
  const currentTurma = watch("turma");
  useEffect(() => {
    router.push(`/cadastros/produtos?turma=${currentTurma}`);
  }, [currentTurma, router]);

  // ref
  const formRef = useRef<FormProdutoRef>(null);
  // states
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string>("");
  // queries e mutations
  const fetchTurmas = useTurmas(Number(idCurso), turmas);
  const produtos = useProdutos(currentTurma, Number(idCurso));
  const produto = useProduto(editingId, currentTurma, Number(idCurso));
  const deleteMutation = useDeleteProductMutation();
  const createProduto = useCreateProdutoMutation();
  const updateProduto = useUpdateProductMutation();

  const handleMovimentacoes = (uuidProduto: string) => {
    router.push(
      `/cadastros/produtos?turma=${currentTurma}&produto=${uuidProduto}`,
    );
  };

  const handleEdit = (uuid: string) => {
    setEditingId(uuid);
    setOpenDialog(true);
  };

  const handleDelete = (uuid: string) => {
    deleteMutation.mutate(uuid, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Produto excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir produto!");
      },
    });
  };

  const handleNew = () => {
    setEditingId("");
    setOpenDialog(true);
  };

  const handleClose = () => {
    setEditingId("");
    setOpenDialog(false);
  };

  const handleCreateProduto = (
    data: Omit<Produto, "idProduto" | "prodTurma"> & { turmaUuid: string },
  ) => {
    const { turmaUuid, ...produto } = data;
    createProduto.mutate(
      { produto, uuidTurma: turmaUuid },
      {
        onSuccess: (data) => {
          if ("error" in data && data.error) {
            const msg = getErrorMessageFromAction(data);
            toast.error(`Erro: ${msg}`);
            return;
          }
          toast.success("Produto criado com sucesso!");
          formRef.current?.resetForm();
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  const handleUpdateProduto = (
    data: Omit<Produto, "idProduto" | "prodTurma"> & { turmaUuid: string },
  ) => {
    const { turmaUuid, ...produto } = data;
    updateProduto.mutate(
      { produto, uuidTurma: turmaUuid },
      {
        onSuccess: (data) => {
          if ("error" in data && data.error) {
            const msg = getErrorMessageFromAction(data);
            toast.error(`Erro: ${msg}`);
            return;
          }
          toast.success("Dados atualizados com sucesso!");
          setOpenDialog(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  const onSubmit: SubmitHandler<FormProdutoFields> = (data) => {
    const payload = {
      uuid: produto.data?.uuid,
      prodDescricao: data.prodDescricao.trim(),
      prodFabricante: data.prodFabricante.trim(),
      prodQuantidade: +data.prodQuantidade,
      prodValidade: data.prodValidade,
      prodLote: data.prodLote.trim(),
      turmaUuid: data.turma,
      prodCurso: Number(idCurso),
    };

    if (editingId) {
      handleUpdateProduto(payload);
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
                  height={200}
                  options={
                    fetchTurmas.data
                      .filter((turma: Turma) => turma.status === true)
                      .map((turma: Turma) => ({
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
          <SearchInput
            placeholder="Buscar produto"
            value={filterValue}
            onChange={(event) => setFilterValue(event.target.value)}
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
