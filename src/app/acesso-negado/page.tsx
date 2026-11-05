import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
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

export default function AcessoNegado() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md rounded-2xl border border-rose-500/30 shadow-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20 dark:bg-rose-500/15 dark:text-rose-400">
            <ShieldAlert className="size-8" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
            Acesso Restrito
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Você não possui permissão para acessar esta área ou este recurso.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm text-muted-foreground leading-relaxed">
          Esta funcionalidade exige permissões administrativas ou pertence a outro curso.
          Se acreditar que se trata de um erro, entre em contato com a coordenação do Senac.
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2 sm:flex-row">
          <Button asChild variant="outline" className="w-full rounded-xl">
            <Link href="/home">
              <Home className="mr-2 size-4" />
              Ir para o Início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
