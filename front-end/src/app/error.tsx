"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <div className="relative h-64 w-full max-w-lg">
        {" "}
        <Image
          src="/undraw_fixing-bug.svg"
          alt="Imagem Fixing Bug"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2> Ops! Ocorreu um erro!</h2>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
