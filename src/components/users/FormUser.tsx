"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Key } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { MySelect } from "@/components/MySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Curso } from "@/types/Curso";
import { User } from "@/types/User";

import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { VirtualizedCombobox } from "../ui/virtualized-combobox/VirtualizedCombobox";

const validationSchema = yup.object({
  nome: yup
    .string()
    .min(2, "Mínimo 2 caracteres")
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  role: yup.string().required("Campo obrigatório"),
  idCurso: yup
    .string()
    .nullable()
    .when("role", {
      is: "user",
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.notRequired(),
    }),
  status: yup.boolean().required("Campo obrigatório"),
  password: yup
    .string()
    .test("senha-required", "Campo obrigatório", function (value) {
      const isRequired = !this.options?.context?.isEdit;
      if (isRequired && !value) {
        return this.createError({ message: "Senha é obrigatória" });
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
      const { password } = this.parent;
      return !password || password === value;
    }),
});

export type FormUserFields = yup.InferType<typeof validationSchema>;

interface FormUserProps {
  initialValues?: User;
  cursos: Curso[];
  cursosLoading: boolean;
  isLoading?: boolean;
  defaultFocus?: keyof FormUserFields;
  onSubmit: SubmitHandler<FormUserFields>;
}

export interface FormUserRef {
  resetForm: () => void;
  getValues: () => FormUserFields;
  submitForm: () => void;
}

const FormUser = forwardRef<FormUserRef, FormUserProps>(
  (
    {
      initialValues,
      cursos,
      cursosLoading,
      onSubmit,
      defaultFocus = "nome",
      isLoading = false,
    }: FormUserProps,
    ref,
  ) => {
    const [showPasswordContainer, setShowPasswordContainer] = useState(true);

    const form = useForm<FormUserFields>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        nome: "",
        email: "",
        role: "user",
        status: true,
        idCurso: "",
        password: "",
        confirmaSenha: "",
      },
      context: {
        isEdit: !!initialValues?.idUser,
      },
    });

    const {
      control,
      handleSubmit,
      reset,
      setFocus,
      getValues,
      watch,
      formState: { errors },
    } = form;

    const userRole = watch("role");

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          nome: "",
          email: "",
          role: "user",
          status: true,
          idCurso: "",
          password: "",
          confirmaSenha: "",
        });
        setShowPasswordContainer(true);
      },
      getValues: () => getValues(),
      submitForm: () => handleSubmit(onSubmit)(),
    }));

    useEffect(() => {
      setFocus(defaultFocus);
    }, [defaultFocus, setFocus]);

    useEffect(() => {
      if (initialValues) {
        const isUser = initialValues.role === "user";
        // setUserRole(isUser ? "user" : initialValues.role);

        reset({
          nome: initialValues.nome,
          email: initialValues.email,
          role: initialValues.role,
          status: initialValues.status,
          idCurso:
            isUser && initialValues.curso
              ? initialValues.curso.idCurso.toString()
              : "",
          password: "",
          confirmaSenha: "",
        });

        setShowPasswordContainer(false);
      } else {
        reset({
          nome: "",
          email: "",
          role: "user",
          status: true,
          idCurso: "",
          password: "",
          confirmaSenha: "",
        });
        setShowPasswordContainer(true);
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <fieldset>
            <legend className="mb-4 w-full border-b-2 font-bold">
              Dados do Usuário
            </legend>
            <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2">
              <FormField
                control={control}
                name="nome"
                render={({ field }) => (
                  <FormItem className="p-1">
                    <Input
                      {...field}
                      id="input-usuario"
                      label="Usuário"
                      placeholder="Informe o nome do usuário"
                      required
                      disabled={isLoading}
                      error={!!errors.nome}
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
                  <FormItem className="p-1">
                    <Input
                      {...field}
                      id="input-email"
                      type="email"
                      label="E-mail"
                      placeholder="email@email.com"
                      required
                      disabled={!!initialValues?.email || isLoading}
                      error={!!errors.email}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="role"
                render={({ field }) => (
                  <FormItem className="p-1">
                    <MySelect
                      {...field}
                      label="Tipo:"
                      id="select-option"
                      placeholder="Selecione uma opção"
                      size="lg"
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
                      required
                      disabled={isLoading}
                      error={!!errors.idCurso}
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {userRole === "user" && (
                <FormField
                  control={control}
                  name="idCurso"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <VirtualizedCombobox
                        {...field}
                        required
                        label="Curso"
                        id="select-curso"
                        size="lg"
                        height={100}
                        options={
                          cursos.map((curso: Curso) => ({
                            label: curso.nomeCurso.toString(),
                            id: curso.idCurso.toString(),
                          })) || []
                        }
                        placeholder="Buscar curso"
                        loading={cursosLoading}
                        error={errors.idCurso?.message}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 p-1">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label>Usuário Ativo</Label>
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <fieldset className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <legend className="mb-4 w-full border-b-2 font-bold">
              Dados de Acesso
            </legend>
            {!showPasswordContainer && (
              <Button
                variant={"secondary"}
                type="button"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <Input
                        {...field}
                        required
                        id="input-password"
                        type="password"
                        label="Senha"
                        placeholder="Informe uma senha"
                        error={!!errors.password}
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
                    <FormItem className="p-1">
                      <Input
                        {...field}
                        required
                        type="password"
                        id="input-confirma-senha"
                        label="Confirmar Senha"
                        placeholder="Confirme a senha informada"
                        error={!!errors.confirmaSenha}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <span className="text-sm text-muted-foreground">
                  - A senha deve conter ao menos 6 caracteres
                </span>
              </>
            )}
          </fieldset>
        </form>
      </Form>
    );
  },
);

FormUser.displayName = "FormUser";

export default FormUser;
