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

import { useNavigate } from "react-router-dom";





export const ReservationTableColumns: ColumnDef<ReservationType>[] = [
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
        accessorKey: "_id",
        enableSorting: false,
    },
    {
        accessorKey: "reserveeBlkLt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Block and Lot" />
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
                <DataTableColumnHeader column={column} title="Amenities" />
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
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" className="justify-center" />
            )
        },
        cell: ({ row }) => {

            const lastIndex = row.original.reservationStatus.length;
            const status = row.original.reservationStatus[lastIndex - 1].status;
            console.log(status)

            return (
                <div className="flex items-center justify-center pr-4.5 w-full">
                    <Badge variant={
                        status === "Pending" ? "warning" :
                            status === "Approved" ? "default" :
                                status === "Rejected" ? "destructive" :
                                    "outline"
                    }>
                        {status}
                    </Badge>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "reservationDate",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reservation Date" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.getValue("reservationDate") as any
            const formattedDate = format(origDate, "PPP")

            return <div className="font-regular"> {formattedDate} </div>
        }
    },
]