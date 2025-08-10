"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SubmitHandler } from "react-hook-form";

import { updateUser } from "@/api/users";
import { FormProdutoFields } from "@/components/produtos/FormProduto";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import FormUserProfile, {
  FormUserProfileFields,
  FormUserProfileRef,
} from "@/components/users/FormUserProfile";
import { User } from "@/types/User";

interface ContainerProps {
  user: User;
  onUpdateProfile: ({
    nome,
    senha,
  }: {
    nome: string;
    senha: string | undefined;
  }) => Promise<void>;
}

export default function Container({ user, onUpdateProfile }: ContainerProps) {
  const formRef = useRef<FormUserProfileRef>(null);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  async function handleUpdateProfile({ nome, senha }: FormUserProfileFields) {
    await onUpdateProfile({ nome, senha });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-16">
            <AvatarFallback className="bg-navbar text-xl font-bold tracking-wider text-primary-foreground dark:bg-orange-500 dark:text-white">
              {user?.nome.slice(0, 2).toUpperCase() || ""}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start">
            <p className="font-bold capitalize">{user?.nome}</p>
            <p className="text-sm font-semibold">
              {user.curso?.idCurso ?? "Administrador"}
            </p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FormUserProfile
          ref={formRef}
          initialValues={user || []}
          onSubmit={handleUpdateProfile}
        />
      </CardContent>
      <CardFooter className="mt-4 flex w-full flex-col-reverse gap-2 md:flex-row md:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="size-5" />
          Voltar
        </Button>
        <Button
          type="button"
          // loading={updateUser.isPending}
          onClick={(e) => {
            e.preventDefault();
            console.log("CLICANDO");
            formRef.current?.submitForm();
          }}
          className="hover:bg-orange-500/90"
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
