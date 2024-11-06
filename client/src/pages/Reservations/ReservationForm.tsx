


// Imports
// Lucide React Icons Imports
import {
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    CirclePlus,
    ImageOff,
    Info,
    TriangleAlert,
} from "lucide-react";


// shadcn Components Imports
// shadcn Accordion Component Imports
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// shadcn AppSidebar Component Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Component Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Calendar Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// shadcn Carousel Component Imports
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn NavUser Component Import
import { NavUser } from "@/components/nav-user"

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

// shadcn Radiogroup Component Imports
import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group";

// shadcn Separator Component Import
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Component Imports
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

// shadcn Tabs Component Imports
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

// shadcn Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toast Component Import
import { toast } from "sonner";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Component Imports
// Dark Mode Toggle Import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Utility Imports
// date-fns format Function Import
import { format } from "date-fns";

// Matcher Import
import { Matcher } from "react-day-picker";

// useEffect and useState react Imports
import {
    useEffect,
    useState
} from "react";

// React Hook Form Imports
import { useForm } from "react-hook-form"

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Type Imports
// Amenity Type Import
import { AmenityType } from "@/types/amenity-type";



// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"



// API Imports
// Amenities API Imports
import { getUnarchivedAmenities } from "@/data/amenity-api";
// Reservation API Imports
import {
    createReservation,
    getEquipmentUnavailableDates,
    getEquipmentAvailableStocks,
    getFacilityUnavailableDates,
} from "@/data/reservation-api";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";





const reservationFormSchema = z.object({
    reserveeId: z.string(),
    reserveeBlkLt: z.string(),
    reserveePosition: z.string(),
    reserveeEmail: z.string().optional(),
    reservationType: z.string().min(1,
        { message: "A reservation type is required. Please select a reservation type." }
    ),
    reservationAmenities: z.array(z.object(
        {
            _id: z.string(),
            amenityName: z.string(),
            amenityType: z.string(),
            amenityAddress: z.string().optional(),
            amenityDescription: z.string(),
            amenityStock: z.number().optional(),
            amenityStockMax: z.number().optional(),
            amenityQuantity: z.number().optional(),
            amenityQuantityMin: z.number().optional(),
            amenityQuantityMax: z.number().optional(),
            amenityReminder: z.string().optional(),
            amenityCreator: z.string(),
            amenityImages: z.array(z.object(
                {
                    _id: z.string().optional(),
                    url: z.string().optional(),
                    public_id: z.string().optional(),
                }
            ).optional()),
            amenityVisibility: z.string().optional(),
        }
    )),
    reservationStatus: z.array(z.object(
        {
            status: z.string().optional(),
            statusDate: z.date().optional(),
            statusAuthorId: z.string().optional(),
            statusAuthor: z.string().optional(),
            statusAuthorPosition: z.string().optional(),
        }
    )),
    reservationDate: z.date(),
    reservationReason: z.string().min(3,
        { message: "A reason for the reservation is required. Please provide a reason for the reservation." }
    ),
})





