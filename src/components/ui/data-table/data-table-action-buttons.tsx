import { Edit, Eye, MousePointer, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../alert-dialog";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";

interface DataTableActionsProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  item?: string;
  justViewMode?: boolean;
  onClick: () => void;
  tooltipText?: string;
}

export const DataTableAction = ({
  children,
  className,
  disabled = false,
  onClick,
  tooltipText,
}: DataTableActionsProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("size-8 p-0 hover:text-primary", className)}
          disabled={disabled}
          onClick={onClick}
          variant={"ghost"}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export const DataTableEditAction = ({
  className,
  disabled = false,
  justViewMode = false,
  onClick,
  tooltipText,
}: DataTableActionsProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("size-8 p-0 hover:text-primary", className)}
          disabled={disabled}
          onClick={onClick}
          variant={"ghost"}
        >
          {justViewMode && <Eye className="size-4" />}
          {!justViewMode && <Edit className="size-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {tooltipText || (justViewMode ? "Visualizar" : "Editar")}
      </TooltipContent>
    </Tooltip>
  );
};

export const DataTableSelectAction = ({
  className,
  disabled = false,
  onClick,
}: DataTableActionsProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("size-8 p-0 hover:text-primary", className)}
          disabled={disabled}
          onClick={onClick}
          variant={"ghost"}
        >
          <MousePointer className="size-4" />
        </Button>
      </TooltipTrigger>

      <TooltipContent>Selecionar</TooltipContent>
    </Tooltip>
  );
};

export const DataTableDeleteAction = ({
  className,
  disabled = false,
  title,
  item,
  onClick,
}: DataTableActionsProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn("size-8 p-0 hover:text-destructive", className)}
            disabled={disabled}
            onClick={() => setOpenAlert(true)}
            variant={"ghost"}
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>

        <TooltipContent>Excluir registro</TooltipContent>
      </Tooltip>
      {openAlert && (
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-end gap-2">
                <TriangleAlert className="size-8 font-bold text-orange-400" />
                <p className="text-xl font-semibold">Exclusão de {title}</p>
              </div>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Deseja Excluir &quot;{item}&quot; ?
            </AlertDialogDescription>
            <AlertDialogFooter>
              <Button onClick={() => setOpenAlert(false)} variant={"secondary"}>
                Cancelar
              </Button>
              <Button
                onClick={onClick}
                className="bg-green-700 hover:bg-green-700/90"
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
