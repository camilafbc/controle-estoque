"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MobileMenu() {
  return (
    <div className="flex w-full flex-col p-2">
      {/* Seção Cadastros */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Cadastros</h3>
        <Button
          className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
          asChild
        >
          <Link href={"/cadastros/produtos"}>Produtos</Link>
        </Button>
        <Button
          className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
          asChild
        >
          <Link href={"/cadastros/turmas"}>Turmas</Link>
        </Button>
      </div>

      {/* Seção Relatórios */}
      <div>
        <h3 className="text-lg font-semibold">Relatórios</h3>
        <Button
          className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
          asChild
        >
          <Link href={"/relatorios/movimentacao-turma"}>
            Movimentação por Turma
          </Link>
        </Button>
      </div>
    </div>
  );
}
