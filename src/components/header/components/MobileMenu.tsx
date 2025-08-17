"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { SheetClose } from "@/components/ui/sheet";

interface NavbarProps {
  role?: string;
}

export default function MobileMenu({ role }: NavbarProps) {
  if (role === "admin")
    return (
      <div className="mt-8 flex w-full flex-col space-y-6 p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Cadastros
          </h3>
          <div className="space-y-1">
            <SheetClose
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-zinc-100"
              asChild
            >
              <Link href={"/admin/cadastros/cursos"}>
                <ChevronRight className="mr-2 h-4 w-4 text-blue-senac" />
                Cursos
              </Link>
            </SheetClose>
            <SheetClose
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-zinc-100"
              asChild
            >
              <Link href={"/admin/cadastros/usuarios"}>
                <ChevronRight className="mr-2 h-4 w-4 text-blue-senac" />
                Usuários
              </Link>
            </SheetClose>
          </div>
        </div>
      </div>
    );

  if (role === "user")
    return (
      <div className="mt-8 flex w-full flex-col space-y-6 p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Cadastros
          </h3>
          <div className="space-y-1">
            <SheetClose
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-zinc-100"
              asChild
            >
              <Link href={"/cadastros/produtos"}>
                <ChevronRight className="mr-2 h-4 w-4 text-blue-senac" />
                Produtos
              </Link>
            </SheetClose>
            <SheetClose
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-zinc-100"
              asChild
            >
              <Link href={"/cadastros/turmas"}>
                <ChevronRight className="mr-2 h-4 w-4 text-blue-senac" />
                Turmas
              </Link>
            </SheetClose>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-white">
            Relatórios
          </h3>
          <div className="space-y-1">
            <SheetClose
              className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-zinc-100"
              asChild
            >
              <Link href={"/relatorios/movimentacao-turma"}>
                <ChevronRight className="mr-2 h-4 w-4 text-blue-senac" />
                Movimentação por Turma
              </Link>
            </SheetClose>
          </div>
        </div>
      </div>
    );
}
