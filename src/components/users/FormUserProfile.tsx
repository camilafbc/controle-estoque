"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Key } from "lucide-react";
import { Session } from "next-auth";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const validationSchema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup
    .string()
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

export type FormUserProfileFields = yup.InferType<typeof validationSchema>;

export interface FormUserProfileRef {
  resetForm: () => void;
  // getValues: () => FormUserProfileFields;
  submitForm: () => void;
}
interface FormUserProfileProps {
  initialValues?: Session | null;
  onSubmit?: any;
}

const FormUserProfile = forwardRef<FormUserProfileRef, FormUserProfileProps>(
  ({ initialValues, onSubmit }, ref) => {
    const [showPasswordContainer, setShowPasswordContainer] =
      useState<boolean>(false);

    const form = useForm<FormUserProfileFields>({
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
      reset,
      getValues,
      handleSubmit,
      formState: { errors },
    } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          nome: "",
          email: "",
          senha: "",
          confirmaSenha: "",
        });
        setShowPasswordContainer(false);
      },
      submitForm: () => handleSubmit(onSubmit ?? (() => {}))(),
    }));

    useEffect(() => {
      if (initialValues) {
        reset({
          nome: initialValues.user.name ?? "",
          email: initialValues.user.email ?? "",
        });
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="flex w-full items-center gap-2 whitespace-nowrap text-lg font-bold">
              Dados do Usuário
            </legend>
            <div className="grid w-full grid-cols-1 lg:w-1/2 lg:grid-cols-2">
              <FormField
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="w-full p-1">
                    <Input
                      {...field}
                      required
                      label="Nome"
                      placeholder="Informe o nome do usuário"
                      id="input-nome-usuario"
                      size="lg"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full p-1">
                    <Input
                      {...field}
                      required
                      type="email"
                      label="E-mail"
                      placeholder="Informe o e-mail do usuário"
                      id="input-email-usuario"
                      size="lg"
                      disabled={initialValues ? true : false}
                      error={!!errors.email}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <legend className="mb-4 w-full border-b-2 font-bold">
              Dados de Acesso
            </legend>
            {!showPasswordContainer && (
              <Button
                variant={"secondary"}
                onClick={() => setShowPasswordContainer(true)}
                className="flex items-center gap-2"
              >
                <Key className="size-4" />
                Alterar Senha
              </Button>
            )}
            {showPasswordContainer && (
              <>
                <FormField
                  control={control}
                  name="senha"
                  render={({ field }) => (
                    <FormItem className="col-span-1 p-1">
                      <Input
                        {...field}
                        required
                        id="input-senha"
                        type="password"
                        label="Senha"
                        size="lg"
                        placeholder="Informe uma senha"
                        error={!!errors.senha}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="confirmaSenha"
                  render={({ field }) => (
                    <FormItem className="col-sapn-1 p-1">
                      <Input
                        {...field}
                        required
                        size="lg"
                        type="password"
                        id="input-confirma-senha"
                        label="Confirmar Senha"
                        placeholder="Confirmar senha"
                        error={!!errors.confirmaSenha}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="col-span-1 text-xs text-muted-foreground md:col-span-2 lg:col-span-4">
                  - A senha deve conter ao menos 6 caracteres
                </p>
              </>
            )}
          </fieldset>
        </form>
      </Form>
    );
  },
);

FormUserProfile.displayName = "FomrUserProfile";

export default FormUserProfile;
