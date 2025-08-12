"use client";

import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import FormCurso, { FormCursoRef } from "@/components/cursos/FormCurso";
import MyDialog from "@/components/MyDialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import {
  useCreateCursoMutation,
  useDeleteCursoMutation,
  useUpdateCursoMutation,
} from "@/mutations/cursos";
import { useCursos, useGetCurso } from "@/queries/cursos";
import { Curso } from "@/types/Curso";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { columns } from "./TableColumns";

interface CursosContainerProps {
  cursos: Curso[];
}

export default function CursosContainer({ cursos }: CursosContainerProps) {
  // ref
  const formRef = useRef<FormCursoRef>(null);
  // states
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // data
  const { data: cursosData, isLoading: cursosLoading } = useCursos(cursos);
  const { data: cursoData, isLoading: isLoadingCurso } = useGetCurso(
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
      onSuccess(data, variables, context) {
        toast.success(data.message);
      },
      onError(error, variables, context) {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCreateCurso = (curso: Omit<Curso, "idCurso">) => {
    createCurso.mutate(curso, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateCurso = (curso: Curso) => {
    updateCurso.mutate(curso, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit = (data: Partial<Curso>) => {
    const curso = {
      nomeCurso: data.nomeCurso?.trim() || "",
      status: data.status || true,
    };

    editingId
      ? handleUpdateCurso({ idCurso: editingId, ...curso })
      : handleCreateCurso(curso);
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Buscar curso"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="h-9 max-w-sm bg-card"
          size={"lg"}
        />
        <Button
          onClick={handleAddButton}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4 md:size-8" />
          Novo Curso
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={cursosData || []}
        isLoading={cursosLoading}
      />
      {openDialog && (
        <MyDialog
          size="lg"
          open={openDialog}
          setIsOpen={setOpenDialog}
          title={cursoData?.nomeCurso ? cursoData.nomeCurso : "Cadastro"}
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
                onClick={() => handleSubmit(formRef.current?.getValues() || {})}
              >
                {createCurso.isPending || updateCurso.isPending
                  ? "Salvando..."
                  : "Salvar"}
              </Button>
            </div>
          }
        >
          <FormCurso
            ref={formRef}
            initialValues={cursoData}
            isLoading={createCurso.isPending || updateCurso.isPending}
          />
        </MyDialog>
      )}
    </>
  );
}
