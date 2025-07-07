"use client";

import { useSessionContext } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const user = useSessionContext();

  useEffect(() => {
    if (user.loading) return;

    if (user.user?.role === "admin") {
      router.replace("/adm/home");
    } else {
      // Se o usuário é master, redireciona para a seleção de empresa
      router.replace("/home");
    }
  }, [router, user.user, user.loading]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="loader-pulse"></div>
      </div>
    </div>
  );
}
