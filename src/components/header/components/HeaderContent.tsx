"use client";

import { CircleUserRound, MenuIcon, UserCircle, X } from "lucide-react";
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
import { useAuthContext } from "@/context/AuthContext";

import LogoContainer from "./LogoContainer";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

export default function HeaderContent() {
  const { user, loading } = useAuthContext();

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
              <MobileMenu role={user?.role} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-end justify-center gap-6">
          <LogoContainer />
          <Navbar role={user?.role} />
        </div>
        {/* <UserMenu userInfo={userInfo()} buttons={buttons} /> */}
        <UserMenu
          name={user?.nome}
          role={user?.role}
          email={user?.email}
          buttons={
            [
              {
                icon: <CircleUserRound size={18} />,
                title: "Meu Perfil",
                href: user?.role === "admin" ? "/admin/profile" : "/profile",
              },
            ].filter(Boolean) as unknown as {
              icon: React.ReactNode;
              title: string;
              href: string;
            }[]
          }
        />
      </div>
    </>
  );
}
