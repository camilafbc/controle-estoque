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

interface UserDialogProps {
  editingId: number | null;
  isOpen?: boolean;
  setIsOpen: (state: boolean) => void;
}

const validationSchema = yup.object({
  // codigo: yup.string().required("Campo obrigatório"),
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  idCurso: yup.string().required("Campo obrigatório"),
  status: yup.boolean().required("Campo obrigatório"),
  senha: yup.string().required("Campo obrigatório"),
  confirmaSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Campo obrigatório"),
});

type FormData = yup.InferType<typeof validationSchema>;

export function UserDialog({ editingId, isOpen, setIsOpen }: UserDialogProps) {
  const idUser = Number(editingId);
  // const [isOpen, setIsOpen] = useState(false);
  const { data: usersData, isLoading } = useGetUser(idUser);
  const { data: cursosData, isLoading: cursosLoading } = useCursos();
  // console.log("Turma data: " + turmaData);

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
      senha: data.senha,
      idCurso: Number(data.idCurso),
      role: "user",
      status: data.status,
    };
    if (editingId) {
      const userData = { ...payload, idUser: idUser };
      updateUser.mutate(userData, {
        onSuccess: (response) => {
          console.log(response);
          if (response === 200) {
            toast.success("Usuário editado com sucesso!", {
              position: "bottom-right",
              theme: "colored",
            });
            reset();
          } else {
            console.log(response);
            toast.error("Erro ao editar turma!", {
              position: "top-right",
              theme: "colored",
            });
          }
        },
        onError: () => {
          toast.error("Erro ao editar turma!", {
            position: "top-right",
            theme: "colored",
          });
        },
      });
    } else {
      // Chamando a mutação com os dados da turma
      user.mutate(payload, {
        onSuccess: (response) => {
          console.log(response);
          if (response === 201) {
            toast.success("Curso cadastrado com sucesso!", {
              position: "bottom-right",
              theme: "colored",
            });
            reset();
          } else {
            console.log(response);
            toast.error("Erro ao cadastrar curso!", {
              position: "top-right",
              theme: "colored",
            });
          }
        },
        onError: () => {
          toast.error("Erro ao cadastrar curso!", {
            position: "top-right",
            theme: "colored",
          });
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
            {/* Linha 1: Usuário e E-mail */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-1">
                <Input
                  id="input-usuario"
                  label="Usuário"
                  placeholder="Informe o nome do usuário"
                  error={!!errors.nome}
                  autoFocus
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
                  error={!!errors.email}
                  {...register("email")}
                />
                <span className="min-h-[16px] text-xs font-semibold text-destructive">
                  {errors.email?.message || ""}
                </span>
              </div>
            </div>

            {/* Linha 2: Curso e Ativo */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
              <div className="p-1">
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
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    />
                  )}
                />
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
                <Label>Ativo</Label>
              </div>
            </div>

            {/* Linha 3: Senha e Confirmar Senha */}
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
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
            </div>
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
