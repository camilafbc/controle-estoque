"use client";

import { Laptop, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { ReactNode, useState } from "react";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

type button = {
  title: string;
  icon: ReactNode;
  href: string;
};

interface UserMenuProps {
  avatarImage?: string;
  // avatarFalback?: string;
  userInfo?: boolean;
  name?: string;
  role?: string;
  email?: string;
  buttons?: button[];
  signOutCallbackUrl?: string;
}

const icons = {
  light: Sun,
  dark: Moon,
  system: Laptop,
};

export const ThemeSwitcher = ({
  setTheme,
}: {
  setTheme: (theme: string) => void;
}) => (
  <div>
    <p className="mb-1 text-sm font-semibold">Modo:</p>
    {[
      { theme: "light", icon: "light", label: "Claro" },
      { theme: "dark", icon: "dark", label: "Escuro" },
      { theme: "system", icon: "system", label: "Sistema" },
    ].map((item) => {
      const Icon = icons[item.icon as keyof typeof icons];
      return (
        <Button
          key={item.theme}
          variant="ghost"
          onClick={() => setTheme(item.theme)}
          className="flex w-full justify-start gap-1 p-1 hover:bg-primary/80 hover:text-white"
        >
          <Icon className="size-4" />
          {item.label}
        </Button>
      );
    })}
  </div>
);

export default function UserMenu({
  userInfo = true,
  buttons,
  avatarImage,
  // avatarFalback,
  name,
  role,
  email,
  signOutCallbackUrl = "/",
}: UserMenuProps) {
  const { setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {/* <UserAvatar /> */}
        <Avatar className="h-[50px] w-[50px]">
          {avatarImage && <AvatarImage src={avatarImage} alt="profile-image" />}
          <AvatarFallback className="bg-primary text-center text-lg font-semibold text-white">
            {name?.split(" ")?.[0]?.[0]}
            {name?.split(" ")?.[1]?.[0]}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="absolute right-0 w-[280px] translate-x-4 space-y-2">
        {userInfo && (
          <div key={"user-info"} className="flex flex-col gap-0">
            <p className="text-sm font-bold">{name}</p>
            <p className="text-xs font-semibold capitalize">{role}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        )}
        <Separator />
        {buttons &&
          buttons.map((btn, index) => (
            <React.Fragment key={index}>
              <Link href={btn.href}>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex w-full justify-start gap-1 p-1 hover:bg-primary/80 hover:text-white"
                >
                  {btn.icon}
                  {btn.title}
                </Button>
              </Link>
            </React.Fragment>
          ))}
        <Separator />
        <ThemeSwitcher setTheme={setTheme} />
        <Separator />
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: signOutCallbackUrl })}
          className="flex w-full justify-start gap-1 p-1 hover:bg-primary/80 hover:text-white"
        >
          <LogOut className="size-4" />
          Sair
        </Button>
      </PopoverContent>
    </Popover>
  );
}
