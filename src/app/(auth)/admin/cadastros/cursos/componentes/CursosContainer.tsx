"use client";

import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import FormCurso, { FormCursoRef } from "@/components/cursos/FormCurso";
import { FormCursoSkeleton } from "@/components/cursos/FormCursoSkeleton";
import MyDialog from "@/components/MyDialog";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import {
  useCreateCursoMutation,
  useDeleteCursoMutation,
  useUpdateCursoMutation,
} from "@/mutations/cursos";
import { useCursos, useGetCurso } from "@/queries/cursos";
import { FormCursoFields } from "@/schemas/curso-schema";
import { Curso } from "@/types/Curso";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getErrorMessageFromAction } from "@/utils/getErrorMessageFromAction";

import { columns } from "./TableColumns";

// interface CursosContainerProps {
//   cursos: Curso[];
// }

export default function CursosContainer() {
  // ref
  const formRef = useRef<FormCursoRef>(null);
  // states
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // data
  const { data: cursosData, isLoading: cursosLoading } = useCursos();
  const { data: cursoData, isLoading: cursoLoading } = useGetCurso(
    editingId || 0,
  );
  // mutations
  const createCurso = useCreateCursoMutation();
  const updateCurso = useUpdateCursoMutation();
  const deleteCurso = useDeleteCursoMutation();

  const handleAddButton = () => {
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    deleteCurso.mutate(id, {
      onSuccess(data) {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Dados excluídos com sucesso!");
      },
      onError(error) {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCreateCurso = (curso: Omit<Curso, "idCurso">) => {
    createCurso.mutate(curso, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Curso cadastrado com sucesso!");
        setOpenDialog(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateCurso = (curso: Curso) => {
    updateCurso.mutate(curso, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }

        toast.success("Dados atualizados com sucesso!");
        setOpenDialog(false);
      },
      onError: (result) => {
        toast.error(getErrorMessage(result.message));
      },
    });
  };

  const handleSubmit: SubmitHandler<FormCursoFields> = (data) => {
    const curso = {
      nomeCurso: data.nomeCurso?.trim(),
      status: data.status,
    };

    editingId
      ? handleUpdateCurso({ idCurso: editingId, ...curso })
      : handleCreateCurso(curso);
  };

  const filteredData = cursosData
    ? cursosData.filter((curso: Curso) =>
        curso.nomeCurso.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : [];

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <SearchInput
          placeholder="Buscar curso"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
        <Button
          onClick={handleAddButton}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4" />
          Novo Curso
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={cursosLoading}
      />

      <MyDialog
        size="lg"
        open={openDialog}
        setIsOpen={setOpenDialog}
        title={
          cursoData?.nomeCurso
            ? `Curso: ${cursoData.nomeCurso}`
            : "Cadastro de Cursos"
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
              loading={createCurso.isPending || updateCurso.isPending}
              className="min-w-[120px] bg-primary hover:bg-primary/90"
              onClick={() => formRef.current?.submitForm()}
            >
              {createCurso.isPending || updateCurso.isPending
                ? "Salvando..."
                : "Salvar"}
            </Button>
          </div>
        }
      >
        {cursoLoading && <FormCursoSkeleton />}
        <FormCurso
          ref={formRef}
          initialValues={cursoData}
          onSubmit={handleSubmit}
          isLoading={createCurso.isPending || updateCurso.isPending}
        />
      </MyDialog>
    </>
  );
}
