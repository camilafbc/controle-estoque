"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  role?: string;
}

export default function Navbar({ role }: NavbarProps) {
  if (role === "admin") {
    return (
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="w-[130px] bg-transparent p-0 text-primary-foreground hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white data-[state=open]:text-white dark:text-white">
              {/* <ClipboardPen className="me-0.5 h-4" /> */}
              Cadastros
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[160px]">
              <ul className="flex flex-col p-1">
                <li className="w-full">
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none from-muted/50 to-muted p-2 px-7 text-sm no-underline outline-none hover:bg-zinc-100 focus:shadow-md dark:hover:text-blue-950"
                      href="/admin/cadastros/cursos"
                    >
                      Cursos
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      className="flex h-full w-full select-none from-muted/50 to-muted p-2 px-7 text-sm no-underline outline-none hover:bg-zinc-100 focus:shadow-md dark:hover:text-blue-950"
                      href="/admin/cadastros/usuarios"
                    >
                      Usuários
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  if (role === "user") {
    return (
      <div className="flex">
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-[130px] bg-transparent p-0 text-primary-foreground hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white data-[state=open]:text-white dark:text-white">
                {/* <ClipboardPen className="me-0.5 h-4" /> */}
                Cadastros
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[160px]">
                <ul className="flex flex-col p-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none from-muted/50 to-muted p-2 px-7 text-sm no-underline outline-none hover:bg-zinc-100 focus:shadow-md dark:hover:text-blue-950"
                        href="/cadastros/turmas"
                      >
                        Turmas
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li className="w-full">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full select-none rounded-md from-muted/50 to-muted p-2 px-7 text-sm no-underline outline-none hover:bg-zinc-100 focus:shadow-md dark:hover:text-blue-950"
                        href="/cadastros/produtos"
                      >
                        Produtos
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className="hidden sm:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="w-[130px] bg-transparent p-0 text-primary-foreground hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[active]:bg-transparent data-[state=open]:bg-transparent data-[active]:text-white data-[state=open]:text-white dark:text-white">
                {/* <ClipboardPen className="me-0.5 h-4" /> */}
                Relatórios
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[160px]">
                <ul className="flex flex-col p-1">
                  <li className="w-full">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full select-none rounded-md from-muted/50 to-muted p-2 px-7 text-sm no-underline outline-none hover:bg-zinc-100 focus:shadow-md dark:hover:text-blue-950"
                        href="/relatorios/movimentacao-turma"
                      >
                        Movimentação por Turma
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
  }
}
