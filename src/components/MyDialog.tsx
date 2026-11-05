import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

const DialogVariants = cva(
  "m-2 flex max-h-[95vh] min-w-0 flex-col bg-white dark:bg-background",
  {
    variants: {
      size: {
        default: "max-w-lg max-h-[95vh]",
        sm: "max-w-md max-h-[95vh]",
        lg: "max-w-3xl max-h-[95vh]",
        xl: "max-w-5xl max-h-[95vh]",
        xxl: "max-w-[80vw] max-h-[95vh]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface MyDialogProps extends VariantProps<typeof DialogVariants> {
  open: boolean;
  setIsOpen: (state: boolean) => void;
  title: string;
  className?: string;
  description?: string;
  size?: "default" | "sm" | "lg" | "xl";
  children?: ReactNode;
  footerChildren?: ReactNode;
  modal?: boolean;
}

const MyDialog = ({
  open,
  setIsOpen,
  title,
  description,
  children,
  footerChildren,
  size = "default",
  modal = true,
  className,
}: MyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen} modal={modal}>
      <DialogContent
        onWheelCapture={(e) => e.stopPropagation()}
        className={cn(DialogVariants({ size }), className)}
      >
        <DialogHeader className="shrink-0 pr-8 text-left">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Separator orientation="horizontal" />
        <div className="min-h-0 flex-1 overflow-y-auto px-1 py-4">
          {children}
        </div>
        {footerChildren && (
          <DialogFooter className="shrink-0 border-t pt-4">
            {footerChildren}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
