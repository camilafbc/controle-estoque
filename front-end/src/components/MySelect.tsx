import React, { forwardRef } from "react";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import { Info } from "lucide-react";

import { cn } from "@/lib/utils";

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
                  "text-sm font-semibold",
                )}
                htmlFor={id}
              >
                {label}{" "}
                {required && <span className="text-destructive">*</span>}
              </Label>
            </div>
          )}

          <SelectTrigger className={className} id={id} size={size || "default"}>
            {rest.value ? (
              <SelectValue />
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </SelectTrigger>
        </div>

        <SelectContent>
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
