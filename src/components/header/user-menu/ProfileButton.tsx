import { CircleUserRound } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const ProfileButton = () => (
  <Link href="/profile">
    <Button
      variant="ghost"
      className="mt-2 flex w-full justify-start gap-2 ps-0 text-base"
    >
      <CircleUserRound className="size-5" />
      Meu Perfil
    </Button>
  </Link>
);
