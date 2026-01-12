"use client";

import { PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import { SearchInput } from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import FormUser, {
  FormUserFields,
  FormUserRef,
} from "@/components/users/FormUser";
import {
  useDeleteUserMutation,
  useInsertUserMutation,
  useUpdateUserMutation,
} from "@/mutations/users";
import { useCursos } from "@/queries/cursos";
import { useGetUser, useUsers } from "@/queries/user";
import { User } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { columns } from "./TableColumns";

export default function UsersContainer() {
  // ref
  const formRef = useRef<FormUserRef>(null);
  // states
  const [filterValue, setFilterValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  // data
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const { data: usuario } = useGetUser(Number(editingId));
  const { data: cursos, isLoading: cursosLoading } = useCursos();
  // mutations
  const deleteMutation = useDeleteUserMutation();
  const createUser = useInsertUserMutation();
  const updateUser = useUpdateUserMutation();

  const filteredData = usersData
    ? usersData?.filter((user: { nome: string }) =>
        user.nome.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : [];

  const handleAddButton = () => {
    setEditingId(null);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("Dados excluídos com sucesso!");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleCreateUser = (user: Omit<User, "idUser">) => {
    createUser.mutate(user, {
      onSuccess: () => {
        toast.success("Usuário criado com sucesso!");
        setOpenDialog(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateUser = (user: Partial<User>) => {
    updateUser.mutate(
      { user, idUser: user.idUser as number },
      {
        onSuccess: (response) => {
          toast.success("Dados atualizados com sucesso!");
          setOpenDialog(false);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  const handleSubmit: SubmitHandler<FormUserFields> = (data) => {
    const userPayload = {
      nome: data.nome.trim(),
      email: data.email.trim(),
      role: data.role.trim() as "admin" | "user",
      status: data.status,
      idCurso: Number(data.idCurso),
      ...(data.password && { password: data.password.trim() }),
    };

    if (editingId) {
      handleUpdateUser({ ...userPayload, idUser: usuario?.idUser });
    } else {
      handleCreateUser(userPayload);
      formRef.current?.resetForm();
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <SearchInput
          placeholder="Buscar Usuário"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
        />
        <Button
          onClick={handleAddButton}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4" />
          Novo Usuário
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={usersLoading}
      />

      <MyDialog
        size="xl"
        open={openDialog}
        setIsOpen={setOpenDialog}
        title={
          usuario?.idUser ? `Usuário: ${usuario.nome}` : "Cadastro de Usuários"
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
