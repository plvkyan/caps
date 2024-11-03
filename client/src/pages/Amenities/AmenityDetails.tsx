


// Imports
// Lucide Icon Imports
import {
    CalendarRange,
    ChevronLeft,
    ChevronRight,
    ImageOff,
    Info,
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

// shadcn Card Components Import
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// shadcn Chart Components Import
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// shadcn Recharts Components Imports
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
} from "recharts"

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
} from "@/components/ui/dialog";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// Date-fns Imports



// React Imports
import {
    useEffect,
    useMemo,
    useState
} from "react"



// Types Imports
// Amenity Type Import
import { AmenityType } from "@/types/amenity-type";

// Reservation Type Import
import { ReservationType } from "@/types/reservation-type";



// Data Imports
// Amenity API calls Import
import { getSingleAmenity } from "@/data/amenity-api";

// Reservation API calls Import
import { getAmenityReservations } from "@/data/reservation-api";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AmenityReservationTable from "./AmenityReservationTable";
import { AmenityReservationTableColumns } from "./AmenityReservationColumns";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";










export const description = "An interactive line chart"
// const chartData = [
//     { date: "2024-04-01", desktop: 222, mobile: 150 },
//     { date: "2024-04-02", desktop: 97, mobile: 180 },
//     { date: "2024-04-03", desktop: 167, mobile: 120 },
//     { date: "2024-04-04", desktop: 242, mobile: 260 },
//     { date: "2024-04-05", desktop: 373, mobile: 290 },
//     { date: "2024-04-06", desktop: 301, mobile: 340 },
//     { date: "2024-04-07", desktop: 245, mobile: 180 },
//     { date: "2024-04-08", desktop: 409, mobile: 320 },
//     { date: "2024-04-09", desktop: 59, mobile: 110 },
//     { date: "2024-04-10", desktop: 261, mobile: 190 },
//     { date: "2024-04-11", desktop: 327, mobile: 350 },
//     { date: "2024-04-12", desktop: 292, mobile: 210 },
//     { date: "2024-04-13", desktop: 342, mobile: 380 },
//     { date: "2024-04-14", desktop: 137, mobile: 220 },
//     { date: "2024-04-15", desktop: 120, mobile: 170 },
//     { date: "2024-04-16", desktop: 138, mobile: 190 },
//     { date: "2024-04-17", desktop: 446, mobile: 360 },
//     { date: "2024-04-18", desktop: 364, mobile: 410 },
//     { date: "2024-04-19", desktop: 243, mobile: 180 },
//     { date: "2024-04-20", desktop: 89, mobile: 150 },
//     { date: "2024-04-21", desktop: 137, mobile: 200 },
//     { date: "2024-04-22", desktop: 224, mobile: 170 },
//     { date: "2024-04-23", desktop: 138, mobile: 230 },
//     { date: "2024-04-24", desktop: 387, mobile: 290 },
//     { date: "2024-04-25", desktop: 215, mobile: 250 },
//     { date: "2024-04-26", desktop: 75, mobile: 130 },
//     { date: "2024-04-27", desktop: 383, mobile: 420 },
//     { date: "2024-04-28", desktop: 122, mobile: 180 },
//     { date: "2024-04-29", desktop: 315, mobile: 240 },
//     { date: "2024-04-30", desktop: 454, mobile: 380 },
//     { date: "2024-05-01", desktop: 165, mobile: 220 },
//     { date: "2024-05-02", desktop: 293, mobile: 310 },
//     { date: "2024-05-03", desktop: 247, mobile: 190 },
//     { date: "2024-05-04", desktop: 385, mobile: 420 },
//     { date: "2024-05-05", desktop: 481, mobile: 390 },
//     { date: "2024-05-06", desktop: 498, mobile: 520 },
//     { date: "2024-05-07", desktop: 388, mobile: 300 },
//     { date: "2024-05-08", desktop: 149, mobile: 210 },
//     { date: "2024-05-09", desktop: 227, mobile: 180 },
//     { date: "2024-05-10", desktop: 293, mobile: 330 },
//     { date: "2024-05-11", desktop: 335, mobile: 270 },
//     { date: "2024-05-12", desktop: 197, mobile: 240 },
//     { date: "2024-05-13", desktop: 197, mobile: 160 },
//     { date: "2024-05-14", desktop: 448, mobile: 490 },
//     { date: "2024-05-15", desktop: 473, mobile: 380 },
//     { date: "2024-05-16", desktop: 338, mobile: 400 },
//     { date: "2024-05-17", desktop: 499, mobile: 420 },
//     { date: "2024-05-18", desktop: 315, mobile: 350 },
//     { date: "2024-05-19", desktop: 235, mobile: 180 },
//     { date: "2024-05-20", desktop: 177, mobile: 230 },
//     { date: "2024-05-21", desktop: 82, mobile: 140 },
//     { date: "2024-05-22", desktop: 81, mobile: 120 },
//     { date: "2024-05-23", desktop: 252, mobile: 290 },
//     { date: "2024-05-24", desktop: 294, mobile: 220 },
//     { date: "2024-05-25", desktop: 201, mobile: 250 },
//     { date: "2024-05-26", desktop: 213, mobile: 170 },
//     { date: "2024-05-27", desktop: 420, mobile: 460 },
//     { date: "2024-05-28", desktop: 233, mobile: 190 },
//     { date: "2024-05-29", desktop: 78, mobile: 130 },
//     { date: "2024-05-30", desktop: 340, mobile: 280 },
//     { date: "2024-05-31", desktop: 178, mobile: 230 },
//     { date: "2024-06-01", desktop: 178, mobile: 200 },
//     { date: "2024-06-02", desktop: 470, mobile: 410 },
//     { date: "2024-06-03", desktop: 103, mobile: 160 },
//     { date: "2024-06-04", desktop: 439, mobile: 380 },
//     { date: "2024-06-05", desktop: 88, mobile: 140 },
//     { date: "2024-06-06", desktop: 294, mobile: 250 },
//     { date: "2024-06-07", desktop: 323, mobile: 370 },
//     { date: "2024-06-08", desktop: 385, mobile: 320 },
//     { date: "2024-06-09", desktop: 438, mobile: 480 },
//     { date: "2024-06-10", desktop: 155, mobile: 200 },
//     { date: "2024-06-11", desktop: 92, mobile: 150 },
//     { date: "2024-06-12", desktop: 492, mobile: 420 },
//     { date: "2024-06-13", desktop: 81, mobile: 130 },
//     { date: "2024-06-14", desktop: 426, mobile: 380 },
//     { date: "2024-06-15", desktop: 307, mobile: 350 },
//     { date: "2024-06-16", desktop: 371, mobile: 310 },
//     { date: "2024-06-17", desktop: 475, mobile: 520 },
//     { date: "2024-06-18", desktop: 107, mobile: 170 },
//     { date: "2024-06-19", desktop: 341, mobile: 290 },
//     { date: "2024-06-20", desktop: 408, mobile: 450 },
//     { date: "2024-06-21", desktop: 169, mobile: 210 },
//     { date: "2024-06-22", desktop: 317, mobile: 270 },
//     { date: "2024-06-23", desktop: 480, mobile: 530 },
//     { date: "2024-06-24", desktop: 132, mobile: 180 },
//     { date: "2024-06-25", desktop: 141, mobile: 190 },
//     { date: "2024-06-26", desktop: 434, mobile: 380 },
//     { date: "2024-06-27", desktop: 448, mobile: 490 },
//     { date: "2024-06-28", desktop: 149, mobile: 200 },
//     { date: "2024-06-29", desktop: 103, mobile: 160 },
//     { date: "2024-06-30", desktop: 446, mobile: 400 },
// ]
const chartConfig = {

    quantity: {
        label: "Quantity reserved: ",
        color: "hsl(var(--chart-1))",
    },

} satisfies ChartConfig











