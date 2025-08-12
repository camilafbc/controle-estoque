"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-8 px-4">
      <div className="relative h-48 w-full max-w-md">
        <Image
          src="/undraw_fixing-bugs.svg"
          alt="Ilustração de correção de erros"
          fill
          priority
          style={{ objectFit: "contain" }}
          className="drop-shadow-lg"
        />
      </div>

      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ops! Algo deu errado
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Não conseguimos carregar esta página
          </p>
        </div>

        <details className="w-full">
          <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-300">
            Ver detalhes
          </summary>
          <div className="mt-2 overflow-auto text-gray-500">
            {error.message}
          </div>
        </details>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={handleReset}
            className="bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    </div>
  );
}
