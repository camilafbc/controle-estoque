"use client";

import LoaderComponent from "@/components/LoaderComponent";
import { useSessionContext } from "@/context/SessionContext";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const user = useSessionContext();

  // Se a sessão estiver carregando, mostramos um loader

  useEffect(() => {
    if (user.loading) return;

    if (user.user?.role === "admin") {
      router.replace("/adm/home");
    } else {
      // Se o usuário é master, redireciona para a seleção de empresa
      router.replace("/home");
    }
  }, [router, user.user, user.loading]);

  // useEffect(() => {
  //   // Garantir que o redirecionamento só ocorra quando a sessão estiver completamente carregada
  //   if (user.user?.role === "admin") {
  //     router.replace("/adm/home");
  //   } else if (user.user?.role === "user") {
  //     router.replace("/home");
  //   }
  // }, [router, user.user]); // Dependência: redireciona quando o user estiver disponível

  // if (user.loading) return <LoaderComponent />;

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        <p>Carregando redirecionamento...</p>
      </div>
    </div>
  );
}
