


"use client"



// shadcn Component Imports

// shadcn Dialog Import
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

// shadcn Input Import
import { Input } from "@/components/ui/input";

// shadcn Label Import
import { Label } from "@/components/ui/label";

// shadcn Table Import
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// shadcn Toaster Import
import { Toaster } from "@/components/ui/toaster";



// Lucide Icons Import



// Other Components Import

// Tanstack React Table Import
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

// Data Table Pagination Import
import { DataTablePagination } from "@/components/custom/table-pagination";

// Data Table Faceted Filter Import
import { DataTableFacetedFilter } from "@/pages/Admin/Users/user-table-filter";

// User Creation Form Import
import UserForm from "@/pages/Admin/Users/UserForm"



// Data Import
import { USER_POSITION } from "@/data/user-data";


// Utility Imports
import * as React from "react";





// 
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {




    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState({});
    const [sorting, setSorting] = React.useState<SortingState>([]);



    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            columnVisibility: { _id: false },
            globalFilter,
            rowSelection,
            sorting,
        },
        enableRowSelection: true,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })




    return (



        <div className="">



            <div className="flex items-center pb-4 gap-4 max-[640px]:flex-col">

                <div className="flex gap-4 justify-between w-full">

                    <Input
                        placeholder="Search in Users ..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)
                        }
                        className="p-3 w-full"
                    />

                    {table.getColumn("role") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("role")}
                            title="User Role"
                            options={USER_POSITION}
                        />
                    )}

                </div>

                {window.location.pathname == "/users" &&
                    (
                        <UserForm />
                    )
                }

            </div>



            <div className="rounded-md border">



                <Table className="bg-card">

                    <TableHeader>

                        {table.getHeaderGroups().map((headerGroup) =>
                        (
                            <TableRow key={headerGroup.id}>

                                {headerGroup.headers.map(
                                    (header) => {
                                        return (

                                            <TableHead key={header.id}>

                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()

                                                    )
                                                }

                                            </TableHead>
                                        )
                                    }
                                )
                                }
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
                                        <TableCell className="" key={cell.id}>
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

                <Toaster />


            </div>

            <div className="flex items-center space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>



        </div>
    )
}
