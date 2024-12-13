"use client";



// Imports
// Lucide React Icons Imports



// shadcn Components Imports
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
import { Badge } from "@/components/ui/badge";

const PHPesos = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
});

const userFunction = () => {

    return location.pathname.split('/').pop() || '';
}




export const UserBillTableColumns: ColumnDef<BillType>[] = [
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
        accessorFn: (row) => {

            if (row.billType === "One-time") {
                return "One-time";
            }

            if (row.billType === "Recurring") {
                const recurringType = row.billRecurringDate;
                return recurringType;
            }

        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Type" />
            )
        },
        cell: ({ row }) => {
            const type = row.original.billType;

            if (type === "One-time") {
                return (
                    <div>
                        <span> {type} </span>
                    </div>
                )
            }

            if (type === "Recurring") {

                const recurringType = row.original.billRecurringDate;

                return (
                    <div>
                        {
                            recurringType === "3d" ? <span> Every three (3) days </span> :
                                recurringType === "1w" ? <span> Every week </span> :
                                    recurringType === "2w" ? <span> Every two (2) weeks </span> :
                                        recurringType === "1m" ? <span> Every month </span> :
                                            recurringType === "2m" ? <span> Every two (2) months </span> :
                                                recurringType === "3m" ? <span> Every three (3) months </span> :
                                                    recurringType === "6m" ? <span> Every six (6) months </span> :
                                                        recurringType === "1y" ? <span> Every year </span> : <span> {type} </span>
                        }
                    </div>
                )
            }
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        }
    },
    {
        accessorKey: "billAmount",
        accessorFn: (row) => {
            return row.billAmount;
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Amount" className="justify-end" />
            )
        },
        cell: ({ row }) => {

            const amount = row.original.billAmount;

            return (
                <div className="flex justify-end">
                    <span> {PHPesos.format(amount)} </span>
                </div>
            )
        },
    },
    {
        accessorKey: "billStatus",
        accessorFn: (row) => {

            if (row.billCreatorId === userFunction()) {
                const payors = row.billPayors;
                const paidCount = payors.filter(payor => payor.billStatus === "Paid").length;

                if (paidCount === payors.length) {
                    return "Paid";
                }

                if (paidCount === 0) {
                    return "Pending";
                }

                if (paidCount > 0 && paidCount < payors.length) {
                    return "Partially paid";
                }
            } else if (row.billCreatorId !== userFunction()) {
                return row.billPayors.find(payor => payor.payorId === userFunction())?.billStatus;
            }

        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Status" />
            )
        },
        cell: ({ row }) => {

            // All bill payors
            const payors = row.original.billPayors;

            // Count the number of payors with a paid status
            const payorPaidCount = payors.filter(payor => payor.billStatus === "Paid").length;

            if (row.original.billCreatorId === userFunction()) {
                return (
                    <div>
                        <span> {payorPaidCount} out of {payors.length} paid </span>
                    </div>
                )
            } else if (row.original.billCreatorId !== userFunction()) {
                const status = payors.find(payor => payor.payorId === userFunction());

                return (
                    <div>
                        <Badge variant={
                            status?.billStatus === "Pending" ? "warning" :
                                status?.billStatus === "Paid" ? "default" :
                                    status?.billStatus === "Overdue" ? "destructive" :
                                        "outline"
                        }>
                            {status?.billStatus}
                        </Badge>
                    </div>
                )
            }

        },
        filterFn: (row, id, value) => {

            if (row.original.billCreatorId !== userFunction()) {
                return value.includes(row.original.billPayors.find(payor => payor.payorId === userFunction())?.billStatus);
            } else if (row.original.billCreatorId === userFunction()) {
                return value.includes(row.getValue(id));
            }

        }
    },
    {
        accessorKey: "billDueDate",
        accessorFn: (row) => {
            return format(row.billDueDate, "PPP");
        },
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Due date" />
            )
        },
        cell: ({ row }) => {

            const origDate = row.original.billDueDate;
            const formattedDate = format(origDate, "PP")

            return <div className="font-regular"> {formattedDate} </div>
        },
        filterFn: (row, id, value) => {
            console.log(id);
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