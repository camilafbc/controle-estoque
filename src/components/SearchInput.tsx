import { Search } from "lucide-react";

import { Input, InputProps } from "@/components/ui/input";

type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
} & Omit<InputProps, "onChange">;

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar...",
  icon = <Search size={14} />,
  containerClassName = "",
  ...inputProps
}: SearchInputProps) {
  return (
    <div
      className={`group flex w-full max-w-[400px] items-center rounded-md border border-input bg-card px-2 shadow-sm focus-within:ring-1 focus-within:ring-orange-500 ${containerClassName}`}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <Input
        type="text"
        placeholder={placeholder}
        className="border-none bg-transparent px-2 focus:outline-none focus-visible:ring-0"
        value={value}
        onChange={onChange}
        {...inputProps}
      />
    </div>
  );
}
