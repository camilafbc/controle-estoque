"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <div className="relative h-64 w-full max-w-lg">
        {" "}
        {/* Definindo uma altura fixa */}
        <Image
          src="/undraw_page_not_found.svg"
          alt="Imagem 404"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Ops! A página não existe!</h2>
      </div>
    </div>
  );
}
