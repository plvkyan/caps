


// Imports
// Lucide Icon Imports
import {
    Archive,
    ArchiveX,
    CalendarRange,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Download,
    EllipsisVertical,
    ImageOff,
    Info,
    Pencil,
    Share,
    // Trash2,
} from "lucide-react";

// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calenar Component Import
import { Calendar } from "@/components/ui/calendar";

// shadcn Card Components Import
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// shadcn Chart Component Import
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// shadcn Recharts Component Imports
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts"

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
    DropdownMenuGroup,
    DropdownMenuItem,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

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

// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

// shadcn Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toast Import
import { toast } from "sonner";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Components Imports
// Loading Spinner Component Import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

// Theme toggle Component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";

// Amenity Reservation Table Columns Import
import { AmenityReservationTableColumns } from "@/pages/Amenities/AmenityReservationColumns";

// Amenity Reservation Table Import
import AmenityReservationTable from "@/pages/Amenities/AmenityReservationTable";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// file-saver Import
import { saveAs } from "file-saver";

// date-fns format Import
import { format } from "date-fns";

// exceljs Workbook Import
import { Workbook } from "exceljs";

// React Imports
import {
    useEffect,
    useState
} from "react"

// react-day-picker DateRange Import
import { DateRange } from "react-day-picker";



// Types Imports
// Amenity Type Import
import { AmenityType } from "@/types/amenity-type";

// Reservation Type Import
import { ReservationType } from "@/types/reservation-type";



// Data Imports
// Amenity API calls Import
import { 
    archiveAmenity, 
    // deleteAmenity, 
    getSingleAmenity, 
    unarchiveAmenity 
} from "@/data/amenity-api";

// Reservation API calls Import
import { getAmenityReservations } from "@/data/reservation-api";
import { useNavigate } from "react-router-dom";




// Chart description
export const description = "An interactive line chart"

// Chart configuration
const chartConfig = {
    pending: {
        label: "Pending: ",
        color: "hsl(var(--warning))",
    },
    approved: {
        label: "Approved: ",
        color: "hsl(var(--primary))",
    },
    rejected: {
        label: "Rejected: ",
        color: "hsl(var(--destructive))",
    },
    forReturn: {
        label: "For Return: ",
        color: "hsl(var(--chart-2))",
    },
    returned: {
        label: "Returned: ",
        color: "hsl(var(--chart-3))",
    },
    completed: {
        label: "Completed: ",
        color: "hsl(var(--chart-4))",
    },
} satisfies ChartConfig





