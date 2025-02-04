"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { TurmaDialog } from "./CursoDialog";
import { useDeleteCursoMutation } from "@/mutations/cursos";
import { useCursos } from "@/queries/cursos";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./TableColumns";
import { Curso } from "@/types/Curso";
import { AxiosError } from "axios";

export default function CursosContainer() {
  const deleteMutation = useDeleteCursoMutation();
  const { data: cursos, isLoading, isError } = useCursos();
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<Curso[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // const filteredData =
  //   cursos && cursos.length > 0
  //     ? cursos?.filter((curso: { nomeCurso: string }) =>
  //         curso.nomeCurso.toLowerCase().includes(filterValue.toLowerCase()),
  //       )
  //     : [];
  useEffect(() => {
    if (!isLoading && cursos && cursos.length > 0) {
      setFilteredData(
        cursos?.filter((curso: { nomeCurso: string }) =>
          curso.nomeCurso.toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }
  }, [cursos, filterValue, isLoading]);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: (response) => {
        toast.success(response.data.message);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<Error>;
        const errorMessage =
          axiosError?.response?.data?.message ||
          error.message ||
          "Ocorreu um erro desconhecido";
        toast.error(errorMessage);
      },
    });
  };

  const handleNew = () => {
    setEditingId(null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="my-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Buscar Curso"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="h-9 max-w-sm bg-card"
        />
        <Button
          onClick={handleNew}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4 md:size-8" />
          Novo Curso
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={isLoading}
      />
      {isOpen && (
        <TurmaDialog
          editingId={editingId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
