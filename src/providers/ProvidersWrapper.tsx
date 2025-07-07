"use client";

import AuthProvider from "@/providers/auth";
import { ReactNode } from "react";
import { SessionProvider } from "@/context/SessionContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "./QueryProvider";

interface ProvidersWrapperProps {
  children: ReactNode;
}

export function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  return (
    <AuthProvider>
      <SessionProvider>
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </SessionProvider>
    </AuthProvider>
  );
}
