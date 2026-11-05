"use client";

import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  totalFilteredCount?: number;
  totalRawCount?: number;
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50],
  totalFilteredCount,
  totalRawCount,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const currentRowsCount = table.getRowModel().rows.length;
  const filteredCount = totalFilteredCount ?? table.getFilteredRowModel().rows.length;

  const startRecord = filteredCount === 0 ? 0 : pageIndex * pageSize + 1;
  const endRecord = Math.min((pageIndex + 1) * pageSize, filteredCount);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-3 px-2 py-1 text-sm sm:flex-row">
      <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
        {filteredCount > 0 ? (
          <span>
            Mostrando{" "}
            <span className="font-semibold text-foreground">
              {startRecord}-{endRecord}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-foreground">
              {filteredCount}
            </span>{" "}
            registro(s)
            {totalRawCount && totalRawCount !== filteredCount ? (
              <span className="text-xs text-muted-foreground">
                {" "}
                (filtrados de {totalRawCount})
              </span>
            ) : null}
          </span>
        ) : (
          <span>0 registros</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            Linhas por página
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[72px] rounded-lg border-border/70 text-xs">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="rounded-xl">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`} className="text-xs">
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center text-xs font-medium text-muted-foreground sm:text-sm">
          Página{" "}
          <span className="mx-1 font-semibold text-foreground">
            {pageCount === 0 ? 0 : pageIndex + 1}
          </span>{" "}
          de{" "}
          <span className="mx-1 font-semibold text-foreground">
            {pageCount === 0 ? 1 : pageCount}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 rounded-lg lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Primeira página"
          >
            <ChevronsLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Página anterior"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8 rounded-lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Próxima página"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 rounded-lg lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Última página"
          >
            <ChevronsRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
