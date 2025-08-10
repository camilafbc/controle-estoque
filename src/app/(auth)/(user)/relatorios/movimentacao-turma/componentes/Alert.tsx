import { TriangleAlert } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  text: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Alert = ({ text, open, onOpenChange }: AlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-row items-end gap-2">
            <TriangleAlert className="h-8 w-8 font-bold text-orange-500" />
            <p className="text-xl font-semibold">Atenção!</p>
          </div>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        {text}
        <AlertDialogFooter>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
