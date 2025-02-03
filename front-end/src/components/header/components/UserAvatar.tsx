"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function UserAvatar() {
  const { data: session } = useSession();

  return (
    <Avatar className="h-[50px] w-[50px]">
      <AvatarFallback className="bg-orange-500 text-center text-lg font-semibold text-white">
        {session?.user.name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
