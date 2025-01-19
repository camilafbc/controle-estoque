import { forwardRef } from "react";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center overflow-hidden justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:text-white",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        icon: "h-9 w-9",
        lg: "h-10 rounded-md px-8",
        sm: "h-8 rounded-md px-3 text-xs",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        info: "bg-info text-info-foreground shadow-sm hover:bg-info/80",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/80",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/80",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, className, loading = false, size, variant, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ className, size, variant }))}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <button
        className={cn(buttonVariants({ className, size, variant }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
        type={props.type || "button"}
      >
        {loading ? (
          <div className="flex items-center">
            <ReloadIcon className="mr-2 size-4 animate-spin" />
            Aguarde
          </div>
        ) : (
          props.children
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
