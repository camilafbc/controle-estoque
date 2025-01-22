"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Save, SquareCheckBig } from "lucide-react";
import { useSessionContext } from "@/context/SessionContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useGetUser } from "@/queries/user";
import { useUpdateUserMutation } from "@/mutations/users";
import { toast } from "react-toastify";

// Validação do formulário com Yup
const validationSchema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório"),
  senha: yup
    .string()
    .test(
      "min-length",
      "A senha deve ter no mínimo 6 caracteres",
      function (value) {
        // Se a senha for fornecida e não for vazia, valida o tamanho
        if (value && value.length > 0) {
          return value.length >= 6;
        }
        return true; // Caso a senha não seja fornecida, não aplica a validação
      },
    ),
  confirmaSenha: yup
    .string()
    .test("confirmaSenha", "As senhas não coincidem", function (value) {
      const { senha } = this.parent;
      if (senha && value) {
        return senha === value; // Se as senhas são fornecidas, verifica se são iguais
      }
      return true; // Se a senha não for fornecida, a validação não falha
    })
    .notRequired(),
});

type FormData = yup.InferType<typeof validationSchema>;

export default function FormUsuario() {
  const router = useRouter();
  const { user } = useSessionContext();
  const { data: userData } = useGetUser(Number(user?.id));
  const updateUser = useUpdateUserMutation();

  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmaSenha: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  // Preenche o formulário ao editar um usuário
  useEffect(() => {
    if (userData) {
      form.reset({
        nome: userData.nome,
        email: userData.email,
      });
    }
  }, [form, userData]);

  // Função de submit para inserção/atualização
  const handleForm: SubmitHandler<FormData> = async (data) => {
    try {
      const payload = {
        idUser: Number(user?.id),
        nome: data.nome,
        email: data.email,
        ...(data?.senha && data?.senha.length > 0 && data.senha.length >= 6
          ? { senha: data.senha }
          : {}),
      };
      updateUser.mutate(payload, {
        onSuccess: (response) => {
          if (response.status === 200) {
            toast.success("Dados alterados com sucesso!");
          }

          if (response.status != 200) {
            toast.error("Erro ao editar dados");
          }
        },
        onError: (error: Error) => {
          // Fazer "type assertion" para AxiosError
          const axiosError = error as AxiosError<Error>;
          // const errorMessage =
          //   axiosError.response?.data?.err?.message || "Erro ao salvar dados!";
          // console.log("Erro: " + axiosError.response);
          toast.error(
            "Erro ao editar dados: " + axiosError.response?.data.message,
          );
        },
      });

      // router.push("/usuarios"); // Redirecionar após sucesso
    } catch (error) {
      // toast({
      //   title: "Erro ao salvar usuário.",
      //   description: `${error}`,
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <Avatar className="size-16">
          <AvatarFallback className="bg-navbar text-xl font-bold tracking-wider text-primary-foreground dark:bg-orange-500 dark:text-white">
            {user?.name?.slice(0, 2).toUpperCase() || ""}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start">
          <p className="font-bold capitalize">{user?.name}</p>
          <p className="text-sm font-semibold">{user?.curso}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(handleForm)} className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="flex w-full items-center gap-2 whitespace-nowrap text-lg font-bold">
              Dados do Usuário
              <Separator orientation="horizontal" className="flex-1" />
            </legend>
            <div className="grid w-full grid-cols-1 lg:w-1/2 lg:grid-cols-2">
              <FormField
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="w-full p-1">
                    <Label>Nome</Label>
                    <Input
                      {...field}
                      required
                      // label="Nome"
                      placeholder="Informe o nome do usuário"
                      id="input-nome-usuario"
                      // error={!!errors.nome}
                    />
                    {errors.nome && (
                      <span className="text-xs font-semibold text-destructive">
                        {errors.nome.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full p-1">
                    <Label>E-mail</Label>
                    <Input
                      {...field}
                      required
                      type="email"
                      // label="E-mail"
                      placeholder="Informe o e-mail do usuário"
                      id="input-email-usuario"
                      // size={"lg"}
                      disabled={true}
                      // error={!!errors.nome}
                    />
                    {errors.email && (
                      <span className="text-xs font-semibold text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="space-y-4">
            <legend className="flex w-full items-center gap-2 whitespace-nowrap text-lg font-bold">
              Alterar Senha
              <Separator orientation="horizontal" className="flex-1" />
            </legend>
            <div className="space-y-4">
              <div className="grid w-full grid-cols-1 items-end lg:w-1/2 lg:grid-cols-2">
                <FormField
                  control={control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <Label>Senha:</Label>
                      <Input
                        {...field}
                        type="password"
                        // label="Senha"
                        placeholder="Informe uma senha"
                        id="input-password-usuario"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        // size={"lg"}
                        // error={!!errors.senha}
                      />
                      {errors.senha && (
                        <span className="text-xs font-semibold text-destructive">
                          {errors.senha.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="confirmaSenha"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <Label>Confirmar Senha</Label>
                      <Input
                        {...field}
                        type="password"
                        // label="Confirmar Senha"
                        placeholder="Confirme a senha informada"
                        id="input-confirma-senha-usuario"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        // size={"lg"}
                        // error={!!errors.confirmaSenha}
                      />
                      {errors.confirmaSenha && (
                        <span className="text-xs font-semibold text-destructive">
                          {errors.confirmaSenha.message}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </fieldset>
          <div className="mt-8 flex items-center justify-end gap-4">
            {/* <Button
              type="button"
              variant={"outline"}
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="size-5" />
              Voltar
            </Button> */}
            <Button
              type="submit"
              className="flex items-center gap-2 hover:bg-orange-500/90"
            >
              <SquareCheckBig className="size-5" />
              Salvar Alterações
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
