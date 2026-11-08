"use client";

import { Edit3, Eye, MousePointer, Trash2, TriangleAlert } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface DataTableActionsProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
  item?: string;
  justViewMode?: boolean;
  onClick: () => void;
  tooltipText?: string;
  loading?: boolean;
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
          className={cn(
            "size-8 rounded-lg p-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            className
          )}
          disabled={disabled}
          onClick={onClick}
          variant="ghost"
          size="icon"
        >
          {children}
        </Button>
      </TooltipTrigger>
      {tooltipText && <TooltipContent>{tooltipText}</TooltipContent>}
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
          className={cn(
            "size-8 rounded-lg p-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            className
          )}
          disabled={disabled}
          onClick={onClick}
          variant="ghost"
          size="icon"
        >
          {justViewMode ? (
            <Eye className="size-4" />
          ) : (
            <Edit3 className="size-4" />
          )}
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
          className={cn(
            "size-8 rounded-lg p-0 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
            className
          )}
          disabled={disabled}
          onClick={onClick}
          variant="ghost"
          size="icon"
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
  loading = false,
}: DataTableActionsProps) => {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "size-8 rounded-lg p-0 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
              className
            )}
            disabled={disabled || loading}
            onClick={() => setOpenAlert(true)}
            variant="ghost"
            size="icon"
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Excluir registro</TooltipContent>
      </Tooltip>

      {openAlert && (
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <TriangleAlert className="size-5" />
                </div>
                <div>
                  <AlertDialogTitle className="text-base font-semibold">
                    Exclusão de {title ?? "Registro"}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-1 text-sm text-muted-foreground">
                    Tem certeza de que deseja excluir{" "}
                    {item ? (
                      <span className="font-semibold text-foreground">
                        &quot;{item}&quot;
                      </span>
                    ) : (
                      "este registro"
                    )}
                    ? Esta ação não poderá ser desfeita.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4 gap-2 sm:gap-0">
              <Button
                onClick={() => setOpenAlert(false)}
                variant="outline"
                className="rounded-xl"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  onClick();
                  setOpenAlert(false);
                }}
                loading={loading}
                variant="destructive"
                className="rounded-xl"
              >
                {loading ? "Excluindo..." : "Confirmar Exclusão"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
