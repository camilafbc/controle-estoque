"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const SignOutButton = () => (
  <Button
    variant="ghost"
    onClick={() => signOut({ callbackUrl: "/" })}
    className="w-full justify-start ps-0"
  >
    <LogOut className="me-0.5 h-4" />
    Sair
  </Button>
);
