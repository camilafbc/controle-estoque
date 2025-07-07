import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleInputErrorClass = (hasError: boolean) => {
  return hasError
    ? "bg-primary-foreground text-zinc-500 ring-2 ring-red-500 focus-visible:ring-2 focus-visible:ring-red-500"
    : "bg-primary-foreground text-zinc-500 focus-visible:ring-2";
};
