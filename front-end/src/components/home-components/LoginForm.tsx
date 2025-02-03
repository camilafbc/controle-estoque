"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      setLoading(true);

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email.trim(),
        password: data.password.trim(),
      });

      // console.log("RESULT LOGIN: ", result);

      if (result?.ok) {
        // router.push("/home");
        router.push("/redirect");
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Input
          autoFocus
          type="email"
          id="input-email"
          label="E-mail"
          placeholder="Informe seu e-mail"
          disabled={loading}
          error={!!errors.email}
          className="text-zinc-900 focus:bg-white dark:bg-white"
          {...register("email")}
        />
        <span className="text-xs font-semibold text-destructive">
          {errors?.email && errors?.email?.message}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <Input
          id="input-password"
          label="Senha"
          placeholder="Informe sua senha"
          disabled={loading}
          type={!showPassword ? "password" : "text"}
          error={!!errors.password}
          className="text-zinc-900 focus:bg-white dark:bg-white"
          {...register("password")}
        />
        <span className="text-xs font-semibold text-destructive">
          {errors?.password && errors?.password?.message}
        </span>
      </div>
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
  );
}
