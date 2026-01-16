import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md border-red-200 shadow-lg dark:border-red-900">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Acesso Negado
          </CardTitle>
          <CardDescription className="text-slate-500">
            Ops! Parece que você não tem permissão para acessar esta área.
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center text-sm text-slate-600 dark:text-slate-400">
          Esta página é restrita a administradores do sistema. Se você acredita
          que isso é um erro, entre em contato com o suporte técnico do Senac.
        </CardContent>

        <CardFooter className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline" className="w-full">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Link>
          </Button>
          <Button asChild className="w-full bg-blue-senac hover:bg-blue-900">
            <Link href="/home">
              <Home className="mr-2 h-4 w-4" />
              Ir para Início
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
