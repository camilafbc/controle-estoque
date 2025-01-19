"use client";

import { useSessionContext } from "@/context/SessionContext";
import { GraduationCap, User } from "lucide-react";
import MyBreadcrumb from "@/components/MyBreadcrumb";
import DashCard from "@/components/DashCard";

export default function Page() {
  const userTeste = useSessionContext();

  return (
    <div className="space-y-6">
      <MyBreadcrumb homeHref="/adm/home" />

      <div className="flex items-baseline gap-1 border-b-[1px] border-b-zinc-200">
        <p className="text-lg font-semibold">Olá,</p>
        <span className="text-2xl font-bold tracking-wide">
          {!userTeste.loading && userTeste.user?.name}!
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <DashCard
          className="bg-blue-400 text-white"
          title="Cursos"
          subtitle="Cursos ativos"
          data={"2"}
        >
          <GraduationCap />
        </DashCard>
        <DashCard
          className="bg-orange-400 text-white"
          title="Usuários"
          subtitle="Usuários ativos"
          data={"2"}
        >
          <User />
        </DashCard>
      </div>
    </div>
  );
}
