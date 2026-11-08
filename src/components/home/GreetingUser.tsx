"use client";

import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

export default function GreetingUser() {
  const { data: session } = useSession();
  const hour = new Date().getHours();

  let saudacao = "Olá";
  if (hour >= 5 && hour < 12) saudacao = "Bom dia";
  else if (hour >= 12 && hour < 18) saudacao = "Boa tarde";
  else if (hour >= 18 || hour < 5) saudacao = "Boa noite";

  const firstName = session?.user?.name ? session.user.name.split(" ")[0] : "";

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
            <Sparkles className="size-3.5" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {saudacao}, <span className="text-foreground">{firstName || "Bem-vindo"}!</span>
          </p>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Painel de Controle de Estoque
        </h1>
      </div>
      <div className="text-xs text-muted-foreground">
        {new Intl.DateTimeFormat("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date())}
      </div>
    </div>
  );
}
