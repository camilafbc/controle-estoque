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

const DialogVariants = cva("m-2 min-w-wd  bg-white dark:bg-background ", {
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
});

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
  modal = false,
  className,
}: MyDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen} modal={modal}>
      {open && !modal && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          // onClick={() => setOpenAlert(false)}
        />
      )}
      <DialogContent
        // className="min-w-sm max-w-5xl"
        className={cn(DialogVariants({ size }), className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Separator orientation="horizontal" />
        <div className="flex-1 overflow-y-auto py-4">{children}</div>
        {footerChildren && <DialogFooter>{footerChildren}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
