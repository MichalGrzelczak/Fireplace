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
import { FC, useEffect, useRef, useState } from "react";

import { Project } from "@/app/app/projects/columns";
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
  project: Project[];
  columns: ColumnDef<Project, any>[];
  onRowClick: (project: Project | undefined) => void;
}

export const ProjectTable: FC<ReactTableProps> = ({
  project,
  columns,
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

  const table = useReactTable({
    data: project,
    columns,
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

  useEffect(() => {
    console.log("rowPinning:", rowPinning);
  }, [rowPinning]);

  const { rows } = table.getRowModel();

  //The virtualizer needs to know the scrollable container element
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
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
    return project.find((project) => project.uuid === id);
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
        <TableHeader className="grid sticky top-0 z-50 bg-background">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => {
                console.log("header", header);
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() + "px" }}
                    className={cn(
                      header.id === "isFav" ? "flex-none !w-[60px]" : "flex-1",
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
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
                onClick={() => {
                  onRowClick(getProjectById(row.id));
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  console.log("cell: ", cell);
                  return (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() + "px" }}
                      className={cn(
                        cell.column.id === "isFav"
                          ? "flex-none !w-[60px]"
                          : "flex-1",
                        "truncate p-space-3 flex",
                      )}
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
          })}
        </TableBody>
      </Table>
    </div>

    // <Table>

    //   <TableBody>
    //     {table.getRowModel().rows?.length ? (
    //       table.getRowModel().rows.map((row) => (
    //         <TableRow
    //           key={row.id}
    //           data-state={row.getIsSelected() && "selected"}
    //           className="h-size-1"
    //           onClick={() => {
    //             onRowClick(getProjectById(row.id));
    //           }}
    //         >
    //           {row.getVisibleCells().map((cell) => (
    //             <TableCell
    //               key={cell.id}
    //               style={{ maxWidth: cell.column.getSize() + "px" }}
    //               className="truncate p-space-3"
    //             >
    //               {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //             </TableCell>
    //           ))}
    //         </TableRow>
    //       ))
    //     ) : (
    //       <TableRow>
    //         <TableCell
    //           colSpan={columns.length}
    //           className="h-size-64 text-center"
    //         >
    //           No results.
    //         </TableCell>
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
  );
};

// <Table>
//   <TableHeader className="sticky bg-background top-0 border-b-2 z-50">
//     {table.getHeaderGroups().map((headerGroup) => (
//         <TableRow key={headerGroup.id}>
//           {headerGroup.headers.map((header) => {
//             return (
//                 <TableHead
//                     key={header.id}
//                     style={{ maxWidth: header.getSize() + "px" }}
//                     className="px-space-3 py-space-2 h-size-4 text-black text-fontSize-0 whitespace-nowrap"
//                 >
//                   {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext(),
//                       )}
//                 </TableHead>
//             );
//           })}
//         </TableRow>
//     ))}
//   </TableHeader>
//   <TableBody>
//     {table.getRowModel().rows?.length ? (
//         table.getRowModel().rows.map((row) => (
//             <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 className="h-size-1"
//                 onClick={() => {
//                   onRowClick(getProjectById(row.id));
//                 }}
//             >
//               {row.getVisibleCells().map((cell) => (
//                   <TableCell
//                       key={cell.id}
//                       style={{ maxWidth: cell.column.getSize() + "px" }}
//                       className="truncate p-space-3"
//                   >
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//               ))}
//             </TableRow>
//         ))
//     ) : (
//         <TableRow>
//           <TableCell
//               colSpan={columns.length}
//               className="h-size-64 text-center"
//           >
//             No results.
//           </TableCell>
//         </TableRow>
//     )}
//   </TableBody>
// </Table>

// {table.getTopRows().map((row) => (
//     <TableRow
//         style={{
//           backgroundColor: "lightblue",
//           position: "sticky",
//           top:
//               row.getIsPinned() === "top"
//                   ? `${row.getPinnedIndex() * 26 + 48}px`
//                   : undefined,
//         }}
//         key={row.id}
//         data-state={row.getIsSelected() && "selected"}
//         className="h-size-1"
//         onClick={() => {
//           onRowClick(getProjectById(row.id));
//         }}
//     >
//       {row.getVisibleCells().map((cell) => (
//           <TableCell
//               key={cell.id}
//               style={{ maxWidth: cell.column.getSize() + "px" }}
//               className="truncate p-space-3"
//           >
//             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//           </TableCell>
//       ))}
//     </TableRow>
// ))}
