import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import HeaderContent from "./components/HeaderContent";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex w-full flex-col items-start border-b-4 border-b-primary bg-navbar py-10 shadow-sm dark:bg-navbar sm:h-16 sm:flex-row sm:items-center">
      <HeaderContent session={session} />
    </header>
  );
}
