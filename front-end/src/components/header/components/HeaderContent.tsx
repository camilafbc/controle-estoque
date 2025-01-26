"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Navbar from "./Navbar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";
import LogoContainer from "./LogoContainer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSessionContext } from "@/context/SessionContext";

export default function HeaderContent() {
  const { user } = useSessionContext();

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
        <UserMenu />
      </div>
    </>
  );
}
