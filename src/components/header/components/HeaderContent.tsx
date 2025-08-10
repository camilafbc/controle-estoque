"use client";

import { CircleUserRound, MenuIcon, UserCircle, X } from "lucide-react";
import { getServerSession, Session } from "next-auth";
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
import { authOptions } from "@/lib/auth";

import LogoContainer from "./LogoContainer";
import MobileMenu from "./MobileMenu";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";

interface HeaderContentProps {
  session: Session | null;
}

export default function HeaderContent({ session }: HeaderContentProps) {
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
              <MobileMenu role={session?.user?.role} />
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex items-end justify-center gap-6">
          <LogoContainer />
          <Navbar role={session?.user?.role} />
        </div>
        {/* <UserMenu userInfo={userInfo()} buttons={buttons} /> */}
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
                  session?.user?.role === "admin"
                    ? "/admin/profile"
                    : "/profile",
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
