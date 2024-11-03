"use client"

import * as React from "react";

import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import { CirclePlus } from "lucide-react";

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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/custom/table-pagination";

import { DataTableFacetedFilter } from "@/pages/Admin/Users/user-table-filter";
import { USER_ROLE } from "@/data/user-data";

import UserForm from "@/pages/Admin/Users/UserForm"
import { Toaster } from "@/components/ui/toaster";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export function DataTable<TData, TValue>({



    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
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

                    {table.getColumn("isAdmin") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("isAdmin")}
                            title="User Role"
                            options={USER_ROLE}
                        />
                    )}


                </div>

                <UserForm />

                {/* <Dialog>

                    <DialogTrigger asChild>
                        <Button
                            className="p-3 max-[640px]:w-full accent"
                        >
                            <CirclePlus className="h-6 w-6 pr-2" />
                            Create User
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">

                        <DialogHeader>
                            <DialogTitle> Create a new user </DialogTitle>
                            <DialogDescription>
                                If creating an admin account, put their full name on the block and lot field and choose their corresponding position.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Block and Lot
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue="Monthly Due for April 2024"
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input 
                                    id="password"
                                    type="password"
                                    className="col-span-3 max-h-48" />
                            </div>
                            
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    isAdmin
                                </Label>
                                <Input
                                    id="boolean"
                                    type="String"
                                    placeholder="false"
                                    className="col-span-3"
                                />
                            </div>

                        </div>

                        <DialogFooter>
                            <Button type="submit"> Create User </Button>
                        </DialogFooter>

                    </DialogContent>

                </Dialog> */}



            </div>



            <div className="rounded-md border">



                <Table className="">

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
