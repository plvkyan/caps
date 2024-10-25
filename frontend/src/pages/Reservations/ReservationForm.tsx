

// Imports
// Lucide React Icons Imports
import {
    ChevronLeft,
    ChevronRight,
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

// shadcn Card Component Imports
import {
    Card,
    CardContent,
} from "@/components/ui/card"

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
    reservationType: z.string(),
    reservationAmenities: z.array(z.object({
        amenityId: z.string(),
        amenityName: z.string(),
        amenityType: z.string(),
        amenityAddress: z.string(),
        amenityQuantity: z.string(),
    })),
    reservationDate: z.date(),
    reservationReason: z.string(),
})



export default function ReservationForm() {



    // States
    // Error state
    const [error, setError] = useState(false);

    // Loading state
    const [loading, setLoading] = useState(false);

    // Stepper Component Step State
    const [stepperStep, setStepperStep] = useState(0);



    // Effects
    // Effect to change document title
    useEffect(() => {
        document.title = "Create Reservation | GCTMS";
    }, []);



    // Functions
    // Handle back button Function to navigate back
    const handleBackButton = (step: number) => {
        if (step <= 0) {
            history.back();
        } else if (step === 1) {
            setStepperStep(0);
        } else if (step === 2) {
            setStepperStep(1);
        } else if (step === 3) {
            setStepperStep(2);
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
                <main className="flex flex-col gap-4 p-8 pt-4">

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
                        {stepperStep !== 0 && (
                            <div className="flex flex-col">
                                {/* Page header */}
                                <h1 className="font-semibold text-2xl"> Create Reservation </h1>
                                {/* Page header description */}
                                <h3 className="font-light text-muted-foreground"> Secure an amenity for you on a specified date. </h3>
                            </div>
                        )}


                    </div>



                    {/* Page content */}
                    {stepperStep !== 0 && (

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
                                    Choose a facility
                                </span>
                            </div>

                            <div className={"flex-1 h-1 rounded-full " + (stepperStep >= 2 ? "bg-primary" : "bg-muted-foreground")} />

                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => setStepperStep(2)}
                            >
                                <div
                                    className={"flex items-center justify-center w-8 h-8 rounded-full text-lg font-semibold "
                                        + (stepperStep >= 2 ? "bg-primary text-primary-foreground" : " bg-muted-foreground text-muted")}>
                                    2
                                </div>
                                <span className={"ml-2 font-medium " + (stepperStep >= 2 ? "text-primary" : "text-muted-foreground")}>
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
                                    3
                                </div>
                                <span className={"ml-2 font-medium " + (stepperStep >= 3 ? "text-primary" : "text-muted-foreground")}>
                                    Enter other information
                                </span>
                            </div>

                        </div>

                    )
                    }



                    {/* Error message */}
                    {/* <div className="flex bg-red-500/20 border border-red-500 text-red-500 items-center gap-2 rounded-md px-4 py-3">
                        <TriangleAlert className="w-5 h-5" />
                        Your image is larger than 15 mb. Please upload a smaller image.
                    </div> */}



                    {stepperStep === 0 && (

                        <div className="flex flex-col items-center justify-center gap-12 p-4 my-12">

                            <div className="flex flex-1 flex-col gap-2">
                                <h1 className="text-center text-4xl font-semibold"> What would you like to reserve? <span className="text-destructive"> * </span> </h1>
                                <p className="text-center text-base font-normal text-muted-foreground">
                                    Start creating your reservation by selecting the type/s of amenity you're planning to reserve.
                                </p>
                            </div>

                            <RadioGroup className="flex flex-1 flex-row gap-8" defaultValue="Equipment">

                                <div
                                    className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border border-green-500 rounded-md cursor-pointer" + (stepperStep === 0 ? " bg-primary-50" : "")}
                                    onClick={() => console.log("Equipment")}
                                >

                                    <div className="flex flex-col gap-1 items-center text-center mt-auto">
                                        <Label className="text-lg font-semibold">
                                            Equipment
                                        </Label>
                                        <p className="text-sm text-muted-foreground font-normal">
                                            Reserve sports gear, tools, or other equipment for your activities.
                                        </p>
                                    </div>
                                    <RadioGroupItem value="Equipment" id="Equipment" />
                                    <span className="sr-only"> Equipment </span>

                                </div>

                                <div
                                    className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer" + (stepperStep === 0 ? " bg-primary-50" : "")}
                                    onClick={() => console.log("Facility")}
                                >

                                    <div className="flex flex-col gap-1 items-center text-center mt-auto">
                                        <Label className="text-lg font-semibold">
                                            Facility
                                        </Label>
                                        <p className="text-sm text-muted-foreground font-normal">
                                            Book exclusive access to the clubhouse, gym, and pool.
                                        </p>
                                    </div>
                                    <RadioGroupItem value="Facility" id="Facility" />
                                    <span className="sr-only"> Facility </span>

                                </div>

                                <div
                                    className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer" + (stepperStep === 0 ? " bg-primary-50" : "")}
                                    onClick={() => console.log("Both Equipment and Facility")}
                                >

                                    <div className="flex flex-col gap-1 items-center text-center mt-auto">
                                        <Label className="text-lg font-semibold">
                                            Both Equipment and Facility
                                        </Label>
                                        <p className="text-sm text-muted-foreground font-normal">
                                            Reserve both equipment and facilities for your needs in one easy step.
                                        </p>
                                    </div>
                                    <RadioGroupItem value="Both" id="Both" />
                                    <span className="sr-only"> Both Equipment and Facility </span>
                                </div>

                            </RadioGroup>

                            <Button
                                className="rounded-md w-fit pl-16 pr-12 md:mt-12"
                                onClick={() => setStepperStep(1)}
                            >
                                Continue
                                <ChevronRight className="w-4 h-4" />
                            </Button>

                        </div>

                    )
                    }



                    {stepperStep === 1 && (
                        <div className="grid grid-cols-3 gap-2">

                            {/* Card form */}
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

                        </div>
                    )
                    }



                    {stepperStep === 2 && (
                        <div className="grid grid-cols-3 gap-2">
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



                    {stepperStep === 3 && (
                        <div className="grid grid-cols-3 gap-2">

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


                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}
