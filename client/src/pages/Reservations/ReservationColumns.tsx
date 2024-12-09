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
import { ReservationType } from "@/types/reservation-type";



// Utility imports
// date-fns format function Import
import { format } from "date-fns";





export const ReservationTableColumns: ColumnDef<ReservationType>[] = [
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
        accessorKey: "reserveeBlkLt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Block and lot" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>{row.original.reserveeBlkLt}</span>
            )
        }
    },
    {
        accessorKey: "reservationType",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Type" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.reservationType}
                </span>
            )
        }
    },
    {
        accessorKey: "reservationStatus",
        accessorFn: (row) => {
            return row.reservationStatus[row.reservationStatus.length - 1].status;
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" className="justify-center" />
            )
        },
        cell: ({ row }) => {

            const lastIndex = row.original.reservationStatus.length;
            const status = row.original.reservationStatus[lastIndex - 1].status;

            return (
                <div className="flex items-center justify-center pr-5 w-full">
                    <Badge variant={
                        ["Pending", "Ongoing", "For Return"].some(s => s === status) ? "warning" :
                            ["Approved", "Returned", "Completed"].some(s => s === status) ? "default" :
                                ["Rejected", "Cancelled"].some(s => s === status) ? "destructive" :
                                    "outline"
                    }>
                        {status}
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {

            console.log(id);
            const lastStatus = row.original.reservationStatus[row.original.reservationStatus.length - 1].status;
            return value.includes(lastStatus);
        },
    },
    {
        accessorKey: "reservationDate",
        accessorFn: (row) => {
            return format(row.reservationDate, "PPP");
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reservation date" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.original.reservationDate;
            const formattedDate = format(origDate, "PP")

            return <div className="font-regular"> {formattedDate} </div>
        },
        filterFn:
            (row, id, value) => {

                console.log(id);

                const date = new Date(row.original.reservationDate);

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
                <DataTableColumnHeader column={column} title="Created at" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.original.createdAt;
            const formattedDate = format(origDate, "PP")

            return <div className="font-regular"> {formattedDate} </div>
        }
    }
]