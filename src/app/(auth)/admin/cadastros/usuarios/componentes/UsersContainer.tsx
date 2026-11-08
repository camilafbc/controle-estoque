"use client";

import { PlusCircle } from "lucide-react";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import FormUser, { FormUserRef } from "@/components/users/FormUser";
import { useCrudDialog } from "@/hooks/useCrudDialog";
import { useListFilter } from "@/hooks/useListFilter";
import {
  useDeleteUserMutation,
  useCreatetUserMutation,
  useUpdateUserMutation,
} from "@/mutations/users";
import { useCursos } from "@/queries/cursos";
import { useGetUser, useUsers } from "@/queries/user";
import { FormUserFields } from "@/schemas/user-schema";
import { User } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getErrorMessageFromAction } from "@/utils/getErrorMessageFromAction";

import { columns } from "./TableColumns";

export default function UsersContainer() {
  // ref
  const formRef = useRef<FormUserRef>(null);
  // states
  const {
    isOpen: openDialog,
    editingId,
    openForCreate,
    openForEdit,
    close: closeDialog,
  } = useCrudDialog<number>();
  // data
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const { data: usuario } = useGetUser(Number(editingId));
  const { data: cursos, isLoading: cursosLoading } = useCursos();
  // mutations
  const deleteMutation = useDeleteUserMutation();
  const createUser = useCreatetUserMutation();
  const updateUser = useUpdateUserMutation();

  const { search: filterValue, setSearch: setFilterValue, filteredItems } =
    useListFilter({
      items: usersData,
      getSearchText: (user) =>
        [user.nome, user.email, user.role, user.curso?.nomeCurso]
          .filter(Boolean)
          .join(" "),
    });

  const handleClose = () => {
    closeDialog();
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Dados excluídos com sucesso!");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleCreateUser = (user: Omit<User, "idUser">) => {
    createUser.mutate(user, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Usuário criado com sucesso!");
        formRef.current?.resetForm();
        closeDialog();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateUser = (user: Partial<User>) => {
    updateUser.mutate(user, {
      onSuccess: (data) => {
        if ("error" in data && data.error) {
          const msg = getErrorMessageFromAction(data);
          toast.error(`Erro: ${msg}`);
          return;
        }
        toast.success("Dados atualizados com sucesso!");
        closeDialog();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit: SubmitHandler<FormUserFields> = (data) => {
    const userPayload = {
      nome: data.nome.trim(),
      email: data.email.trim(),
      role: data.role.trim() as "admin" | "user",
      status: data.status,
      idCurso: data.role === "user" ? Number(data.idCurso) : undefined,
      ...(data.password && { password: data.password.trim() }),
    };

    if (editingId) {
      handleUpdateUser({ ...userPayload, idUser: usuario?.idUser });
    } else {
      handleCreateUser(userPayload);
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <SearchInput
          placeholder="Buscar por nome, e-mail ou curso"
          aria-label="Buscar usuários por nome, e-mail, tipo ou curso"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          onClear={() => setFilterValue("")}
        />
        <Button
          onClick={openForCreate}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4" />
          Novo Usuário
        </Button>
      </div>
      <DataTable
        columns={columns(
          openForEdit,
          handleDelete,
          deleteMutation.isPending ? deleteMutation.variables : undefined,
        )}
        data={filteredItems}
        isLoading={usersLoading}
        filterValue={filterValue}
        onClearFilter={() => setFilterValue("")}
        totalRawCount={usersData?.length}
        emptyTitle={filterValue ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
        emptyDescription={
          filterValue
            ? "Tente buscar por outro nome, e-mail ou curso."
            : "Cadastre um usuário para liberar o acesso ao sistema."
        }
      />
      {!usersLoading && usersData?.length ? (
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "usuário encontrado" : "usuários encontrados"}
        </p>
      ) : null}

      <MyDialog
        size="xl"
        open={openDialog}
        setIsOpen={(state) => {
          if (!state) closeDialog();
        }}
        title={
          usuario?.idUser ? `Usuário: ${usuario.nome}` : "Cadastro de Usuários"
        }
        description={
          usuario?.idUser
            ? "Atualize os dados de acesso e o vínculo deste usuário."
            : "Preencha os dados abaixo para criar um novo acesso."
        }
        footerChildren={
          <div className="grid grid-cols-1 justify-end gap-2 sm:grid-cols-2">
            <Button variant={"outline"} onClick={handleClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={createUser.isPending || updateUser.isPending}
              className="hover:bg-orange-500/90"
              onClick={() => formRef.current?.submitForm()}
            >
              Salvar
            </Button>
          </div>
        }
      >
        <div className="h-full overflow-hidden">
          <FormUser
            ref={formRef}
            initialValues={usuario}
            cursos={cursos || []}
            cursosLoading={cursosLoading}
            onSubmit={handleSubmit}
            isLoading={createUser.isPending || updateUser.isPending}
          />
        </div>
      </MyDialog>
    </>
  );
}
