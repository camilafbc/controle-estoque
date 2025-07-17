"use client";

import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import { MySelect } from "@/components/MySelect";
import FormProduto, {
  FormProdutoFields,
  FormProdutoRef,
} from "@/components/produtos/FormProduto";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
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

import { columns } from "./TableColumns";

export default function ProductContainer() {
  const { control, setValue } = useForm({
    defaultValues: {
      turma: "",
    },
  });

  const router = useRouter();
  const formRef = useRef<FormProdutoRef>(null);
  // const user = useSession();
  // const idCurso = user.data?.user.curso;
  const { user } = useAuthContext();
  const idCurso = user?.curso?.idCurso;

  // const selectedTurma = watch("turma");
  const [filterValue, setFilterValue] = useState("");
  // const [filteredData, setFilteredData] = useState<Produto[] | undefined>(
  //   undefined,
  // );
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const { selectedTurma, setSelectedTurma } = useTurmaStore();

  const { data: turmas, isLoading: turmasLoading } = useTurmas(Number(idCurso));
  const produtos = useProdutos(+selectedTurma, Number(idCurso));
  const produto = useProduto(Number(editingId));
  const deleteMutation = useDeleteProductMutation();

  const createProduto = useCreateProdutoMutation();
  const updateProduto = useUpdateProductMutation();

  const handleMovimentacoes = (id: number) => {
    router.push(`/cadastros/produtos/${id}/movimentacoes`);
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

  // useEffect(() => {
  //   produtos.refetch();
  // }, [selectedTurma, produtos]);

  useEffect(() => {
    if (turmas?.length > 0) {
      const defaultValue = turmas[0].idTurma.toString();
      if (!selectedTurma) {
        setSelectedTurma(defaultValue);
      }
      // Define o valor inicial
      if (setValue) {
        setValue("turma", selectedTurma || defaultValue);
      }
    }
  }, [turmas, setValue, selectedTurma, setSelectedTurma]);

  // Função para aplicar o filtro nos dados
  const filteredData = Array.isArray(produtos.data)
    ? produtos.data.filter((produto) => {
        return produto.prodDescricao
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      })
    : [];

  const handleCreateProduto = (data: Omit<Produto, "idProduto">) => {
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

  const handleUpdateProduto = (data: Produto) => {
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
    console.log(data);
    const payload = {
      prodDescricao: data.produto.trim(),
      prodFabricante: data.fabricante.trim(),
      prodQuantidade: +data.quantidade,
      prodValidade: data.dataValidade,
      prodLote: data.lote.trim(),
      prodTurma: +data.turma,
      prodCurso: Number(idCurso),
    };

    if (editingId) {
      handleUpdateProduto({ ...payload, idProduto: +editingId });
    } else {
      handleCreateProduto(payload);
    }
  };

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
                  value={selectedTurma.toString()}
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedTurma(+value);
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
        isLoading={produtos.isLoading || turmasLoading}
      />

      {openDialog && (
        <MyDialog
          size="xl"
          open={openDialog}
          setIsOpen={setOpenDialog}
          title={
            produto.data
              ? `Editando: ${produto.data.prodDescricao}`
              : "Cadastro"
          }
          footerChildren={
            <div className="flex w-full items-center justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={handleClose}
                className="min-w-[120px]"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                loading={createProduto.isPending || updateProduto.isPending}
                onClick={() => formRef.current?.submitForm()}
                className="min-w-[120px] bg-primary hover:bg-primary/90"
              >
                Salvar
              </Button>
            </div>
          }
        >
          <FormProduto
            ref={formRef}
            initialValues={produto.data || undefined}
            turmas={turmas}
            turmasLoading={turmasLoading}
            onSubmit={onSubmit}
          />
        </MyDialog>
      )}
    </>
  );
}
