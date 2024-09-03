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

import * as DialogPrimitive from "@radix-ui/react-dialog"


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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/custom/table-pagination";

import { DataTableFacetedFilter } from "@/components/custom/table-filter";

import { PAYMENT_STATUSES } from "@/data/payment-data";
import { useNavigate } from "react-router-dom";



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



const DialogClose = DialogPrimitive.Close



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





    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
        },
        body: JSON.stringify({
            data: {
                attributes: {
                    billing: { email: 'kyanacademics@gmail.com' },
                    send_email_receipt: true,
                    show_description: true,
                    show_line_items: true,
                    cancel_url: 'https://localhost:5173/login',
                    success_url: 'https://localhost:5173/login',
                    line_items: [
                        {
                            currency: 'PHP',
                            amount: 20000,
                            description: 'May 2024 Monthly Due',
                            name: 'May 2024 Monthly Dues',
                            quantity: 1
                        }
                    ],
                    payment_method_types: [
                        'billease',
                        'card',
                        'dob',
                        'dob_ubp',
                        'brankas_bdo',
                        'brankas_landbank',
                        'brankas_metrobank',
                        'gcash',
                        'grab_pay',
                        'paymaya'
                    ],
                    description: 'May 2024 Monthly Due'
                }
            }
        })
    };

    const navigate = useNavigate();

    let word;

    const click = () => {

        fetch('https://api.paymongo.com/v1/checkout_sessions', options)
            .then(response => response.json())
            .then(response => word = response)
            .catch(err => console.error(err));

        const routeChange = () => {

            const path = word.data.attributes.checkout_url;
            window.location.replace(path);

        }

        routeChange()


    }







    return (

        <div className="">

            <div className="flex items-center pb-4 gap-4 max-[640px]:flex-col">

                <div className="flex gap-4 justify-between w-full">

                    <Input
                        placeholder="Search in Payments ..."
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)
                        }
                        className="p-3 w-full"
                    />

                    {table.getColumn("status") && (
                        <DataTableFacetedFilter
                            column={table.getColumn("status")}
                            title="Status"
                            options={PAYMENT_STATUSES}
                        />
                    )}


                </div>


                <Button
                    className="p-3 max-[640px]:w-full accent"
                    onClick={click}
                >
                    <CirclePlus className="h-6 w-6 pr-2" />
                    Create Payment
                </Button>
                <Dialog>

                    <DialogTrigger asChild>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">

                        <DialogHeader>
                            <DialogTitle> Create a new payment </DialogTitle>
                            <DialogDescription>
                                Create new payment for the members.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
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
                                <Textarea
                                    id="description"
                                    defaultValue="Our monthly dues."
                                    className="col-span-3 max-h-48"
                                    placeholder="Type your message here." />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    id="amount"
                                    defaultValue="₱1,000.00"
                                    className="col-span-3"
                                />
                            </div>

                        </div>

                        <DialogFooter>
                            <DialogPrimitive.Close>
                                <Button type="submit"> Create Payment </Button>
                            </DialogPrimitive.Close>
                        </DialogFooter>

                    </DialogContent>

                </Dialog>



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



            </div>

            <div className="flex items-center space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>

        </div>
    )
}
