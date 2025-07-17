"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";

import { QueryProvider } from "./QueryProvider";

interface ProvidersWrapperProps {
  children: ReactNode;
}

export function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <SessionProvider>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </SessionProvider>
  );
}
