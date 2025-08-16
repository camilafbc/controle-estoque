"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputs {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().required("E-mail obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email.trim(),
        password: data.password.trim(),
      });

      if (result?.ok) {
        // aguarda a sessão ser atualizada
        await new Promise((resolve) => setTimeout(resolve, 300));

        // pega os dados da sessão
        const session = await getSession();

        const role = session?.user.role;

        role === "admin"
          ? router.replace("/admin/home")
          : router.replace("/home");
      } else {
        setError("password", {
          type: "login",
          message: "Usuário ou senha inválidos.",
        });
      }
    } catch (error) {
      console.error("Erro de autenticação: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label className="text-slate-900 dark:text-slate-900">
                E-mail
              </Label>
              <Input
                {...field}
                autoFocus
                type="email"
                id="input-email"
                placeholder="Informe seu e-mail"
                disabled={loading}
                error={!!errors.email}
                className="text-zinc-900 focus:bg-white dark:border-orange-500 dark:bg-white"
              />
              <span className="text-xs font-semibold text-destructive">
                {errors?.email && errors?.email?.message}
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Label className="text-slate-900 dark:text-slate-900">
                Senha
              </Label>
              <Input
                {...field}
                id="input-password"
                placeholder="Informe sua senha"
                disabled={loading}
                type="password"
                error={!!errors.password}
                className="text-zinc-900 focus:bg-white dark:border-primary dark:bg-white"
              />
              <span className="text-xs font-semibold text-destructive">
                {errors?.password && errors?.password?.message}
              </span>
            </FormItem>
          )}
        />
        {/* <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Checkbox />
            <Label className="text-sm font-normal text-zinc-500 dark:text-zinc-500">
              Manter conectado
            </Label>
          </div>
          <Link href={"/recuperacao-senha"}>
            <Button
              variant={"link"}
              className="p-0 text-sm font-normal text-zinc-500 hover:text-zinc-400 dark:text-zinc-500"
            >
              Esqueci minha senha
            </Button>
          </Link>
        </div> */}
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="mt-2 w-full bg-blue-senac hover:bg-blue-950"
        >
          {!loading ? (
            <>
              <LogIn className="mx-2 h-4" />
              Entrar
            </>
          ) : (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
