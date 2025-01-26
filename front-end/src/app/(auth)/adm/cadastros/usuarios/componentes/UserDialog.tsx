"use client";

import * as yup from "yup";
import { ReactNode, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MySelect } from "@/components/MySelect";
import { Switch } from "@/components/ui/switch";
import { useCursos, useGetCurso } from "@/queries/cursos";
import { useGetUser } from "@/queries/user";
import {
  useInsertUserMutation,
  useUpdateUserMutation,
} from "@/mutations/users";
import { Curso } from "@/types/Curso";
import { AxiosError } from "axios";

interface UserDialogProps {
  editingId: number | null;
  isOpen?: boolean;
  setIsOpen: (state: boolean) => void;
}

export function UserDialog({ editingId, isOpen, setIsOpen }: UserDialogProps) {
  const validationSchema = yup.object({
    nome: yup.string().required("Campo obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    role: yup.string().required("Campo obrigatório"),
    idCurso: yup.string().nullable(),
    status: yup.boolean().required("Campo obrigatório"),
    senha: yup
      .string()
      .test("senha-required", "Campo obrigatório", function (value) {
        // Para edição, a senha não é obrigatória
        if (!editingId && (!value || value.trim() === "")) {
          return false;
        }
        return true;
      })
      .test(
        "min-length",
        "A senha deve ter no mínimo 6 caracteres",
        (value) => !value || value.length >= 6,
      ),
    confirmaSenha: yup
      .string()
      .test("confirmaSenha", "As senhas não coincidem", function (value) {
        const { senha } = this.parent;
        return !senha || senha === value;
      }),
  });

  type FormData = yup.InferType<typeof validationSchema>;

  const idUser = Number(editingId);
  const { data: usersData, isLoading } = useGetUser(idUser);
  const { data: cursosData, isLoading: cursosLoading } = useCursos();
  const [userRole, setUserRole] = useState("");

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      status: true,
    },
  });

  useEffect(() => {
    if (isOpen && usersData) {
      reset({
        nome: usersData.nome,
        email: usersData.email,
        role: usersData.role,
        idCurso: String(usersData.idCurso) || "",
        status: usersData.status,
      });
    }
  }, [isOpen, reset, usersData]);

  const user = useInsertUserMutation();
  const updateUser = useUpdateUserMutation();

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleForm: SubmitHandler<FormData> = (data) => {
    const payload = {
      nome: data.nome,
      email: data.email,
      // senha: data.senha,
      idCurso: Number(data.idCurso),
      role: "user",
      status: data.status,
      ...(data.senha && { senha: data.senha }),
    };
    if (editingId) {
      const userData = { ...payload, idUser: idUser };
      updateUser.mutate(userData, {
        onSuccess: (response) => {
          //console.log(response);
          if (response.status === 200) {
            toast.success(response.data.message);
            reset();
          } else {
            toast.error(response.data.message);
          }
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
    } else {
      // Chamando a mutação com os dados da turma
      user.mutate(payload, {
        onSuccess: (response) => {
          // console.log("RESPONSE", response);
          if (response.status === 201) {
            toast.success(response.data.message);
            reset();
          } else {
            toast.error(response.data.message);
          }
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby="#dialog-description"
        className="m-2 w-[300px] max-w-lg bg-card sm:m-0 sm:w-full md:max-w-2xl lg:max-w-3xl"
      >
        <DialogHeader>
          <DialogTitle className="text-zinc-700">
            {editingId
              ? `Editando Usuário ${usersData?.nome.split(" ")[0] || ""}`
              : "Cadastro de Usuário"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <hr />

        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-1">
                <Input
                  autoFocus
                  id="input-usuario"
                  label="Usuário"
                  placeholder="Informe o nome do usuário"
                  required={true}
                  error={!!errors.nome}
                  {...register("nome")}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.nome?.message || ""}
                </span>
              </div>
              <div className="p-1">
                <Input
                  id="input-email"
                  type="email"
                  label="E-mail"
                  placeholder="Informe o e-mail do usuário"
                  required={true}
                  error={!!errors.email}
                  {...register("email")}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.email?.message || ""}
                </span>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-1">
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <MySelect
                      {...field}
                      label="Tipo:"
                      id="select-option"
                      placeholder="Selecione uma opção"
                      options={[
                        {
                          value: "admin",
                          label: "Administrador",
                        },
                        {
                          value: "user",
                          label: "Usuário",
                        },
                      ]}
                      required={true}
                      error={!!errors.idCurso}
                      // value={field.value}
                      // onValueChange={(value) => field.onChange(value)}
                      value={userRole}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setUserRole(value);
                      }}
                    />
                  )}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.idCurso?.message || ""}
                </span>
              </div>
              <div className="p-1">
                {userRole === "user" && (
                  <Controller
                    control={control}
                    name="idCurso"
                    render={({ field }) => (
                      <MySelect
                        {...field}
                        label="Curso:"
                        id="select-option"
                        options={
                          cursosData?.map((curso: Curso) => ({
                            value: curso.idCurso.toString(),
                            label: curso.nomeCurso,
                          })) || []
                        }
                        placeholder="Selecione uma opção"
                        error={!!errors.idCurso}
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                )}
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.idCurso?.message || ""}
                </span>
              </div>
              <div className="flex items-center gap-2 p-1">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label>Usuário Ativo</Label>
              </div>
            </div>
            <fieldset className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <legend className="mb-4 font-bold">Dados de Acesso</legend>
              <div className="p-1">
                <Input
                  required
                  id="input-senha"
                  type="password"
                  label="Senha"
                  placeholder="Informe uma senha"
                  {...register("senha")}
                  error={!!errors.senha}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.senha?.message || ""}
                </span>
              </div>
              <div className="p-1">
                <Input
                  required
                  type="password"
                  id="input-confirma-senha"
                  label="Confirmar Senha"
                  placeholder="Confirme a senha informada"
                  error={!!errors.confirmaSenha}
                  {...register("confirmaSenha")}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.confirmaSenha?.message || ""}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                - A senha deve conter no mínimo 6 caracteres
              </span>
            </fieldset>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant={"outline"} onClick={handleClose}>
              Fechar
            </Button>
            <Button type="submit" className="hover:bg-orange-500/90">
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
