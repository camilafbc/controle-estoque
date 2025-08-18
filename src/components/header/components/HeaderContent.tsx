"use client";

import { CircleUserRound, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import LogoContainer from "./LogoContainer";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

export default function HeaderContent() {
  const { data: session } = useSession();
  return (
    <div className="container flex items-center justify-between">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size={"icon"}
              className="hover:bg-tertiary/50 bg-transparent focus:border focus:border-white"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[85%]">
            <MobileMenu role={session?.user?.role} />
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-end justify-center gap-6">
        <Link href={session?.user.role === "admin" ? "/admin/home" : "/home"}>
          <LogoContainer />
        </Link>
        <Navbar role={session?.user?.role} />
      </div>
      <UserMenu
        name={session?.user?.name}
        role={session?.user?.role}
        email={session?.user?.email}
        buttons={
          [
            {
              icon: <CircleUserRound size={18} />,
              title: "Meu Perfil",
              href:
                session?.user?.role === "admin" ? "/admin/perfil" : "/perfil",
            },
          ].filter(Boolean) as unknown as {
            icon: React.ReactNode;
            title: string;
            href: string;
          }[]
        }
      />
    </div>
  );
}
