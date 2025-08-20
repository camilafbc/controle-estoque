"use client";

import { AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <Card className="w-full max-w-lg overflow-hidden shadow-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="size-8 font-bold text-destructive" />
            <CardTitle className="text-lg font-semibold lg:text-2xl">
              Página não encontrada
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="space-y-4">
            <p className="text-justify text-gray-600 dark:text-gray-300">
              O endereço solicitado não existe ou foi movido.{" "}
              <span className="font-bold text-gray-800 dark:text-gray-100">
                Verifique a URL ou retorne para a página inicial.
              </span>
            </p>

            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Página inicial
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
          <p className="w-full text-center">Erro 404 • Página não encontrada</p>
        </CardFooter>
      </Card>
    </div>
  );
}
