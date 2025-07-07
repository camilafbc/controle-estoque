"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { ProfileButton } from "./ProfileButton";
import { SignOutButton } from "./SignOutButton";
import { ThemeSwitcher } from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";
import { UserProfileInfo } from "./UserProfileInfo";

type button = {
  title: string;
  icon: ReactNode;
  href: string;
};

interface UserMenuProps {
  userInfo?: ReactNode;
  buttons: button[];
}

export default function UserMenu({ userInfo, buttons }: UserMenuProps) {
  const { setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <UserAvatar />
      </PopoverTrigger>
      <PopoverContent className="absolute right-0 w-[280px] translate-x-4 space-y-2">
        {userInfo && userInfo}
        <Separator />
        {buttons &&
          buttons.map((btn, index) => (
            <>
              <Link key={index} href={btn.href}>
                <Button
                  variant="ghost"
                  className="mt-2 flex w-full justify-start gap-2 ps-1 text-base"
                >
                  {btn.icon}
                  {btn.title}
                </Button>
              </Link>
              <Separator />
            </>
          ))}
        <ThemeSwitcher setTheme={setTheme} />
        <Separator />
        <SignOutButton />
      </PopoverContent>
    </Popover>
  );
}
