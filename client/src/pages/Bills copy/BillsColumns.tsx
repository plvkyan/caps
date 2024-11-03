


"use client"

// Lucide React Icons Import
import { MoreHorizontal } from "lucide-react";



// shadcn Components Import
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";

// shadcn Dropdown Menu Component Import
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



// Other Components Import
// Tanstack React Table Column Definition Component Import
import { ColumnDef } from "@tanstack/react-table";

// Table Header Component Import
import { DataTableColumnHeader } from "@/components/custom/table-header";



// Data and Types Import
// Bill Data and Type Import
import { 
    BillType 
} from "@/types/bill-type";

import { format } from "date-fns";





export const columns: ColumnDef<BillType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        accessorKey: "billName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bill" />
        )
    },
    {
        accessorKey: "billAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => {

            const amount = parseFloat( ( ( row.getValue("billAmount") as any) ) as any );
            const formatted = new Intl.NumberFormat("en-US", {

                style: "currency",
                currency: "PHP",

            }).format(amount);

            return <div className="font-regular"> {formatted} </div>
        }
    },
    {
        accessorKey: "billReceivers.billDue",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bill Due" />
        ),
        cell: ({ row }) => {

            const date = format( row.original.billReceivers[0].billDue, "yyyy/MM/dd");

            // const date = new Date(row.original.billReceivers.billDue).toLocaleDateString('en-US', {
            //     month : 'long',
            //     day : 'numeric',
            //     year : 'numeric'
            // }).split(' ').join(' ');

            return <div className="font-regular"> {date} </div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const bill = row.original

            return (

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>



                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(bill._id)}
                        >
                            Copy bill ID
                        </DropdownMenuItem>
                        <DropdownMenuItem> Archive Bill </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive"> Delete Bill </DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>
            )
        },
    },
]
