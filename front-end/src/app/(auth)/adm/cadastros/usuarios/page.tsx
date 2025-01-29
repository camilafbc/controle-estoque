"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { columns } from "./componentes/TableColumns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Separator } from "@/components/ui/separator";
import LoaderComponent from "@/components/LoaderComponent";
import { useUsers } from "@/queries/user";
import { useDeleteUserMutation } from "@/mutations/users";
import { UserDialog } from "./componentes/UserDialog";
import BadgePageTitle from "@/components/BadgePageTitle";

export default function Page() {
  const deleteMutation = useDeleteUserMutation();
  const { data: usuarios, isLoading, isError } = useUsers();
  const [filterValue, setFilterValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const filteredData =
    !isLoading && usuarios
      ? usuarios?.filter((user: { nome: string }) =>
          user.nome.toLowerCase().includes(filterValue.toLowerCase()),
        )
      : [];

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
      <MyBreadcrumb
        listItems={[
          { label: "Cadastros" },
          { label: "Usuários", href: "/adm/cadastros/usuarios" },
        ]}
        homeHref="/adm/home"
      />
      <BadgePageTitle title="Usuários" />
      <Separator orientation="horizontal" className="mb-4" />
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
          <PlusCircle className="size-8" />
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
