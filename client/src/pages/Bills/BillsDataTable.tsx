"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CircleCheck,
    CirclePlus,
    CircleX,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
// shadcn Input Component Import
import { Input } from "@/components/ui/input";
// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



// Custom Component Imports
// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";
// Custom Data Table Faceted Filter
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";
// Custom Data Table View Options
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";



// Data table Imports
// Data table column definitions imports
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";



// Utility Imports
// React Import
import { useEffect, useState } from "react";
// React Router Imports
// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
import { RESERVATION_DATA } from "@/data/reservation-data";
import { toast } from "sonner";
import { approveManyReservations, archiveManyReservations, rejectManyReservations } from "@/data/reservation-api";





interface ReservationData {
    _id: string;
}

interface BillTableProps<TData extends ReservationData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

// interface GlobalFilter {
//     globalFilter: any;
// }





export default function BillTable<TData extends ReservationData, TValue>({
    columns,
    data,
}: BillTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();



    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});



    // React Table
    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            globalFilter,
            sorting,
            rowSelection,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
    });

    // Check filtered State
    const isFiltered = table.getState().columnFilters.length > 0;



    // onClick Functions
    // Handle Archive Button Function
    const handleArchiveButton = async () => {
        try {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as ReservationData)._id);
            const response = await archiveManyReservations(selectedRowIds);

            if (response.ok) {
                sessionStorage.setItem("archiveSuccessful", "true");
                window.location.reload();
            } else {
                throw new Error("Error archiving reservations");
            }
        } catch (error) {
            toast.error((error as Error).message, { closeButton: true });
        }
    };
    // Handle Archive Button Function
    const handleApproveButton = async () => {
        try {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as ReservationData)._id);
            const response = await approveManyReservations(selectedRowIds);

            if (response.ok) {
                sessionStorage.setItem("approveSuccessful", "true");
                window.location.reload();
            } else {
                throw new Error("Error approving reservations");
            }
        } catch (error) {
            toast.error((error as Error).message, { closeButton: true });
        }
    };
    // Handle Archive Button Function
    const handleRejectButton = async () => {
        try {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as ReservationData)._id);
            const response = await rejectManyReservations(selectedRowIds);

            if (response.ok) {
                sessionStorage.setItem("rejectedSuccessful", "true");
                window.location.reload();
            } else {
                throw new Error("Error rejecting reservations");
            }
        } catch (error) {
            toast.error((error as Error).message, { closeButton: true });
        }
    };
    // Redirect to Reservation Form Function
    const navToReservationForm = () => {
        const reservationFormPath = "/reservations/new";
        navigate(reservationFormPath);
    }


    useEffect(() => {

        const intervalId = setInterval(() => {
            console.log("Is some page rows selected:", table.getIsSomePageRowsSelected());
            console.log("Selected rows:", table.getSelectedRowModel().rows);
        }, 1000000);

        return () => clearInterval(intervalId);

    })

    useEffect(() => {

        if (sessionStorage.getItem("approveSuccessful")) {
            toast.success("Reservation approved successfully", { closeButton: true });
            sessionStorage.removeItem("approveSuccessful");
        }

        if (sessionStorage.getItem("rejectedSuccessful")) {
            toast.success("Reservation rejected successfully", { closeButton: true });
            sessionStorage.removeItem("rejectedSuccessful");
        }

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("Reservation archived successfully", { closeButton: true });
            sessionStorage.removeItem("archiveSuccessful");
        }

    }, [])


    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl"> Reservations </h1>
                    <h3 className="font-light text-muted-foreground"> Looking for a specific reservation? </h3>
                </div>

                <div className="flex items-end gap-2">

                    <Button
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onClick={() => handleArchiveButton()}
                        size="sm"
                        variant="outline"
                    >
                        <Archive className="h-4 w-4" />
                        Archive
                    </Button>

                    <Button
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onClick={() => handleRejectButton()}
                        variant="outline"
                        size="sm"
                    >
                        <CircleX className="h-4 w-4 text-destructive" />
                        Mark as Rejected
                    </Button>
                    <Button
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onClick={() => handleApproveButton()}
                        variant="outline"
                        size="sm"
                    >
                        <CircleCheck className="h-4 w-4 text-primary" />
                        Mark as Approved
                    </Button>

                    <Button className="" onClick={navToReservationForm} size="sm" variant="default" >
                        <CirclePlus className="h-4 w-4" />
                        Create Reservation
                    </Button>

                </div>

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                <DataTableViewOptions table={table} label="Toggle Columns" />

                <DataTableFacetedFilter column={table.getColumn("reservationStatus")} title="Filter" options={RESERVATION_DATA} />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="items-center"
                    >
                        <X className="h-4 w-4" />
                        Reset
                    </Button>
                )}

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
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No reservations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </div>

            <BottomDataTablePagination table={table} />

        </>



    )

}




