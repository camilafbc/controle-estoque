"use client";

import {
  Boxes,
  FileSpreadsheet,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();

  const role = session?.user?.role;
  const isAdmin = role === "admin";
  const userInitials =
    session?.user?.name
      ?.split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "SE";

  const adminNav = [
    {
      title: "Visão Geral",
      items: [
        {
          label: "Dashboard",
          href: "/admin/home",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Cadastros Gerais",
      items: [
        {
          label: "Cursos",
          href: "/admin/cadastros/cursos",
          icon: GraduationCap,
        },
        {
          label: "Usuários",
          href: "/admin/cadastros/usuarios",
          icon: Users,
        },
      ],
    },
  ];

  const userNav = [
    {
      title: "Visão Geral",
      items: [
        {
          label: "Dashboard",
          href: "/home",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Gestão do Estoque",
      items: [
        {
          label: "Turmas",
          href: "/cadastros/turmas",
          icon: GraduationCap,
        },
        {
          label: "Produtos",
          href: "/cadastros/produtos",
          icon: Boxes,
        },
      ],
    },
    {
      title: "Relatórios",
      items: [
        {
          label: "Movimentação por Turma",
          href: "/relatorios/movimentacao-turma",
          icon: FileSpreadsheet,
        },
      ],
    },
  ];

  const navSections = isAdmin ? adminNav : userNav;
  const perfilHref = isAdmin ? "/admin/perfil" : "/perfil";

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-sidebar text-sidebar-foreground">
      {/* Topo / Header da Sidebar */}
      <div className="flex flex-col">
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border/60 px-6">
          <Link
            href={isAdmin ? "/admin/home" : "/home"}
            onClick={onNavigate}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <div className="flex items-center justify-center rounded-xl bg-white/10 p-2 ring-1 ring-white/15">
              <Image
                src="/logo-branco-senac.png"
                alt="Senac Logo"
                width={70}
                height={40}
                className="h-auto w-16 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight tracking-tight text-white">
                Estoque
              </span>
              <span className="text-xs font-medium text-sidebar-muted">
                {isAdmin ? "Painel Administrativo" : "Gestor Educacional"}
              </span>
            </div>
          </Link>
        </div>

        {/* Navegação principal */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-sidebar-muted">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/home" &&
                      item.href !== "/admin/home" &&
                      pathname.startsWith(item.href));
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-sm font-semibold"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white"
                      }`}
                    >
                      <Icon
                        className={`size-4 transition-transform group-hover:scale-110 ${
                          isActive
                            ? "text-white"
                            : "text-sidebar-muted group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Seção Conta */}
          <div className="space-y-2">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-sidebar-muted">
              Conta
            </p>
            <Link
              href={perfilHref}
              onClick={onNavigate}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                pathname === perfilHref
                  ? "bg-primary text-white shadow-sm font-semibold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white"
              }`}
            >
              <User
                className={`size-4 transition-transform group-hover:scale-110 ${
                  pathname === perfilHref
                    ? "text-white"
                    : "text-sidebar-muted group-hover:text-white"
                }`}
              />
              <span>Meu Perfil</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Rodapé / Card do Usuário */}
      <div className="border-t border-sidebar-border/60 p-4">
        <div className="flex items-center justify-between rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="size-9 ring-2 ring-primary/40">
              <AvatarFallback className="bg-primary text-xs font-bold text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-xs font-semibold text-white">
                {session?.user?.name || "Usuário"}
              </span>
              <span className="truncate text-[11px] text-sidebar-muted">
                {session?.user?.email || ""}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="size-8 text-sidebar-muted hover:bg-white/10 hover:text-white"
              title="Alternar tema"
              aria-label="Alternar tema claro/escuro"
            >
              {theme === "dark" ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="size-8 text-sidebar-muted hover:bg-rose-500/20 hover:text-rose-400"
              title="Encerrar sessão"
              aria-label="Encerrar sessão"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
