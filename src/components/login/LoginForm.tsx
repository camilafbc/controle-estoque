"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, LogIn, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputs {
  email: string;
  password: string;
}

const validationSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail obrigatório")
    .email("Informe um e-mail válido"),
  password: z.string().min(1, "Senha obrigatória"),
});

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormInputs>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
        const session = await getSession();
        const role = session?.user.role;
        const destino = role === "admin" ? "/admin/home" : "/home";
        router.replace(destino);
      } else {
        setError("password", {
          type: "login",
          message: result?.error || "E-mail ou senha incorretos.",
        });
      }
    } catch (error) {
      console.error("Erro inesperado no login: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                E-mail institucional
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  autoFocus
                  type="email"
                  id="input-email"
                  placeholder="seu.email@mg.senac.br"
                  disabled={loading}
                  className="rounded-xl pl-10"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1.5">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Senha de acesso
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="input-password"
                  placeholder="••••••••"
                  disabled={loading}
                  type="password"
                  className="rounded-xl pl-10"
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full gap-2 rounded-xl text-base font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              <LogIn className="size-4" />
              Entrar no Sistema
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
