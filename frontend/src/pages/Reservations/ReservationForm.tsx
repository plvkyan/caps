

// Imports
// Lucide React Icons Imports
import {
    CalendarIcon,
    ChevronLeft,
    ChevronRight,
    ImageOff,
    Info,
    TriangleAlert,
} from "lucide-react";


// shadcn Components Imports
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

// shadcn Drawer Component Import
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn NavUser Component Import
import { NavUser } from "@/components/nav-user"

// shadcn Radiogroup Component Imports
import {
    RadioGroup,
    RadioGroupItem
} from "@/components/ui/radio-group";

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// shadcn Separator Component Import
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Component Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Skeleton Component Import
import { Skeleton } from "@/components/ui/skeleton";

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

// shadcn Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toast Component Import
import { toast } from "sonner";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Component Imports
// Dark Mode Toggle Import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Utility Imports
// useEffect and useState react Imports
import {
    useEffect,
    useState
} from "react";

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Type Imports
import { ReservationType } from "@/types/reservation-type";



// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"
import { createReservation, getUnarchivedReservations } from "@/data/reservation-api";
import { set } from "date-fns";
import { AmenityType } from "@/types/amenity-type";
import { getUnarchivedAmenities } from "@/data/amenities-api";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



const userData = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
}

const reservationFormSchema = z.object({
    reserveeId: z.string(),
    reserveeBlkLt: z.string(),
    reserveePosition: z.string(),
    reserveeEmail: z.string().email().optional(),
    reservationType: z.string().min(1,
        { message: "A reservation type is required. Please select a reservation type." }
    ),
    reservationAmenities: z.array(z.object(
        {
            _id: z.string(),
            amenityName: z.string(),
            amenityType: z.string(),
            amenityAddress: z.string(),
            amenityDescription: z.string(),
            amenityStock: z.number(),
            amenityStockMax: z.number(),
            amenityQuantity: z.number().default(0),
            amenityQuantityMin: z.number(),
            amenityQuantityMax: z.number(),
            amenityReminder: z.string(),
            amenityCreator: z.string(),
            amenityImages: z.array(z.object(
                {
                    url: z.string(),
                    public_id: z.string(),
                }
            )),
            amenityVisibility: z.string(),
        }
    )),
    // .refine((value) => value.some((amenity) => amenity), {
    //     message: "At least one amenity is required. Please select at least one amenity to reserve."
    // }),
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
            reserveeId: "",
            reserveeBlkLt: "",
            reserveePosition: "",
            reserveeEmail: "",
            reservationType: "Equipment",
            reservationAmenities: [],
            reservationDate: new Date(),
            reservationReason: "",
        }
    })



    // States
    // Amenity list State
    const [amenityList, setAmenityList] = useState<AmenityType[]>([]);

    // Current amenity state
    const [currentAmenity, setCurrentAmenity] = useState<AmenityType | null>(null);

    // Current image index state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Error state
    const [error, setError] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);

    // Reservation Amenity List Ids State
    const [reservationAmenitiesIds, setReservationAmenitiesIds] = useState<String[]>([]);

    // Reservation Amenity List State
    const [reservationAmenities, setReservationAmenities] = useState<[{}]>([reservationForm.getValues("reservationAmenities")]);

    // Reservation Type State
    const [reservationType, setReservationType] = useState("Equipment");

    // Stepper Component Step State
    const [stepperStep, setStepperStep] = useState(0);



    // Effects
    // Effect to change document title
    useEffect(() => {
        document.title = "Create Reservation | GCTMS";
    }, []);

    useEffect(() => {

        const fetchAmenities = async () => {
            const getUnarchivedAmenitiesResponse = await getUnarchivedAmenities();

            const unarchivedAmenitiesData = await getUnarchivedAmenitiesResponse.json();

            if (getUnarchivedAmenitiesResponse.ok) {
                toast.success("Amenities fetched successfully: ");
                setAmenityList(unarchivedAmenitiesData);
            }

            if (!getUnarchivedAmenitiesResponse.ok) {
                toast.error("Error fetching amenities.");
            }
        }

        fetchAmenities();

    }, []);



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
            history.back();
        }

        if (step === 1) {
            setError("");
            setStepperStep(0);
        }

        if (step === 2) {
            setStepperStep(1);
        }

        if (step === 4) {
            setStepperStep(3);
        }

        if (step === 3 && reservationType === "Facility") {
            setError("");
            setStepperStep(0);
        }

        if (step === 3 && reservationType === "Both") {
            setStepperStep(1);
        }

        if (step === 5 && reservationType === "Equipment") {
            setStepperStep(1);
        }

        if (step === 5 && reservationType === "Facility") {
            setStepperStep(3);
        }

        if (step === 5 && reservationType === "Both") {
            setStepperStep(3);
        }

    }

    // Handle both continue button Function
    const handleBothContinueButton = () => {
        setStepperStep(3);
    }
    const filterAmenitiesByIds = (amenityList, selectedIds) => {
        return amenityList.filter((amenity) => selectedIds.includes(amenity._id));
    };


    const handleEquipmentContinueButton = () => {
        if (!reservationAmenitiesIds || !amenityList) {
            setError("An error occurred. Please try again.");
            return;
        }

        if (reservationAmenitiesIds.length === 0) {
            setError("Please select at least one equipment to reserve then try again.");
            return;
        }

        reservationForm.setValue("reservationAmenities", filterAmenitiesByIds(amenityList, reservationAmenitiesIds));
        toast.success("Equipment/s selected successfully.",
            {
                closeButton: true,
            }
        );
        setError("");
        setStepperStep(5);
    }

    // Handle form submit Function
    const handleSubmit = async (values: z.infer<typeof reservationFormSchema>) => {
        const postReservationResponse = await createReservation(values);

        if (postReservationResponse.ok) {
            console.log("Reservation created successfully.");
            toast.success("Reservation created successfully.");
        } else if (!postReservationResponse.ok) {
            console.error("Error creating reservation.");
            toast.error("Error creating reservation.");
        }
    }

    useEffect(() => {

        const intervalId = setInterval(() => {
            console.log("State values: ", reservationAmenitiesIds);
            console.log("Form values: ", reservationForm.getValues("reservationAmenities"));
        }, 7000);

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

                            <SidebarTrigger className="-ml-1" />

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
                            <NavUser user={userData.user} />
                        </div>

                    </div>

                </header>






                {/* The main content */}
                <main className="">

                    <Form  {...reservationForm}>

                        <form className="flex flex-col gap-4 p-8 pt-4" onSubmit={reservationForm.handleSubmit(handleSubmit)}>





                            {/* Page header */}
                            <div className="flex flex-row items-center gap-4">

                                {/* Return to Amenity List button */}
                                <Button
                                    className="h-7 w-7"
                                    size="icon"
                                    title="Back Button"
                                    type="button"
                                    variant="outline"
                                    onClick={() => handleBackButton(stepperStep)}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>
                                </Button>

                                {/* Container for the header */}
                                <div className={"flex flex-col " + (stepperStep === 0 ? "opacity-0" : "opacity-100")}>
                                    {/* Page header */}
                                    <h1 className="font-semibold text-2xl"> Create Reservation </h1>
                                    {/* Page header description */}
                                    <h3 className="font-light text-muted-foreground"> Secure amenities for you on one specified date. </h3>
                                </div>


                            </div>



                            {/* Page content */}
                            {/* Stepper Component for both amenities */}
                            {stepperStep !== 0 && reservationType === "Both" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(1)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep >= 1 ? "bg-primary text-primary-foreground" : " bg-gray-50 text-gray-950")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep >= 1 ? "text-primary" : "text-gray-50")}>
                                            Choose an equipment
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (stepperStep >= 3 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(3)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep >= 3 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep >= 3 ? "text-primary" : "text-muted-foreground")}>
                                            Choose a facility
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (stepperStep == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(5)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            3
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep == 5 ? "text-primary" : "text-muted-foreground")}>
                                            Enter other information
                                        </span>
                                    </div>

                                </div>

                            )
                            }

                            {/* Stepper component for Equipment */}
                            {stepperStep !== 0 && reservationType === "Equipment" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(1)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep >= 1 ? "bg-primary text-primary-foreground" : " bg-gray-50 text-gray-950")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep >= 1 ? "text-primary" : "text-gray-50")}>
                                            Choose an equipment
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (stepperStep == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => handleEquipmentContinueButton()}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep == 5 ? "text-primary" : "text-muted-foreground")}>
                                            Enter other information
                                        </span>
                                    </div>

                                </div>

                            )
                            }

                            {/* Stepper component for Facility */}
                            {stepperStep !== 0 && reservationType === "Facility" && (

                                <div className="flex items-center gap-4 p-4">

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(3)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep >= 3 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            1
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep >= 3 ? "text-primary" : "text-muted-foreground")}>
                                            Choose a facility
                                        </span>
                                    </div>

                                    <div className={"flex-1 h-1 rounded-full " + (stepperStep == 5 ? "bg-primary" : "bg-muted-foreground")} />

                                    <div
                                        className="flex items-center cursor-pointer"
                                        onClick={() => setStepperStep(5)}
                                    >
                                        <div
                                            className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                                + (stepperStep == 5 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                            2
                                        </div>
                                        <span className={"ml-2 font-medium " + (stepperStep == 5 ? "text-primary" : "text-muted-foreground")}>
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
                            {stepperStep === 0 && (

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
                                                                    + (field.value === "Both" ? " border-green-500" : "")}
                                                                onClick={() => { field.onChange("Both"); setReservationType("Both"); }}
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
                                                                        <RadioGroupItem className="hidden" value="Both" id="Both" />
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
                                            if (reservationType === "Equipment" || reservationType === "Both") {
                                                setStepperStep(1);
                                            } else if (reservationType === "Facility") {
                                                setStepperStep(3);
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
                            {stepperStep === 1 && (

                                <div className="grid grid-cols-3 gap-6">

                                    {/* Equipment */}
                                    {reservationType === "Equipment" && (

                                        <Card className="col-span-2 max-h-svh">

                                            <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">

                                                {/* Amenity information header */}
                                                <div className="flex flex-row justify-between items-center pb-2">

                                                    <div className="mr-12">

                                                        <Breadcrumb>

                                                            <BreadcrumbList>

                                                                <BreadcrumbItem>

                                                                    <BreadcrumbPage className="flex items-center gap-2 text-lg font-semibold">
                                                                        Equipment list

                                                                        {/* <TooltipProvider>
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <div
                                                                                        className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30"
                                                                                    >
                                                                                        <Info className="w-4 h-4" />
                                                                                    </div>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent align="center">
                                                                                    <p> Please note that you can only pick one reservation for all the amenities. </p>
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        </TooltipProvider> */}
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
                                                        disabled={reservationAmenitiesIds.length === 0}
                                                        onClick={() => handleEquipmentContinueButton()}
                                                        title="Continue to the next step"
                                                    >
                                                        Continue
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>

                                                {/* Amenity images */}

                                                <Table className="table-fixed h-24 max-h-24 overflow-y-auto">

                                                    <TableBody className="h-24 max-h-24 overflow-y-auto">

                                                        <FormField
                                                            control={reservationForm.control}
                                                            name="reservationAmenities"
                                                            render={() => (

                                                                <FormItem>

                                                                    {amenityList && amenityList.map((amenity) => {

                                                                        if (amenity.amenityType === "Equipment") {
                                                                            return (

                                                                                <FormField
                                                                                    key={amenity._id}
                                                                                    control={reservationForm.control}
                                                                                    name="reservationAmenities"
                                                                                    render={({ field }) => {

                                                                                        return (

                                                                                            <FormItem key={amenity._id}>


                                                                                                <TableRow key={amenity._id} className="flex cursor-pointer">

                                                                                                    <TableCell
                                                                                                        onClick={() => {
                                                                                                            setStepperStep(2);
                                                                                                            setCurrentAmenity(amenity);
                                                                                                        }}
                                                                                                    >
                                                                                                        {amenity.amenityImages[0] ? (
                                                                                                            <img src={amenity.amenityImages[0].url} className="aspect-video min-w-24 max-w-52 rounded-md object-cover" />
                                                                                                        ) : (
                                                                                                            <div className="flex flex-row items-center justify-center gap-3 w-52 min-w-24 max-w-52 border text-muted-foreground rounded-md aspect-video object-cover">
                                                                                                                <ImageOff className="w-5 h-5" />
                                                                                                                No image available
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </TableCell>

                                                                                                    <TableCell
                                                                                                        className="flex flex-col justify-center gap-4 w-full max-w-full"
                                                                                                        onClick={() => {
                                                                                                            setStepperStep(2);
                                                                                                            setCurrentAmenity(amenity);
                                                                                                        }}
                                                                                                    >
                                                                                                        <div className="flex flex-col">
                                                                                                            <span className="font-semibold"> {amenity.amenityName} </span>
                                                                                                            <span className="text-sm text-muted-foreground">
                                                                                                                Stock remaining: {amenity.amenityStock}
                                                                                                            </span>
                                                                                                        </div>

                                                                                                        <span className="text-sm text-muted-foreground w-full min-w-full line-clamp-2">
                                                                                                            {amenity.amenityDescription}
                                                                                                        </span>
                                                                                                    </TableCell>

                                                                                                    <TableCell className="flex items-center !px-4">

                                                                                                        <FormControl>

                                                                                                            <Checkbox
                                                                                                                checked={reservationAmenitiesIds.includes(amenity._id)}
                                                                                                                onCheckedChange={(checked) => {
                                                                                                                    return checked
                                                                                                                        ? setReservationAmenitiesIds([...reservationAmenitiesIds, amenity._id])
                                                                                                                        : setReservationAmenitiesIds(
                                                                                                                            reservationAmenitiesIds.filter(
                                                                                                                                (value) => value !== amenity._id
                                                                                                                            )
                                                                                                                        )
                                                                                                                }}
                                                                                                            />

                                                                                                        </FormControl>

                                                                                                    </TableCell>

                                                                                                </TableRow>


                                                                                            </FormItem>
                                                                                        )
                                                                                    }}
                                                                                />

                                                                            )
                                                                        }

                                                                    })}

                                                                </FormItem>
                                                            )}
                                                        />





                                                    </TableBody>

                                                </Table>

                                            </CardContent>

                                        </Card>
                                    )
                                    }

                                    {/* Card form */}
                                    {reservationType === "Facility" && (
                                        <Card className="col-span-2 max-h-svh">

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

                                                        <TableRow
                                                            className="flex cursor-pointer"
                                                            onClick={() => setStepperStep(2)}
                                                        >

                                                            <TableCell>
                                                                <Skeleton className="aspect-video w-52 rounded-md object-cover" />
                                                            </TableCell>

                                                            <TableCell className="flex flex-col justify-center gap-4  overflow-hidden">

                                                                <div className="flex flex-col">
                                                                    <span className="font-semibold">Clubhouse</span>
                                                                    <span className="text-sm text-muted-foreground"> 123 Main St, Springfield </span>
                                                                </div>
                                                                <span className="text-sm text-muted-foreground line-clamp-2">
                                                                    A spacious clubhouse with modern amenities and a beautiful view. A spacious clubhouse with modern amenities and a beautiful view. A spacious clubhouse with modern amenities and a beautiful view.
                                                                </span>

                                                            </TableCell>

                                                            <TableCell className="flex items-center px-4">
                                                                <ChevronRight />
                                                            </TableCell>

                                                        </TableRow>

                                                    </TableBody>

                                                </Table>

                                            </CardContent>

                                        </Card>
                                    )
                                    }

                                </div>
                            )
                            }

                            {/* Equipment information */}
                            {stepperStep === 2 && currentAmenity && (

                                <div className="grid grid-cols-3 gap-6">

                                    <Card className="col-span-2">

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
                                                                    onClick={() => setStepperStep(1)}
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
                                                        render={({ field }) => {
                                                            return (

                                                                <FormItem>

                                                                    <FormControl>

                                                                        <Checkbox
                                                                            checked={reservationAmenitiesIds.includes(currentAmenity._id)}
                                                                            onCheckedChange={(checked) => {
                                                                                return checked
                                                                                    ? setReservationAmenitiesIds([...reservationAmenitiesIds, currentAmenity._id])
                                                                                    : setReservationAmenitiesIds(
                                                                                        reservationAmenitiesIds.filter(
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
                                                                    <img src={image.url} className="rounded-md max-h-96" />
                                                                </CarouselItem>

                                                            )
                                                        })}

                                                        {!currentAmenity.amenityImages[0] && (
                                                            <div className="flex flex-row items-center justify-center gap-3 w-52 min-w-24 max-w-52 border text-muted-foreground rounded-md aspect-video object-cover">
                                                                <ImageOff className="w-5 h-5" />
                                                                No image available
                                                            </div>
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

                                </div>

                            )}

                            {/* Facility list */}
                            {stepperStep === 3 && (
                                <div className="grid grid-cols-3 gap-6">
                                    <Card className="col-span-2">
                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh overflow-y-auto">
                                            {/* Amenity information header */}
                                            <div className="flex flex-row justify-between items-center pb-2">

                                                <div className="">

                                                    <Breadcrumb>

                                                        <BreadcrumbList>

                                                            <BreadcrumbItem>
                                                                <BreadcrumbLink
                                                                    className="text-lg cursor-pointer hover:font-semibold"
                                                                    onClick={() => setStepperStep(1)}
                                                                    title="Go back to Facility List?"
                                                                >
                                                                    Facility list
                                                                </BreadcrumbLink>
                                                            </BreadcrumbItem>

                                                            <BreadcrumbSeparator />

                                                            <BreadcrumbItem>
                                                                <BreadcrumbPage className="text-lg font-semibold">
                                                                    Facility Information
                                                                </BreadcrumbPage>
                                                            </BreadcrumbItem>

                                                        </BreadcrumbList>

                                                    </Breadcrumb>

                                                    <p className="text-sm font-normal text-muted-foreground">
                                                        The details of the facility you've chosen.
                                                    </p>

                                                </div>

                                                <Button
                                                    className="pl-6 pr-3"
                                                    onClick={() => { setStepperStep(3) }}
                                                >
                                                    Pick Facility
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-4 pt-2 pb-6">

                                                <div className="flex items-center justify-end">

                                                    <Button
                                                        className="h-7 w-7"
                                                        disabled
                                                        size="icon"
                                                        type="button"
                                                        variant="outline"
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                        <span className="sr-only"> Previous image </span>
                                                    </Button>

                                                </div>

                                                <Skeleton className="col-span-5 aspect-video w-full" />

                                                <div className="flex items-center justify-start">

                                                    <Button
                                                        className="h-7 w-7"
                                                        size="icon"
                                                        type="button"
                                                        variant="outline"
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                        <span className="sr-only"> Next image </span>
                                                    </Button>

                                                </div>

                                            </div>

                                            <div className="col-span-7 grid grid-cols-2 p-6 bg-muted/50 border rounded-md gap-10">

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Name
                                                    </Label>
                                                    <p className="text-base">
                                                        Clubhouse
                                                    </p>

                                                </div>

                                                <div className="flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Type
                                                    </Label>
                                                    <p className="text-base">
                                                        Facility
                                                    </p>

                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Address
                                                    </Label>

                                                    <p className="text-base">
                                                        123 Main St, Springfield, IL 62701, United States. Located in the heart of downtown Springfield, this address is easily accessible and close to various amenities including restaurants, parks, and shopping centers.
                                                    </p>

                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Description
                                                    </Label>

                                                    <p className="text-base">
                                                        The clubhouse offers a spacious and modern environment for various events and gatherings. It features state-of-the-art facilities, comfortable seating, and a beautiful view, making it an ideal location for both formal and informal occasions.
                                                    </p>

                                                </div>

                                                <div className="col-span-2 flex flex-col gap-1">

                                                    <Label className="text-xs uppercase text-muted-foreground">
                                                        Amenity Reminder
                                                    </Label>

                                                    <p className="text-base">
                                                        Please ensure to follow all the rules and guidelines while using the facility. Any damage or misuse may result in penalties.
                                                    </p>

                                                </div>

                                            </div>

                                        </CardContent>
                                    </Card>
                                </div>
                            )
                            }

                            {/* Facility information */}
                            {stepperStep === 4 && (
                                <div className="grid grid-cols-3 gap-6">

                                    {/* Card form */}
                                    <Card className="col-span-2 max-h-svh">

                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">

                                            {/* Amenity information header */}
                                            <div className="pb-2">

                                                <Breadcrumb>

                                                    <BreadcrumbList>

                                                        <BreadcrumbItem>
                                                            <BreadcrumbPage className="text-lg font-semibold">
                                                                Amenity list
                                                            </BreadcrumbPage>
                                                        </BreadcrumbItem>

                                                    </BreadcrumbList>

                                                </Breadcrumb>

                                                <p className="text-sm font-normal text-muted-foreground">
                                                    Pick the amenities you want to reserve. The number of amenities you choose will affect the chances of your reservation being approved.
                                                </p>
                                            </div>

                                            {/* Amenity images */}

                                            <Table className="table-fixed h-24 max-h-24 overflow-y-auto">

                                                <TableBody className="h-24 max-h-24 overflow-y-auto">

                                                    <TableRow className="flex cursor-pointer">

                                                        <TableCell onClick={() => setStepperStep(3)}>
                                                            <Skeleton className="aspect-video w-52 rounded-md object-cover" />
                                                        </TableCell>

                                                        <TableCell className="flex flex-col justify-center gap-4 overflow-hidden" onClick={() => setStepperStep(3)}>

                                                            <div className="flex flex-col">
                                                                <span className="font-semibold"> Badminton Racket </span>
                                                                <span className="text-sm text-muted-foreground"> Stock: 10 </span>
                                                            </div>
                                                            <span className="text-sm text-muted-foreground line-clamp-2">
                                                                A spacious clubhouse with modern amenities and a beautiful view. A spacious clubhouse with modern amenities and a beautiful view. A spacious clubhouse with modern amenities and a beautiful view.
                                                            </span>

                                                        </TableCell>

                                                        <TableCell className="flex items-center !px-4">
                                                            <Checkbox />
                                                        </TableCell>

                                                    </TableRow>

                                                </TableBody>

                                            </Table>

                                        </CardContent>

                                    </Card>

                                </div>
                            )
                            }

                            {/* Other information */}
                            {stepperStep === 5 && (
                                <div className="grid grid-cols-3 gap-6">

                                    {/* Card form */}
                                    <Card className="col-span-2">



                                        <CardContent className="flex flex-col gap-2 py-5">

                                            {/* Amenity information header */}
                                            <div className="pb-2">

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

                                            {/* Amenity images */}

                                            {reservationType === "Equipment" && reservationForm.watch("reservationAmenities").map((amenity, index) => {

                                                return (
                                                    <div className="flex flex-col gap-4 p-4 my-1 rounded-md border border-dashed">

                                                        {/* Header */}
                                                        <Label className="text-base">
                                                            {amenity.amenityName}
                                                        </Label>


                                                        <div className="grid grid-cols-3 gap-2">

                                                            <div className="col-span-2">
                                                                <Label className="text-sm">
                                                                    {amenity.amenityType} quantity
                                                                </Label>

                                                                <p className="text-sm text-muted-foreground">
                                                                    Minimum quantity: {amenity.amenityQuantityMin} - Maximum quantity: {amenity.amenityQuantityMax}
                                                                </p>
                                                            </div>

                                                            <FormField
                                                                control={reservationForm.control}
                                                                name="reservationAmenities"
                                                                render={({ field: { onChange, ...fieldProps } }) => {
                                                                    return (
                                                                        <Input
                                                                            required
                                                                            min={amenity.amenityQuantityMin}
                                                                            max={amenity.amenityQuantityMax}
                                                                            type="number"
                                                                            placeholder="Quantity"
                                                                            onChange={(e) => {
                                                                                onChange(
                                                                                    reservationForm.watch("reservationAmenities").map((item) => {
                                                                                        if (item._id === amenity._id) {
                                                                                            return {
                                                                                                ...amenity,
                                                                                                amenityQuantity: parseInt(e.target.value)
                                                                                            }
                                                                                        }
                                                                                        return amenity;
                                                                                    }
                                                                                    )
                                                                                )
                                                                            }}
                                                                        >
                                                                        </Input>
                                                                    )
                                                                }}
                                                            />

                                                        </div>

                                                    </div>
                                                )
                                            })}



                                            <div className="flex flex-col gap-2 pt-2">
                                                <div className="">
                                                    <Label className="text-sm">
                                                        Available dates for each amenity
                                                    </Label>

                                                    <p className="text-sm text-muted-foreground">
                                                        These are the available dates for each amenity you've chosen.
                                                    </p>
                                                </div>

                                                {/* <Popover>

                                                    <PopoverTrigger>

                                                        <Button
                                                            variant="outline"
                                                        >
                                                            <span> Pick a date </span>
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>

                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            initialFocus
                                                        />
                                                    </PopoverContent>

                                                </Popover> */}

                                                <Tabs
                                                    className="pt-2 overflow-x-hidden overflow-y-auto"
                                                    defaultValue="All dates"
                                                >
                                                    <TabsList
                                                        className="justify-start h-fit w-full rounded-none border-b py-0 bg-transparent overflow-x-hidden overflow-y-auto"
                                                    >
                                                        <TabsTrigger type="button" value="All dates" className="rounded-none px-4 !bg-transparent data-[state=active]:border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> All dates </TabsTrigger>

                                                        {reservationForm.getValues("reservationAmenities").map((amenity, index) => {
                                                            return (
                                                                <TabsTrigger type="button" key={index} value={amenity.amenityName} className="rounded-none px-4 !bg-transparent data-[state=active]:border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> {amenity.amenityName} </TabsTrigger>
                                                            )
                                                        })}
                                                    </TabsList>

                                                    <TabsContent value="All dates" className="flex justify-center">
                                                        <Calendar
                                                            numberOfMonths={2}
                                                        />
                                                    </TabsContent>

                                                    {reservationForm.getValues("reservationAmenities").map((amenity, index) => {
                                                        return (
                                                            <TabsContent key={index} value={amenity.amenityName} className="flex justify-center m-0">
                                                                <Calendar
                                                                    numberOfMonths={2}
                                                                />
                                                            </TabsContent>
                                                        )
                                                    })}

                                                </Tabs>

                                            </div>

                                            <div className="flex flex-col gap-2">

                                                <FormField
                                                    control={reservationForm.control}
                                                    name="reservationReason"
                                                    render={({ field }) => {

                                                        return (
                                                            <FormItem className="flex flex-col gap-1.5 pt-2">
                                                                <div className="">
                                                                    <FormLabel className="text-sm">
                                                                        Reservation reason
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Please provide a brief reason for your reservation.
                                                                    </FormDescription>
                                                                </div>

                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder="Enter your reason here"
                                                                        {...field}
                                                                    >
                                                                    </Textarea>
                                                                </FormControl>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />

                                            </div>

                                        </CardContent>

                                    </Card>





                                    <Card className="col-span-1">



                                        <CardHeader className="gap-0 space-y-0 bg-muted/50">

                                            <CardTitle className="text-lg font-semibold leading-normal tracking-normal">
                                                Reservation Summary
                                            </CardTitle>

                                            <CardDescription className="m-0">
                                                Review your reservation details before proceeding.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent className="flex-flex-col gap-2 py-5">


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



