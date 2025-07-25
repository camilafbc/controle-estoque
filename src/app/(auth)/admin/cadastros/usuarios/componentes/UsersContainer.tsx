"use client";

import { AxiosError } from "axios";
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import MyDialog from "@/components/MyDialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { Input } from "@/components/ui/input";
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
  const { data: users, isLoading: usersLoading, isError } = useUsers();
  const { data: usuario, isLoading: userLoading } = useGetUser(
    Number(editingId),
  );
  const { data: cursos, isLoading: cursosLoading } = useCursos();
  // mutations
  const deleteMutation = useDeleteUserMutation();
  const createUser = useInsertUserMutation();
  const updateUser = useUpdateUserMutation();

  const filteredData = users
    ? users?.filter((user: { nome: string }) =>
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

  const handleCreateUser = (user: Omit<User, "idUser">) => {
    createUser.mutate(user, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleUpdateUser = (user: Partial<User>) => {
    updateUser.mutate(user, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit = (data: FormUserFields) => {
    const userPayload = {
      nome: data.nome.trim(),
      email: data.email.trim(),
      role: data.role.trim(),
      status: data.status,
      idCurso: Number(data.idCurso),
      ...(data.senha && { senha: data.senha.trim() }),
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
        <Input
          placeholder="Buscar Usuário"
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="h-9 max-w-sm bg-card"
        />
        <Button
          onClick={handleAddButton}
          className="flex items-center gap-2 hover:bg-orange-500/90"
        >
          <PlusCircle className="size-4 md:size-8" />
          Novo Usuário
        </Button>
      </div>
      <DataTable
        columns={columns(handleEdit, handleDelete)}
        data={filteredData || []}
        isLoading={usersLoading}
      />
      {openDialog && (
        <MyDialog
          size="xl"
          open={openDialog}
          setIsOpen={setOpenDialog}
          title={usuario?.idUser ? `Editando: ${usuario.nome}` : "Cadastro"}
          footerChildren={
            <div className="grid grid-cols-1 justify-end gap-2 sm:grid-cols-2">
              <Button variant={"outline"} onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                loading={createUser.isPending || updateUser.isPending}
                className="hover:bg-orange-500/90"
                onClick={() => {
                  const values = formRef.current?.getValues();
                  if (values) {
                    handleSubmit(values);
                  }
                }}
              >
                Salvar
              </Button>
            </div>
          }
        >
          <FormUser
            ref={formRef}
            initialValues={usuario}
            cursos={cursos || []}
            cursosLoading={cursosLoading}
            isLoading={createUser.isPending || updateUser.isPending}
          />
        </MyDialog>
      )}
    </>
  );
}
