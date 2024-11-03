


"use client"



// Lucide Icons Imports
import { CirclePlus } from "lucide-react";



// Other Component Imports
// Table Pagination Component Import
import { DataTablePagination } from "@/components/custom/table-pagination";



// shadcn Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// shadcn-related TanStack React Table Component Imports
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"



// Data and Type Imports



// Utility Imports
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useBillsContext } from "@/hooks/useBillsContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export function BillsDataTable<TData, TValue>({

    columns,
    data,

}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter,
            columnVisibility,
            sorting,
            rowSelection,
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



    const { dispatch } = useBillsContext();

    const [rows, setRows] = React.useState("") as any
    const { user } = useAuthContext();

    const navigate = useNavigate();


    const routeChange = (row) => {

        const fetchBills = async () => {

            const response = await fetch('http://localhost:4000/api/bills/details/' + row.original._id)

            const json = await response.json()

            if (response.ok) {

                console.log(json)
                dispatch({ type: 'SET_BILLS', payload: json })
                const path = '/bills/details/' + row.original._id
                navigate(path)

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchBills()



    }

    const newBillRoute = () => {

        const path = '/bills/form'
        navigate(path)

    }





    return (



        <div className="">

            <div className="flex items-center pb-4 gap-4 max-[640px]:flex-col">

                <div className="flex gap-4 justify-between w-full">

                    <Input
                        placeholder="Search in Bills ..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)
                        }
                        className="p-3 w-full"
                    />

                    {/* {table.getColumn("status") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("status")}
                            title="Status"
                            options={BILL_STATUSES}
                        />
                    )} */}

                </div>

                {
                    user.position === "Admin" && (

                        <DropdownMenu>
                            
                            <DropdownMenuTrigger>
                                <Button variant="outline">
                                    <CirclePlus className="h-6 w-6 pr-2" />
                                    Create
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>

                                <DropdownMenuItem onClick={newBillRoute}>
                                    Create New Bill
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    Create New Bill Type
                                </DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>

                    )
                }


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
                                    onClick={() => { routeChange(row); console.log(rows) }}
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



            </div>

            <div className="flex items-center space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>

        </div>
    )
}
