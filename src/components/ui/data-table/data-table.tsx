"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SearchX } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DataTablePagination } from "./data-table-pagination";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterValue?: string;
  onClearFilter?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  striped?: boolean;
  hoverEffect?: boolean;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
  totalRawCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  filterValue,
  onClearFilter,
  emptyTitle = "Nenhum registro encontrado",
  emptyDescription = "Cadastre um novo item ou aguarde novas movimentações.",
  striped = false,
  hoverEffect = true,
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 50],
  className,
  totalRawCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: defaultPageSize,
      },
    },
    state: {
      sorting,
    },
  });

  const isFilterActive = Boolean(filterValue && filterValue.trim().length > 0);

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all",
        className
      )}
    >
      <div className="relative w-full overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-border/70 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // Skeleton Loading moderno e suave
              Array.from({ length: Math.min(defaultPageSize, 6) }).map(
                (_, rowIndex) => (
                  <TableRow
                    key={`skeleton-row-${rowIndex}`}
                    className="border-b border-border/40"
                  >
                    {columns.map((_, colIndex) => (
                      <TableCell
                        key={`skeleton-cell-${rowIndex}-${colIndex}`}
                        className="px-4 py-3.5"
                      >
                        <div
                          className={cn(
                            "h-5 animate-pulse rounded-md bg-muted/60",
                            colIndex === 0
                              ? "w-16"
                              : colIndex === 1
                              ? "w-3/4"
                              : colIndex % 2 === 0
                              ? "w-1/2"
                              : "w-2/3"
                          )}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "border-b border-border/40 transition-colors",
                    striped && row.index % 2 !== 0 && "bg-muted/20",
                    hoverEffect && "hover:bg-muted/40"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3.5 align-middle text-sm text-foreground"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-64 p-6 text-center"
                >
                  {isFilterActive ? (
                    <EmptyState
                      icon={<SearchX className="size-6 text-muted-foreground" />}
                      title="Nenhum resultado encontrado"
                      description={`Não encontramos nenhum registro correspondente ao filtro "${filterValue}".`}
                      action={
                        onClearFilter ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={onClearFilter}
                            className="rounded-xl border-dashed hover:border-solid"
                          >
                            Limpar busca
                          </Button>
                        ) : undefined
                      }
                    />
                  ) : (
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                    />
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Barra de Paginação Integrada */}
      {!isLoading && (
        <div className="border-t border-border/70 bg-card/60 px-4 py-3">
          <DataTablePagination
            table={table}
            pageSizeOptions={pageSizeOptions}
            totalFilteredCount={data.length}
            totalRawCount={totalRawCount}
          />
        </div>
      )}
    </div>
  );
}
