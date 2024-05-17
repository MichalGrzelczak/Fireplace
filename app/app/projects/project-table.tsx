"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  GroupingState,
  RowPinningState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FC, MouseEvent, useMemo, useRef, useState } from "react";

import { Project } from "@/app/app/projects/columns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface ReactTableProps {
  projects: Project[];
  columns: ColumnDef<Project, any>[];
  onRowClick?: (
    e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    project: Project | undefined,
  ) => void;
  loading?: boolean;
}

export const ProjectTable: FC<ReactTableProps> = ({
  projects,
  columns,
  loading,
  onRowClick,
}: ReactTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [rowPinning, setRowPinning] = useState<RowPinningState>({
    top: [],
    bottom: [],
  });
  const [keepPinnedRows, setKeepPinnedRows] = useState(true);

  const tableData = useMemo(
    () => (loading ? Array(30).fill({}) : projects),
    [loading, projects],
  );

  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: <Skeleton className="h-[30px] w-full" />,
          }))
        : columns,
    [loading, columns],
  );

  // @ts-ignore
  const table = useReactTable({
    data: tableData,
    columns: tableColumns as any,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.uuid,
    onSortingChange: setSorting,
    onRowPinningChange: setRowPinning,
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    keepPinnedRows,
    state: {
      sorting,
      grouping,
      columnFilters,
      rowPinning,
    },
  });

  const { rows } = table.getRowModel();

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 56, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.uuid === id);
  };

  return (
    <div
      ref={tableContainerRef}
      style={{
        overflow: "auto",
        position: "relative",
        height: "100%",
      }}
    >
      <Table style={{ display: "grid" }}>
        <TableHeader className="grid sticky top-0 z-50 bg-background border-b-2 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize() + "px",
                      flex:
                        header.id === "isFav"
                          ? `0 1 ${header.getSize()}px`
                          : `1 1 ${header.getSize()}px`,
                    }}
                    className={cn(
                      "flex items-center px-space-3 py-space-2 h-size-4 text-black text-fontSize-0 whitespace-nowrap",
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
          }}
          className="grid relative"
        >
          {rowVirtualizer.getVirtualItems()?.length
            ? rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-index={virtualRow.index} //needed for dynamic row height measurement
                    ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                    className="h-size-1 flex absolute w-full"
                    style={{
                      transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    }}
                    onClick={(e) => {
                      onRowClick && onRowClick(e, getProjectById(row.id));
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell
                          key={cell.id}
                          style={{
                            width: cell.column.getSize() + "px",
                            flex:
                              cell.column.id === "isFav"
                                ? `0 1 ${cell.column.getSize()}px`
                                : `1 1 ${cell.column.getSize()}px`,
                          }}
                          className={cn("truncate p-space-3 flex")}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : !loading && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-size-64 text-center w-full flex items-center justify-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
        </TableBody>
      </Table>
    </div>
  );
};
