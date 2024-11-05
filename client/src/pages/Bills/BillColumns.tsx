"use client";



// Imports
// Lucide React Icons Imports



// shadcn Components Imports
// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge";
// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";



// Custom Components Imports
// Custom Data Table Column Header Import
import { DataTableColumnHeader } from "@/components/custom/DataTableColumnHeader";

// Data table imports
// Data table column definitions imports
import { ColumnDef } from "@tanstack/react-table";



// This type is used to define the shape of our data. 
// You can use a Zod schema here if you want.
// Type definitions are a great way to ensure that your data is always in the shape you expect.
// This can help prevent bugs and make your code easier to understand.
// Type Imports
import { BillType } from "@/types/bill-type";



// Utility imports
// date-fns format function Import
import { format } from "date-fns";





export const BillTableColumns: ColumnDef<BillType>[] = [
    {
        accessorKey: "_id",
        enableSorting: false,
    },
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
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "billTitle",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Title" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>{row.original.billTitle}</span>
            )
        }
    },
    {
        accessorKey: "billType",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Type" />
            )
        },
        cell: ({ row }) => {
            return (
                <span> {row.original.billType} </span>
            )
        }
    },
    {
        accessorKey: "billAmount",
        accessorFn: (row) => {
            return row.billAmount;
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Amount" />
            )
        },
        cell: ({ row }) => {

            const currency = row.original.billCurrency;
            const amount = row.original.billAmount;

            return (
                <span> {currency + " " + amount} </span>
            )
        },
    },
    {
        accessorKey: "billDueDate",
        accessorFn: (row) => {
            return format(row.billDueDate, "PPP");
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Due Date" className="ml-7 justify-center" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.original.billDueDate;
            const formattedDate = format(origDate, "PP")

            return <div className="font-regular text-center"> {formattedDate} </div>
        },
        filterFn:
            (row, id, value) => {
                const date = new Date(row.original.billDueDate);

                const { from: start, to: end } = value as { from: Date, to: Date };

                return date >= start && date <= end;
            }
    },
    {
        accessorKey: "createdAt",
        accessorFn: (row) => {
            return format(row.createdAt, "PPP");
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Created At" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.original.createdAt;
            const formattedDate = format(origDate, "PP")

            return <div className="font-regular ml-1"> {formattedDate} </div>
        }
    }
]