export default function ReservationForm() {



    // Hooks
    // useAuthContext Hook
    const { user } = useAuthContext();

    // React Hook Form Hook
    const reservationForm = useForm<z.infer<typeof reservationFormSchema>>({
        resolver: zodResolver(reservationFormSchema),
        defaultValues: {
            reserveeId: user._id,
            reserveeBlkLt: user.userBlkLt,
            reserveePosition: user.userPosition,
            reservationType: "Equipment",
            reservationAmenities: [],
            reservationReason: "",
            reserveeEmail: "",
            reservationStatus: [
                {
                    status: "Pending",
                    statusDate: new Date(),
                    statusAuthorId: user._id,
                    statusAuthor: user.userBlkLt,
                    statusAuthorPosition: user.userPosition,
                }
            ],
        }
    });






    // States
    // Amenity list State
    const [amenityList, setAmenityList] = useState<AmenityType[]>([]);

    // Current amenity state
    const [currentAmenity, setCurrentAmenity] = useState<AmenityType | null>(null);

    // Error state
    const [error, setError] = useState("");

    // Reservation Equipment List Ids State
    const [reservationEquipmentsIds, setReservationEquipmentsIds] = useState<String[]>([]);

    // Reservation Facility List State
    const [reservationFacilityId, setReservationFacilityId] = useState<String>();

    // Reservation Type State
    const [reservationType, setReservationType] = useState("Equipment");

    // Stepper Component Step State
    const [step, setStep] = useState(0);

    // Unavailable dates for equipments and facilities
    const [equipmentUnavailableDates, setEquipmentUnavailableDates] = useState<Date[][]>([]);
    const [equipmentAvailableStocks, setEquipmentAvailableStocks] = useState<any[]>([]);
    const [facilityUnavailableDates, setFacilityUnavailableDates] = useState<Date[]>([]);
    // Current index
    const [currentIndex, setCurrentIndex] = useState(0);

    const [loading, setLoading] = useState(false);

    // Variables
    // Date variable
    const dateAWeekFromNow = new Date();
    dateAWeekFromNow.setDate(dateAWeekFromNow.getDate() + 7);

    // Matcher for disabling pending and reserved dates
    let disabledDates: Matcher[] = [
        ...equipmentUnavailableDates.flat().map(date => new Date(date)),
        ...facilityUnavailableDates.flat().map(date => new Date(date)),
        { before: dateAWeekFromNow }
    ];




    // Effects
    // Effect to change document title
    useEffect(() => {
        document.title = "Create Reservation | GCTMS";

        if (sessionStorage.getItem("reservationCreated")) {
            toast.success("Reservation created successfully.", {
                description: "The new reservation has been successfully created.",
                closeButton: true,
            });
            sessionStorage.removeItem("reservationCreated");
        }
    }, []);

    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await getUnarchivedAmenities();
                if (!response.ok) throw new Error("Error fetching amenities");

                const data = await response.json();
                setAmenityList(data);
                toast.success("Amenities fetched successfully");
            } catch (error) {
                toast.error((error as Error).message);
            }
        };

        fetchAmenities();
    }, []);

    // Fetch unavailable dates for equipments and facilities
    useEffect(() => {
        const fetchUnavailableDates = async () => {
            try {
                const equipmentUnavailableDatesPromises = reservationEquipmentsIds
                    .sort((a, b) => {
                        const amenityA = amenityList.find(amenity => amenity._id === a);
                        const amenityB = amenityList.find(amenity => amenity._id === b);
                        return new Date(amenityB?.createdAt || 0).getTime() - new Date(amenityA?.createdAt || 0).getTime();
                    })
                    .map(id => getEquipmentUnavailableDates(id)); const facilityUnavailableDatesPromises = reservationFacilityId ? [getFacilityUnavailableDates(reservationFacilityId)] : [];

                const equipmentUnavailableDatesResponses = await Promise.all(equipmentUnavailableDatesPromises);
                const facilityUnavailableDatesResponses = await Promise.all(facilityUnavailableDatesPromises);

                const equipmentDates = await Promise.all(equipmentUnavailableDatesResponses.map(res => res.json()));
                const facilityDates = await Promise.all(facilityUnavailableDatesResponses.map(res => res.json()));

                // Process and set the unavailable dates as needed
                setEquipmentUnavailableDates(equipmentDates);
                console.log("Equipment Unavailable Dates: ", equipmentDates);
                setFacilityUnavailableDates(facilityDates);
                console.log("Facility Unavailable Dates: ", facilityDates);
            } catch (error) {
                toast.error((error as Error).message);
            }
        };


        const fetchAvailableStocks = async () => {
            try {
                const availableStocksPromises = reservationEquipmentsIds
                    .sort((a, b) => {
                        const amenityA = amenityList.find(amenity => amenity._id === a);
                        const amenityB = amenityList.find(amenity => amenity._id === b);
                        return new Date(amenityB?.createdAt || 0).getTime() - new Date(amenityA?.createdAt || 0).getTime();
                    })
                    .map(id => getEquipmentAvailableStocks(id, reservationForm.watch("reservationDate")));
                const availableStocksResponses = await Promise.all(availableStocksPromises);
                const stocks = await Promise.all(availableStocksResponses.map(res => res.json()));
                setEquipmentAvailableStocks(stocks);
                console.log("Available Stocks: ", stocks);
            } catch (error) {
                toast.error((error as Error).message);
            }
        };

        fetchAvailableStocks();

        console.log(equipmentAvailableStocks)
        fetchUnavailableDates();
    }, [reservationEquipmentsIds, reservationFacilityId, reservationForm.watch("reservationDate")]);




    // Functions
    // Handle back button Function to navigate back
    const handleBackButton = (step: number) => {

        // 0 = Reservation Type
        // 1 = Equipment List
        // 2 = Equipment Details
        // 3 = Facility List
        // 4 = Facility Details
        // 5 = Other Information

        // Check if the step is less than or equal to 0
        // If true, navigate back to the previous page
        if (step <= 0) {
            reservationForm.reset();
            history.back();
        }

        if (step === 1) {
            // Lagay ng warning dito na pag bumalik, babalik lahat sa umpisa
            setError("");
            setStep(0);
            setCurrentAmenity(null);
            setCurrentIndex(0);
            setReservationType("Equipment");
            setReservationFacilityId("");
            setReservationEquipmentsIds([]);
            reservationForm.reset();
        }

        if (step === 2) {
            setStep(1);
        }

        if (step === 4) {
            setStep(3);
        }

        if (step === 3 && reservationType === "Facility") {
            setError("");
            setStep(0);
            setCurrentAmenity(null);
            setCurrentIndex(0);
            setReservationType("Equipment");
            setReservationFacilityId("");
            setReservationEquipmentsIds([]);
            reservationForm.reset();
        }

        if (step === 3 && reservationType === "Equipment and Facility") {
            setStep(1);
        }

        if (step === 5 && reservationType === "Equipment") {
            setStep(1);
        }

        if (step === 5 && reservationType === "Facility") {
            setStep(3);
        }

        if (step === 5 && reservationType === "Equipment and Facility") {
            setStep(3);
        }

    }

    // Handle both continue button Function
    const handleBothContinueButton = () => {
        if (step === 1 && reservationEquipmentsIds.length === 0) {
            setError("Please select at least one equipment to reserve then try again.");
            return;
        }

        if ((step === 1 || step === 2) && reservationEquipmentsIds.length > 0) {
            const currentAmenities = reservationForm.getValues("reservationAmenities");
            const facilityAmenities = currentAmenities.filter(amenity => amenity.amenityType === "Facility");
            const selectedEquipmentAmenities = filterAmenitiesByIds(amenityList, reservationEquipmentsIds);

            reservationForm.setValue("reservationAmenities", [...selectedEquipmentAmenities, ...facilityAmenities]);
            toast.success("Equipment/s selected successfully.", { closeButton: true });
            setError("");
        }

        if (step === 2 && reservationEquipmentsIds.length === 0) {
            setError("Please select at least one equipment to reserve then try again.");
            return;
        }

        if (step === 3 && !reservationFacilityId) {
            setError("Please select a facility to reserve then try again.");
            return;
        }

        if (step === 4 && !reservationFacilityId) {
            setError("Please select a facility to reserve then try again.");
            return;
        }

        if (reservationEquipmentsIds.length === 0 || !reservationFacilityId) {
            setError("Please select at least one equipment and facility to reserve then try again.");
            return;
        }

        setError("");
        setStep(5);
    }

    useEffect(() => {

        const currentAmenities = reservationForm.getValues("reservationAmenities");
        const facilityAmenities = currentAmenities.filter(amenity => amenity.amenityType === "Facility");
        const selectedEquipmentAmenities = filterAmenitiesByIds(amenityList, reservationEquipmentsIds);

        reservationForm.setValue("reservationAmenities", [...selectedEquipmentAmenities, ...facilityAmenities]);

    }, [reservationEquipmentsIds, reservationFacilityId]);

    const filterAmenitiesByIds = (amenityList, selectedIds) => {
        return amenityList.filter((amenity) => selectedIds.includes(amenity._id));
    };


    const handleEquipmentContinueButton = () => {
        if (!reservationEquipmentsIds || !amenityList) {
            setError("An error occurred. Please try again.");
            return;
        }

        if (reservationEquipmentsIds.length === 0) {
            setError("Please select at least one equipment to reserve then try again.");
            return;
        }

        const currentAmenities = reservationForm.getValues("reservationAmenities");
        const facilityAmenities = currentAmenities.filter(amenity => amenity.amenityType === "Facility");
        const selectedEquipmentAmenities = filterAmenitiesByIds(amenityList, reservationEquipmentsIds);

        reservationForm.setValue("reservationAmenities", [...facilityAmenities, ...selectedEquipmentAmenities]);
        toast.success("Equipment/s selected successfully.", { closeButton: true });
        setError("");
        if (reservationType === "Equipment") {
            setStep(5);
        } else if (reservationType === "Equipment and Facility") {
            setStep(3);
        }
    }

    const handleFacilityContinueButton = () => {

        console.log(1);

        if (!currentAmenity) {
            setError("Please select a facility to reserve then try again.");
            return;
        }

        console.log(2);

        setReservationFacilityId(currentAmenity._id);

        console.log(3);

        console.log(4);

        const updatedAmenities = reservationForm
            .getValues("reservationAmenities")
            .filter((amenity) => amenity.amenityType !== "Facility")
            .concat(currentAmenity);

        console.log(5);

        reservationForm.setValue("reservationAmenities", updatedAmenities);
        toast.success("Facility selected successfully.", { closeButton: true });
        setError("");
        setStep(5);

        console.log(6);

    };

    // Handle form submit Function
    const handleSubmit = async (values: z.infer<typeof reservationFormSchema>) => {
        try {
            setLoading(true);



            const postReservationResponse = await createReservation(values);

            if (postReservationResponse.ok) {
                sessionStorage.setItem("reservationCreated", "true");
                reservationForm.reset();
                window.location.reload()
            } else {
                throw new Error("Error creating reservation.");
            }
        } catch (error) {
            console.error((error as Error).message);
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const intervalId = setInterval(() => {
            console.log("Equipment Stock: ", equipmentAvailableStocks)
            console.log("State values: ", reservationEquipmentsIds);
            console.log("Form values: ", reservationForm.getValues("reservationAmenities"));
        }, 5000);

        return () => clearInterval(intervalId);

    })





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
                                        <BreadcrumbLink href="/reservations">
                                            Reservations
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Create Reservation
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






                {/* The main content */}
                <main className="">

                    <Form  {...reservationForm}>

                        <form className="flex flex-col gap-4 p-8 pt-4" onSubmit={reservationForm.handleSubmit(handleSubmit)}>





                            {/* Page header */}
                            <div className="flex flex-row items-center justify-between gap-4">

                                <div className="flex flex-row items-center gap-4">
                                    {/* Return to Amenity List button */}
                                    <Button
                                        className="h-7 w-7"
                                        size="icon"
                                        title="Back Button"
                                        type="button"
                                        variant="outline"
                                        onClick={() => handleBackButton(step)}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only"> Back </span>
                                    </Button>

                                    {/* Container for the header */}
                                    <div className={"flex flex-col " + (step === 0 ? "opacity-0" : "opacity-100")}>
                                        {/* Page header */}
                                        <h1 className="font-semibold text-2xl"> Create Reservation </h1>
                                        {/* Page header description */}
                                        <h3 className="font-light text-muted-foreground"> Secure amenities for you on one specified date. </h3>
                                        {/* Submit button */}

                                    </div>
                                </div>
                                <Button
                                    className={"flex flex-row " + (step != 5 ? "hidden" : "flex")}
                                    type="submit"
                                >
                                    Create reservation
                                    {loading ? <LoadingSpinner className="w-5 h-5 ml-2" /> : <CirclePlus className="w-5 h-5" />}
                                </Button>

                            </div>



                            {/* Page content */}
                            {/* Stepper Component for both amenities */}
                            {step !== 0 && reservationType === "Equipment and Facility" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => {
                                            if (step >= 1) {
                                                setStep(1);
                                            } else {
                                                handleBothContinueButton();
                                            }
                                        }}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step >= 1 ? "bg-primary text-primary-foreground" : " bg-gray-50 text-gray-950")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (step >= 1 ? "text-primary" : "text-gray-50")}>
                                            Choose an equipment
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (step >= 3 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => {
                                            if (step >= 3) {
                                                setStep(3);
                                            } else if ((step === 1 || step === 2) && reservationEquipmentsIds.length > 0) {
                                                handleEquipmentContinueButton();
                                            }
                                            else {
                                                handleBothContinueButton();
                                            }
                                        }}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step >= 3 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (step >= 3 ? "text-primary" : "text-muted-foreground")}>
                                            Choose a facility
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (step == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleBothContinueButton()}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            3
                                        </div>
                                        <span className={"ml-2 font-medium " + (step == 5 ? "text-primary" : "text-muted-foreground")}>
                                            Enter other information
                                        </span>
                                    </div>

                                </div>

                            )
                            }

                            {/* Stepper component for Equipment */}
                            {step !== 0 && reservationType === "Equipment" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStep(1)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step >= 1 ? "bg-primary text-primary-foreground" : " bg-gray-50 text-gray-950")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (step >= 1 ? "text-primary" : "text-gray-50")}>
                                            Choose an equipment
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (step == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleEquipmentContinueButton()}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (step == 5 ? "text-primary" : "text-muted-foreground")}>
                                            Enter other information
                                        </span>
                                    </div>

                                </div>

                            )
                            }

                            {/* Stepper component for Facility */}
                            {step !== 0 && reservationType === "Facility" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStep(3)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step >= 3 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (step >= 3 ? "text-primary" : "text-muted-foreground")}>
                                            Choose a facility
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (step == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleFacilityContinueButton()}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (step == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (step == 5 ? "text-primary" : "text-muted-foreground")}>
                                            Enter other information
                                        </span>
                                    </div>

                                </div>

                            )
                            }



                            {/* Error message */}
                            {error !== "" && (
                                <div className="flex bg-red-500/20 border border-red-500 text-red-500 items-center gap-2 rounded-md px-4 py-3">
                                    <TriangleAlert className="w-5 h-5" />
                                    {error}
                                </div>
                            )
                            }

                            {/* Reservation Type */}
                            {step === 0 && (

                                <div className="flex flex-col items-center justify-center gap-12 p-4">

                                    <div className="flex flex-1 flex-col gap-2">
                                        <h1 className="text-center text-4xl font-semibold"> What would you like to reserve? <span className="text-destructive"> * </span> </h1>
                                        <p className="text-center text-base font-normal text-muted-foreground">
                                            Start creating your reservation by selecting the type/s of amenity you're planning to reserve.
                                        </p>
                                    </div>

                                    {/* First FormField */}
                                    {/* Radio Group for choosing reservation type */}
                                    <FormField
                                        control={reservationForm.control}
                                        name="reservationType"
                                        render={({ field }) => {

                                            return (

                                                <FormItem>

                                                    <FormLabel className="sr-only"> Amenity Choice Radio Group </FormLabel>

                                                    <FormControl>

                                                        <RadioGroup
                                                            className="flex flex-1 flex-row gap-8"
                                                            defaultValue={field.value}
                                                            onValueChange={field.onChange}
                                                        >

                                                            <div
                                                                className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer"
                                                                    + (field.value === "Equipment" ? " border-green-500" : "")}
                                                                onClick={() => { field.onChange("Equipment"); setReservationType("Equipment"); }}
                                                            >

                                                                <div className="flex flex-col gap-1 items-center text-center mt-auto !space-y-0">
                                                                    <FormLabel className="text-lg font-semibold">
                                                                        Equipment
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Reserve sports gear, tools, or other equipment for your activities.
                                                                    </FormDescription>
                                                                </div>

                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem className="hidden" value="Equipment" id="Equipment" />
                                                                    </FormControl>
                                                                </FormItem>

                                                            </div>

                                                            <div
                                                                className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer"
                                                                    + (field.value === "Facility" ? " border-green-500" : "")}
                                                                onClick={() => { field.onChange("Facility"); setReservationType("Facility"); }}
                                                            >

                                                                <div className="flex flex-col gap-1 items-center text-center mt-auto  !space-y-0">
                                                                    <FormLabel className="text-lg font-semibold">
                                                                        Facility
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Book exclusive access to the clubhouse, gym, and pool.
                                                                    </FormDescription>
                                                                </div>

                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem className="hidden" value="Facility" id="Facility" />

                                                                    </FormControl>
                                                                </FormItem>

                                                            </div>

                                                            <div
                                                                className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer"
                                                                    + (field.value === "Equipment and Facility" ? " border-green-500" : "")}
                                                                onClick={() => { field.onChange("Equipment and Facility"); setReservationType("Equipment and Facility"); }}
                                                            >

                                                                <div className="flex flex-col gap-1 items-center text-center mt-auto !space-y-0">
                                                                    <FormLabel className="text-lg font-semibold">
                                                                        Both Equipment and Facility
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Reserve both equipment and facilities for your needs in one easy step.
                                                                    </FormDescription>
                                                                </div>

                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem className="hidden" value="Equipment and Facility" id="Equipment and Facility" />
                                                                    </FormControl>
                                                                </FormItem>

                                                            </div>

                                                        </RadioGroup>

                                                    </FormControl>

                                                </FormItem>


                                            )
                                        }
                                        }
                                    />

                                    <Button
                                        className="rounded-md w-fit pl-16 pr-12 md:mt-12"
                                        onClick={() => {
                                            if (reservationType === "Equipment" || reservationType === "Equipment and Facility") {
                                                reservationForm.setValue("reservationAmenities", []);
                                                setStep(1);
                                            } else if (reservationType === "Facility") {
                                                reservationForm.setValue("reservationAmenities", []);
                                                setStep(3);
                                            }
                                        }}
                                    >
                                        Continue
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>

                                </div>

                            )
                            }


                            {/* Equipment list */}

                            {step === 1 && (reservationType === "Equipment" || reservationType === "Equipment and Facility") && (

                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                                    {/* Equipment */}
                                    <Card className="auto-rows-max lg:col-span-2 h-fit min-h-fit max-h-svh">
                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                            {/* Amenity information header */}
                                            <div className="flex flex-row justify-between items-center pb-2">
                                                <div className="mr-12">
                                                    <Breadcrumb>
                                                        <BreadcrumbList>
                                                            <BreadcrumbItem>
                                                                <BreadcrumbPage className="flex items-center gap-2 text-lg font-semibold">
                                                                    Equipment list
                                                                </BreadcrumbPage>
                                                            </BreadcrumbItem>
                                                        </BreadcrumbList>
                                                    </Breadcrumb>
                                                    <p className="text-sm font-normal text-muted-foreground">
                                                        Please select at least one equipment you want to reserve. You can choose multiple items.
                                                    </p>
                                                </div>
                                                <Button
                                                    className="pl-6 pr-3"
                                                    disabled={reservationEquipmentsIds.length === 0}
                                                    onClick={handleEquipmentContinueButton}
                                                    size="sm"
                                                    title="Continue to the next step"
                                                >
                                                    Continue
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            {/* Amenity images */}
                                            <Table className="table-fixed h-24 max-h-24 overflow-y-auto">
                                                <TableBody className="h-24 max-h-24 overflow-y-auto">
                                                    {amenityList
                                                        .filter((amenity) => amenity.amenityType === "Equipment")
                                                        .map((amenity) => (
                                                            <TableRow
                                                                key={amenity._id}
                                                                className="grid grid-cols-7 w-full cursor-pointer"
                                                            >
                                                                <TableCell
                                                                    className="col-span-2 flex items-center justify-center"
                                                                    onClick={() => {
                                                                        setStep(2);
                                                                        setCurrentAmenity(amenity);
                                                                    }}
                                                                >
                                                                    {amenity.amenityImages[0] ? (
                                                                        <img
                                                                            src={amenity.amenityImages[0].url}
                                                                            className="min-w-24 max-w-52 max-h-52 rounded-md object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex flex-col items-center justify-center gap-2 w-52 min-w-24 max-w-52 bg-muted/50 text-muted-foreground rounded-md aspect-video object-cover">
                                                                            <ImageOff className="w-5 h-5" />
                                                                            No image available
                                                                        </div>
                                                                    )}
                                                                </TableCell>
                                                                <TableCell
                                                                    className="col-span-4 flex flex-col justify-center gap-4 w-full max-w-full"
                                                                    onClick={() => {
                                                                        setStep(2);
                                                                        setCurrentAmenity(amenity);
                                                                    }}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="font-semibold">
                                                                            {amenity.amenityName}
                                                                        </span>
                                                                        <span className="text-sm text-muted-foreground">
                                                                            Stock remaining: {amenity.amenityStock}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-sm text-muted-foreground w-full min-w-full line-clamp-2">
                                                                        {amenity.amenityDescription}
                                                                    </span>
                                                                </TableCell>
                                                                <TableCell className="flex items-center justify-center !px-4">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={reservationEquipmentsIds.includes(amenity._id)}
                                                                            onCheckedChange={(checked) => {
                                                                                setReservationEquipmentsIds((prev) =>
                                                                                    checked
                                                                                        ? [...prev, amenity._id]
                                                                                        : prev.filter((id) => id !== amenity._id)
                                                                                );
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    <Card className="max-h-fit col-span-1">
                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">
                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation summary
                                            </CardTitle>
                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding. Please go back to make changes.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-2 mt-6">

                                            <div className="flex flex-col p-4 mb-2 text-base rounded-md bg-muted/50">
                                                <Label className="text-sm text-muted-foreground font-normal">
                                                    Reserved by
                                                </Label>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-sm font-medium">
                                                        {user.userBlkLt}
                                                    </span>
                                                    <Badge> {user.userPosition} </Badge>
                                                </div>

                                                <span className="text-sm text-muted-foreground"> {format(new Date(), "PPp")} </span>
                                            </div>

                                            <div className="">
                                                <Label className="text-sm text-muted-foreground"> Reservation Amenities </Label>
                                            </div>

                                            <Accordion className="w-full mt-0 mb-2" type="multiple">
                                                <div className="flex flex-col gap-2">
                                                    {reservationForm.watch("reservationAmenities")?.map((amenity, index) => (
                                                        <AccordionItem key={index} className="border-b" value={index.toString()}>
                                                            <AccordionTrigger className="hover:no-underline">
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        {amenity.amenityImages.length > 0 && (
                                                                            <DialogTrigger>
                                                                                <img src={amenity.amenityImages[0]?.url} className="h-16 w-16 max-h-16 max-w-16 rounded-md object-cover" />
                                                                            </DialogTrigger>
                                                                        )}
                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only">Image preview</DialogTitle>
                                                                            <DialogDescription className="sr-only">Image preview</DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? amenity.amenityImages.length - 1 : prev - 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === amenity.amenityImages.length - 1 ? 0 : prev + 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>
                                                                            <img src={amenity.amenityImages[currentIndex]?.url} className="aspect-video rounded-md object-contain" />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    {amenity.amenityImages.length == 0 && (
                                                                        <div className="flex px-0 items-center justify-center min-h-16 min-w-16 rounded-md bg-muted/50">
                                                                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-col items-start line-clamp-1">
                                                                        <Label className="text-start text-sm font-medium line-clamp-1 !!no-underline">{amenity.amenityName}</Label>
                                                                        <span className="text-start text-sm text-muted-foreground line-clamp-1">
                                                                            {amenity.amenityType === "Equipment"
                                                                                ? `Quantity: ${amenity.amenityQuantity ?? 'N/A'}`
                                                                                : amenity.amenityType}
                                                                        </span>  </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex flex-col gap-2">
                                                                {amenity.amenityType === "Facility" && (
                                                                    <div>
                                                                        <Label className="text-start text-muted-foreground">Facility Address</Label>
                                                                        <p>{amenity.amenityAddress}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Description</Label>
                                                                    <p>{amenity.amenityDescription}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Reminder</Label>
                                                                    <p>{amenity.amenityReminder}</p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </div>
                                            </Accordion>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Type </Label>
                                                {reservationForm.getValues("reservationType") && (
                                                    <p className="text-sm text-end"> {reservationForm.getValues("reservationType")}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Date </Label>
                                                {reservationForm.getValues("reservationDate") ? (
                                                    <p className="text-sm text-end break-words"> {format(reservationForm.getValues("reservationDate"), "PPp")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No date provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservation Reason </Label>
                                                {reservationForm.watch("reservationReason") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reservationReason")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No reason provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservee Email </Label>
                                                {reservationForm.watch("reserveeEmail") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reserveeEmail")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No email provided</p>
                                                )}
                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            )
                            }

                            {/* Equipment information */}
                            {step === 2 && currentAmenity && (



                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                                    <Card className="auto-rows-max lg:col-span-2 h-fit min-h-fit max-h-svh">

                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh overflow-y-auto">

                                            <div className="flex flex-row gap-2 items-center pb-2">

                                                <Button size="icon" className="h-8 w-8 hidden" type="button" variant="ghost">
                                                    <ChevronLeft className="h-10 w-10" />
                                                </Button>

                                                <div className="">

                                                    <Breadcrumb>

                                                        <BreadcrumbList>

                                                            <BreadcrumbItem>
                                                                <BreadcrumbLink
                                                                    className="text-lg cursor-pointer hover:font-semibold"
                                                                    onClick={() => setStep(1)}
                                                                    title="Go back to equipment list?"
                                                                >
                                                                    Equipment list
                                                                </BreadcrumbLink>
                                                            </BreadcrumbItem>

                                                            <BreadcrumbSeparator />

                                                            <BreadcrumbItem>
                                                                <BreadcrumbPage className="text-lg font-semibold">
                                                                    {currentAmenity.amenityName} information
                                                                </BreadcrumbPage>
                                                            </BreadcrumbItem>

                                                        </BreadcrumbList>

                                                    </Breadcrumb>

                                                    <p className="text-sm font-normal text-muted-foreground">
                                                        The details of the equipment you've chosen.
                                                    </p>

                                                </div>

                                                <div
                                                    className="ml-auto pr-3"
                                                >
                                                    <FormField
                                                        control={reservationForm.control}
                                                        name="reservationAmenities"
                                                        render={({ }) => {
                                                            return (

                                                                <FormItem>

                                                                    <FormControl>

                                                                        <Checkbox
                                                                            checked={reservationEquipmentsIds.includes(currentAmenity._id)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? setReservationEquipmentsIds([...reservationEquipmentsIds, currentAmenity._id])
                                                                                    : setReservationEquipmentsIds(
                                                                                        reservationEquipmentsIds.filter(
                                                                                            (value) => value !== currentAmenity._id
                                                                                        )
                                                                                    )
                                                                            }}
                                                                        />
                                                                    </FormControl>

                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-7 gap-4 pt-2 pb-6">

                                                <div></div>

                                                <Carousel
                                                    className="col-span-5 items-center justify-center"
                                                    opts={{
                                                        align: "center",
                                                        loop: true,
                                                    }}
                                                >
                                                    <CarouselContent>
                                                        {currentAmenity.amenityImages[0] && currentAmenity.amenityImages.map((image, index) => {

                                                            return (
                                                                <CarouselItem key={index} className="flex items-center justify-center">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        <DialogTrigger>
                                                                            <img src={image.url} className="rounded-md max-h-96" />
                                                                        </DialogTrigger>

                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only"> Equipment Image preview </DialogTitle>
                                                                            <DialogDescription className="sr-only"> Equipment Image preview </DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={currentAmenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (currentIndex === 0) {
                                                                                        setCurrentIndex(currentAmenity.amenityImages.length - 1)
                                                                                    } else {
                                                                                        setCurrentIndex(currentIndex - 1)
                                                                                    }
                                                                                }}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>

                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={currentAmenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (currentIndex === currentAmenity.amenityImages.length - 1) {
                                                                                        setCurrentIndex(0)
                                                                                    } else {
                                                                                        setCurrentIndex(currentIndex + 1)
                                                                                    }
                                                                                }}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>

                                                                            <img
                                                                                src={currentAmenity.amenityImages[currentIndex].url} className="aspect-video rounded-md object-contain"
                                                                            />

                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </CarouselItem>

                                                            )
                                                        })}

                                                        {!currentAmenity.amenityImages[0] && (
                                                            <CarouselItem className="flex mx-auto flex-row items-center justify-center gap-3 w-64 min-w-24 max-w-64 text-muted-foreground rounded-md aspect-video object-cover">
                                                                <ImageOff className="w-5 h-5" />
                                                                No image available
                                                            </CarouselItem>
                                                        )}
                                                    </CarouselContent>
                                                    <CarouselPrevious />
                                                    <CarouselNext />
                                                </Carousel>

                                                <div></div>

                                            </div>

                                            <div className="col-span-7 grid grid-cols-2 p-6 bg-muted/50 border rounded-md gap-10">

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Name
                                                    </Label>
                                                    <p className="text-base">
                                                        {currentAmenity.amenityName}
                                                    </p>

                                                </div>

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Type
                                                    </Label>
                                                    <p className="text-base">
                                                        {currentAmenity.amenityType}
                                                    </p>

                                                </div>

                                                <div className="col-span-2 grid grid-cols-4 gap-1">

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Current Stock
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityStock}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Maximum Stock
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityStockMax}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Minimum Quantity Per Reservation
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityQuantityMin}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Maximum Quantity Per Reservation
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityQuantityMax}
                                                        </p>
                                                    </div>


                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Description
                                                    </Label>

                                                    <p className="text-base">
                                                        {currentAmenity.amenityDescription}
                                                    </p>

                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Reminder
                                                    </Label>

                                                    <p className="text-base">
                                                        {currentAmenity.amenityReminder}
                                                    </p>

                                                </div>

                                            </div>

                                        </CardContent>

                                    </Card>




                                    <Card className="max-h-fit col-span-1">
                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">
                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation summary
                                            </CardTitle>
                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding. Please go back to make changes.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-2 mt-6">

                                            <div className="flex flex-col p-4 mb-2 text-base rounded-md bg-muted/50">
                                                <Label className="text-sm text-muted-foreground font-normal">
                                                    Reserved by
                                                </Label>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-sm font-medium">
                                                        {user.userBlkLt}
                                                    </span>
                                                    <Badge> {user.userPosition} </Badge>
                                                </div>

                                                <span className="text-sm text-muted-foreground"> {format(new Date(), "PPp")} </span>
                                            </div>

                                            <div className="">
                                                <Label className="text-sm text-muted-foreground"> Reservation Amenities </Label>
                                            </div>

                                            <Accordion className="w-full mt-0 mb-2" type="multiple">
                                                <div className="flex flex-col gap-2">
                                                    {reservationForm.watch("reservationAmenities")?.map((amenity, index) => (
                                                        <AccordionItem key={index} className="border-b" value={index.toString()}>
                                                            <AccordionTrigger className="hover:no-underline">
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        {amenity.amenityImages.length > 0 && (
                                                                            <DialogTrigger>
                                                                                <img src={amenity.amenityImages[0]?.url} className="h-16 w-16 max-h-16 max-w-16 rounded-md object-cover" />
                                                                            </DialogTrigger>
                                                                        )}
                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only">Image preview</DialogTitle>
                                                                            <DialogDescription className="sr-only">Image preview</DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? amenity.amenityImages.length - 1 : prev - 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === amenity.amenityImages.length - 1 ? 0 : prev + 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>
                                                                            <img src={amenity.amenityImages[currentIndex]?.url} className="aspect-video rounded-md object-contain" />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    {amenity.amenityImages.length == 0 && (
                                                                        <div className="flex px-0 items-center justify-center min-h-16 min-w-16 rounded-md bg-muted/50">
                                                                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-col items-start line-clamp-1">
                                                                        <Label className="text-start text-sm font-medium line-clamp-1 !!no-underline">{amenity.amenityName}</Label>
                                                                        <span className="text-start text-sm text-muted-foreground line-clamp-1">
                                                                            {amenity.amenityType === "Equipment"
                                                                                ? `Quantity: ${amenity.amenityQuantity ?? 'N/A'}`
                                                                                : amenity.amenityType}
                                                                        </span>  </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex flex-col gap-2">
                                                                {amenity.amenityType === "Facility" && (
                                                                    <div>
                                                                        <Label className="text-start text-muted-foreground">Facility Address</Label>
                                                                        <p>{amenity.amenityAddress}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Description</Label>
                                                                    <p>{amenity.amenityDescription}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Reminder</Label>
                                                                    <p>{amenity.amenityReminder}</p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </div>
                                            </Accordion>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Type </Label>
                                                {reservationForm.getValues("reservationType") && (
                                                    <p className="text-sm text-end"> {reservationForm.getValues("reservationType")}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Date </Label>
                                                {reservationForm.getValues("reservationDate") ? (
                                                    <p className="text-sm text-end break-words"> {format(reservationForm.getValues("reservationDate"), "PPp")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No date provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservation Reason </Label>
                                                {reservationForm.watch("reservationReason") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reservationReason")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No reason provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservee Email </Label>
                                                {reservationForm.watch("reserveeEmail") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reserveeEmail")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No email provided</p>
                                                )}
                                            </div>

                                        </CardContent>
                                    </Card>

                                </div>

                            )}

                            {/* Facility list */}
                            {step === 3 && (reservationType === "Facility" || reservationType === "Equipment and Facility") && (
                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                                    {/* Facility */}
                                    <Card className="auto-rows-max lg:col-span-2 h-fit min-h-fit max-h-svh">
                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                            {/* Amenity information header */}
                                            <div className="pb-2">
                                                <Breadcrumb>
                                                    <BreadcrumbList>
                                                        <BreadcrumbItem>
                                                            <BreadcrumbPage className="text-lg font-semibold">
                                                                Facility list
                                                            </BreadcrumbPage>
                                                        </BreadcrumbItem>
                                                    </BreadcrumbList>
                                                </Breadcrumb>
                                                <p className="text-sm font-normal text-muted-foreground">
                                                    Pick the facility you want to reserve. You can only choose one (1).
                                                </p>
                                            </div>
                                            {/* Amenity images */}
                                            <Table className="table-fixed h-24 max-h-24 overflow-y-auto">
                                                <TableBody className="h-24 max-h-24 overflow-y-auto">
                                                    {amenityList.filter((amenity) => amenity.amenityType === "Facility").map((amenity) => (
                                                        <TableRow
                                                            className="grid grid-cols-7 cursor-pointer"
                                                            onClick={() => {
                                                                setStep(4);
                                                                setCurrentAmenity(amenity);
                                                            }}
                                                        >
                                                            <TableCell className="col-span-2 flex items-center justify-center">
                                                                {amenity.amenityImages[0] ? (
                                                                    <img
                                                                        src={amenity.amenityImages[0].url}
                                                                        className="min-w-24 max-w-52 max-h-52 rounded-md object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex flex-col items-center justify-center gap-2 w-52 min-w-24 max-w-52 text-muted-foreground rounded-md aspect-video object-cover">
                                                                        <ImageOff className="w-5 h-5" />
                                                                        No image available
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="col-span-4 flex flex-col justify-center gap-4 overflow-hidden">
                                                                <div className="flex flex-col">
                                                                    <span className="font-semibold"> {amenity.amenityName} </span>
                                                                    <span className="text-sm text-muted-foreground">{amenity.amenityAddress}</span>
                                                                </div>
                                                                <span className="text-sm text-muted-foreground line-clamp-2">
                                                                    {amenity.amenityDescription}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className="flex items-center justify-center px-4">
                                                                <ChevronRight />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    {amenityList.filter((amenity) => amenity.amenityType === "Facility").length === 0 && (
                                                        <div className="flex h-54 w-full items-center justify-center">
                                                            No facilities available.
                                                        </div>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>

                                    <Card className="max-h-fit col-span-1">
                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">
                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation summary
                                            </CardTitle>
                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding. Please go back to make changes.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-2 mt-6">

                                            <div className="flex flex-col p-4 mb-2 text-base rounded-md bg-muted/50">
                                                <Label className="text-sm text-muted-foreground font-normal">
                                                    Reserved by
                                                </Label>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-sm font-medium">
                                                        {user.userBlkLt}
                                                    </span>
                                                    <Badge> {user.userPosition} </Badge>
                                                </div>

                                                <span className="text-sm text-muted-foreground"> {format(new Date(), "PPp")} </span>
                                            </div>

                                            <div className="">
                                                <Label className="text-sm text-muted-foreground"> Reservation Amenities </Label>
                                            </div>

                                            <Accordion className="w-full mt-0 mb-2" type="multiple">
                                                <div className="flex flex-col gap-2">
                                                    {reservationForm.watch("reservationAmenities")?.map((amenity, index) => (
                                                        <AccordionItem key={index} className="border-b" value={index.toString()}>
                                                            <AccordionTrigger className="hover:no-underline">
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        {amenity.amenityImages.length > 0 && (
                                                                            <DialogTrigger>
                                                                                <img src={amenity.amenityImages[0]?.url} className="h-16 w-16 max-h-16 max-w-16 rounded-md object-cover" />
                                                                            </DialogTrigger>
                                                                        )}
                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only">Image preview</DialogTitle>
                                                                            <DialogDescription className="sr-only">Image preview</DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? amenity.amenityImages.length - 1 : prev - 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === amenity.amenityImages.length - 1 ? 0 : prev + 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>
                                                                            <img src={amenity.amenityImages[currentIndex]?.url} className="aspect-video rounded-md object-contain" />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    {amenity.amenityImages.length == 0 && (
                                                                        <div className="flex px-0 items-center justify-center min-h-16 min-w-16 rounded-md bg-muted/50">
                                                                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-col items-start line-clamp-1">
                                                                        <Label className="text-start text-sm font-medium line-clamp-1 !!no-underline">{amenity.amenityName}</Label>
                                                                        <span className="text-start text-sm text-muted-foreground line-clamp-1">
                                                                            {amenity.amenityType === "Equipment"
                                                                                ? `Quantity: ${amenity.amenityQuantity ?? 'N/A'}`
                                                                                : amenity.amenityType}
                                                                        </span>  </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex flex-col gap-2">
                                                                {amenity.amenityType === "Facility" && (
                                                                    <div>
                                                                        <Label className="text-start text-muted-foreground">Facility Address</Label>
                                                                        <p>{amenity.amenityAddress}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Description</Label>
                                                                    <p>{amenity.amenityDescription}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Reminder</Label>
                                                                    <p>{amenity.amenityReminder}</p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </div>
                                            </Accordion>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Type </Label>
                                                {reservationForm.getValues("reservationType") && (
                                                    <p className="text-sm text-end"> {reservationForm.getValues("reservationType")}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Date </Label>
                                                {reservationForm.getValues("reservationDate") ? (
                                                    <p className="text-sm text-end break-words"> {format(reservationForm.getValues("reservationDate"), "PPp")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No date provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservation Reason </Label>
                                                {reservationForm.watch("reservationReason") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reservationReason")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No reason provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservee Email </Label>
                                                {reservationForm.watch("reserveeEmail") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reserveeEmail")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No email provided</p>
                                                )}
                                            </div>

                                        </CardContent>
                                    </Card>

                                </div>
                            )
                            }

                            {/* Facility information */}
                            {step === 4 && currentAmenity && (
                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                                    <Card className="auto-rows-max lg:col-span-2 h-fit min-h-fit max-h-svh">

                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh overflow-y-auto">

                                            <div className="flex flex-row gap-2 items-center pb-2">

                                                <Button size="icon" className="h-8 w-8 hidden" type="button" variant="ghost">
                                                    <ChevronLeft className="h-10 w-10" />
                                                </Button>

                                                <div className="">

                                                    <Breadcrumb>

                                                        <BreadcrumbList>

                                                            <BreadcrumbItem>
                                                                <BreadcrumbLink
                                                                    className="text-lg cursor-pointer hover:font-semibold"
                                                                    onClick={() => setStep(3)}
                                                                    title="Go back to facility list?"
                                                                >
                                                                    Facility list
                                                                </BreadcrumbLink>
                                                            </BreadcrumbItem>

                                                            <BreadcrumbSeparator />

                                                            <BreadcrumbItem>
                                                                <BreadcrumbPage className="text-lg font-semibold">
                                                                    {currentAmenity.amenityName} information
                                                                </BreadcrumbPage>
                                                            </BreadcrumbItem>

                                                        </BreadcrumbList>

                                                    </Breadcrumb>

                                                    <p className="text-sm font-normal text-muted-foreground">
                                                        The details of the equipment you've chosen.
                                                    </p>

                                                </div>

                                                <div
                                                    className="ml-auto pr-3"
                                                >
                                                    <Button
                                                        onClick={() => {
                                                            handleFacilityContinueButton();
                                                        }}
                                                        type="button"
                                                    >
                                                        Choose facility
                                                        <ChevronRight className="w-6 h-6" />
                                                    </Button>
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-7 gap-4 pt-2 pb-6">

                                                <div></div>

                                                <Carousel
                                                    className="col-span-5 items-center justify-center"
                                                    opts={{
                                                        align: "center",
                                                        loop: true,
                                                    }}
                                                >
                                                    <CarouselContent>
                                                        {currentAmenity.amenityImages[0] && currentAmenity.amenityImages.map((image, index) => {

                                                            return (

                                                                <CarouselItem key={index} className="flex items-center justify-center">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        <DialogTrigger>
                                                                            <img src={image.url} className="rounded-md max-h-96" />
                                                                        </DialogTrigger>

                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only"> Facility Image preview </DialogTitle>
                                                                            <DialogDescription className="sr-only"> Equipment Image preview </DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={currentAmenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (currentIndex === 0) {
                                                                                        setCurrentIndex(currentAmenity.amenityImages.length - 1)
                                                                                    } else {
                                                                                        setCurrentIndex(currentIndex - 1)
                                                                                    }
                                                                                }}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>

                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={currentAmenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    if (currentIndex === currentAmenity.amenityImages.length - 1) {
                                                                                        setCurrentIndex(0)
                                                                                    } else {
                                                                                        setCurrentIndex(currentIndex + 1)
                                                                                    }
                                                                                }}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>

                                                                            <img
                                                                                src={currentAmenity.amenityImages[currentIndex].url} className="aspect-video rounded-md object-contain"
                                                                            />

                                                                        </DialogContent>

                                                                    </ Dialog>
                                                                </CarouselItem>

                                                            )
                                                        })}

                                                        {!currentAmenity.amenityImages[0] && (
                                                            <CarouselItem className="flex flex-row mx-auto items-center justify-center gap-3 w-52 min-w-24 max-w-52 text-muted-foreground rounded-md aspect-video object-cover">
                                                                <ImageOff className="w-5 h-5" />
                                                                No image available
                                                            </CarouselItem>
                                                        )}
                                                    </CarouselContent>
                                                    <CarouselPrevious />
                                                    <CarouselNext />
                                                </Carousel>

                                                <div></div>

                                            </div>

                                            <div className="col-span-7 grid grid-cols-2 p-6 bg-muted/50 border rounded-md gap-10">

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Name
                                                    </Label>
                                                    <p className="text-base">
                                                        {currentAmenity.amenityName}
                                                    </p>

                                                </div>

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Type
                                                    </Label>
                                                    <p className="text-base">
                                                        {currentAmenity.amenityType}
                                                    </p>

                                                </div>

                                                <div className="col-span-2 grid grid-cols-4 gap-1">

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Current Stock
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityStock}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Maximum Stock
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityStockMax}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Minimum Quantity Per Reservation
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityQuantityMin}
                                                        </p>
                                                    </div>

                                                    <div className="px-2">
                                                        <Label className="text-xs uppercase text-muted-foreground">
                                                            Maximum Quantity Per Reservation
                                                        </Label>

                                                        <p className="text-base">
                                                            {currentAmenity.amenityQuantityMax}
                                                        </p>
                                                    </div>


                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Description
                                                    </Label>

                                                    <p className="text-base">
                                                        {currentAmenity.amenityDescription}
                                                    </p>

                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Reminder
                                                    </Label>

                                                    <p className="text-base">
                                                        {currentAmenity.amenityReminder}
                                                    </p>

                                                </div>

                                            </div>

                                        </CardContent>

                                    </Card>

                                    <Card className="max-h-fit col-span-1">
                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">
                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation summary
                                            </CardTitle>
                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding. Please go back to make changes.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-2 mt-6">

                                            <div className="flex flex-col p-4 mb-2 text-base rounded-md bg-muted/50">
                                                <Label className="text-sm text-muted-foreground font-normal">
                                                    Reserved by
                                                </Label>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-sm font-medium">
                                                        {user.userBlkLt}
                                                    </span>
                                                    <Badge> {user.userPosition} </Badge>
                                                </div>

                                                <span className="text-sm text-muted-foreground"> {format(new Date(), "PPp")} </span>
                                            </div>

                                            <div className="">
                                                <Label className="text-sm text-muted-foreground"> Reservation Amenities </Label>
                                            </div>

                                            <Accordion className="w-full mt-0 mb-2" type="multiple">
                                                <div className="flex flex-col gap-2">
                                                    {reservationForm.watch("reservationAmenities")?.map((amenity, index) => (
                                                        <AccordionItem key={index} className="border-b" value={index.toString()}>
                                                            <AccordionTrigger className="hover:no-underline">
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        {amenity.amenityImages.length > 0 && (
                                                                            <DialogTrigger>
                                                                                <img src={amenity.amenityImages[0]?.url} className="h-16 w-16 max-h-16 max-w-16 rounded-md object-cover" />

                                                                            </DialogTrigger>
                                                                        )}
                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only">Image preview</DialogTitle>
                                                                            <DialogDescription className="sr-only">Image preview</DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? amenity.amenityImages.length - 1 : prev - 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === amenity.amenityImages.length - 1 ? 0 : prev + 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>
                                                                            <img src={amenity.amenityImages[currentIndex]?.url} className="aspect-video rounded-md object-contain" />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    {amenity.amenityImages.length == 0 && (
                                                                        <div className="flex px-0 items-center justify-center min-h-16 min-w-16 rounded-md bg-muted/50">
                                                                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-col items-start line-clamp-1">
                                                                        <Label className="text-start text-sm font-medium line-clamp-1 !!no-underline">{amenity.amenityName}</Label>
                                                                        <span className="text-start text-sm text-muted-foreground line-clamp-1">
                                                                            {amenity.amenityType === "Equipment"
                                                                                ? `Quantity: ${amenity.amenityQuantity ?? 'N/A'}`
                                                                                : amenity.amenityType}
                                                                        </span>  </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex flex-col gap-2">
                                                                {amenity.amenityType === "Facility" && (
                                                                    <div>
                                                                        <Label className="text-start text-muted-foreground">Facility Address</Label>
                                                                        <p>{amenity.amenityAddress}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Description</Label>
                                                                    <p>{amenity.amenityDescription}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Reminder</Label>
                                                                    <p>{amenity.amenityReminder}</p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </div>
                                            </Accordion>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Type </Label>
                                                {reservationForm.getValues("reservationType") && (
                                                    <p className="text-sm text-end"> {reservationForm.getValues("reservationType")}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Date </Label>
                                                {reservationForm.getValues("reservationDate") ? (
                                                    <p className="text-sm text-end break-words"> {format(reservationForm.getValues("reservationDate"), "PPp")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No date provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservation Reason </Label>
                                                {reservationForm.watch("reservationReason") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reservationReason")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No reason provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservee Email </Label>
                                                {reservationForm.watch("reserveeEmail") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reserveeEmail")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No email provided</p>
                                                )}
                                            </div>

                                        </CardContent>
                                    </Card>

                                </div>
                            )
                            }

                            {/* Other information */}
                            {step === 5 && (
                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                                    {/* Card form */}
                                    <Card className="auto-rows-max lg:col-span-2">



                                        <CardContent className="flex flex-col gap-2 py-5">

                                            {/* Amenity information header */}
                                            <div className="flex flex-row justify-between pb-2">
                                                <div className="">
                                                    <Breadcrumb>
                                                        <BreadcrumbList>
                                                            <BreadcrumbItem>
                                                                <BreadcrumbPage className="text-lg font-semibold">
                                                                    Other information
                                                                </BreadcrumbPage>
                                                            </BreadcrumbItem>
                                                        </BreadcrumbList>
                                                    </Breadcrumb>

                                                    <p className="text-sm font-normal text-muted-foreground">
                                                        Please provide additional information about your reservation.
                                                    </p>
                                                </div>

                                            </div>



                                            {/* Amenity images */}
                                            {/* {reservationType === "Equipment" && (
                                                <div className="">
                                                    <Label className="text-base">
                                                        Equipment list
                                                    </Label>
                                                </div>
                                            )} */}

                                            {(reservationType === "Equipment" || reservationType === "Equipment and Facility") && reservationForm.getValues("reservationAmenities").map((amenity, index) => {

                                                // console.log(index);
                                                console.log(equipmentAvailableStocks[index]?.availableStock ?? amenity.amenityStock);

                                                if (amenity.amenityType === "Equipment")
                                                    return (
                                                        <div key={index} className="flex flex-col gap-4 p-4 my-1 rounded-md border border-dashed">
                                                            {/* Header */}
                                                            <div className="flex justify-between">
                                                                <div className="">
                                                                    <Label className="text-sm font-medium">{amenity.amenityName}</Label>
                                                                    <p className="text-sm text-muted-foreground"> Stocks will change depending on the date's availability. </p>
                                                                </div>
                                                                <Badge
                                                                    className="text-xs min-h-fit max-h-7"
                                                                    variant="secondary"
                                                                >
                                                                    {amenity.amenityType}
                                                                </Badge>
                                                            </div>


                                                            <div className="grid grid-cols-3 items-center gap-2">
                                                                <div className="col-span-2">
                                                                    <Label className="text-sm">
                                                                        {amenity.amenityType} quantity <span className="text-destructive"> * </span>
                                                                    </Label>
                                                                    <p className="text-sm font-normal text-muted-foreground">
                                                                        Available stock: {equipmentAvailableStocks[index]?.availableStock ?? amenity.amenityStock}
                                                                    </p>
                                                                    <p className="text-sm font-normal text-muted-foreground">
                                                                        Min: {equipmentAvailableStocks[index]?.availableStock < (amenity.amenityQuantityMin ?? 0) ? equipmentAvailableStocks[index]?.availableStock : (amenity.amenityQuantityMin ?? 0)} - Max: {equipmentAvailableStocks[index]?.availableStock < (amenity.amenityQuantityMax ?? 0) ? equipmentAvailableStocks[index]?.availableStock : (amenity.amenityQuantityMax ?? 0)}
                                                                    </p>
                                                                </div>

                                                                <FormField
                                                                    control={reservationForm.control}
                                                                    name="reservationAmenities"
                                                                    render={({ field: { onChange, ...fieldProps } }) => (
                                                                        <FormItem>
                                                                            <FormControl>
                                                                                <Input
                                                                                    required
                                                                                    min={equipmentAvailableStocks[index]?.availableStock < (amenity.amenityQuantityMin ?? 0) ? equipmentAvailableStocks[index].availableStock : (amenity.amenityQuantityMin ?? 0)}
                                                                                    max={equipmentAvailableStocks[index]?.availableStock < (amenity.amenityQuantityMax ?? 0) ? equipmentAvailableStocks[index].availableStock : (amenity.amenityQuantityMax ?? 0)}
                                                                                    type="number"
                                                                                    placeholder="Quantity"
                                                                                    value={fieldProps.value.find((item) => item._id === amenity._id)?.amenityQuantity}
                                                                                    onChange={(e) => {
                                                                                        const updatedAmenities = reservationForm.watch("reservationAmenities").map((item) =>
                                                                                            item._id === amenity._id
                                                                                                ? { ...item, amenityQuantity: parseInt(e.target.value, 10) }
                                                                                                : item
                                                                                        );
                                                                                        onChange(updatedAmenities);
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>

                                                                    )}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                            })}



                                            {(reservationType === "Facility" || reservationType === "Equipment and Facility") && reservationForm.getValues("reservationAmenities").map((amenity) => {

                                                if (false)
                                                    return (
                                                        <div className="flex flex-col gap-4 p-4 my-1 rounded-md border border-dashed">
                                                            {/* Header */}
                                                            <Label className="text-sm font-medium">{amenity.amenityName}</Label>

                                                            <div className="grid grid-cols-3 gap-2">
                                                                <div className="col-span-2">
                                                                    <Label className="text-sm">
                                                                        {amenity.amenityType} Address <span className="text-destructive"> * </span>
                                                                    </Label>
                                                                    <p className="text-sm font-normal text-muted-foreground">
                                                                        {amenity.amenityAddress}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                            })}



                                            {/* Available dates */}
                                            <div className="flex flex-col gap-2 pt-6">
                                                <div>
                                                    <Label className="text-sm">Available dates for each amenity</Label>
                                                    <p className="text-sm text-muted-foreground">
                                                        These are the available dates for each amenity you've chosen.
                                                    </p>
                                                </div>

                                                <Tabs className="pt-2 overflow-x-hidden overflow-y-auto" defaultValue="All dates">
                                                    <TabsList className="justify-start h-fit w-full rounded-none border-b py-0 bg-transparent overflow-x-hidden overflow-y-auto">
                                                        <TabsTrigger
                                                            type="button"
                                                            value="All dates"
                                                            className="rounded-none px-4 !bg-transparent data-[state=active]:border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"
                                                        >
                                                            All dates
                                                        </TabsTrigger>
                                                        {reservationForm.getValues("reservationAmenities").map((amenity, index) => (
                                                            <TabsTrigger
                                                                type="button"
                                                                key={index}
                                                                value={amenity.amenityName}
                                                                className="rounded-none px-4 !bg-transparent data-[state=active]:border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"
                                                            >
                                                                {amenity.amenityName}
                                                            </TabsTrigger>
                                                        ))}
                                                    </TabsList>

                                                    <TabsContent value="All dates" className="flex justify-center">
                                                        <Calendar
                                                            disabled={disabledDates}
                                                            numberOfMonths={2}
                                                        />
                                                    </TabsContent>
                                                    {reservationForm.getValues("reservationAmenities").map((amenity, index) => {

                                                        if (amenity.amenityType === "Equipment") {
                                                            let equipmentDisabledDates: Matcher[] = [
                                                                ...(equipmentUnavailableDates[index]?.map(date => new Date(date)) || []),
                                                                { before: dateAWeekFromNow }
                                                            ];
                                                            return (
                                                                <TabsContent key={index} value={amenity.amenityName} className="flex justify-center m-0">
                                                                    <Calendar
                                                                        disabled={equipmentDisabledDates}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </TabsContent>
                                                            )
                                                        } else {
                                                            let facilityDisabledDates: Matcher[] = [
                                                                ...facilityUnavailableDates.flat().map(date => new Date(date)),
                                                                { before: dateAWeekFromNow }
                                                            ];
                                                            return (
                                                                <TabsContent key={index} value={amenity.amenityName} className="flex justify-center m-0">
                                                                    <Calendar
                                                                        disabled={facilityDisabledDates}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </TabsContent>
                                                            )
                                                        }
                                                    }
                                                    )}
                                                </Tabs>
                                            </div>



                                            {/* Reservation date */}
                                            <FormField
                                                control={reservationForm.control}
                                                name="reservationDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row gap-2 justify-between mt-4">

                                                        <div>
                                                            <div className="flex flex-row items-center gap-2">
                                                                <FormLabel className="text-sm">
                                                                    Reservation date <span className="text-destructive"> * </span>
                                                                </FormLabel>
                                                                {reservationForm.getValues("reservationAmenities").length > 1 && (
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="center">
                                                                            <p>All selected amenities must be available on the same date; otherwise, that date will be unavailable for reservation.</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                )}
                                                            </div>
                                                            <FormDescription className="text-sm text-muted-foreground">
                                                                Choose the date you want to reserve the {reservationForm.getValues("reservationAmenities").length === 1 ? "amenity" : "amenities"}.
                                                            </FormDescription>
                                                        </div>

                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" type="button">
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    required
                                                                    disabled={disabledDates}
                                                                    initialFocus
                                                                    mode="single"
                                                                    onSelect={field.onChange}
                                                                    selected={field.value}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>

                                                    </FormItem>
                                                )}
                                            />



                                            {/* Reservation reason */}
                                            <div className="flex flex-col gap-2 mt-6">
                                                <FormField
                                                    control={reservationForm.control}
                                                    name="reservationReason"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col gap-1.5">
                                                            <div className="">
                                                                <div className="flex flex-row items-center gap-2">
                                                                    <FormLabel className="text-sm">
                                                                        Reservation reason <span className="text-destructive"> * </span>
                                                                    </FormLabel>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent align="center">
                                                                            <p>Your reason may or may not affect the approval of your reservation.</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </div>
                                                                <FormDescription>
                                                                    Please provide a brief reason for your reservation.
                                                                </FormDescription>
                                                            </div>
                                                            <FormControl>
                                                                <Textarea placeholder="Enter your reason here" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>



                                            {/* Reservation reservee email */}
                                            <div className="flex flex-col gap-2 mt-4">
                                                <FormField
                                                    control={reservationForm.control}
                                                    name="reserveeEmail"
                                                    render={({ field }) => (
                                                        <FormItem className="flex flex-col gap-1.5">
                                                            <div className="">
                                                                <FormLabel className="text-sm">
                                                                    Reservee email (Optional)
                                                                </FormLabel>
                                                                <FormDescription>
                                                                    We will notify you through email if your reservation is approved or declined.
                                                                </FormDescription>
                                                            </div>
                                                            <FormControl>
                                                                <Input type="email" placeholder="Enter your email here" {...field} />
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>





                                        </CardContent>

                                    </Card>





                                    <Card className="max-h-fit col-span-1">
                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">
                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation summary
                                            </CardTitle>
                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding. Please go back to make changes.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-2 mt-6">

                                            <div className="flex flex-col p-4 mb-2 text-base rounded-md bg-muted/50">
                                                <Label className="text-sm text-muted-foreground font-normal">
                                                    Reserved by
                                                </Label>
                                                <div className="flex items-start justify-between">
                                                    <span className="text-sm font-medium">
                                                        {user.userBlkLt}
                                                    </span>
                                                    <Badge> {user.userPosition} </Badge>
                                                </div>

                                                <span className="text-sm text-muted-foreground"> {format(new Date(), "PPp")} </span>
                                            </div>

                                            <div className="">
                                                <Label className="text-sm text-muted-foreground"> Reservation Amenities </Label>
                                            </div>

                                            <Accordion className="w-full mt-0 mb-2" type="multiple">
                                                <div className="flex flex-col gap-2">
                                                    {reservationForm.watch("reservationAmenities")?.map((amenity, index) => (
                                                        <AccordionItem key={index} className="border-b" value={index.toString()}>
                                                            <AccordionTrigger className="hover:no-underline">
                                                                <div className="flex items-center gap-4 w-full">
                                                                    <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>
                                                                        {amenity.amenityImages.length > 0 && (
                                                                            <DialogTrigger>
                                                                                <img src={amenity.amenityImages[0]?.url} className="h-16 w-16 max-h-16 max-w-16 rounded-md object-cover" />

                                                                            </DialogTrigger>
                                                                        )}
                                                                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">
                                                                            <DialogTitle className="sr-only">Image preview</DialogTitle>
                                                                            <DialogDescription className="sr-only">Image preview</DialogDescription>
                                                                            <Button
                                                                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === 0 ? amenity.amenityImages.length - 1 : prev - 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronLeft className="h-4 w-4" />
                                                                            </Button>
                                                                            <Button
                                                                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                                disabled={amenity.amenityImages.length === 1}
                                                                                type="button"
                                                                                onClick={() => setCurrentIndex((prev) => (prev === amenity.amenityImages.length - 1 ? 0 : prev + 1))}
                                                                                size="icon"
                                                                                variant="outline"
                                                                            >
                                                                                <ChevronRight className="h-4 w-4" />
                                                                            </Button>
                                                                            <img src={amenity.amenityImages[currentIndex]?.url} className="aspect-video rounded-md object-contain" />
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    {amenity.amenityImages.length == 0 && (
                                                                        <div className="flex px-0 items-center justify-center min-h-16 min-w-16 rounded-md bg-muted/50">
                                                                            <ImageOff className="h-5 w-5 text-muted-foreground" />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex flex-col items-start line-clamp-1">
                                                                        <Label className="text-start text-sm font-medium line-clamp-1 !!no-underline">{amenity.amenityName}</Label>
                                                                        <span className="text-start text-sm text-muted-foreground line-clamp-1">
                                                                            {amenity.amenityType === "Equipment"
                                                                                ? `Quantity: ${amenity.amenityQuantity ?? 'N/A'}`
                                                                                : amenity.amenityType}
                                                                        </span>  </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex flex-col gap-2">
                                                                {amenity.amenityType === "Facility" && (
                                                                    <div>
                                                                        <Label className="text-start text-muted-foreground">Facility Address</Label>
                                                                        <p>{amenity.amenityAddress}</p>
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Description</Label>
                                                                    <p>{amenity.amenityDescription}</p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-start text-muted-foreground">{amenity.amenityType} Reminder</Label>
                                                                    <p>{amenity.amenityReminder}</p>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    ))}
                                                </div>
                                            </Accordion>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Type </Label>
                                                {reservationForm.getValues("reservationType") && (
                                                    <p className="text-sm text-end"> {reservationForm.getValues("reservationType")}</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2">
                                                <Label className="text-sm text-muted-foreground"> Reservation Date </Label>
                                                {reservationForm.getValues("reservationDate") ? (
                                                    <p className="text-sm text-end break-words"> {format(reservationForm.getValues("reservationDate"), "PPp")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No date provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservation Reason </Label>
                                                {reservationForm.watch("reservationReason") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reservationReason")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No reason provided</p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 my-2 overflow-auto">
                                                <Label className="text-sm text-muted-foreground"> Reservee Email </Label>
                                                {reservationForm.watch("reserveeEmail") ? (
                                                    <p className="text-sm text-end break-words"> {reservationForm.watch("reserveeEmail")}</p>
                                                ) : (
                                                    <p className="text-sm text-end break-words"> No email provided</p>
                                                )}
                                            </div>

                                        </CardContent>
                                    </Card>

                                </div>

                            )}

                        </form>

                    </Form>

                </main>

            </SidebarInset>

        </SidebarProvider >
    )
}



