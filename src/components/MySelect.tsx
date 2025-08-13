import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import { Info, Loader2 } from "lucide-react";
import React, { forwardRef } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type SelectOptions = Omit<SelectItemProps, "value"> & {
  label: string;
  value: null | number | string | undefined;
};

export interface MySelectProps extends SelectProps {
  className?: string;
  error?: boolean;
  id?: string;
  infoText?: string;
  label?: string;
  options: SelectOptions[];
  placeholder?: string;
  required?: boolean;
  size?: "default" | "lg" | "sm";
  loading?: boolean;
}

const MySelect = forwardRef<HTMLDivElement, MySelectProps>(
  (
    {
      className = "",
      error = false,
      id = "",
      infoText = "",
      label = "",
      options = [],
      placeholder = "Selecione uma opção...",
      required = false,
      size,
      loading = false,
      ...rest
    },
    ref,
  ) => {
    return (
      <Select {...rest} value={rest.value || rest.defaultValue}>
        <div className="flex flex-col gap-1" ref={ref}>
          {label && (
            <div className="flex items-center">
              {infoText && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-info mr-1 size-3" />
                  </TooltipTrigger>
                  <TooltipContent>{infoText}</TooltipContent>
                </Tooltip>
              )}
              <Label
                className={cn(
                  error && "text-destructive",
                  required && "font-bold",
                  "text-sm font-semibold",
                )}
                htmlFor={id}
              >
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </Label>
            </div>
          )}

          <SelectTrigger
            className={cn(
              className,
              error && "border-destructive",
              "flex min-w-[200px] items-center justify-between px-2",
            )}
            id={id}
            size={size || "default"}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin text-muted-foreground" />
                <>Aguarde...</>
              </>
            ) : rest.value ? (
              <SelectValue className="whitespace-nowrap" />
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </SelectTrigger>
        </div>

        <SelectContent className="scrollbar-class pointer-events-auto overflow-y-scroll">
          {options.map((option) => (
            <SelectItem
              defaultValue={
                rest.defaultValue !== undefined && rest.defaultValue !== null
                  ? rest.defaultValue.toString()
                  : (null as any)
              }
              disabled={option.disabled}
              key={option.value}
              value={
                option.value !== undefined && option.value !== null
                  ? option.value.toString()
                  : (null as any)
              }
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  },
);

MySelect.displayName = "MySelect";

export { MySelect };
