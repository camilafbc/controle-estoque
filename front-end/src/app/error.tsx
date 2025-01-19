"use client";

import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h2> Ops! Ocorreu um erro!</h2>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
