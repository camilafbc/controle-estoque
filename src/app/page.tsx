import { Boxes, CheckCircle2, FileSpreadsheet, ShieldCheck } from "lucide-react";
import Image from "next/image";

import LoginForm from "@/components/login/LoginForm";

export default function Page() {
  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Lado Esquerdo: Painel Institucional Senac (desktop) */}
      <div className="relative hidden w-full flex-col justify-between overflow-hidden bg-sidebar p-10 text-white md:flex md:w-1/2 lg:w-5/12">
        {/* Padrão de fundo suave */}
        <div className="absolute inset-0 bg-pattern opacity-10" />
        <div className="absolute -left-24 -top-24 size-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 size-96 rounded-full bg-blue-500/20 blur-3xl" />

        {/* Topo do painel */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15">
            <Image
              src="/logo-branco-senac.png"
              alt="Logo do Senac"
              width={90}
              height={50}
              className="h-auto w-20 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              Gestor de Estoque
            </span>
            <span className="text-xs text-sidebar-muted">
              SENAC Minas Gerais
            </span>
          </div>
        </div>

        {/* Mensagem central */}
        <div className="relative z-10 my-auto space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30">
              <Boxes className="size-3.5" />
              Ambiente Integrador
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Controle ágil e seguro para suas turmas.
            </h1>
            <p className="max-w-md text-sm text-sidebar-muted leading-relaxed">
              Acompanhe o cadastro, consumo e movimentação de produtos pedagógicos
              de forma rápida, organizada por curso e período.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-sidebar-foreground/90">
              <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-emerald-400 ring-1 ring-white/10">
                <CheckCircle2 className="size-4" />
              </div>
              <span>Rastreabilidade completa de entradas e saídas</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-sidebar-foreground/90">
              <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-orange-400 ring-1 ring-white/10">
                <FileSpreadsheet className="size-4" />
              </div>
              <span>Relatórios consolidados em PDF por turma</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-sidebar-foreground/90">
              <div className="flex size-7 items-center justify-center rounded-lg bg-white/10 text-blue-400 ring-1 ring-white/10">
                <ShieldCheck className="size-4" />
              </div>
              <span>Acesso seguro com isolamento por curso</span>
            </div>
          </div>
        </div>

        {/* Rodapé institucional */}
        <div className="relative z-10 text-xs text-sidebar-muted">
          © {new Date().getFullYear()} SENAC • Serviço Nacional de Aprendizagem Comercial
        </div>
      </div>

      {/* Lado Direito: Formulário de Login */}
      <div className="flex flex-1 flex-col items-center justify-center bg-background p-6 sm:p-12 md:w-1/2 lg:w-7/12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center md:text-left">
            {/* Logo visível no mobile */}
            <div className="mb-6 flex justify-center md:hidden">
              <Image
                src="/logo.png"
                alt="Logo do Senac"
                width={120}
                height={60}
                className="h-auto w-28 object-contain dark:brightness-110"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Acessar sua conta
            </h2>
            <p className="text-sm text-muted-foreground">
              Informe suas credenciais para entrar no sistema de estoque.
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
