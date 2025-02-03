"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { UserDialog } from "./UserDialog";
import { useDeleteUserMutation } from "@/mutations/users";
import { useUsers } from "@/queries/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./TableColumns";

export default function UsersContainer() {
  const deleteMutation = useDeleteUserMutation();
  const { data: usuarios, isLoading, isError } = useUsers();
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // const filteredData =
  //   usuarios && usuarios.length > 0
  //     ? usuarios?.filter((user: { nome: string }) =>
  //         user.nome.toLowerCase().includes(filterValue.toLowerCase()),
  //       )
  //     : [];
  useEffect(() => {
    if (usuarios) {
      setFilteredData(
        usuarios?.filter((user: { nome: string }) =>
          user.nome.toLowerCase().includes(filterValue.toLowerCase()),
        ),
      );
    }
  }, [filterValue, usuarios]);

  const handleEdit = (id: number) => {
    setEditingId(id);
    setIsOpen(true);
  };

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

  const handleNew = () => {
    setEditingId(null);
    setIsOpen(true);
  };

  return (
    <>
      <div className="my-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <Input
          placeholder="Buscar Usuário"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="h-9 max-w-sm bg-card"
        />
        <Button
          onClick={handleNew}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4 md:size-8" />
          Novo Usuário
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={isLoading}
      />
      {isOpen && (
        <UserDialog
          editingId={editingId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