// Function definition
export default function AmenityDetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();
    // Navigation Hook
    const navigate = useNavigate();



    // States
    // Loading state
    // const [setLoading] = useState<boolean>(false);



    // Image preview states
    // Current image index for image preview
    const [currentIndex, setCurrentIndex] = useState(0);
    // Images state
    const [images, setImages] = useState<any>([]);
    // Rotating index for image preview state
    const [rotatingIndex, setRotatingIndex] = useState(0);
    // Image preview dialog state
    const [showImagePreview, setShowImagePreview] = useState(false);

    // Export amenity dialog state
    const [showExportDialog, setShowExportDialog] = useState(false);
    // Export options basic info state
    const [includeBasicInfo, setIncludeBasicInfo] = useState(true);
    // Export options stock state
    // const [includeStock, setIncludeStock] = useState(true);
    // Export options stock options state
    // const [showStockOptions, setShowStockOptions] = useState(true);
    // Export amenity reservations state
    const [includeReservationOptions, setIncludeReservationOptions] = useState(true);
    // Export amenity reservations options state
    const [showReservationOptions, setShowReservationOptions] = useState(true);
    // 
    const [exportReservationDateRange, setExportReservationDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const [exportCreatedAtDateRange, setExportCreatedAtDateRange] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });

    const [exportStatus, setExportStatus] = useState<string[]>(["Pending", "Approved", "Rejected", "Ongoing", "For Return", "Returned", "Completed"]);

    const [exportReservationVisibility, setExportReservationVisibility] = useState<string>("Unarchived");

    const [exportReservationType, setExportReservationType] = useState<string>("All");

    const [exportAuthorRole, setExportAuthorRole] = useState<string>("All");

    // Amenity-related states
    // Amenity information state
    const [amenity, setAmenity] = useState<AmenityType>();

    // Amenity reservations state
    const [reservations, setReservations] = useState<ReservationType[]>([]);



    // Chart-related states
    // Chart data state
    const [chartData, setChartData] = useState([{}]);

    // Chart reservation types state
    // const [chartType, setChartType] = useState(undefined);

    // Chart time range state
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });



    // Effects
    // Effect for changing page title
    useEffect(() => {
        document.title = amenity?.amenityName + " details | GCTMS";
    }, [amenity]);

    // Effect for fetching data
    useEffect(() => {
        const fetchData = async () => {
            const id = new URL(window.location.href).pathname.split('/').pop();
            if (!id) {
                toast.error('Invalid amenity ID');
                return;
            }

            try {
                // setLoading(true);

                // Fetch data in parallel
                const [amenityRes, reservationsRes] = await Promise.all([
                    getSingleAmenity(id),
                    getAmenityReservations(id)
                ]);

                if (!amenityRes.ok) throw new Error('Failed to fetch amenity');
                if (!reservationsRes.ok) throw new Error('Failed to fetch reservations');

                const [amenityData, reservations] = await Promise.all([
                    amenityRes.json(),
                    reservationsRes.json()
                ]);

                // Update basic amenity data
                setAmenity(amenityData);
                setImages(amenityData.amenityImages || []);
                setReservations(reservations);

                // Process reservation data for chart
                const processChartData = () => {
                    const dataMap = new Map();

                    // Get date range
                    const dates = reservations.map(r => new Date(r.reservationDate));
                    if (dates.length === 0) return [];

                    const startDate = new Date(Math.min(...dates));
                    const endDate = new Date(Math.max(...dates));

                    // Initialize all dates
                    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                        const dateStr = d.toISOString().split('T')[0];
                        dataMap.set(dateStr, {
                            date: dateStr,
                            pending: 0,
                            approved: 0,
                            rejected: 0,
                            forReturn: 0,
                            returned: 0,
                            completed: 0
                        });
                    }

                    // Aggregate reservation data
                    reservations.forEach(reservation => {
                        const dateStr = new Date(reservation.reservationDate).toISOString().split('T')[0];
                        const status = reservation.reservationStatus[reservation.reservationStatus.length - 1].status;
                        const quantity = reservation.reservationAmenities.find(a => a._id === id)?.amenityQuantity || 0;

                        const data = dataMap.get(dateStr);
                        if (data && status in data) {
                            data[status.toLowerCase()] += quantity;
                        }
                    });

                    return Array.from(dataMap.values()).sort((a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
                };

                setChartData(processChartData());

            } catch (error) {
                console.error(error);
                toast.error(error instanceof Error ? error.message : 'Failed to load data');
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Effect for chart data changes
    useEffect(() => {
        const id = new URL(window.location.href).pathname.split('/').pop();
        if (!id || !reservations.length) return;

        // Process reservations based on filters
        const filterReservations = (reservation: ReservationType) => {
            const hasAmenity = reservation.reservationAmenities.some(a => a._id === id);
            if (!hasAmenity) return false;

            if (!date?.from || !date?.to) return true;

            const reservationDate = new Date(reservation.reservationDate);
            return reservationDate >= date.from && reservationDate <= date.to;
        };

        // Create initial data structure for a date
        const createEmptyDateStats = () => ({
            pending: 0,
            approved: 0,
            rejected: 0,
            forReturn: 0,
            returned: 0,
            completed: 0
        });

        // Aggregate reservation data by date
        const aggregatedData = reservations
            .filter(filterReservations)
            .reduce<Record<string, ReturnType<typeof createEmptyDateStats>>>((acc, reservation) => {
                const dateStr = new Date(reservation.reservationDate).toISOString().split('T')[0];
                const status = reservation.reservationStatus[reservation.reservationStatus.length - 1].status.toLowerCase();
                const quantity = reservation.reservationAmenities.find(a => a._id === id)?.amenityQuantity ?? 0;

                acc[dateStr] = acc[dateStr] || createEmptyDateStats();
                acc[dateStr][status as keyof ReturnType<typeof createEmptyDateStats>] += quantity;

                return acc;
            }, {});

        // Fill gaps between dates
        const dates = Object.keys(aggregatedData).sort();
        if (dates.length > 0) {
            const startDate = new Date(dates[0]);
            const endDate = new Date(dates[dates.length - 1]);

            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateStr = d.toISOString().split('T')[0];
                if (!aggregatedData[dateStr]) {
                    aggregatedData[dateStr] = createEmptyDateStats();
                }
            }
        }

        // Convert to array and sort by date
        const chartDataArray = Object.entries(aggregatedData)
            .map(([date, stats]) => ({ date, ...stats }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setChartData(chartDataArray);
    }, [date, reservations]);

    // Effect for checking any session storage messages
    useEffect(() => {

        if (sessionStorage.getItem('amenityEdited')) {
            toast.success('Amenity edited successfully', {
                closeButton: true,
                description: sessionStorage.getItem('amenityEdited'),
            });
            sessionStorage.removeItem('amenityEdited');
        }
    }, []);



    // Functions
    // Export excel file function
    const handleExport = async () => {

        try {

            if (!amenity) throw new Error('Amenity data not available');

            if (!includeBasicInfo && !includeReservationOptions) {
                throw new Error('Please select at least one export option');
            }

            const wb = new Workbook();

            wb.creator = user.userBlkLt;
            wb.lastModifiedBy = user.userBlkLt;
            wb.created = new Date();
            wb.modified = new Date();


            if (includeBasicInfo) {
                const ws = wb.addWorksheet(amenity?.amenityName + ' Details');

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
                    ];
                    ws.addRow({
                        amenityName: amenity?.amenityName,
                        amenityType: amenity?.amenityType,
                        amenityStockMax: amenity?.amenityStockMax,
                        amenityQuantityMin: amenity?.amenityQuantityMin,
                        amenityQuantityMax: amenity?.amenityQuantityMax,
                        amenityDescription: amenity?.amenityDescription,
                        amenityReminder: amenity?.amenityReminder,
                        amenityVisibility: amenity?.amenityVisibility
                    });
                    ws.addRow({});
                } else if (amenity && amenity.amenityType === "Facility") {
                    ws.columns = [
                        { header: "Amenity Name", key: "amenityName", width: 20 },
                        { header: "Amenity Type", key: "amenityType", width: 15 },
                        { header: "Amenity Address", key: "amenityAddress", width: 50 },
                        { header: "Amenity Description", key: "amenityDescription", width: 100 },
                        { header: "Amenity Reminder", key: "amenityReminder", width: 100 },
                        { header: "Amenity Visibility", key: "amenityVisibility", width: 15 }
                    ];
                    ws.addRow({
                        amenityName: amenity?.amenityName,
                        amenityType: amenity?.amenityType,
                        amenityAddress: amenity?.amenityAddress,
                        amenityDescription: amenity?.amenityDescription,
                        amenityReminder: amenity?.amenityReminder,
                        amenityVisibility: amenity?.amenityVisibility
                    });
                }

                ws.getRow(1).eachCell(cell => {
                    cell.font = { bold: true };
                });
            }


            // Add a second worksheet for reservations if includeReservationOptions is true
            if (includeReservationOptions) {
                const wsReservations = wb.addWorksheet(amenity.amenityName + ' Reservations');

                // Set up columns
                wsReservations.columns = [
                    { header: "Reservation ID", key: "reservationId", width: 29 },
                    { header: "Reservee ID", key: "reserveeId", width: 29 },
                    { header: "Reservation Type", key: "reservationType", width: 22 },
                    { header: "Reservation Amenities", key: "reservationAmenities", width: 72 },
                    { header: "Reservation Status", key: "reservationStatus", width: 12 },
                    { header: "Reservation Date", key: "reservationDate", width: 15 },
                    { header: "Reservation Visibility", key: "reservationVisibility", width: 12 },
                    { header: "Created At", key: "createdAt", width: 15 },
                ];

                // Filter reservations based on export options
                const filteredReservations = reservations.filter(reservation => {
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
                    wsReservations.addRow({
                        reservationId: reservation._id,
                        reserveeId: reservation.reserveeId,
                        reserveeBlkLt: reservation.reserveeBlkLt,
                        reservationType: reservation.reservationType,
                        reservationAmenities: reservation.reservationAmenities.map(a => `${a.amenityName} (${a.amenityQuantity})`).join(', '),
                        reservationStatus: reservation.reservationStatus[reservation.reservationStatus.length - 1].status,
                        reservationDate: format(new Date(reservation.reservationDate), "MMM d, yyyy"),
                        reservationVisibility: reservation.reservationVisibility,
                        createdAt: format(new Date(reservation.createdAt), "MMM d, yyyy"),
                    });
                });

                // Style the header row
                wsReservations.getRow(1).font = { bold: true };
            }



            const buffer = await wb.xlsx.writeBuffer();
            saveAs(new Blob([buffer], { type: "application/octet-stream" }), "amenity-details.xlsx");

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to export data');
        }

    }

    // Image-related functions
    // Handle previous image function
    const handlePrevImage = () => {
        setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
    };

    // Handle next image function
    const handleNextImage = () => {
        setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1);
    };

    // Archive amenity function
    const handleArchiveAmenity = async () => {
        try {
            if (!amenity) throw new Error('Amenity data not available');

            const res = await archiveAmenity(amenity._id);

            if (!res.ok) throw new Error('Failed to archive amenity.');

            sessionStorage.setItem('archiveSuccess', 'Amenity archived successfully.');
            navigate('/amenities');
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Failed to archive amenity.');
        }
    };

    // Archive amenity function
    const handleUnarchiveAmenity = async () => {
        try {
            if (!amenity) throw new Error('Amenity data not available');

            const res = await unarchiveAmenity(amenity._id);

            if (!res.ok) throw new Error('Failed to unarchive amenity.');

            sessionStorage.setItem('unarchiveSuccess', 'Amenity unarchived successfully.');
            navigate('/amenities');
        } catch (error) {
            console.error(error);
            toast.error(error instanceof Error ? error.message : 'Failed to unarchive amenity.');
        }
    };

    // Archive amenity function
    // const handleDeleteAmenity = async () => {
    //     try {
    //         if (!amenity) throw new Error('Amenity data not available');

    //         const res = await deleteAmenity(amenity._id);

    //         if (!res.ok) throw new Error('Failed to delete amenity.');

    //         sessionStorage.setItem('deleteSuccess', 'Amenity deleted successfully.');
    //         navigate('/amenities');
    //     } catch (error) {
    //         console.error(error);
    //         toast.error(error instanceof Error ? error.message : 'Failed to delete amenity.');
    //     }
    // };

    // Navigate to amenity edit form page
    // Redirect to Amenity Details Function
    const navToEditForm = (id: String) => {
        const editFormPath = "/amenities/edit/" + id;
        navigate(editFormPath);
    }





    return (

        // The sidebar provider - no changes here
        <SidebarProvider>

            {/* The sidebar itself and its contents - there are changes here */}
            <AppSidebar />

            {/* The inset effect - no changes here */}
            <SidebarInset>

                {/* The header provided along with the sidebar */}
                <header className="flex h-16 shrink-0 p-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

                    {/* Container within the header to organize items */}
                    <div className="w-full flex items-center justify-between gap-2">

                        {/* Container for breadcrumbs and sidebar trigger */}
                        <div className="flex items-center gap-2 p-4">

                            <SidebarTrigger className="" />

                            <Separator orientation="vertical" className="mr-2 h-4" />

                            {/* Page breadcrumbs */}
                            <Breadcrumb>

                                <BreadcrumbList>

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/amenities">
                                            Amenities
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Amenity Details
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>

                                </BreadcrumbList>

                            </Breadcrumb>

                        </div>

                        {/* Account navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            <ThemeToggle />
                            <NavUser />
                        </div>

                    </div>

                </header>


                {amenity ? (

                    <main className="flex flex-col gap-4 p-8 pt-4">

                        {/* Page header */}
                        <div className="flex flex-row items-center gap-4">

                            {/* Return to Amenity List button */}
                            <Button
                                className="h-7 w-7"
                                onClick={() => history.back()}
                                size="icon"
                                type="button"
                                variant="outline"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only"> Back </span>
                            </Button>

                            {/* Container for the header */}
                            <div className="flex flex-col">

                                {/* Page header */}
                                <h1 className="font-semibold text-2xl"> {amenity.amenityName + " Details"} </h1>

                                {/* Page header description */}
                                {amenity.amenityType === "Equipment" ? (
                                    <p className="font-light text-muted-foreground">
                                        Detailed information covering the equipment's stock levels, reservations, and other details.
                                    </p>
                                ) : amenity.amenityType === "Facility" ? (
                                    <p className="font-light text-muted-foreground">
                                        Detailed information covering the facility's address, reservations, and other details.
                                    </p>
                                ) : null}

                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>

                                    <Button
                                        className="ml-auto h-7 w-7"
                                        size="icon"
                                        variant="outline"
                                    >
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>

                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="mt-1">
                                    <DropdownMenuGroup>
                                        {amenity && amenity.amenityVisibility === "Archived" && (
                                            <DropdownMenuItem
                                            onClick={handleUnarchiveAmenity}
                                        >
                                            <ArchiveX className="h-4 w-4" />
                                            Unarchive
                                        </DropdownMenuItem>
                                        )}
                                        {amenity && amenity.amenityVisibility === "Unarchived" && (
                                            <DropdownMenuItem
                                            onClick={handleArchiveAmenity}
                                        >
                                            <Archive className="h-4 w-4" />
                                            Archive
                                        </DropdownMenuItem>
                                        )}
                                        
                                        <DropdownMenuItem onClick={() => navToEditForm(amenity._id)}>
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>

                                        <DropdownMenuItem onClick={() => setShowExportDialog(true)}>
                                            <Share className="h-4 w-4" />
                                            Export .xslx
                                        </DropdownMenuItem>

                                    </DropdownMenuGroup>

                                    {/* <DropdownMenuSeparator /> */}

                                    {/* {user && user.userPosition === "President" && (
                                        <DropdownMenuItem
                                        className="text-destructive focus:text-red-500"
                                        onClick={handleDeleteAmenity}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </DropdownMenuItem>
                                    )} */}
                                    
                                </DropdownMenuContent>
                            </DropdownMenu>



                        </div>



                        {/* Page content container */}
                        <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">



                            {/* Page content */}
                            {/* Main column */}
                            <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">

                                {/* Basic information card */}
                                <Card>

                                    <CardContent className="flex flex-col gap-6 pt-5 max-h-svh">

                                        {/* Basic information header */}
                                        <div className="flex flex-col pb-2">
                                            <Label className="text-lg font-semibold"> {amenity.amenityType + " basic information"} </Label>
                                            <p className="text-sm font-normal text-muted-foreground"> An overview of the key characteristics of the {amenity.amenityType.toLowerCase()}. </p>
                                        </div>

                                        {/* Basic information - Name */}
                                        <div className="flex flex-col items-start gap-2">

                                            <div className="flex flex-col items-start gap-1">
                                                <Label>
                                                    Name
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Used to identify the {amenity.amenityType.toLowerCase()} within the system.
                                                </p>
                                            </div>

                                            {/* Name value */}
                                            <Input
                                                className="w-full"
                                                disabled
                                                value={amenity.amenityName}
                                                type="text"
                                            />

                                        </div>

                                        {/* Basic information - Address */}
                                        {amenity.amenityType === "Facility" && (
                                            <div className="flex flex-col items-start gap-2">

                                                {/* Address header */}
                                                <div className="flex flex-col items-start gap-1">
                                                    <Label>
                                                        Address
                                                    </Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        The exact location of the facility.
                                                    </p>
                                                </div>

                                                {/* Address value */}
                                                <Textarea
                                                    className="w-full"
                                                    disabled
                                                    value={amenity.amenityAddress}
                                                />

                                            </div>
                                        )}

                                        {/* Basic information - Description */}
                                        <div className="flex flex-col items-start gap-2">

                                            {/* Description header */}
                                            <div className="flex flex-col items-start gap-1">
                                                <Label>
                                                    Description
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    A detailed account of the {amenity.amenityType.toLowerCase()}, including its functions, features, among other information.
                                                </p>
                                            </div>

                                            {/* Description value */}
                                            <Textarea
                                                className="w-full"
                                                disabled
                                                value={amenity.amenityDescription}
                                            />

                                        </div>

                                        {/* Basic information - Reminder */}
                                        <div className="flex flex-col items-start gap-2">

                                            {/* Reminder header */}
                                            <div className="flex flex-col items-start gap-1">
                                                <Label>
                                                    Reminder
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Helpful prompts to remind users of essential information, guidelines, and policies to follow.
                                                </p>
                                            </div>

                                            {/* Reminder value */}
                                            <Textarea
                                                className="w-full"
                                                disabled
                                                value={amenity.amenityReminder}
                                            />

                                        </div>


                                    </CardContent>

                                </Card>

                            </div>



                            {/* Secondary column */}
                            <div className="grid auto-rows-max items-start gap-6">

                                {/* Images card */}
                                <Card className="flex flex-col gap-3 overflow-hidden">

                                    <CardContent className="px-6 py-5">

                                        {/* Images header */}
                                        <div className="flex flex-col">
                                            <Label className="text-lg font-semibold">
                                                Amenity Images
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Images viewable by the unit owners through reservations.
                                            </p>
                                        </div>

                                        <div className="grid gap-3 pt-4">

                                            {/* Current image from image carousel(?) */}
                                            {images.length > 0 ? (
                                                <img
                                                    className="aspect-video w-full rounded-md object-cover cursor-pointer"
                                                    onClick={() => setShowImagePreview(true)}
                                                    src={images[rotatingIndex].url}
                                                />
                                            ) : (
                                                <div className="flex flex-col gap-1 items-center justify-center h-44 text-muted-foreground bg-muted rounded-md">
                                                    <ImageOff className="h-6 w-6" />
                                                    <p className="text-sm font-normal">
                                                        No images available.
                                                    </p>
                                                </div>
                                            )}

                                            <div className="grid grid-cols-3 gap-2">

                                                {/* Other images from image carousel (?) */}
                                                {images.length > 0 && images.map((image: any, index: number) => (

                                                    <div key={index} className="group relative pb-1">

                                                        {/* Image thumbnail */}
                                                        <img
                                                            className="aspect-video w-full max-w-[84] rounded-md object-cover cursor-pointer"
                                                            onClick={() => setRotatingIndex(index)}
                                                            src={image.url}
                                                        />

                                                    </div>

                                                ))}

                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                                {/* Visibility card */}
                                <Card className="flex flex-col pt-5 overflow-hidden">
                                    <CardContent className="flex flex-col gap-3">

                                        <div className="flex flex-col">

                                            {/* Visibility header */}
                                            <Label className="flex flex-row gap-2 items-center text-lg font-semibold">

                                                {amenity.amenityType + " visibility"}

                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                <Info className="w-4 h-4" />
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p> By default, amenities are 'Unarchived' </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>

                                            </Label>

                                            <p className="text-sm font-normal text-muted-foreground"> Choose if you want unit owners to see this {amenity.amenityType.toLowerCase()} or not. </p>

                                        </div>

                                        {/* Visibility value */}
                                        <div>
                                            <Select disabled value={amenity.amenityVisibility}>
                                                <SelectTrigger id="amenityVisibility" aria-label="Amenity Visibility">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                    <SelectItem value="Archived"> Archived </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </CardContent>
                                </Card>

                            </div>



                            {/* Stocks card */}
                            {amenity.amenityType === "Equipment" && (

                                <Card className="col-span-3">

                                    <CardContent className="flex flex-col gap-4 pt-5">

                                        {/* Stocks header */}
                                        <div className="flex flex-row justify-between mb-2">

                                            <div className="flex flex-col">
                                                <Label className="text-lg font-semibold"> {amenity.amenityType + " stocks"} </Label>
                                                <p className="text-sm font-normal text-muted-foreground"> Manage the availability and allocation of equipment to manage reservations. </p>
                                            </div>

                                            {/* Date Range Filter Button */}
                                            <div className="flex gap-2">

                                                {/* Chart reservations */}
                                                {/* <Select defaultValue="All">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a fruit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="All"> All </SelectItem>
                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                            <SelectItem value="Approved">Approved</SelectItem>
                                                            <SelectItem value="Rejected">Rejected</SelectItem>
                                                            {amenity.amenityType === "Equipment" && (
                                                                <>
                                                                    <SelectItem value="For Return">For Return</SelectItem>
                                                                    <SelectItem value="Returned">Returned</SelectItem>
                                                                </>
                                                            )}
                                                            <SelectItem value="Completed">Completed</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select> */}

                                                {/* Chart date range */}
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            className="justify-start font-normal"
                                                            id="date"
                                                            variant="outline"
                                                        >
                                                            <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                            {date?.from && date?.to
                                                                ? `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
                                                                : "All reservation dates"}
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

                                            </div>


                                        </div>



                                        {/* Stocks chart container */}
                                        <div className="flex flex-row flex-wrap items-center md:flex-nowrap gap-4">

                                            <ChartContainer
                                                config={chartConfig}
                                                className="grow aspect-auto h-[250px] w-full"
                                            >
                                                <LineChart
                                                    accessibilityLayer
                                                    data={chartData}
                                                    margin={{
                                                        left: -18,
                                                        right: 16,
                                                    }}
                                                >
                                                    <CartesianGrid vertical={true} />
                                                    <XAxis
                                                        dataKey="date"
                                                        tickLine={true}
                                                        axisLine={false}
                                                        tickMargin={8}
                                                        minTickGap={32}
                                                        tickFormatter={(value) => {
                                                            const date = new Date(value)
                                                            return date.toLocaleDateString("en-US", {
                                                                month: "short",
                                                                day: "numeric",
                                                            })
                                                        }}
                                                    />
                                                    <YAxis
                                                        tickLine={false}
                                                        axisLine={false}
                                                        tickMargin={8}
                                                        tickCount={5}
                                                    />
                                                    <ChartTooltip
                                                        content={
                                                            <ChartTooltipContent
                                                                className="w-[150px]"
                                                                labelFormatter={(value) => {
                                                                    return new Date(value).toLocaleDateString("en-US", {
                                                                        month: "short",
                                                                        day: "numeric",
                                                                        year: "numeric",
                                                                    })
                                                                }}
                                                            />
                                                        }
                                                    />
                                                    <Line
                                                        dataKey="approved"
                                                        type="monotone"
                                                        stroke="var(--color-approved)"
                                                        strokeWidth={2}
                                                        dot={false}
                                                    />
                                                    {/* <Line
                                                        dataKey="pending"
                                                        type="monotone"
                                                        stroke="var(--color-pending)"
                                                        strokeWidth={2}
                                                        dot={false}
                                                    /> */}
                                                    {/* <Line
                                                        dataKey="rejected"
                                                        type="monotone"
                                                        stroke="var(--color-rejected)"
                                                        strokeWidth={2}
                                                        dot={false}
                                                    /> */}
                                                    {amenity.amenityType === "Equipment" && (
                                                        <>
                                                            <Line
                                                                dataKey="forReturn"
                                                                type="monotone"
                                                                stroke="var(--color-forReturn)"
                                                                strokeWidth={2}
                                                                dot={false}
                                                            />
                                                            <Line
                                                                dataKey="returned"
                                                                type="monotone"
                                                                stroke="var(--color-returned)"
                                                                strokeWidth={2}
                                                                dot={false}
                                                            />
                                                        </>
                                                    )}

                                                    <Line
                                                        dataKey="completed"
                                                        type="monotone"
                                                        stroke="var(--color-completed)"
                                                        strokeWidth={2}
                                                        dot={false}
                                                    />
                                                </LineChart>
                                            </ChartContainer>

                                            <div className="shrink">
                                                <Table className="w-fit">
                                                    <TableBody>
                                                        <TableRow key="max-stock">
                                                            <TableCell className="font-medium"> Max Stock </TableCell>
                                                            <TableCell className="text-muted-foreground"> {amenity.amenityStockMax} </TableCell>
                                                        </TableRow>
                                                        {/* <TableRow key="missing-stock">
                                                            <TableCell className="font-medium"> Unavailable </TableCell>
                                                            <TableCell className="text-muted-foreground"> Idk how stocks should work </TableCell>
                                                        </TableRow> */}
                                                        <TableRow key="min-qty">
                                                            <TableCell className="font-medium"> Min per reservation </TableCell>
                                                            <TableCell className="text-muted-foreground"> {amenity.amenityQuantityMin} </TableCell>
                                                        </TableRow>
                                                        <TableRow key="max-qty">
                                                            <TableCell className="font-medium"> Max per reservation </TableCell>
                                                            <TableCell className="text-muted-foreground"> {amenity.amenityQuantityMax}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>




                                        </div>


                                        <div className="flex flex-col">




                                        </div>

                                    </CardContent>

                                </Card>

                            )}



                            {/* Reservations card */}
                            <Card className="col-span-3">

                                <CardContent className="flex flex-col gap-4 pt-5">

                                    {/* Reservations header */}
                                    <div className="flex flex-col">
                                        <Label className="text-lg font-semibold"> {amenity.amenityType + " reservations"} </Label>
                                        <p className="text-sm font-normal text-muted-foreground"> A list of all reservations for this {amenity.amenityType.toLowerCase()}. </p>
                                    </div>

                                    <div className="flex flex-col">

                                        <AmenityReservationTable amenityType={amenity.amenityType} data={reservations} columns={AmenityReservationTableColumns} />

                                    </div>

                                </CardContent>

                            </Card>



                        </div>

                        {/* Export amenity dialog */}
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
                                                                : "All reservation dates"}
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
                                            <div className="flex flex-col gap-4 pb-3 w-full">

                                                <Label className="text-sm text-muted-foreground"> Reservation Status </Label>

                                                <div className="flex flex-row flex-wrap gap-12">

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
                                                            {amenity.amenityType === "Equipment" && <SelectItem value="Equipment"> Equipment </SelectItem>}
                                                            {amenity.amenityType === "Facility" && <SelectItem value="Facility"> Facility </SelectItem>}
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
                                    <Button
                                        className=""
                                        disabled={!includeBasicInfo && !includeReservationOptions}
                                        onClick={handleExport}
                                        size="sm"
                                    >
                                        <Download className="h-7 w-7" />
                                        Download .xslx
                                    </Button>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>

                        {/* Image preview dialog */}
                        <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>

                            <DialogContent className="p-0 items-center justify-center max-w-[80%] min-h-[80%]">

                                {/* Image preview previous image button */}
                                <Button
                                    className="absolute top-50 left-5 w-8 h-8"
                                    disabled={images.length === 1}
                                    onClick={handlePrevImage}
                                    size="icon"
                                    type="button"
                                    variant="outline"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                {/* Image preview next image button */}
                                <Button
                                    className="absolute top-50 right-5 w-8 h-8"
                                    disabled={images.length === 1}
                                    onClick={handleNextImage}
                                    size="icon"
                                    type="button"
                                    variant="outline"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>

                                {images.length > 0 && (
                                    <img src={images[currentIndex].url} className="aspect-video w-full h-full rounded-md object-contain" />
                                )}

                            </DialogContent>

                        </Dialog>

                    </main>
                ) : (
                    <div className="flex w-full h-full gap-2 items-center justify-center opacity-90">
                        <LoadingSpinner className="h-6 w-6" />
                        <span className="text-sm"> Loading </span>
                    </div>
                )}


            </SidebarInset>

        </SidebarProvider>
    )
}