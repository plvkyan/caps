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
    getPaginationRowModel,
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
import { approveManyReservations, archiveManyReservations, getAllReservations, rejectManyReservations } from "@/data/reservation-api";
import { useAuthContext } from "@/hooks/useAuthContext";





interface ReservationData {
    _id: string;
}

interface ReservationTableProps<TData extends ReservationData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

// interface GlobalFilter {
//     globalFilter: any;
// }





export default function ReservationTable<TData extends ReservationData, TValue>({
    columns,
    data,
}: ReservationTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();
    // useAuthContext Hook
    const { user } = useAuthContext();


    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});
    // Reservations State
    const [reservations, setReservations] = useState<[]>([]);



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
        getPaginationRowModel: getPaginationRowModel(),
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
            const response = await approveManyReservations(selectedRowIds, user.id, user.blkLt, user.position);

            if (response.ok) {
                sessionStorage.setItem("approveSuccessful", selectedRowIds.length.toString() + " reservations approved successfully.");
                window.location.reload();
            } else {
                const errorData = await response.json();
                throw errorData;
            }
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Error approving reservations", {
                closeButton: true,
                description: (error as { description?: string }).description || "Please make sure that selected reservations are still pending."
            });
        }
    };

    // Handle Reject Button Function
    const handleRejectButton = async () => {
        try {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as ReservationData)._id);
            const response = await rejectManyReservations(selectedRowIds, user.id, user.blkLt, user.position);

            if (response.ok) {
                sessionStorage.setItem("rejectedSuccessful", "true");
                window.location.reload();
            } else {
                const errorData = await response.json();
                throw errorData;
            }
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Error rejecting reservations", {
                closeButton: true,
                description: (error as { description?: string }).description || "Please make sure that selected reservations are still pending."
            });
        }
    };


    // Redirect to Reservation Form Function
    const navToReservationForm = () => {
        const reservationFormPath = "/reservations/create";
        navigate(reservationFormPath);
    }


    useEffect(() => {

        // const intervalId = setInterval(() => {
        //     console.log("Is some page rows selected:", table.getIsSomePageRowsSelected());
        //     console.log("Selected rows:", table.getSelectedRowModel().rows);
        // }, 1000000);

        // return () => clearInterval(intervalId);

    })

    useEffect(() => {

        if (sessionStorage.getItem("approveSuccessful")) {
            console.log(sessionStorage.getItem("approveSuccessful"));
            toast.success(sessionStorage.getItem("approveSuccesful"), { closeButton: true });
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

        async function fetchUnarchivedReservations() {
            try {
                const fetchFunction = getAllReservations;
                const result = await fetchFunction();
                const data = await result.json();

                if (!ignore) {
                    if (result.ok) {
                        console.log("All reservations fetched successfully.");
                        setReservations(data);
                    } else {
                        console.log("All reservations fetch failed.");
                    }
                }
            } catch (error) {
                if (!ignore) {
                    console.error("Error fetching reservations: ", error);
                }
            }
        }

        let ignore = false;
        fetchUnarchivedReservations();
        return () => {
            ignore = true;
        };
    }, [])

    const navigateToReservationDetails = (id: String) => {
        navigate("/reservations/" + id);
    }





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

                                    if (header.id === "_id") {
                                        return null;
                                    }

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
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => {

                                            if (cell.column.id === "_id") {
                                                return null;
                                            }
                                            
                                            if (cell.column.id === "select") {
                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                )
                                            }
                                            
                                            return (
                                                <TableCell
                                                    className="cursor-pointer"
                                                    key={cell.id}
                                                    onClick={() => navigateToReservationDetails(row.original._id)}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
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




