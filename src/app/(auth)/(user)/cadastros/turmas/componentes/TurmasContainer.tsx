"use client";

import { PlusCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import { SearchInput } from "@/components/SearchInput";
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

interface TurmasContainerProps {
  initialData: Turma[];
}

export default function TurmasContainer({ initialData }: TurmasContainerProps) {
  // ref
  const formRef = useRef<FormTurmasRef>(null);
  const user = useSession();
  const idCurso = user.data?.user.curso;
  const deleteMutation = useDeleteTurmaMutation();
  const { data: turmas, isLoading } = useTurmas(Number(idCurso), initialData);
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>();

  const turma = useGetTurmaById(editingId ? String(editingId) : "", {
    enabled: openDialog,
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
        setOpenDialog(false);
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
        setOpenDialog(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit: SubmitHandler<FormTurmasFields> = (data) => {
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
        <SearchInput
          placeholder="Buscar Turma"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
        <Button
          onClick={handleNew}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4" />
          Nova Turma
        </Button>
      </div>

      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={isLoading}
      />

      <MyDialog
        size="lg"
        open={openDialog}
        setIsOpen={setOpenDialog}
        title={
          turma.data ? `Turma: ${turma.data.codigoTurma}` : "Cadastro de Turmas"
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
              onClick={() => formRef.current?.submitForm()}
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
          // initialValues={
          //   turma.data
          //     ? {
          //         ...turma.data,
          //         uuid: turma.data.uuid === undefined ? null : turma.data.uuid,
          //       }
          //     : undefined
          // }
          initialValues={turma.data}
          isLoading={createTurma.isPending || updateTurma.isPending}
          onSubmit={handleSubmit}
        />
      </MyDialog>
    </>
  );
}
