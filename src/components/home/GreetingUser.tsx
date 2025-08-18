"use client";
import { useSession } from "next-auth/react";

export default function GreetingUser() {
  const { data: session } = useSession();

  const hour = new Date().getHours();

  return (
    <div className="flex items-baseline gap-1 border-b-[1px] border-b-zinc-200">
      <p className="text-lg font-semibold">
        {hour >= 0 && hour < 12 && "Bom dia"}
        {hour >= 12 && hour < 18 && "Boa tarde"}
        {hour >= 18 && hour <= 23 && "Boa noite"},
      </p>
      <span className="text-2xl font-bold tracking-wide">
        {!session ? (
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        ) : (
          session.user.name.split(" ")[0] + "!"
        )}
      </span>
    </div>
  );
}
