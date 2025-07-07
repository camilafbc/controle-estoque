"use client";

import { useSession } from "next-auth/react";

export default function WelcomeUser() {
  const { data: user, status } = useSession();

  return (
    <div className="flex items-baseline gap-1 border-b-[1px] border-b-zinc-200">
      <p className="text-lg font-semibold">Olá,</p>
      <span className="text-2xl font-bold tracking-wide">
        {status === "loading" ? (
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ) : (
          user?.user.name?.split(" ")[0] + "!"
        )}
      </span>
    </div>
  );
}
