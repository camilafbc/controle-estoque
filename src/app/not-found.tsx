"use client";

import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md rounded-2xl border border-border/70 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600 ring-1 ring-orange-500/20 dark:bg-orange-500/15 dark:text-orange-400">
            <FileQuestion className="size-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Página não encontrada
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            O endereço solicitado não existe ou foi alterado.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground leading-relaxed">
          Verifique se a URL foi digitada corretamente ou retorne para a página inicial do Gestor de Estoque.
        </CardContent>

        <CardFooter className="flex justify-center pt-2">
          <Button asChild className="gap-2 rounded-xl">
            <Link href="/">
              <Home className="size-4" />
              Retornar ao Início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
