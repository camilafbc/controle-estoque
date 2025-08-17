"use client";

import Link from "next/link";

import { SheetClose } from "@/components/ui/sheet";

interface NavbarProps {
  role?: string;
}

export default function MobileMenu({ role }: NavbarProps) {
  if (role === "admin")
    return (
      <div className="mt-8 flex w-full flex-col p-2">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Cadastros</h3>
          <SheetClose
            className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
            asChild
          >
            <Link href={"/admin/cadastros/cursos"}>Cursos</Link>
          </SheetClose>
          <SheetClose
            className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
            asChild
          >
            <Link href={"/admin/cadastros/usuarios"}>Usuários</Link>
          </SheetClose>
        </div>
      </div>
    );

  if (role === "user")
    return (
      <div className="mt-8 flex w-full flex-col p-2">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Cadastros</h3>
          <SheetClose
            className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
            asChild
          >
            <Link href={"/cadastros/produtos"}>Produtos</Link>
          </SheetClose>
          <SheetClose
            className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
            asChild
          >
            <Link href={"/cadastros/turmas"}>Turmas</Link>
          </SheetClose>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Relatórios</h3>
          <SheetClose
            className="w-full items-center justify-start gap-1 bg-transparent text-blue-senac shadow-none hover:text-blue-950/50"
            asChild
          >
            <Link href={"/relatorios/movimentacao-turma"}>
              Movimentação por Turma
            </Link>
          </SheetClose>
        </div>
      </div>
    );
}
