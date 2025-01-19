import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Label } from "./label";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Eye, EyeOff, Info } from "lucide-react";
import { Button } from "./button";

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
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isTypePassword = type === "password";
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
      <div className="flex w-full flex-col gap-1">
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
                error ? "text-destructive" : "",
                "text-xs font-semibold md:text-sm",
              )}
              htmlFor={id}
            >
              {label}{" "}
              {!!required && <span className="text-destructive">*</span>}
            </Label>
          </div>
        )}
        <div className="group flex items-stretch">
          <input
            {...props}
            className={cn(
              inputVariants({ error, size }),
              className,
              isTypePassword ? "rounded-r-none border-r-0" : "",
            )}
            id={id}
            maxLength={props.maxLength}
            ref={ref}
            type={isTypePassword ? (showPassword ? "text" : "password") : type}
          />
          {isTypePassword && (
            <Button
              className={cn(
                "h-auto rounded-l-none border-[1px] border-l-0 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 group-focus-within:ring-1 group-focus-within:ring-ring",
                error
                  ? "border-destructive shadow-destructive focus-visible:ring-destructive"
                  : "",
              )}
              onClick={togglePasswordVisibility}
              size="icon"
              tabIndex={-1}
              type="button"
            >
              {showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
