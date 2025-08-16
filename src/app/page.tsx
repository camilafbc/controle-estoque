import Image from "next/image";

import LoginForm from "@/components/login/LoginForm";

export default function Page() {
  return (
    <main className="flex h-screen w-full">
      <div className="h-screen bg-blue-senac bg-pattern md:w-2/4"></div>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-white md:w-2/4">
        <Image src="/logo.png" alt="logo do senac" width={150} height={50} />
        <div className="mx-auto w-full max-w-md p-2">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
