"use client";



// Imports

// Lucide React Icons Imports
import {
    CalendarRange,
    ChevronDown,
    ChevronUp,
    CirclePlus,
    Download,
    Info,
    Share,
    X,
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar";

// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";

// shadcn Collapsible Component Imports
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

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
    PopoverTrigger
} from "@/components/ui/popover";

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

import { toast } from "sonner";

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
// file-saver Import
import { saveAs } from "file-saver";

// date-fns format Import
import { format } from "date-fns";

// exceljs Workbook Import
import { Workbook } from "exceljs";

// React Import
import {
    useState
} from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { ReservationType } from "@/types/reservation-type";
import { useAuthContext } from "@/hooks/useAuthContext";


// Types






interface AmenityData {
    _id: string;
}

interface AmenityTableProps<TData extends AmenityData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    reservations: ReservationType[]
}



const EQUIPMENT = {
    id: 1,
    value: "Equipment",
    label: "Equipment",
}

const FACILITY = {
    id: 2,
    value: "Facility",
    label: "Facility",
}
const AMENITY_DATA = [
    EQUIPMENT,
    FACILITY
];





export default function AmenityTable<TData extends AmenityData, TValue>({
    columns,
    data,
    reservations
}: AmenityTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();

    const { user } = useAuthContext();



    // States
    // Loading
    const [loading, setLoading] = useState<boolean>(false);
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});



    // Export states
    // Show export states
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [includeBasicInfo, setIncludeBasicInfo] = useState(true);
    const [includeReservationOptions, setIncludeReservationOptions] = useState(true);
    const [showReservationOptions, setShowReservationOptions] = useState(true);

    // Export criteria states
    const [exportReservationDateRange, setExportReservationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportCreatedAtDateRange, setExportCreatedAtDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportStatus, setExportStatus] = useState<String[]>(["Pending", "Cancelled", "Void", "Approved", "Rejected", "Ongoing", "For Return", "Returned", "Completed"])
    const [exportReservationVisibility, setExportReservationVisibility] = useState<String>("Unarchived");
    const [exportReservationType, setExportReservationType] = useState<String>("All");
    const [exportAuthorRole, setExportAuthorRole] = useState<String>("All");



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



    // Functions
    const handleExport = async (type: String) => {
        setLoading(true);

        try {

            if (!data) throw new Error('Amenity data not available');

            const amenities = data as any[];

            if (!includeBasicInfo && !includeReservationOptions) {
                throw new Error('Please select at least one export option');
            }

            const wb = new Workbook();

            wb.creator = user.userBlkLt;
            wb.lastModifiedBy = user.userBlkLt;
            wb.created = new Date();
            wb.modified = new Date();

            if (type === "excel") {
                amenities.map((amenity) => {

                    const ws = wb.addWorksheet(amenity?.amenityName + ' Details');

                    const currReservations = reservations.filter(reservation => {
                        return reservation.reservationAmenities.some(reservationAmenity =>
                            reservationAmenity.amenityName === amenity?.amenityName
                        )
                    })

                    if (includeBasicInfo) {

                        if (amenity && amenity.amenityType === "Equipment") {
                            ws.columns = [
                                { header: "Amenity Name", key: "amenityName", width: 20 },
                                { header: "Amenity Type", key: "amenityType", width: 15 },
                                { header: "Amenity Stock", key: "amenityStockMax", width: 10 },
                                { header: "Amenity Min Qty", key: "amenityQuantityMin", width: 10 },
                                { header: "Amenity Max Qty", key: "amenityQuantityMax", width: 10 },
                                { header: "Amenity Description", key: "amenityDescription", width: 100 },
                                { header: "Amenity Reminder", key: "amenityReminder", width: 100 },
                                { header: "Amenity Visibility", key: "amenityVisibility", width: 15 },
                                { header: "Created At", key: "amenityCreatedAt", width: 15 },
                            ];
                            ws.addRow({
                                amenityName: amenity?.amenityName,
                                amenityType: amenity?.amenityType,
                                amenityStockMax: amenity?.amenityStockMax,
                                amenityQuantityMin: amenity?.amenityQuantityMin,
                                amenityQuantityMax: amenity?.amenityQuantityMax,
                                amenityDescription: amenity?.amenityDescription,
                                amenityReminder: amenity?.amenityReminder,
                                amenityVisibility: amenity?.amenityVisibility,
                                amenityCreatedAt: amenity?.createdAt,
                            });
                        } else if (amenity && amenity.amenityType === "Facility") {
                            ws.columns = [
                                { header: "Amenity Name", key: "amenityName", width: 20 },
                                { header: "Amenity Type", key: "amenityType", width: 15 },
                                { header: "Amenity Address", key: "amenityAddress", width: 50 },
                                { header: "Amenity Description", key: "amenityDescription", width: 100 },
                                { header: "Amenity Reminder", key: "amenityReminder", width: 100 },
                                { header: "Amenity Visibility", key: "amenityVisibility", width: 15 },
                                { header: "Created At", key: "amenityCreatedAt", width: 15 },
                                { header: "", key: "reservationVisibility", width: 15 },
                                { header: "", key: "reservationCreatedAt", width: 15 },
                            ];
                            ws.addRow({
                                amenityName: amenity?.amenityName,
                                amenityType: amenity?.amenityType,
                                amenityAddress: amenity?.amenityAddress,
                                amenityDescription: amenity?.amenityDescription,
                                amenityReminder: amenity?.amenityReminder,
                                amenityVisibility: amenity?.amenityVisibility,
                                amenityCreatedAt: amenity?.createdAt,
                            });
                        }

                        ws.addRow({});
                        ws.addRow({});
                        ws.addRow({});

                        ws.getRow(1).eachCell(cell => {
                            cell.font = { bold: true };
                        });
                    }

                    // Add a second worksheet for reservations if includeReservationOptions is true
                    if (includeReservationOptions) {

                        if (amenity.amenityType === "Equipment") {
                            ws.addRow({
                                amenityName: "Reservation ID",
                                amenityType: "Reservee ID",
                                amenityStockMax: "Reservee Block and Lot",
                                amenityQuantityMin: "Reservation Type",
                                amenityQuantityMax: "Reservation Amenities",
                                amenityDescription: "Reservation Status",
                                amenityReminder: "Reservation Date",
                                amenityVisibility: "Reservation Visibility",
                                amenityCreatedAt: "Created At",
                            })
                        }

                        if (amenity.amenityType === "Facility") {
                            ws.addRow({
                                amenityName: "Reservation ID",
                                amenityType: "Reservee ID",
                                amenityAddress: "Reservee Block and Lot",
                                amenityDescription: "Reservation Type",
                                amenityReminder: "Reservation Amenities",
                                amenityVisibility: "Reservation Status",
                                amenityCreatedAt: "Reservation Date",
                                reservationVisibility: "Reservation Visibility",
                                reservationCreatedAt: "Created At",
                            })
                        }



                        // Filter reservations based on export options
                        const filteredReservations = currReservations.filter(reservation => {
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

                        // Add the filtered data
                        filteredReservations.forEach(reservation => {

                            if (amenity.amenityType === "Equipment") {
                                ws.addRow({
                                    amenityName: reservation._id,
                                    amenityType: reservation.reserveeId,
                                    amenityStockMax: reservation.reserveeBlkLt,
                                    amenityQuantityMin: reservation.reservationType,
                                    amenityQuantityMax: reservation.reservationAmenities.map(a => {
                                        if (a.amenityType === "Equipment") {
                                            return `${a.amenityName} (${a.amenityQuantity})`
                                        } else {
                                            return `${a.amenityName}`
                                        }
                                    }).join(', '),
                                    amenityDescription: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                                    amenityReminder: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                                    amenityVisibility: reservation.reservationVisibility,
                                    amenityCreatedAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                                })
                            }

                            if (amenity.amenityType === "Facility") {
                                ws.addRow({
                                    amenityName: reservation._id,
                                    amenityType: reservation.reserveeId,
                                    amenityAddress: reservation.reserveeBlkLt,
                                    amenityDescription: reservation.reservationType,
                                    amenityReminder: reservation.reservationAmenities.map(a => {
                                        if (a.amenityType === "Equipment") {
                                            return `${a.amenityName} (${a.amenityQuantity})`
                                        } else {
                                            return `${a.amenityName}`
                                        }
                                    }).join(', '),
                                    amenityVisibility: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                                    amenityCreatedAt: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                                    reservationVisibility: reservation.reservationVisibility,
                                    reservationCreatedAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                                })
                            }

                        });

                        // Style the header row
                        ws.getRow(6).font = { bold: true };
                    }

                })

                const buffer = await wb.xlsx.writeBuffer();
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "amenity-details.xlsx");
            }

            if (type === "csv") {
                amenities.map(async (amenity) => {

                    const ws = wb.addWorksheet(amenity?.amenityName + ' Details');

                    const currReservations = reservations.filter(reservation => {
                        return reservation.reservationAmenities.some(reservationAmenity =>
                            reservationAmenity.amenityName === amenity?.amenityName
                        )
                    })

                    if (includeBasicInfo) {

                        if (amenity && amenity.amenityType === "Equipment") {
                            ws.columns = [
                                { header: "Amenity Name", key: "amenityName", width: 20 },
                                { header: "Amenity Type", key: "amenityType", width: 15 },
                                { header: "Amenity Stock", key: "amenityStockMax", width: 10 },
                                { header: "Amenity Min Qty", key: "amenityQuantityMin", width: 10 },
                                { header: "Amenity Max Qty", key: "amenityQuantityMax", width: 10 },
                                { header: "Amenity Description", key: "amenityDescription", width: 100 },
                                { header: "Amenity Reminder", key: "amenityReminder", width: 100 },
                                { header: "Amenity Visibility", key: "amenityVisibility", width: 15 },
                                { header: "Created At", key: "amenityCreatedAt", width: 15 },
                            ];
                            ws.addRow({
                                amenityName: amenity?.amenityName,
                                amenityType: amenity?.amenityType,
                                amenityStockMax: amenity?.amenityStockMax,
                                amenityQuantityMin: amenity?.amenityQuantityMin,
                                amenityQuantityMax: amenity?.amenityQuantityMax,
                                amenityDescription: amenity?.amenityDescription,
                                amenityReminder: amenity?.amenityReminder,
                                amenityVisibility: amenity?.amenityVisibility,
                                amenityCreatedAt: amenity?.createdAt,
                            });
                        } else if (amenity && amenity.amenityType === "Facility") {
                            ws.columns = [
                                { header: "Amenity Name", key: "amenityName", width: 20 },
                                { header: "Amenity Type", key: "amenityType", width: 15 },
                                { header: "Amenity Address", key: "amenityAddress", width: 50 },
                                { header: "Amenity Description", key: "amenityDescription", width: 100 },
                                { header: "Amenity Reminder", key: "amenityReminder", width: 100 },
                                { header: "Amenity Visibility", key: "amenityVisibility", width: 15 },
                                { header: "Created At", key: "amenityCreatedAt", width: 15 },
                                { header: "", key: "reservationVisibility", width: 15 },
                                { header: "", key: "reservationCreatedAt", width: 15 },
                            ];
                            ws.addRow({
                                amenityName: amenity?.amenityName,
                                amenityType: amenity?.amenityType,
                                amenityAddress: amenity?.amenityAddress,
                                amenityDescription: amenity?.amenityDescription,
                                amenityReminder: amenity?.amenityReminder,
                                amenityVisibility: amenity?.amenityVisibility,
                                amenityCreatedAt: amenity?.createdAt,
                            });
                        }

                        ws.addRow({});
                        ws.addRow({});
                        ws.addRow({});

                        ws.getRow(1).eachCell(cell => {
                            cell.font = { bold: true };
                        });
                    }

                    // Add a second worksheet for reservations if includeReservationOptions is true
                    if (includeReservationOptions) {

                        if (amenity.amenityType === "Equipment") {
                            ws.addRow({
                                amenityName: "Reservation ID",
                                amenityType: "Reservee ID",
                                amenityStockMax: "Reservee Block and Lot",
                                amenityQuantityMin: "Reservation Type",
                                amenityQuantityMax: "Reservation Amenities",
                                amenityDescription: "Reservation Status",
                                amenityReminder: "Reservation Date",
                                amenityVisibility: "Reservation Visibility",
                                amenityCreatedAt: "Created At",
                            })
                        }

                        if (amenity.amenityType === "Facility") {
                            ws.addRow({
                                amenityName: "Reservation ID",
                                amenityType: "Reservee ID",
                                amenityAddress: "Reservee Block and Lot",
                                amenityDescription: "Reservation Type",
                                amenityReminder: "Reservation Amenities",
                                amenityVisibility: "Reservation Status",
                                amenityCreatedAt: "Reservation Date",
                                reservationVisibility: "Reservation Visibility",
                                reservationCreatedAt: "Created At",
                            })
                        }



                        // Filter reservations based on export options
                        const filteredReservations = currReservations.filter(reservation => {
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

                        // Add the filtered data
                        filteredReservations.forEach(reservation => {

                            if (amenity.amenityType === "Equipment") {
                                ws.addRow({
                                    amenityName: reservation._id,
                                    amenityType: reservation.reserveeId,
                                    amenityStockMax: reservation.reserveeBlkLt,
                                    amenityQuantityMin: reservation.reservationType,
                                    amenityQuantityMax: reservation.reservationAmenities.map(a => {
                                        if (a.amenityType === "Equipment") {
                                            return `${a.amenityName} (${a.amenityQuantity})`
                                        } else {
                                            return `${a.amenityName}`
                                        }
                                    }).join(', '),
                                    amenityDescription: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                                    amenityReminder: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                                    amenityVisibility: reservation.reservationVisibility,
                                    amenityCreatedAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                                })
                            }

                            if (amenity.amenityType === "Facility") {
                                ws.addRow({
                                    amenityName: reservation._id,
                                    amenityType: reservation.reserveeId,
                                    amenityAddress: reservation.reserveeBlkLt,
                                    amenityDescription: reservation.reservationType,
                                    amenityReminder: reservation.reservationAmenities.map(a => {
                                        if (a.amenityType === "Equipment") {
                                            return `${a.amenityName} (${a.amenityQuantity})`
                                        } else {
                                            return `${a.amenityName}`
                                        }
                                    }).join(', '),
                                    amenityVisibility: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                                    amenityCreatedAt: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                                    reservationVisibility: reservation.reservationVisibility,
                                    reservationCreatedAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                                })
                            }

                        });

                        // Style the header row
                        ws.getRow(6).font = { bold: true };
                    }

                    const buffer = await wb.csv.writeBuffer();
                    saveAs(new Blob([buffer], { type: "application/octet-stream" }), `${amenity.amenityName.toLowerCase()}-details.csv`);

                })
            }

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to export data');
        } finally {
            setLoading(false);
        }

    }

    // Redirect to Amenity Form Function
    const navToAmenityForm = () => {
        const reservationFormPath = "/amenities/create";
        navigate(reservationFormPath);
    }

    // Redirect to Amenity Details Function
    const navToAmenityDetails = (id: String) => {
        const amenityDetailsPath = "/amenities/" + id;
        navigate(amenityDetailsPath);
    }


    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl"> Amenities </h1>
                    <h3 className="font-light text-muted-foreground"> A list of all available amenities. </h3>
                </div>

                <div className="flex items-end gap-2">

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowExportDialog(true)}
                    >
                        <Share className="h-7 w-7" />
                        Export
                    </Button>

                    <Button className="" onClick={navToAmenityForm} size="sm" variant="default" >
                        <CirclePlus className="h-4 w-4" />
                        Create amenity
                    </Button>

                </div>

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                <DataTableViewOptions table={table} label="Toggle" />

                <DataTableFacetedFilter column={table.getColumn("amenityType")} title="Type" options={AMENITY_DATA} />

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
                                    {row.getVisibleCells().map((cell) => {

                                        if (cell.column.id === "select") {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        } else return (
                                            <TableCell
                                                className="cursor-pointer"
                                                key={cell.id}
                                                onClick={() => navToAmenityDetails(row.original._id)}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )

                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No amenities found.
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
                            Export Options
                        </DialogTitle>

                        <DialogDescription>
                            Please select the information to include in the export. All are selected by default.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Amenity Basic Information */}
                    <div className={"flex items-center justify-between w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 "
                        + (!includeBasicInfo ? "text-muted-foreground/50" : "text-white/90")
                    }>
                        <Label className="text-sm"> Amenity basic information </Label>
                        <Checkbox
                            checked={includeBasicInfo}
                            onCheckedChange={(checked) => setIncludeBasicInfo(!!checked)}
                        />
                    </div>

                    {/* <Collapsible
                                    className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                                    disabled={!includeStock}
                                    onOpenChange={setShowStockOptions}
                                    open={!includeStock ? false : showStockOptions}
                                >
                                    <Checkbox
                                        checked={includeStock}
                                        onCheckedChange={(checked) => setIncludeStock(!!checked)}
                                        className="absolute top-5 right-6 z-50"
                                    />

                                    <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                        +
                                        (!includeStock ?
                                            "text-muted-foreground/50" :
                                            "text-white/90"
                                        )}
                                    >

                                        <Label className="text-sm cursor-pointer"> Amenity Stock </Label>
                                        <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                            {!showStockOptions ? <ChevronDown className="h-4 w-4" />
                                                : < ChevronUp className="h-4 w-4" />}
                                        </div>

                                    </CollapsibleTrigger>

                                    <CollapsibleContent>

                                    asdfasfs
                                    </CollapsibleContent>

                                </Collapsible> */}

                    {/* Amenity Reservations Options */}
                    <Collapsible
                        className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                        disabled={!includeReservationOptions}
                        onOpenChange={setShowReservationOptions}
                        open={!includeReservationOptions ? false : showReservationOptions}
                    >

                        <Checkbox
                            checked={includeReservationOptions}
                            onCheckedChange={(checked) => setIncludeReservationOptions(!!checked)}
                            className="absolute top-5 right-6 z-50"
                        />

                        <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                            + (!includeReservationOptions ? "text-muted-foreground/50" : "text-white/90")}
                        >

                            <Label className="text-sm cursor-pointer"> Amenity Reservations </Label>
                            <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                {!showReservationOptions || !includeReservationOptions ? <ChevronDown className="h-4 w-4" />
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

                                {/* Export creator type */}
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

                            </div>

                        </CollapsibleContent>

                    </Collapsible>

                    <DialogFooter>

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                                <Button
                                    className=""
                                    disabled={(!includeBasicInfo && !includeReservationOptions) || loading}
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

            </Dialog>

        </>



    )

}




