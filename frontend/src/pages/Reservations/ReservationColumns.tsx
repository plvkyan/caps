"use client";



// Imports
// Lucide React Icons Imports



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
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
        accessorKey: "reserveeBlkLt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Block and Lot" />
            )
        },
    },
    {
        accessorKey: "amenityName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Amenity" />
            )
        },
    },
    {
        accessorKey: "reservationStatus",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" />
            )
        },
    },
    {
        accessorKey: "reservationDate",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Reservation Date" />
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => console.log(row.original)}
                >
                    View
                </Button>
            )
        }
    }
]