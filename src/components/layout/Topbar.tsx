"use client";

import { CircleUserRound, Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";

import UserMenu from "@/components/header/components/UserMenu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Sidebar } from "./Sidebar";

export function Topbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role;
  const isAdmin = role === "admin";
  const homeHref = isAdmin ? "/admin/home" : "/home";
  const perfilHref = isAdmin ? "/admin/perfil" : "/perfil";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-card/80 px-4 backdrop-blur-md transition-colors sm:px-6">
      {/* Lado Esquerdo: Mobile Menu + Identidade rápida */}
      <div className="flex items-center gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9 rounded-xl md:hidden"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo visível apenas no mobile para contexto */}
        <Link
          href={homeHref}
          className="flex items-center gap-2 md:hidden"
        >
          <Image
            src="/logo.png"
            alt="Senac Logo"
            width={70}
            height={30}
            className="h-7 w-auto object-contain dark:brightness-110"
          />
          <span className="text-xs font-bold text-foreground">Estoque</span>
        </Link>
      </div>

      {/* Lado Direito: Ações rápidas e User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Alternador de tema discreto no Topbar */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="size-9 rounded-xl text-muted-foreground hover:text-foreground"
          aria-label="Alternar modo claro/escuro"
        >
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* User Menu Popover */}
        <UserMenu
          name={session?.user?.name}
          role={session?.user?.role}
          email={session?.user?.email}
          buttons={[
            {
              icon: <CircleUserRound size={18} />,
              title: "Meu Perfil",
              href: perfilHref,
            },
          ]}
        />
      </div>
    </header>
  );
}
