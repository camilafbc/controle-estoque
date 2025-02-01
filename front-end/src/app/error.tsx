"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <div className="relative h-64 w-full max-w-lg">
        {" "}
        <Image
          src="/undraw_fixing-bugs.svg"
          alt="Imagem Fixing Bug"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h2> Ops! Ocorreu um erro!</h2>
        <Button
          onClick={() => window.location.reload()}
          className="hover:bg-orange-500/90"
        >
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
