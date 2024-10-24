"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CircleCheck,
    CirclePlus,
    CircleX,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
// shadcn Input Component Import
import { Input } from "@/components/ui/input";
// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



// Custom Component Imports
// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";
// Custom Data Table Faceted Filter
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";



// Data table Imports
// Data table column definitions imports
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";



// Utility Imports
// React Import
import { useState } from "react";



// Types
import { RESERVATION_DATA } from "@/data/reservation-data";
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";



interface ReservationTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

// interface GlobalFilter {
//     globalFilter: any;
// }





export function ReservationTable<TData, TValue>({
    columns,
    data,
}: ReservationTableProps<TData, TValue>) {

    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>([]);
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});



    // React Table
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            globalFilter,
            sorting,
            rowSelection,
        },
    })

    const isFiltered = table.getState().columnFilters.length > 0;





    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">

                    <h1 className="font-semibold text-2xl"> Reservations </h1>
                    <h3 className="font-light"> Looking for a specific reservation? </h3>

                </div>

                <div className="flex items-end gap-2">

                    <Button disabled={ !table.getIsSomePageRowsSelected() } variant="outline" size="sm">
                        <Archive className="h-4 w-4" />
                        Archive
                    </Button>

                    <Button disabled={ !table.getIsSomePageRowsSelected() } variant="outline" size="sm">
                        <CircleX className="h-4 w-4 text-destructive" />
                        Mark as Rejected
                    </Button>
                    <Button  disabled={ !table.getIsSomePageRowsSelected() }variant="outline" size="sm">
                        <CircleCheck className="h-4 w-4 text-primary" />
                        Mark as Approved
                    </Button>

                    <Button className="green-500" onClick={ () => { } } size="sm" variant="default" >
                        <CirclePlus className="h-4 w-4" />
                        Create Reservation
                    </Button>

                </div>

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />
  
                <DataTableViewOptions table={table} />

                <DataTableFacetedFilter column={table.getColumn("reservationStatus")} title="Status" options={RESERVATION_DATA} />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="items-center"
                    >
                        <X className="h-4 w-4" />
                        Reset
                    </Button>
                )}

            </div>



            <div className="rounded-md border">

                <Table className="bg-card">

                    <TableHeader>

                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}

                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </div>

            <BottomDataTablePagination table={table} />

        </>



    )

}




