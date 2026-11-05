"use client";

import { ArrowLeft, Save, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

import { updateProfile } from "@/actions/users/update-user-profile";
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
import { getErrorMessage } from "@/utils/getErrorMessage";

export default function ContainerProfile() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<FormUserProfileRef>(null);
  const router = useRouter();

  const userInitials =
    session?.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SE";

  const handleSubmit: SubmitHandler<FormUserProfileFields> = async (data) => {
    try {
      setIsLoading(true);

      const profileUpdated = await updateProfile(data);
      if (profileUpdated && "data" in profileUpdated) {
        await update({
          user: {
            ...session?.user,
            name: profileUpdated.data,
          },
        });
        toast.success(profileUpdated.message);
      } else if (profileUpdated && "error" in profileUpdated) {
        toast.error(profileUpdated.error);
      }
      formRef.current?.resetForm();
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
    <Card className="rounded-2xl border border-border/70 shadow-sm">
      <CardHeader className="border-b border-border/50 pb-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16 ring-4 ring-orange-500/10">
            <AvatarFallback className="bg-primary text-xl font-bold tracking-wider text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground capitalize">
                {session?.user.name}
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400 capitalize">
                <ShieldCheck className="size-3" />
                {session?.user.role}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{session?.user.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <FormUserProfile
          ref={formRef}
          initialValues={session}
          onSubmit={handleSubmit}
        />
      </CardContent>
      <CardFooter className="flex w-full flex-col-reverse justify-end gap-3 border-t border-border/50 pt-5 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="gap-2 rounded-xl"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <Button
          type="button"
          loading={isLoading}
          onClick={() => formRef.current?.submitForm()}
          className="gap-2 rounded-xl"
        >
          <Save className="size-4" />
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  );
}