export default function AmenityDetails() {


    // Contexts
    // Authentication Context
    // const { user } = useAuthContext();



    // States
    // Image preview states
    // Current image index for image preview
    const [currentIndex, setCurrentIndex] = useState(0);
    // Images state
    const [images, setImages] = useState<any>([]);
    // Rotating index for image preview state
    const [rotatingIndex, setRotatingIndex] = useState(0);
    // Image preview dialog state
    const [showImagePreview, setShowImagePreview] = useState(false);

    // Amenity state
    const [amenity, setAmenity] = useState<AmenityType>();
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);
    // Reservations state
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    // Chart time range state
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    });
    // Chart data state
    const [chartData, setChartData] = useState([{}]);




    // Effects
    // Page title effect
    useEffect(() => {
        document.title = amenity?.amenityName + " Details | GCTMS";
    }, [amenity]);

    // Fetch amenity effect
    useEffect(() => {

        // Fetch the amenity once the page loads
        const fetchAmenity = async () => {
            try {
                setLoading(true);

                const id = new URL(window.location.href).pathname.split('/').pop();
                if (!id) throw new Error('Invalid amenity ID found');

                const response = await getSingleAmenity(id);

                if (response.ok) {
                    const data = await response.json();

                    setAmenity(data);
                    setImages(data.amenityImages);

                    toast.success("Amenity fetched successfully.");
                }

                if (!response.ok) throw new Error('Failed to fetch amenity.');
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }



        // Fetch the amenity's reservations once the page loads
        const fetchReservations = async () => {
            try {
                const id = new URL(window.location.href).pathname.split('/').pop();
                if (!id) throw new Error('Invalid amenity ID found');

                const response = await getAmenityReservations(id);

                if (response.ok) {
                    const data = await response.json();

                    setReservations(data);

                    const chartDataArray = data
                        .filter(reservation => reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Approved")
                        .reduce((acc, reservation) => {
                            // Convert date to YYYY-MM-DD format
                            const dateStr = new Date(reservation.reservationDate).toISOString().split('T')[0];

                            // Find quantity for this amenity
                            const quantity = reservation.reservationAmenities.find(a => a._id === id)?.amenityQuantity || 0;

                            // If date exists in accumulator, add to quantity, otherwise create new entry
                            if (acc[dateStr]) {
                                acc[dateStr] += quantity;
                            } else {
                                acc[dateStr] = quantity;
                            }

                            return acc;
                        }, {});

                    // Convert to array format for chart
                    const formattedData = Object.entries(chartDataArray)
                        .map(([date, quantity]) => ({
                            date,
                            quantity
                        }))
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                    setChartData(formattedData);
                    toast.success("Reservations fetched successfully.");
                }

                if (!response.ok) throw new Error('Failed to fetch reservations.');
            } catch (error: any) {
                toast.error(error.message);
            }
        }

        // Call the fetch amenity and fetch reservations functions
        fetchAmenity();
        fetchReservations();
    }, []);

    useEffect(() => {
        const id = new URL(window.location.href).pathname.split('/').pop();
        if (!id) return;

        // If no date range selected, show all data
        if (!date?.from || !date?.to) {
            const allData = reservations
            .filter(reservation => 
                reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Approved" &&
                reservation.reservationAmenities.some(a => a._id === id)
            )
            .reduce<Record<string, number>>((acc, reservation) => {
                const dateStr = new Date(reservation.reservationDate).toISOString().split('T')[0];
                const quantity = reservation.reservationAmenities.find(a => a._id === id)?.amenityQuantity ?? 0;
                
                acc[dateStr] = (acc[dateStr] ?? 0) + quantity;
                return acc;
            }, {});

            const chartDataArray = Object.entries(allData)
            .map(([date, quantity]) => ({
                date,
                quantity
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            setChartData(chartDataArray);
            return;
        }

        // Filter by date range if selected
        const filteredData = reservations
            .filter((reservation) => {
            const isApproved = reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Approved";
            const hasAmenity = reservation.reservationAmenities.some(a => a._id === id);
            const reservationDate = new Date(reservation.reservationDate);
            
            return isApproved && 
                   hasAmenity && 
                   reservationDate >= (date.from as any) &&
                   reservationDate <= (date.to as any);
            })
            .reduce<Record<string, number>>((acc, reservation) => {
            const dateStr = new Date(reservation.reservationDate).toISOString().split('T')[0];
            const quantity = reservation.reservationAmenities.find(a => a._id === id)?.amenityQuantity ?? 0;
            
            acc[dateStr] = (acc[dateStr] ?? 0) + quantity;
            return acc;
            }, {});

        const chartDataArray = Object.entries(filteredData)
            .map(([date, quantity]) => ({
            date,
            quantity
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setChartData(chartDataArray);
        }, [date, reservations]);



    // Functions
    // Image-related functions
    // Handle previous image function
    const handlePrevImage = () => {
        if (currentIndex === 0) {
            setCurrentIndex(images.length - 1);
        } else {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Handle next image function
    const handleNextImage = () => {
        if (currentIndex === images.length - 1) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
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

                        </div>

                        <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">



                            {/* Main column */}
                            <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">

                                {/* Basic information card */}
                                <Card>

                                    <CardContent className="flex flex-col gap-6 pt-5 max-h-svh">

                                        {/* Basic information header */}
                                        <div className="flex flex-col pb-2">
                                            <Label className="text-lg font-semibold"> {amenity.amenityName + " Basic Information"} </Label>
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
                                                    A detailed account of the amenity, including its functions, features, among other information.
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

                                                {amenity.amenityName + " Visibility"}

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

                                            <p className="text-sm font-normal text-muted-foreground"> Choose if you want unit owners to see this amenity or not. </p>

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
                                        <div className="flex flex-col">
                                            <Label className="text-lg font-semibold"> {amenity.amenityName + " Stocks"} </Label>
                                            <p className="text-sm font-normal text-muted-foreground"> An overview of the key characteristics of the {amenity.amenityType.toLowerCase()}. </p>
                                        </div>

                                        {/* Stocks  */}
                                        {/* Date Range Filter Button */}
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


                                        {/* Stocks chart container */}
                                        <ChartContainer
                                            config={chartConfig}
                                            className="aspect-auto h-[250px] w-full"
                                        >
                                            <LineChart
                                                accessibilityLayer
                                                data={chartData}
                                                margin={{
                                                    left: 12,
                                                    right: 12,
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
                                                            nameKey="quantity"
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
                                                    dataKey="quantity"
                                                    type="monotone"
                                                    stroke="hsl(var(--primary))"
                                                    strokeWidth={2}
                                                    dot={false}
                                                />
                                            </LineChart>
                                        </ChartContainer>

                                        <div className="flex flex-col">

                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="w-[100px]">Invoice</TableHead>
                                                        <TableHead>Status</TableHead>
                                                        <TableHead>Method</TableHead>
                                                        <TableHead className="text-right">Amount</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow key="tite">
                                                        <TableCell className="font-medium">tite</TableCell>
                                                        <TableCell>tie2</TableCell>
                                                        <TableCell>tite3</TableCell>
                                                        <TableCell className="text-right"> tite 4</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell colSpan={3}>Total</TableCell>
                                                        <TableCell className="text-right">$2,500.00</TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>


                                        </div>

                                    </CardContent>

                                </Card>

                            )}



                            {/* Reservations card */}
                            <Card className="col-span-3">

                                <CardContent className="flex flex-col gap-4 pt-5">

                                    {/* Reservations header */}
                                    <div className="flex flex-col">
                                        <Label className="text-lg font-semibold"> {amenity.amenityName + " Reservations"} </Label>
                                        <p className="text-sm font-normal text-muted-foreground"> A list of all reservations for {amenity.amenityName}. </p>
                                    </div>

                                    <div className="flex flex-col">

                                        <AmenityReservationTable amenityType={amenity.amenityType} data={reservations} columns={AmenityReservationTableColumns} />

                                    </div>

                                </CardContent>

                            </Card>



                        </div>

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