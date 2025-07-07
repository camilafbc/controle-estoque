"use client";

import { ChevronLeft, SquareCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { toast } from "react-toastify";

import BadgePageTitle from "@/components/BadgePageTitle";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import FormUserProfile, {
  FormUserProfileFields,
  FormUserProfileRef,
} from "@/components/users/FormUserProfile";
import { useUpdateUserMutation } from "@/mutations/users";
import { User } from "@/types/User";
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function Page() {
  const formRef = useRef<FormUserProfileRef>(null);
  const { data: session, update } = useSession();
  const router = useRouter();
  const updateUser = useUpdateUserMutation();

  const user = {
    id: session?.user.id ?? "",
    nome: session?.user.name ?? "",
    email: session?.user.email ?? "",
  };

  const handleBack = () => {
    router.back();
  };

  const handleUpdateUser = (data: Partial<User>) => {
    updateUser.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        console.log("Response: ", response);
        update({
          ...session?.user,
          nome: response.updated.nome,
        });
        // if(response.)
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  const handleSubmit = (data: FormUserProfileFields) => {
    handleUpdateUser({ ...data, idUser: +user.id });
  };

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/admin/home" />
      <BadgePageTitle title="Meu Perfil" />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="size-16">
              <AvatarFallback className="bg-navbar text-xl font-bold tracking-wider text-primary-foreground dark:bg-orange-500 dark:text-white">
                {session?.user.name.slice(0, 2).toUpperCase() || ""}
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
          <FormUserProfile ref={formRef} initialValues={user || []} />
        </CardContent>
        <CardFooter className="mt-4 flex w-full flex-col-reverse gap-2 md:flex-row md:justify-end">
          <Button
            type="button"
            variant={"outline"}
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="size-5" />
            Voltar
          </Button>
          <Button
            type="submit"
            loading={updateUser.isPending}
            onClick={() => {
              console.log("clique: ", formRef.current?.getValues());
              const values = formRef.current?.getValues();
              if (values && values.nome && values.email) {
                handleSubmit(values);
              }
            }}
            className="hover:bg-orange-500/90"
          >
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
