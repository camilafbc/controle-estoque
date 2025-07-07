"use client";

import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import FormTurmas, {
  FormTurmasFields,
  FormTurmasRef,
} from "@/components/turmas/FormTurmas";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import {
  useDeleteTurmaMutation,
  useInsertTurmaMutation,
  useUpdateTurmaMutation,
} from "@/mutations/turmas";
import { useGetTurmaById, useTurmas } from "@/queries/turmas";
import { Turma } from "@/types/Turma";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { columns } from "./TableColumns";

export default function TurmasContainer() {
  // ref
  const formRef = useRef<FormTurmasRef>(null);
  const user = useSession();
  const idCurso = user.data?.user.curso;
  const deleteMutation = useDeleteTurmaMutation();
  const { data: turmas, isLoading } = useTurmas(Number(idCurso));
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>();

  const turma = useGetTurmaById(editingId ? String(editingId) : "", {
    enabled: openDialog, // 👈 Só busca quando o dialog está aberto
  });
  const createTurma = useInsertTurmaMutation();
  const updateTurma = useUpdateTurmaMutation();

  const filteredData = turmas
    ? turmas.filter((turma: { codigoTurma: string }) =>
        turma.codigoTurma.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : [];

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Turma removida com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao remover turma!");
      },
    });
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setEditingId(null);
    setOpenDialog(false);
  };

  const handleNew = () => {
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleCreateTurma = (data: Omit<Turma, "idTurma">) => {
    createTurma.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateTurma = (data: Turma) => {
    updateTurma.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit = (data: FormTurmasFields) => {
    if (idCurso) {
      const turma = {
        codigoTurma: data.codigo.trim(),
        idCurso: +idCurso,
        turnoTurma: data.turno.trim(),
        status: data.status,
      };

      editingId
        ? handleUpdateTurma({ idTurma: editingId, ...turma })
        : handleCreateTurma(turma);
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Buscar Turma"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="h-9 max-w-[200px] bg-card"
        />
        <Button
          onClick={handleNew}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4 md:size-8" />
          Nova Turma
        </Button>
      </div>

      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={isLoading}
      />

      {openDialog && (
        <MyDialog
          size="lg"
          open={openDialog}
          setIsOpen={setOpenDialog}
          title={
            turma.data ? `Editando: ${turma.data.codigoTurma}` : "Cadastro"
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
                type="submit"
                loading={createTurma.isPending || updateTurma.isPending}
                className="min-w-[120px] bg-primary hover:bg-primary/90"
                onClick={() => {
                  const values = formRef.current?.getValues();
                  if (
                    values &&
                    values.codigo &&
                    values.turno &&
                    typeof values.status !== "undefined"
                  ) {
                    handleSubmit(values);
                  } else {
                    toast.error("Preencha todos os campos obrigatórios.");
                  }
                }}
              >
                {createTurma.isPending || updateTurma.isPending
                  ? "Salvando..."
                  : "Salvar"}
              </Button>
            </div>
          }
        >
          <FormTurmas
            ref={formRef}
            initialValues={turma.data}
            isLoading={createTurma.isPending || updateTurma.isPending}
          />
        </MyDialog>
      )}
    </>
  );
}
