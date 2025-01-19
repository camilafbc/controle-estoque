"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./componentes/TableColumns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { TurmaDialog } from "./componentes/TurmaDialog";
import { useState } from "react";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import { useDeleteTurmaMutation } from "@/mutations/turmas";
import { useTurmas } from "@/queries/turmas";
import BadgePageTitle from "@/components/BadgePageTitle";

export default function Page() {
  const deleteMutation = useDeleteTurmaMutation();
  const { data: turmas, isLoading } = useTurmas();
  const [filterValue, setFilterValue] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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
    setIsOpenModal(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setIsOpenModal(true);
  };

  return (
    <div>
      <MyBreadcrumb listItems={[{ label: "Cadastros" }, { label: "Turmas" }]} />
      <BadgePageTitle title="Turmas" />
      <Separator orientation="horizontal" className="mb-4" />
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
          <PlusCircle className="size-8" />
          Nova Turma
        </Button>
      </div>

      {isOpenModal && (
        <TurmaDialog
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
          editingId={editingId}
        />
      )}

      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={isLoading}
      />
    </div>
  );
}
