"use client";

import { signOut } from "next-auth/react";

import UserAvatar from "./UserAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Laptop, LogOut, Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { useSessionContext } from "@/context/SessionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserMenu() {
  const { setTheme } = useTheme();
  const user = useSessionContext();
  const router = useRouter();

  const handleButtonProfile = () => {
    router.replace("/profile");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar />
      </PopoverTrigger>
      <PopoverContent className="absolute right-0 w-[280px] translate-x-4 transform space-y-2">
        <div>
          <p className="text-lg font-bold">{user?.user?.name}</p>
          <p className="text-sm font-semibold capitalize">
            {user?.user?.curso ?? user.user?.role}
          </p>
          <p className="text-sm text-muted-foreground">{user?.user?.email}</p>
        </div>
        <Separator orientation="horizontal" />
        <Link href={"/profile"}>
          <Button
            variant={"ghost"}
            // onClick={handleButtonProfile}
            className="mt-2 flex w-full justify-start gap-2 ps-0 text-base"
          >
            <CircleUserRound className="size-5" />
            Meu Perfil
          </Button>
        </Link>
        <div>
          <Button
            variant={"ghost"}
            onClick={() => setTheme("light")}
            className="w-full justify-start ps-0"
          >
            <Sun className="me-0.5 h-4" />
            Claro
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setTheme("dark")}
            className="w-full justify-start ps-0"
          >
            <Moon className="me-0.5 h-4" />
            Escuro
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => setTheme("system")}
            className="w-full justify-start ps-0"
          >
            <Laptop className="me-0.5 h-4" />
            Sistema
          </Button>
        </div>
        <Separator orientation="horizontal" />
        <Button
          variant={"ghost"}
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full justify-start ps-0"
        >
          <LogOut className="me-0.5 h-4" />
          Sair
        </Button>
      </PopoverContent>
    </Popover>
  );
}
