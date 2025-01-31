"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

interface ComboboxProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export default function MyCombobox({
  options,
  placeholder = "Select an option...",
  label = "",
  onSelect,
  className = "",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onSelect) onSelect(newValue);
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="pointer-events-none z-50 max-h-[200px] w-[200px] overflow-auto p-0">
          <Command>
            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}`} />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
