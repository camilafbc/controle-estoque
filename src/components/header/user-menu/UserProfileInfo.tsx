"use client";

import { useSession } from "next-auth/react";

export const UserProfileInfo = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p className="text-lg font-bold">{session?.user?.name}</p>
      <p className="text-sm font-semibold capitalize">
        {session?.user?.curso ?? session?.user?.role}
      </p>
      <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
    </div>
  );
};
