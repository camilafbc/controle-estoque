"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { updateProfile } from "@/api/users";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function Container() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<FormUserProfileRef>(null);
  const router = useRouter();

  const handleSubmit: SubmitHandler<FormUserProfileFields> = async (data) => {
    try {
      setIsLoading(true);

      const fetchUpdate = await updateProfile({
        ...data,
        idUser: Number(session?.user.id),
      });
      if (fetchUpdate) {
        //Atualização da Sessão
        const updateSession = await update({
          user: {
            ...session?.user,
            name: fetchUpdate.updated,
          },
        });
      }

      toast.success(fetchUpdate.message);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="size-16">
            <AvatarFallback className="bg-navbar text-xl font-bold tracking-wider text-primary-foreground dark:bg-orange-500 dark:text-white">
              {session?.user.name?.split(" ")?.[0]?.[0]}
              {session?.user.name?.split(" ")?.[1]?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start">
            <p className="font-bold capitalize">{session?.user.name}</p>
            <p className="text-sm font-semibold">
              {session?.user.curso ?? "Administrador"}
            </p>
            <p className="text-sm text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <FormUserProfile
          ref={formRef}
          initialValues={session}
          onSubmit={handleSubmit}
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
          onClick={() => formRef.current?.submitForm()}
          className="hover:bg-orange-500/90"
        >
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
