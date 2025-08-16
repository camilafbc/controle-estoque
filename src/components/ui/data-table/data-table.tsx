"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { dateTimeFormatter } from "@/utils/utils";

import { Card, CardContent, CardFooter } from "../card";

import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  striped?: boolean;
  hoverEffect?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  striped = false,
  hoverEffect = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const renderCellContent = (
    cell: Cell<TData, unknown>,
    meta: {
      maxWidth?: string;
      type?: string;
    },
  ) => {
    const columnDef = cell.column.columnDef as any;
    const cellValue = cell.getValue();

    if (cellValue !== "" && cellValue !== null) {
      let content;
      switch (columnDef.meta?.type) {
        case "boolean":
          content =
            cellValue === true || cellValue === "S" || cellValue === 1 ? (
              <CheckCircle2 className="size-5 w-full text-center text-green-700" />
            ) : (
              <XCircle className="size-5 w-full text-center text-destructive" />
            );
          break;
        case "dateTime":
          content = cellValue ? (
            dateTimeFormatter(cellValue as string, "DD/MM/YYYY HH:mm")
          ) : (
            <p className="font-bold">-</p>
          );
          break;
        case "date":
          content = cellValue ? (
            dateTimeFormatter(cellValue as string, "DD/MM/YYYY")
          ) : (
            <p className="font-bold">-</p>
          );
          break;
        default:
          content = flexRender(columnDef.cell, cell.getContext());
      }

      return (
        <div
          className={`overflow-hidden text-ellipsis whitespace-nowrap max-w-[${
            meta.maxWidth || "1000px"
          }]`}
        >
          {content}
        </div>
      );
    } else {
      return <p className="font-bold">-</p>;
    }
  };

  return (
    <Card className="space-y-8 rounded-lg border-none shadow-none">
      <CardContent className="rounded-lg border p-0 shadow-sm">
        <Table className="overflow-x-scroll rounded-lg [&::-webkit-scrollbar]:hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn("transition-colors", {
                    "bg-muted/50 dark:bg-muted/20":
                      striped && row.index % 2 !== 0,
                    "hover:bg-muted/30": hoverEffect,
                  })}
                >
                  {row.getVisibleCells().map((cell) => (
                    // <TableCell key={cell.id} className="py-4">
                    //   {flexRender(
                    //     cell.column.columnDef.cell,
                    //     cell.getContext(),
                    //   )}
                    // </TableCell>
                    <TableCell
                      className={cn(
                        "p-1 text-base",
                        (cell.column.columnDef as any).meta?.type ===
                          "number" && "pe-4 text-right",
                        (cell.column.columnDef as any).meta?.type ===
                          "boolean" && "text-center",
                        (cell.column.columnDef as any).meta?.type === "date" &&
                          "pe-4 text-center",
                        (cell.column.columnDef as any).meta?.type ===
                          "string" && "ps-4",
                      )}
                      key={cell.id}
                      style={{
                        maxWidth:
                          (cell.column.columnDef as any).maxSize?.toString() +
                          "px",
                        minWidth:
                          (cell.column.columnDef as any).minSize?.toString() +
                          "px",
                        width:
                          (cell.column.columnDef as any).size?.toString() + "%",
                      }}
                    >
                      {renderCellContent(cell, {
                        maxWidth:
                          (cell.column.columnDef as any).maxSize?.toString() +
                          "px",
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  {isLoading ? (
                    <div
                      className="flex flex-col items-center justify-center"
                      // style={{ height: gridHeight }}
                    >
                      <ReloadIcon className="size-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    // <CustomNoRowsOverlay />
                    <div>Nenhum registro encontrado :(</div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end pe-4">
        <DataTablePagination table={table} />
      </CardFooter>
    </Card>
  );
}
