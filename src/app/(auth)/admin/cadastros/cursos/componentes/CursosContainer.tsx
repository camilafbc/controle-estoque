"use client";

import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import FormCurso, { FormCursoRef } from "@/components/cursos/FormCurso";
import { FormCursoSkeleton } from "@/components/cursos/FormCursoSkeleton";
import MyDialog from "@/components/MyDialog";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useListFilter } from "@/hooks/useListFilter";
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
  const {
    isOpen: openDialog,
    editingId,
    openForCreate,
    openForEdit,
    close: closeDialog,
  } = useCrudDialog<number>();
  // data
  const { data: cursosData, isLoading: cursosLoading } = useCursos();
  const { data: cursoData, isLoading: cursoLoading } = useGetCurso(
    editingId || 0,
  );
  // mutations
  const createCurso = useCreateCursoMutation();
  const updateCurso = useUpdateCursoMutation();
  const deleteCurso = useDeleteCursoMutation();

  const { search: filterValue, setSearch: setFilterValue, filteredItems } =
    useListFilter({
      items: cursosData,
      getSearchText: (curso) => curso.nomeCurso,
    });

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
    closeDialog();
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
        closeDialog();
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
        closeDialog();
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

  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <SearchInput
          placeholder="Buscar por nome do curso"
          aria-label="Buscar cursos por nome"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          onClear={() => setFilterValue("")}
        />
        <Button
          onClick={openForCreate}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4" />
          Novo Curso
        </Button>
      </div>
      <DataTable
        columns={columns(
          openForEdit,
          handleDelete,
          deleteCurso.isPending ? deleteCurso.variables : undefined,
        )}
        data={filteredItems}
        isLoading={cursosLoading}
        filterValue={filterValue}
        onClearFilter={() => setFilterValue("")}
        totalRawCount={cursosData?.length}
        emptyTitle={filterValue ? "Nenhum curso encontrado" : "Nenhum curso cadastrado"}
        emptyDescription={
          filterValue
            ? "Tente buscar por outro nome."
            : "Cadastre o primeiro curso para começar a organizar as turmas."
        }
      />
      {!cursosLoading && cursosData?.length ? (
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          {filteredItems.length} {filteredItems.length === 1 ? "curso encontrado" : "cursos encontrados"}
        </p>
      ) : null}

      <MyDialog
        size="lg"
        open={openDialog}
        setIsOpen={(state) => {
          if (!state) closeDialog();
        }}
        title={
          cursoData?.nomeCurso
            ? `Curso: ${cursoData.nomeCurso}`
            : "Cadastro de Cursos"
        }
        description={
          cursoData?.nomeCurso
            ? "Atualize os dados do curso e seu status de disponibilidade."
            : "Preencha os dados abaixo para adicionar um novo curso."
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
