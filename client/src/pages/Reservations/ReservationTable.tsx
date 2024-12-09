"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CalendarRange,
    ChevronDown,
    ChevronUp,
    CircleCheck,
    CirclePlus,
    CircleX,
    Download,
    Info,
    Share,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";

// shadcn Collapsible Component Imports
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"




// Custom Component Imports
// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";

// Custom Data Table Faceted Filter
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";

// Custom Data Table View Options
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";

// Loading Spinner Component Import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";



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
// exceljs Workbook Import
import { Workbook } from "exceljs";

// date-fns format Function Import
import { format } from "date-fns";

// React Import
import { useEffect, useState } from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";

// file-saver Import
import { saveAs } from "file-saver";



// Types
import { RESERVATION_DATA } from "@/data/reservation-data";
import { toast } from "sonner";
import { approveManyReservations, archiveManyReservations, rejectManyReservations } from "@/data/reservation-api";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DateRange } from "react-day-picker";
import { ReservationType } from "@/types/reservation-type";





interface ReservationData {
    _id: string;
    reservationStatus: {
        status: string;
    }[];
    reservationDate: string | Date;
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
    // 
    const [loading, setLoading] = useState<boolean>(false);
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});

    // Custom States
    // Date Range State
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })



    // Export states
    // Show export states
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [showReservationOptions, setShowReservationOptions] = useState(true);

    // Export criteria states
    const [exportReservationDateRange, setExportReservationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportCreatedAtDateRange, setExportCreatedAtDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportStatus, setExportStatus] = useState<String[]>(["Pending", "Cancelled", "Void", "Approved", "Rejected", "Ongoing", "For Return", "Returned", "Completed"])
    const [exportReservationVisibility, setExportReservationVisibility] = useState<String>("Unarchived");
    const [exportReservationType, setExportReservationType] = useState<String>("All");
    const [exportAuthorRole, setExportAuthorRole] = useState<String>("All");

    // 
    const [reservationTypeCount, setReservationTypeCount] = useState<String>("All");
    const [upcomingReservationsRange, setUpcomingReservationsRange] = useState<String>("Tomorrow");



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

        // const fetchReservations = async () => {
        //     try {
        //         const response = await getAllReservations();
        //         if (response.ok) {
        //             const data = await response.json();
        //             setReservations(data);
        //         } else {
        //             toast.error("Failed to fetch all reservations.", {
        //                 closeButton: true,
        //             });
        //         }
        //     } catch (error) {
        //         console.error("Error fetching all reservations: ", error);
        //     }
        // };

        // fetchReservations();

    }, []);



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

    const handleExport = async (type: String) => {
        setLoading(true);

        try {

            if (!data) throw new Error('Reservation data not available');

            const wb = new Workbook();

            wb.creator = user.userBlkLt;
            wb.lastModifiedBy = user.userBlkLt;
            wb.created = new Date();
            wb.modified = new Date();

            const ws = wb.addWorksheet("Reservations - " + format(new Date(), "MMM d, yyyy"));

            // Filter reservations based on export options
            // First filter for user-specific reservations if applicable
            let userFilteredReservations: ReservationType[] = data as any;

            // Then apply all other filters
            const filteredReservations = userFilteredReservations.filter(reservation => {
                const reservationDate = new Date(reservation.reservationDate);
                const createdAt = new Date(reservation.createdAt);
                const currentStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1].status;

                // Date range filters
                const matchesReservationDate = !exportReservationDateRange?.from || !exportReservationDateRange?.to ||
                    (reservationDate >= exportReservationDateRange.from && reservationDate <= exportReservationDateRange.to);

                const matchesCreatedDate = !exportCreatedAtDateRange?.from || !exportCreatedAtDateRange?.to ||
                    (createdAt >= exportCreatedAtDateRange.from && createdAt <= exportCreatedAtDateRange.to);

                // Status filter
                const matchesStatus = exportStatus.includes(currentStatus);

                // Visibility filter
                const matchesVisibility = exportReservationVisibility === "All" ? true :
                    exportReservationVisibility === "Unarchived" ? reservation.reservationVisibility === "Unarchived" :
                        exportReservationVisibility === "Archived" ? reservation.reservationVisibility === "Archived" : false;

                // Type filter
                const matchesType = exportReservationType === "All" ? true :
                    exportReservationType === "Equipment" ? reservation.reservationType === "Equipment" :
                        exportReservationType === "Facility" ? reservation.reservationType === "Facility" :
                            exportReservationType === "Equipment and Facility" ? reservation.reservationType === "Equipment and Facility" : false;

                const matchesAuthorRole = exportAuthorRole === "All" ? true :
                    exportAuthorRole === "Unit Owners" ? reservation.reserveePosition === "Unit Owner" :
                        exportAuthorRole === "Admins" ? reservation.reserveePosition != "Unit Owner" : false;

                return matchesReservationDate && matchesCreatedDate && matchesStatus &&
                    matchesVisibility && matchesType &&
                    matchesAuthorRole;
            });

            ws.columns = [
                { header: "Reservation ID", key: "_id", width: 25 },
                { header: "Reservee ID", key: "reserveeId", width: 25 },
                { header: "Reservee Block and Lot", key: "reserveeBlkLt", width: 15 },
                { header: "Reservation Type", key: "reservationType", width: 15 },
                { header: "Reservation Amenities", key: "reservationAmenities", width: 70 },
                { header: "Reservation Status", key: "reservationStatus", width: 15 },
                { header: "Reservation Date", key: "reservationDate", width: 20 },
                { header: "Reservation Visibility", key: "reservationVisibility", width: 15 },
                { header: "Created At", key: "createdAt", width: 20 },
            ];

            ws.getRow(1).eachCell(cell => {
                cell.font = { bold: true };
            });

            // Add the filtered data
            filteredReservations.forEach(reservation => {

                ws.addRow({
                    _id: reservation._id,
                    reserveeId: reservation.reserveeId,
                    reserveeBlkLt: reservation.reserveeBlkLt,
                    reservationType: reservation.reservationType,
                    reservationAmenities: reservation.reservationAmenities.map(a => {
                        if (a.amenityType === "Equipment") {
                            return `${a.amenityName} (${a.amenityQuantity})`
                        } else {
                            return `${a.amenityName}`
                        }
                    }).join(', '),
                    reservationStatus: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                    reservationDate: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                    reservationVisibility: reservation.reservationVisibility,
                    createdAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                })

            });

            if (type === "excel") {
                const buffer = await wb.xlsx.writeBuffer();
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Reservations - " + format(new Date(), "MMM d, yyyy") + ".xlsx");
            }

            if (type === "csv") {
                const buffer = await wb.csv.writeBuffer();
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Reservations - " + format(new Date(), "MMM d, yyyy") + ".csv");
            }



        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to export data');
        } finally {
            setLoading(false);
        }

    }



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

            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl"> Reservations </h1>
                <h3 className="font-light text-muted-foreground"> All reservations with their dates and statuses. </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">

                <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

                        {reservationTypeCount === "All" ?
                            <CardTitle className="text-sm font-medium">
                                All reservations
                            </CardTitle>
                            : reservationTypeCount === "Pending" ?
                                <CardTitle className="text-sm font-medium">
                                    Pending reservations
                                </CardTitle>
                                : reservationTypeCount === "Approved" ?
                                    <CardTitle className="text-sm font-medium">
                                        Approved reservations
                                    </CardTitle>
                                    : reservationTypeCount === "Rejected" ?
                                        <CardTitle className="text-sm font-medium">
                                            Rejected reservations
                                        </CardTitle>
                                        : reservationTypeCount === "Cancelled" ?
                                            <CardTitle className="text-sm font-medium">
                                                Cancelled reservations
                                            </CardTitle>
                                            : reservationTypeCount === "Void" ?
                                                <CardTitle className="text-sm font-medium">
                                                    Void reservations
                                                </CardTitle>
                                                : reservationTypeCount === "Ongoing" ?
                                                    <CardTitle className="text-sm font-medium">
                                                        Ongoing reservations
                                                    </CardTitle>
                                                    : reservationTypeCount === "For Return" ?
                                                        <CardTitle className="text-sm font-medium">
                                                            For return reservations
                                                        </CardTitle>
                                                        : reservationTypeCount === "Returned" ?
                                                            <CardTitle className="text-sm font-medium">
                                                                Returned reservations
                                                            </CardTitle>
                                                            : reservationTypeCount === "Completed" ?
                                                                <CardTitle className="text-sm font-medium">
                                                                    Completed reservations
                                                                </CardTitle> : null
                        }


                        <Select
                            defaultValue="All"
                            onValueChange={(value) => setReservationTypeCount(value)}
                        >
                            <SelectTrigger className="max-w-32 h-fit">
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                    <SelectItem value="Void">Void</SelectItem>
                                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                                    <SelectItem value="For Return">For Return</SelectItem>
                                    <SelectItem value="Returned">Returned</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-1">

                        {reservationTypeCount === "All" ?
                            <div className="text-2xl font-bold">
                                {table.getFilteredRowModel().rows.length}
                            </div>
                            : reservationTypeCount === "Pending" ?
                                <div className="text-2xl font-bold text-warning">
                                    {table.getFilteredRowModel().rows
                                        .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Pending")
                                        .length}
                                </div>
                                : reservationTypeCount === "Approved" ?
                                    <div className="text-2xl font-bold text-primary">
                                        {table.getFilteredRowModel().rows
                                            .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Approved")
                                            .length}
                                    </div>
                                    : reservationTypeCount === "Rejected" ?
                                        <div className="text-2xl font-bold text-destructive">
                                            {table.getFilteredRowModel().rows
                                                .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Rejected")
                                                .length}
                                        </div>
                                        : reservationTypeCount === "Cancelled" ?
                                            <div className="text-2xl font-bold text-destructive">
                                                {table.getFilteredRowModel().rows
                                                    .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Cancelled")
                                                    .length}
                                            </div>
                                            : reservationTypeCount === "Void" ?
                                                <div className="text-2xl font-bold text-destructive">
                                                    {table.getFilteredRowModel().rows
                                                        .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Void")
                                                        .length}
                                                </div>
                                                : reservationTypeCount === "Ongoing" ?
                                                    <div className="text-2xl font-bold text-warning">
                                                        {table.getFilteredRowModel().rows
                                                            .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Ongoing")
                                                            .length}
                                                    </div>
                                                    : reservationTypeCount === "For Return" ?
                                                        <div className="text-2xl font-bold text-warning">
                                                            {table.getFilteredRowModel().rows
                                                                .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "For Return")
                                                                .length}
                                                        </div>
                                                        : reservationTypeCount === "Returned" ?
                                                            <div className="text-2xl font-bold text-primary">
                                                                {table.getFilteredRowModel().rows
                                                                    .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Returned")
                                                                    .length}
                                                            </div>
                                                            : reservationTypeCount === "Completed" ?
                                                                <div className="text-2xl font-bold text-primary">
                                                                    {table.getFilteredRowModel().rows
                                                                        .filter(row => row.original.reservationStatus[row.original.reservationStatus.length - 1].status === "Completed")
                                                                        .length}
                                                                </div> : null
                        }

                        <p className="text-sm text-muted-foreground">
                            out of {table.getFilteredRowModel().rows.length} total {isFiltered ? "filtered" : null} reservations
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium"> Upcoming approved reservations </CardTitle>
                        <Select
                            defaultValue="Tomorrow"
                            onValueChange={(value) => setUpcomingReservationsRange(value)}
                        >
                            <SelectTrigger className="max-w-36 h-fit">
                                <SelectValue></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                                    <SelectItem value="Next 3 days">Next 3 days</SelectItem>
                                    <SelectItem value="Next 7 days">Next 7 days</SelectItem>
                                    <SelectItem value="Next 2 weeks">Next 2 weeks</SelectItem>
                                    <SelectItem value="Next 3 weeks">Next 3 weeks</SelectItem>
                                    <SelectItem value="Next month">Next month</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-1">

                        <div className="text-2xl font-bold">

                            {table.getFilteredRowModel().rows.filter(row => {
                                const today = new Date();
                                const reservationDate = new Date(row.original.reservationDate);
                                const status = row.original.reservationStatus[row.original.reservationStatus.length - 1].status;

                                if (status !== "Approved") return false;

                                const diffDays = Math.ceil((reservationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                                switch (upcomingReservationsRange) {
                                    case "Tomorrow":
                                        return diffDays === 1;
                                    case "Next 3 days":
                                        return diffDays > 0 && diffDays <= 3;
                                    case "Next 7 days":
                                        return diffDays > 0 && diffDays <= 7;
                                    case "Next 2 weeks":
                                        return diffDays > 0 && diffDays <= 14;
                                    case "Next 3 weeks":
                                        return diffDays > 0 && diffDays <= 21;
                                    case "Next month":
                                        return diffDays > 0 && diffDays <= 30;
                                    default:
                                        return false;
                                }
                            }).length}

                        </div>

                        <p className="text-sm text-muted-foreground">
                            out of {table.getFilteredRowModel().rows.length} total {isFiltered ? "filtered" : null} reservations
                        </p>
                    </CardContent>
                </Card>

            </div >

            <div className="flex justify-between">

                <div>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowExportDialog(true)}
                    >
                        <Share className="h-7 w-7" />
                        Export
                    </Button>

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
                                Mark as rejected
                            </Button>
                            <Button
                                disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                                onClick={() => handleApproveButton()}
                                variant="outline"
                                size="sm"
                            >
                                <CircleCheck className="h-4 w-4 text-primary" />
                                Mark as approved
                            </Button>

                        </>
                    )}

                    <Button className="" onClick={navToReservationForm} size="sm" variant="default" >
                        <CirclePlus className="h-4 w-4" />
                        Create reservation
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
                                    : "Reservation date range"}
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
                            Reset filters
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

            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>

                <DialogContent className="md:min-w-[70%] max-h-[80%] overflow-scroll">

                    {/* Export options header */}
                    <DialogHeader>

                        <DialogTitle>
                            Export options
                        </DialogTitle>

                        <DialogDescription>
                            Please select the information to include in the export. All are selected by default.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Amenity Reservations Options */}
                    <Collapsible
                        className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                        open={showReservationOptions}
                        onOpenChange={setShowReservationOptions}
                    >

                        <CollapsibleTrigger className="flex gap-2 items-center w-full text-white/90">

                            <Label className="text-sm cursor-pointer"> Reservation options </Label>
                            <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                {!showReservationOptions ? <ChevronDown className="h-4 w-4" />
                                    : < ChevronUp className="h-4 w-4" />}
                            </div>

                        </CollapsibleTrigger>

                        <CollapsibleContent className="">

                            {/* Export options content */}
                            <div className="flex flex-wrap gap-y-3 gap-x-16 my-4">

                                {/* Export reservation date range amenities */}
                                <div className="flex-intial min-w-[250px] flex flex-col">

                                    {/* Export reservation date range header */}
                                    <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                        Included reservation dates
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                        <Info className="w-4 h-4" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p> Include all dates by default. </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>

                                    <p className="font-light text-sm text-muted-foreground pb-1.5">
                                        Export reservations placed on these dates:
                                    </p>

                                    {/* Date Range Filter Button */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className="justify-start font-normal"
                                                id="date"
                                                variant="outline"
                                            >
                                                <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                {exportReservationDateRange?.from && exportReservationDateRange?.to
                                                    ? `${format(exportReservationDateRange.from, "MMM d, yyyy")} - ${format(exportReservationDateRange.to, "MMM d, yyyy")}`
                                                    : "All reservation dates"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-fit">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={exportReservationDateRange?.from}
                                                selected={exportReservationDateRange}
                                                onSelect={setExportReservationDateRange}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Export created date range amenities */}
                                <div className="flex-intial min-w-[250px] flex flex-col">

                                    {/* Export including other amenities header */}
                                    <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                        Included creation dates
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                        <Info className="w-4 h-4" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p> Include all dates by default. </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </Label>
                                    <p className="font-light text-sm text-muted-foreground pb-1.5">
                                        Export reservations created within these dates:
                                    </p>

                                    {/* Date Range Filter Button */}
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className="justify-start font-normal"
                                                id="date"
                                                variant="outline"
                                            >
                                                <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                {exportCreatedAtDateRange?.from && exportCreatedAtDateRange?.to
                                                    ? `${format(exportCreatedAtDateRange.from, "MMM d, yyyy")} - ${format(exportCreatedAtDateRange.to, "MMM d, yyyy")}`
                                                    : "All creation dates"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-fit">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={exportCreatedAtDateRange?.from}
                                                selected={exportCreatedAtDateRange}
                                                onSelect={setExportCreatedAtDateRange}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Export reservation status */}
                                <div className="flex flex-col gap-4 pt-1 pb-4 w-full">

                                    <Label className="text-sm text-muted-foreground"> Reservation Status </Label>

                                    <div className="flex flex-row flex-wrap gap-12">

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.length === 9}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([
                                                            'Pending',
                                                            'Cancelled',
                                                            'Void',
                                                            'Approved',
                                                            'Rejected',
                                                            'Ongoing',
                                                            'For Return',
                                                            'Returned',
                                                            'Completed'
                                                        ]);
                                                    } else {
                                                        setExportStatus([]);
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> All </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Pending')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Pending']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Pending'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Pending </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Approved')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Approved']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Approved'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Approved </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Rejected')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Rejected']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Rejected'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Rejected </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Ongoing')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Ongoing']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Ongoing'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Ongoing </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Void')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Void']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Void'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Void </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Cancelled')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Cancelled']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Cancelled'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Cancelled </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('For Return')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'For Return']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'For Return'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> For Return </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Returned')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Returned']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Returned'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Returned </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportStatus.includes('Completed')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setExportStatus([...exportStatus, 'Completed']);
                                                    } else {
                                                        setExportStatus(exportStatus.filter(status => status !== 'Completed'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Completed </Label>
                                        </div>

                                    </div>



                                </div>

                                {/* Export reservation visibility */}
                                {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                        {/* Export visibility header */}
                                        <Label className="text-sm text-muted-foreground"> Reservation visibility </Label>

                                        {/* Export visibility input */}
                                        <Select
                                            defaultValue="Unarchived"
                                            onValueChange={(value) => setExportReservationVisibility(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select visibility of exported reservations" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="All"> All </SelectItem>
                                                    <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                    <SelectItem value="Archived"> Archived </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </div>

                                )}


                                {/* Export reservation type */}
                                <div className="flex-intial w-[200px] flex flex-col gap-1">

                                    {/* Export reservation type header */}
                                    <Label className="text-sm text-muted-foreground"> Reservation types </Label>

                                    {/* Export reservation type input */}
                                    <Select
                                        defaultValue="Equipment and Facility"
                                        onValueChange={(value) => setExportReservationType(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select types of reservations" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="Equipment"> Equipment </SelectItem>
                                                <SelectItem value="Facility"> Facility </SelectItem>
                                                <SelectItem value="Equipment and Facility"> Equipment and Facility </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Export creator visibility */}
                                {/* <div className="flex-intial w-[200px] flex flex-col gap-1"> */}

                                {/* Export creator visibility header */}
                                {/* <Label className="text-sm text-muted-foreground"> Author visibility </Label> */}

                                {/* Export creator visibility input */}
                                {/* <Select */}
                                {/* defaultValue="Unarchived" */}
                                {/* onValueChange={(value) => setExportAuthorVisibility(value)} */}
                                {/* > */}
                                {/* <SelectTrigger> */}
                                {/* <SelectValue placeholder="Select visibility of reservees" /> */}
                                {/* </SelectTrigger> */}
                                {/* <SelectContent> */}
                                {/* <SelectGroup> */}
                                {/* <SelectItem value="All"> All </SelectItem> */}
                                {/* <SelectItem value="Unarchived"> Unarchived </SelectItem> */}
                                {/* <SelectItem value="Archived"> Archived </SelectItem> */}
                                {/* </SelectGroup> */}
                                {/* </SelectContent> */}
                                {/* </Select> */}
                                {/* </div> */}

                                {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                        {/* Export creator type header */}
                                        <Label className="text-sm text-muted-foreground"> Author role </Label>

                                        {/* Export creator type input */}
                                        <Select
                                            defaultValue="All"
                                            onValueChange={(value) => setExportAuthorRole(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select user roles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="All"> All </SelectItem>
                                                    <SelectItem value="Unit Owners"> Unit Owners </SelectItem>
                                                    <SelectItem value="Admins"> Admins </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                )}


                            </div>

                        </CollapsibleContent>

                    </Collapsible>

                    <DialogFooter>

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                                <Button
                                    className=""
                                    disabled={loading}
                                    size="sm"
                                >
                                    {loading ? <LoadingSpinner className="h-7 w-7" /> : <Download className="h-7 w-7" />}
                                    Download
                                    <ChevronDown className="h-7 w-7" />
                                </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center" className="mt-1">
                                <DropdownMenuItem
                                    onClick={() => handleExport("excel")}
                                >
                                    .xslx
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleExport("csv")}
                                >
                                    .csv
                                </DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>

                    </DialogFooter>

                </DialogContent>

            </Dialog >


        </>



    )

}




