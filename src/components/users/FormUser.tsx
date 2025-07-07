"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Key } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import "react-toastify/dist/ReactToastify.css";
import { MySelect } from "@/components/MySelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Curso } from "@/types/Curso";
import { User } from "@/types/User";

import { Form, FormField, FormItem } from "../ui/form";

const validationSchema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  role: yup.string().required("Campo obrigatório"),
  idCurso: yup.string().nullable(),
  status: yup.boolean().required("Campo obrigatório"),
  senha: yup
    .string()
    .test("senha-required", "Campo obrigatório", function (value) {
      // senha não é obrigatória se for edição
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
      const { senha } = this.parent;
      return !senha || senha === value;
    }),
});

export type FormUserFields = yup.InferType<typeof validationSchema>;

interface FormUserProps {
  initialValues?: User;
  cursos: Curso[];
  cursosLoading: boolean;
  isLoading?: boolean;
  defaultFocus?: keyof FormUserFields;
}

export interface FormUserRef {
  resetForm: () => void;
  getValues: () => FormUserFields;
}

const FormUser = forwardRef<FormUserRef, FormUserProps>(
  (
    {
      initialValues,
      cursos,
      cursosLoading,
      defaultFocus = "nome",
      isLoading = false,
    }: FormUserProps,
    ref,
  ) => {
    const [showPasswordContainer, setShowPasswordContainer] = useState(true);
    const [userRole, setUserRole] = useState("user");

    const form = useForm<FormUserFields>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        nome: "",
        email: "",
        role: "user",
        status: true,
        senha: "",
        confirmaSenha: "",
      },
      context: {
        isEdit: initialValues?.idUser || undefined,
      },
    });

    const {
      control,
      handleSubmit,
      reset,
      setFocus,
      getValues,
      formState: { errors },
    } = form;

    useImperativeHandle(ref, () => ({
      resetForm: () => {
        reset({
          nome: "",
          email: "",
          role: "user",
          status: true,
          senha: "",
          confirmaSenha: "",
        });
        setShowPasswordContainer(false);
        setUserRole("");
      },
      getValues: () => getValues(),
    }));

    useEffect(() => {
      setFocus(defaultFocus);
    }, [defaultFocus, setFocus]);

    // console.log("INITIAL VALUES: ", initialValues);

    useEffect(() => {
      setUserRole("");

      if (initialValues) {
        reset({
          nome: initialValues.nome,
          email: initialValues.email,
          role: initialValues.role,
          status: initialValues.status,
        });
        if (initialValues.role === "user") {
          setUserRole("user");
          reset({ idCurso: initialValues?.curso?.idCurso.toString() });
        }
        setShowPasswordContainer(false);
      }
    }, [initialValues, reset]);

    return (
      <Form {...form}>
        <form className="w-full space-y-6">
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
                    <span className="min-h-[16px] text-xs font-semibold text-destructive">
                      {errors.nome?.message || ""}
                    </span>
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
                      disabled={
                        initialValues?.email ? true : false || isLoading
                      }
                      error={!!errors.email}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                    <span className="min-h-[16px] text-xs font-semibold text-destructive">
                      {errors.email?.message || ""}
                    </span>
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        setUserRole(value);
                      }}
                    />
                    <span className="min-h-[16px] text-xs font-semibold text-destructive">
                      {errors.idCurso?.message || ""}
                    </span>
                  </FormItem>
                )}
              />
              {userRole === "user" && (
                <FormField
                  control={control}
                  name="idCurso"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <MySelect
                        {...field}
                        label="Curso:"
                        id="select-option"
                        placeholder="Selecione uma opção"
                        options={
                          cursos?.map((curso: Curso) => ({
                            value: curso.idCurso.toString(),
                            label: curso.nomeCurso,
                          })) || []
                        }
                        required
                        disabled={isLoading}
                        loading={cursosLoading}
                        error={!!errors.idCurso}
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      />
                      <span className="min-h-[16px] text-xs font-semibold text-destructive">
                        {errors.idCurso?.message || ""}
                      </span>
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
                    <FormItem className="p-1">
                      <Input
                        {...field}
                        required
                        id="input-senha"
                        type="password"
                        label="Senha"
                        placeholder="Informe uma senha"
                        error={!!errors.senha}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <span className="min-h-[16px] text-xs font-semibold text-destructive">
                        {errors.senha?.message || ""}
                      </span>
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
                      <span className="min-h-[16px] text-xs font-semibold text-destructive">
                        {errors.confirmaSenha?.message || ""}
                      </span>
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
