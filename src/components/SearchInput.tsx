"use client";

import { Search, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";

type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  placeholder?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
} & Omit<InputProps, "onChange">;

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Buscar...",
  icon = <Search className="size-4" />,
  containerClassName = "",
  ...inputProps
}: SearchInputProps) {
  return (
    <div
      className={`group flex w-full max-w-[420px] items-center rounded-xl border border-input/80 bg-card px-3 shadow-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 ${containerClassName}`}
    >
      {icon && (
        <span className="text-muted-foreground transition-colors group-focus-within:text-primary">
          {icon}
        </span>
      )}
      <Input
        type="search"
        placeholder={placeholder}
        className="h-10 border-none bg-transparent px-2.5 text-sm focus:outline-none focus-visible:ring-0"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {value && onClear && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-6 rounded-full p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={onClear}
          aria-label="Limpar busca"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
