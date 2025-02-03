"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { columns } from "./TableColumns";
import { TurmaDialog } from "./TurmaDialog";
import { useDeleteTurmaMutation } from "@/mutations/turmas";
import { useTurmas } from "@/queries/turmas";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TurmasContainer() {
  const deleteMutation = useDeleteTurmaMutation();
  const { data: turmas, isLoading } = useTurmas();
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // const filteredData = turmas
  //   ? turmas.filter((turma: { codigoTurma: string }) =>
  //       turma.codigoTurma.toLowerCase().includes(filterValue.toLowerCase()),
  //     )
  //   : [];
  useEffect(() => {
    setFilteredData(
      turmas?.filter((turma: { codigoTurma: string }) =>
        turma.codigoTurma.toLowerCase().includes(filterValue.toLowerCase()),
      ),
    );
  }, [filterValue, turmas]);

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
    setIsOpenModal(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setIsOpenModal(true);
  };

  return (
    <>
      <div className="my-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
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

      {isOpenModal && (
        <TurmaDialog
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          editingId={editingId}
        />
      )}
    </>
  );
}
