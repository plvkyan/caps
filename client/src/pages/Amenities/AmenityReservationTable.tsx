"use client";



// Imports
// Lucide React Icons Imports
import {
    CalendarRange,
    ChevronDown,
    ChevronUp,
    FileDown,
    Info,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Accordion Component Imports
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Collapsible Component Imports
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// shadcn Sonner Component Import
import { toast } from "sonner";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// shadcn Tooltip Component Imports
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


// Custom Component Imports
// Custom Data Table Faceted Filter
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";

// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";

// Custom Data Table View Options
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";



// Data table Imports
// Data table column definitions imports
import {
    ColumnDef,
    FilterFn,
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
import {
    addDays,
    format
} from "date-fns"

import { dateBetweenFilterFn } from "@/components/custom/dateBetweenFilterFn";

// React Day Picker DateRange Import
import { DateRange } from "react-day-picker"

// React Import
import {
    useEffect,
    useState
} from "react";

// React Router Imports
// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
// Reservation Status Type
import { RESERVATION_DATA } from "@/data/reservation-data";



// API call Imports
import {
    approveManyReservations,
    archiveManyReservations,
    getAllReservations,
    rejectManyReservations
} from "@/data/reservation-api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Label } from "@/components/ui/label";





interface ReservationData {
    _id: string;
}

interface AmenityReservationTableProps<TData extends ReservationData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    amenityType: string,
}





export default function AmenityReservationTable<TData extends ReservationData, TValue>({
    columns,
    data,
    amenityType
}: AmenityReservationTableProps<TData, TValue>) {



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

    const navigateToReservationDetails = (id: String) => {
        navigate("/reservations/" + id);
    }



    return (

        <div className="flex flex-col gap-4">

            {/* Table Toolbar */}
            <div className="flex justify-between gap-2">

                {/* Search bar */}
                <Input
                    className="w-[250px] lg:w-[350px]"
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                    value={globalFilter}
                />

                {/* Filtering and sorting options */}
                <div className="flex gap-2">

                    {/* Date Range Filter Button */}
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


                    {/* Column Toggle Button */}
                    <DataTableViewOptions table={table} label="Toggle" />

                    {/* Reservation Status Filter Button */}
                    <DataTableFacetedFilter column={table.getColumn("reservationStatus")} title="Status" options={RESERVATION_DATA} />

                    {/* Reseration Status Filter Reset Button */}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="p-1 items-center"
                        >
                            <X className="h-4 w-4" />
                            Reset Filters
                        </Button>
                    )}
                </div>

            </div>



            <div className="rounded-md border">

                <Table className="bg-card rounded-md">

                    <TableHeader>

                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {

                                    if (header.id === "_id") {
                                        return null;
                                    }

                                    if (header.id === "select") {
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
                                                // return (
                                                //     <TableCell
                                                //         key={cell.id}
                                                //     >
                                                //         {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                //     </TableCell>
                                                // )
                                                return null;
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

        </div>



    )

}




