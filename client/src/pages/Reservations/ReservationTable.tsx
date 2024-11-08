"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CalendarRange,
    CircleCheck,
    CirclePlus,
    CircleX,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
// date-fns format Function Import
import { format } from "date-fns";

// React Import
import { useEffect, useState } from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
import { RESERVATION_DATA } from "@/data/reservation-data";
import { toast } from "sonner";
import { approveManyReservations, archiveManyReservations, getAllReservations, rejectManyReservations } from "@/data/reservation-api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DateRange } from "react-day-picker";





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

    console.log(reservations);

    // Custom States
    // Date Range State
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })


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



    // Effects
    useEffect(() => {

        if (sessionStorage.getItem("approveSuccessful")) {
            console.log(sessionStorage.getItem("approveSuccessful"));
            toast.success(sessionStorage.getItem("approveSuccesful"), { 
                closeButton: true,
                duration: 10000,
            });
            sessionStorage.removeItem("approveSuccessful");
        }

        if (sessionStorage.getItem("rejectedSuccessful")) {
            toast.success("Reservation/s rejected successfully", { 
                closeButton: true,
                duration: 10000,
            });
            sessionStorage.removeItem("rejectedSuccessful");
        }

        if (sessionStorage.getItem("deleteSuccessful")) {
            toast.success("Reservation deleted successfully", {
                closeButton: true,
                duration: 10000,
            })
            sessionStorage.removeItem("deleteSuccessful");
        }

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("Reservation/s archived successfully", { 
                closeButton: true,
                duration: 10000,
             });
            sessionStorage.removeItem("archiveSuccessful");
        }

        if (sessionStorage.getItem("unarchiveSuccessful")) {
            toast.success("Reservation/s unarchived successfully", { 
                closeButton: true,
                duration: 10000,
             });
            sessionStorage.removeItem("unarchiveSuccessful");
        }

    }, []);

    useEffect(() => {


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

    // Update the table filter when date range changes
    useEffect(() => {

        if (date?.from && date?.to) {
            table.getColumn('reservationDate')?.setFilterValue({
                from: date.from,
                to: date.to,
            });
        } else {
            table.getColumn('reservationDate')?.setFilterValue(undefined);
        }
    }, [date, table]);



    // Functions
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
            const response = await approveManyReservations(selectedRowIds, user._id, user.userBlkLt, user.userPosition);

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
            const response = await rejectManyReservations(selectedRowIds, user._id, user.userBlkLt, user.userPosition);

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



    const navigateToReservationDetails = (id: String) => {
        navigate("/reservations/" + id);
    }





    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl"> Reservations </h1>
                    <h3 className="font-light text-muted-foreground"> All reservations with their dates and statuses. </h3>
                </div>

                <div className="flex items-end gap-2">

                    {user.userRole === "Admin" && (
                        <>

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

                        </>
                    )}

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

                {/* Date Range Filter Button */}
                <div className="flex gap-2">

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className="font-normal"
                                id="date"
                                variant="outline"
                            >
                                <CalendarRange className="mr-2 h-4 w-4" />
                                {date?.from && date?.to && isFiltered
                                    ? `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
                                    : "Reservation Date Range"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>

                    <DataTableViewOptions table={table} label="Toggle" />

                    <DataTableFacetedFilter column={table.getColumn("reservationStatus")} title="Status" options={RESERVATION_DATA} />

                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="items-center"
                        >
                            <X className="h-4 w-4" />
                            Reset Filters
                        </Button>
                    )}

                </div>


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




