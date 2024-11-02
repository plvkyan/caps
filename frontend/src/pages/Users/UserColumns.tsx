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
import { UserType } from "@/types/user-type";



// Utility imports
// date-fns format function Import
import { format } from "date-fns";





export const UserTableColumns: ColumnDef<UserType>[] = [
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
        accessorKey: "userBlkLt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Block and Lot" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>{row.original.userBlkLt}</span>
            )
        }
    },
    {
        accessorKey: "userStatus",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Membership Status" />
            )
        },
        cell: ({ row }) => {

            // Get the status of the user
            const status = row.original.userStatus;

            // Return a badge based on the status
            if (status === "Outstanding") {
                return <Badge variant="default"> {status} </Badge>
            }

            if (status === "Delinquent") {
                return <Badge variant="warning"> {status} </Badge>
            }

        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "userRole",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Role" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.userRole}
                </span>
            )
        }
    },
    {
        accessorKey: "userPosition",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Position" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.userPosition}
                </span>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Creation date" />
            )
        },
        cell: ({ row }) => {

            const date = row.getValue("createdAt") as any;
            const formattedDate = format(date, "PPP");

            return (
                <span>
                    {formattedDate}
                </span>
            )
        }
    },
]