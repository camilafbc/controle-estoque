"use client";

import { cva, VariantProps } from "class-variance-authority";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const inputVariants = cva(
  "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-primary file:rounded-md file:p-1 file:text-primary-foreground file:cursor-pointer file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground placeholder:disabled:text-muted-foreground/50",
  {
    defaultVariants: {
      error: false,
      size: "default",
    },
    variants: {
      error: {
        false: "",
        true: "border-destructive focus-visible:ring-destructive shadow-destructive",
      },
      size: {
        default: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-3",
        sm: "h-8 rounded-md px-3 text-xs",
      },
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  error?: boolean;
  infoText?: string;
  label?: string;
  required?: boolean;
  selected: any;
  onSelect: VoidFunction;
}

const DatePickerInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error = false,
      id,
      infoText = "",
      label = "",
      required = false,
      size = "default",
      type,
      selected,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false); // Estado para controlar a abertura do popover

    return (
      <div className="flex w-full flex-col gap-1">
        <Label
          className={cn(
            error ? "text-destructive" : "",
            "text-xs font-semibold md:text-sm",
          )}
          htmlFor={id}
        >
          {label} {!!required && <span className="text-destructive">*</span>}
        </Label>
        <div className="group flex items-stretch">
          <input
            {...props}
            className={cn(
              inputVariants({ error, size }),
              className,
              "rounded-r-none border-r-0",
            )}
            id={id}
            maxLength={props.maxLength}
            ref={ref}
            type="text"
            readOnly // Impede a edição manual do input
            value={
              selected ? format(selected, "dd/MM/yyyy", { locale: ptBR }) : ""
            }
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-auto rounded-l-none border-[1px] border-l-0 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 group-focus-within:ring-1 group-focus-within:ring-ring",
                  error
                    ? "border-destructive shadow-destructive focus-visible:ring-destructive"
                    : "",
                )}
                type="button"
              >
                <CalendarIcon className="size-5 text-white" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 capitalize" align="start">
              <Calendar
                mode="single"
                locale={ptBR}
                captionLayout="dropdown"
                defaultMonth={new Date()}
                startMonth={new Date(2024, 6)}
                endMonth={new Date(2050, 9)}
                selected={selected}
                onSelect={onSelect}
                disabled={(date) => date < new Date("1900-01-01")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  },
);

DatePickerInput.displayName = "DatePickerInput";
export default DatePickerInput;
