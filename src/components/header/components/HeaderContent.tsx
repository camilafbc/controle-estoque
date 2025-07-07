"use client";

import { CircleUserRound, MenuIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

// import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSessionContext } from "@/context/SessionContext";

import UserMenu from "../user-menu/UserMenu";

import LogoContainer from "./LogoContainer";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";

export default function HeaderContent() {
  const { data: session } = useSession();

  const buttons = [
    {
      title: "Meu Perfil",
      icon: <CircleUserRound className="size-5" />,
      href: session?.user.role === "admin" ? "/admin/perfil" : "/perfil",
    },
  ];

  const userInfo = () => {
    return (
      <div>
        <p className="text-lg font-bold">{session?.user?.name}</p>
        <p className="text-sm font-semibold capitalize">
          {session?.user?.curso ?? session?.user?.role}
        </p>
        <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
      </div>
    );
  };

  return (
    <>
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
              <MobileMenu role={session?.user.role} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-end justify-center gap-6">
          <LogoContainer />
          <Navbar role={session?.user.role} />
        </div>
        <UserMenu userInfo={userInfo()} buttons={buttons} />
      </div>
    </>
  );
}
