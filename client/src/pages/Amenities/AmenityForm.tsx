


"use client";

// Imports
// Lucide Icon Imports
import { 
    ChevronLeft, 
    ChevronRight, 
    CirclePlus, 
    TriangleAlert, 
    Upload, 
    X 
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

// shadcn Card Component Imports
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
// shadcn Form Imports
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

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn Radio Group Imports
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
// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"
// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Sonner Component Import
import { toast } from "sonner"

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

// shadcn Textarea Component Imports
import { Textarea } from "@/components/ui/textarea";

// shadcn Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";


// Custom Components Imports
// LoadingSpinner Component Import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";





// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



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



// Data Imports
// All unarchived amenities API Import
import { createAmenity } from "@/data/amenity-api.ts";







const amenityFormSchema = z.object({
    amenityName: z.string().min(1),
    amenityType: z.string().min(1),
    amenityAddress: z.string().optional(),
    amenityDescription: z.string(),
    amenityStock: z.coerce.number().min(1),
    amenityStockMax: z.coerce.number().min(1),
    amenityQuantityMin: z.coerce.number().min(1),
    amenityQuantityMax: z.coerce.number().min(1),
    amenityReminder: z.string().optional(),
    amenityCreator: z.string().optional(),
    amenityVisibility: z.string().optional(),
    amenityImages: z.any().optional(),
})





export default function AmenityForm() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // Form
    const amenityForm = useForm<z.infer<typeof amenityFormSchema>>({
        resolver: zodResolver(amenityFormSchema),
        defaultValues: {
            amenityName: "",
            amenityType: "",
            amenityAddress: "",
            amenityDescription: "",
            amenityStock: 1,
            amenityStockMax: 1,
            amenityQuantityMin: 1,
            amenityQuantityMax: 1,
            amenityReminder: "",
            amenityCreator: user.userBlkLt,
            amenityVisibility: "Unarchived",
        },
    });



    // States
    // State for rotating index of images for image preview
    const [rotatingIndex, setRotatingIndex] = useState(0);
    // State for current index of images for image preview
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for form error message
    const [error, setError] = useState<any>("");
    // State for loading state
    const [loading, setLoading] = useState(false);
    // State for current images uploaded
    const [images, setImages] = useState<any>([]);
    // State for stepper step
    const [step, setStep] = useState(1);

    // State for amenity type
    const [amenityType, setAmenityType] = useState("");



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Amenities | GCTMS";

        if (sessionStorage.getItem("amenityCreated")) {
            toast.success("Amenity created successfully.", {
                description: sessionStorage.getItem("amenityCreated"),
                closeButton: true,
            });
            sessionStorage.removeItem("amenityCreated");
        }
    }, []);

    // Effect for image preview
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (images.length <= 1) {
                setRotatingIndex(0);
            } else {
                setRotatingIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [images.length]);



    // Functions
    // Function to handle form submission
    // Handle Submit Function for CREATING an amenity
    const handleSubmit = async (values: z.infer<typeof amenityFormSchema>) => {
        try {
            setLoading(true);
            // Set the stock to the maximum stock
            values.amenityStock = values.amenityStockMax;
            // Set the images state value to the images array
            values.amenityImages = images;

            // Post the data to the server
            const response = await createAmenity(values);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error creating new equipment amenity.');
            }

            // Clear the form and reset states
            sessionStorage.setItem("amenityCreated", "The new " + data.amenityType.toLowerCase() + " has been created successfully.");
            amenityForm.reset();
            setAmenityType("");
            setImages([]);
            window.location.reload();
        } catch (error: any) {
            setError(error.message);
            toast.error("Error creating new amenity.", {
                description: error.message,
                closeButton: true,
            });
        } finally {
            setLoading(false);
        }
    };

    // Function to handle back button
    const handleBackButton = () => {
        if (step <= 1) {
            history.back();
        } else {
            amenityForm.reset();
            setAmenityType("");
            setStep(1);
        }
    };   
    
    // Function to handle image uploads
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert the FileList to an array of files
        const imageFiles = Array.from(e.target.files || []);

        // Check if the total number of images exceeds the limit
        if (images.length + imageFiles.length > 3) {
            setError("You can only upload up to 3 images. Please remove at least 1 image to upload a new one.");
            return;
        }

        // Convert each file to base64 and add to the images state
        imageFiles.forEach(file => setFileToBase(file));
    };

    // Function to set file to base64
    // Function to convert file to base64 and add to images state
    const setFileToBase = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImages((prevImages) => [...prevImages, reader.result]);
        };
    };

    // Function to remove image
    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            if (rotatingIndex >= updatedImages.length) {
                setRotatingIndex(Math.max(0, updatedImages.length - 1));
            }
            return updatedImages;
        });
    };




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
                                            Create {amenityForm.getValues("amenityType") ? amenityForm.getValues("amenityType") : "Amenity"}
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





                <main>

                    <Form  {...amenityForm}>

                        <form className="flex flex-col gap-4 p-8 pt-4" onSubmit={amenityForm.handleSubmit(handleSubmit)}>


                            {/* Page header */}
                            <div className="flex flex-row items-center gap-4">
                                {/* Return to Amenity List button */}
                                <Button
                                    className="h-7 w-7"
                                    onClick={handleBackButton}
                                    size="icon"
                                    title="Back Button"
                                    type="button"
                                    variant="outline"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>
                                </Button>

                                {/* Container for the header */}
                                <div className={"flex flex-col " + (step === 1 ? "opacity-0" : "opacity-100")}>
                                    {/* Page header */}
                                    <h1 className="font-semibold text-2xl"> Create {amenityForm.getValues("amenityType")} </h1>
                                    {/* Page header description */}
                                    <h3 className="font-light text-muted-foreground"> A new equipment amenity for unit owners to reserve. </h3>
                                </div>
                                <Button
                                    disabled={loading}
                                    className={"ml-auto " + (step === 1 ? "hidden" : "flex")}
                                    type="submit"
                                    size="sm"
                                    variant="default"
                                >
                                    <CirclePlus className={"h-7 w-7 " + (loading ? "hidden" : "block")} />
                                    <LoadingSpinner className={"h-7 w-7 " + (loading ? "block" : "hidden")} />
                                    Create {amenityForm.getValues("amenityType")}
                                </Button>
                            </div>


                            {/* Error message */}
                            {error !== "" && (
                                <div className="flex bg-red-500/20 border border-red-500 text-red-500 items-center gap-3 rounded-md px-4 py-3">
                                    <TriangleAlert className="w-5 h-5" />
                                    {error}
                                </div>
                            )
                            }


                            {/* Page content */}
                            {step === 1 && (
                                <div className="flex flex-col items-center justify-center gap-12 p-4">
                                    <div className="flex flex-1 flex-col gap-2">
                                        <h1 className="text-center text-4xl font-semibold"> What type of amenity are you creating? <span className="text-destructive"> * </span> </h1>
                                        <p className="text-center text-base font-normal text-muted-foreground">
                                            Select the type of amenity you are creating. This will determine the fields you need to fill out.
                                        </p>
                                    </div>

                                    {/* Radio group for amenity type */}
                                    <FormField
                                        control={amenityForm.control}
                                        name="amenityType"
                                        render={({ field }) => {
                                            return (
                                                <FormItem>
                                                    <FormLabel className="sr-only"> Amenity Type </FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            className="flex flex-1 flex-row gap-8"
                                                            defaultValue={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <div
                                                                className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer " + (field.value === "Equipment" ? "border-primary" : "")}
                                                                onClick={() => { field.onChange("Equipment"); setAmenityType("Equipment"); }}
                                                            >
                                                                <div className="flex flex-col gap-1 items-center text-center mt-auto !space-y-0">
                                                                    <FormLabel className="text-lg font-semibold">
                                                                        Equipment
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Individual items residents can reserve with trackable stock levels and reservation limits.
                                                                    </FormDescription>
                                                                </div>
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem className="hidden" value="Equipment" id="Equipment" />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </div>
                                                            <div
                                                                className={"flex flex-col items-center gap-12 h-72 w-80 p-4 border rounded-md cursor-pointer " + (field.value === "Facility" ? "border-primary" : "")}
                                                                onClick={() => { field.onChange("Facility"); setAmenityType("Facility"); }}
                                                            >
                                                                <div className="flex flex-col gap-1 items-center text-center mt-auto !space-y-0">
                                                                    <FormLabel className="text-lg font-semibold">
                                                                        Facility
                                                                    </FormLabel>
                                                                    <FormDescription>
                                                                        Larger spaces like gyms or function rooms. Facilities need an address and reminders.
                                                                    </FormDescription>
                                                                </div>
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <RadioGroupItem className="hidden" value="Facility" id="Facility" />
                                                                    </FormControl>
                                                                </FormItem>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                    <Button
                                        className="w-fit pl-16 pr-12 rounded-md md:mt-12"
                                        disabled={amenityType === ""}
                                        onClick={() => {
                                            if (amenityType === "Equipment") {
                                                amenityForm.setValue("amenityType", "Equipment");
                                                setStep(2);
                                            }
                                            if (amenityType === "Facility") {
                                                amenityForm.setValue("amenityType", "Facility");
                                                setStep(3);
                                            }
                                        }}
                                    >
                                        Continue
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}





                            {/* Equipment form */}
                            {step === 2 && amenityType === "Equipment" && (
                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                                    <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">
                                        <Card>
                                            <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                                <div className="flex flex-col pb-6">
                                                    <Label className="text-lg font-semibold"> Equipment Details </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Enter the appropriate details for the new equipment. </p>
                                                </div>



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityName"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Name <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> The equipment name should be descriptive–preferably singular. </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Input
                                                                        className="w-full"
                                                                        id="amenityName"
                                                                        placeholder="Enter equipment name"
                                                                        required
                                                                        type="text"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityDescription"
                                                    render={({ field }) => {

                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Description <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> Describe the equipment in detail. For example, it's appearance and functionality. </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        id="amenityDescription"
                                                                        className=""
                                                                        placeholder="Enter equipment description"
                                                                        required
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityReminder"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Reminder <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> Is there anything that the borrower needs to know? </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className=""
                                                                        id="amenityReminder"
                                                                        placeholder="Enter equipment reminder"
                                                                        required
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                                <div className="flex flex-col pb-2">
                                                    <Label className="text-lg font-semibold"> Equipment Stock Levels </Label>
                                                    <p className="text-muted-foreground"> Stock levels help prevent overbooking and maintain optimal availability. </p>
                                                </div>

                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="flex flex-col gap-1">
                                                                <Label className="font-medium"> Maximum stock <span className="text-destructive"> * </span> </Label>
                                                                <p className="text-muted-foreground"> The total quantity of each equipment that the system can hold. </p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormField
                                                                    control={amenityForm.control}
                                                                    name="amenityStockMax"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem>
                                                                                <FormLabel className="hidden"> Equipment Maximum Stock </FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        id="amenityStockMax"
                                                                                        required
                                                                                        type="number"
                                                                                        {...field}
                                                                                    />
                                                                                </FormControl>

                                                                                <FormMessage />

                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell className="flex flex-col gap-1">
                                                                <Label className="font-medium"> Minimum quantity per reservation <span className="text-destructive"> * </span> </Label>
                                                                <p className="text-muted-foreground"> The smallest number of units a resident can reserve for each equipment. </p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormField
                                                                    control={amenityForm.control}
                                                                    name="amenityQuantityMin"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem>
                                                                                <FormLabel className="hidden"> Minimum Amenity Quantity per Reservation </FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        id="amenityQuantityMin"
                                                                                        required
                                                                                        type="number"
                                                                                        {...field}
                                                                                    />
                                                                                </FormControl>

                                                                                <FormMessage />

                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow>
                                                            <TableCell className="flex flex-col gap-1">
                                                                <Label className="font-medium"> Maximum quantity per reservation <span className="text-destructive"> * </span> </Label>
                                                                <p className="text-muted-foreground"> The largest number of units a resident can reserve for each equipment. </p>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FormField
                                                                    control={amenityForm.control}
                                                                    name="amenityQuantityMax"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem>
                                                                                <FormLabel className="hidden"> Maximum Amenity Quantity per Reservation </FormLabel>
                                                                                <FormControl>
                                                                                    <Input
                                                                                        id="amenityQuantityMax"
                                                                                        required
                                                                                        type="number"
                                                                                        {...field}
                                                                                    />
                                                                                </FormControl>

                                                                                <FormMessage />

                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            </TableCell>
                                                        </TableRow>

                                                    </TableBody>

                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
                                        <Card className="flex flex-col gap-2 pt-5 overflow-hidden">
                                            <CardContent>

                                                <div className="flex flex-col pb-6">
                                                    <Label className="text-lg font-semibold"> Equipment Images <span className="text-muted-foreground"> (Optional) </span> </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Attach images of the equipment. You can upload up to 3 images. </p>
                                                </div>

                                                <div className="grid gap-2">
                                                    {images && images[0] && (
                                                        <Dialog>
                                                            <DialogTrigger onClick={() => setRotatingIndex(rotatingIndex)}>
                                                                <img
                                                                    src={images[rotatingIndex]} className="aspect-video w-full rounded-md object-cover cursor-pointer"
                                                                />
                                                            </DialogTrigger>

                                                            <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">

                                                                <Button
                                                                    className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                    disabled={images.length === 1}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === 0) {
                                                                            setCurrentIndex(images.length - 1)
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
                                                                    disabled={images.length === 1}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === images.length - 1) {
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
                                                                    src={images[currentIndex]} className="aspect-video rounded-md object-contain"
                                                                />

                                                            </DialogContent>

                                                        </ Dialog>
                                                    )}

                                                    <div className="grid grid-cols-3 gap-2">
                                                        {images && images.map((image: any, index: number) => (
                                                            <div className="group relative">
                                                                <Button
                                                                    className="h-5 w-5 rounded-full absolute -top-2 -right-2 flex z-50"
                                                                    onClick={() => { handleRemoveImage(index) }}
                                                                    size="icon"
                                                                    type="button"
                                                                    variant="destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                                <img
                                                                    className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]"
                                                                    onClick={() => setRotatingIndex(index)}
                                                                    src={image}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {images.length! !== 3 && images.length! <= 3 && (
                                                        <button type="button" className="relative flex flex-col gap-2 aspect-video w-full items-center justify-center rounded-md border border-dashed">
                                                            <Upload className="h-6 w-6 text-muted-foreground" />
                                                            <div className="flex flex-col">
                                                                <span className="text-muted-foreground text-base font-medium"> Click here to upload images </span>
                                                                <span className="text-muted-foreground text-xs font-normal"> The total file size should not exceed 30 MB. </span>
                                                            </div>
                                                            <span className="sr-only"> Upload </span>
                                                            <FormField
                                                                control={amenityForm.control}
                                                                name="amenityImages"
                                                                render={({ field: { value, onChange, ...fieldProps } }) => {
                                                                    return (
                                                                        <FormItem>
                                                                            <FormLabel className="hidden"> Amenity Image </FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    accept="image/jpeg, image/png, image/jpg"
                                                                                    className="block absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-50 disabled:opacity-0 !mt-0 pointer"
                                                                                    disabled={images.length >= 3}
                                                                                    id="amenityImages"
                                                                                    multiple
                                                                                    onChange={handleImages}
                                                                                    title="Drag and drop an image file or click here to upload."
                                                                                    type="file"
                                                                                    {...fieldProps}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        </button>
                                                    )}
                                                </div>

                                            </CardContent>
                                        </Card>

                                        <Card className="flex flex-col gap-2 pt-5 overflow-hidden">
                                            <CardContent className="flex flex-col gap-2">
                                                <div className="flex flex-col">
                                                    <Label className="text-lg font-semibold"> Equipment Visibility <span className="text-destructive"> * </span> </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Choose if you want unit owners to see this amenity or not. </p>
                                                </div>
                                                <div>
                                                    <FormField
                                                        control={amenityForm.control}
                                                        name="amenityVisibility"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>

                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <SelectTrigger id="amenityVisibility" aria-label="Select status">
                                                                                <SelectValue placeholder="Select status" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                                <SelectItem value="Archived"> Archived </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />

                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}





                            {/* Facility form */}
                            {step === 3 && amenityType === "Facility" && (
                                <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                                    <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">
                                        <Card>
                                            <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                                <div className="flex flex-col pb-6">
                                                    <Label className="text-lg font-semibold"> Facility Details </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Enter the appropriate details for the new facility. </p>
                                                </div>



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityName"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Name <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> The facility name should be straightforward and descriptive. </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Input
                                                                        className="w-full"
                                                                        id="amenityName"
                                                                        placeholder="Enter facility name"
                                                                        required
                                                                        type="text"
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityAddress"
                                                    render={({ field }) => {

                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Address <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> Enter the exact location details so unit owners can locate it easily.  </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        id="amenityAddress"
                                                                        className=""
                                                                        placeholder="Enter facility address"
                                                                        required
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />




                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityDescription"
                                                    render={({ field }) => {

                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Description <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> Describe the facility in detail, including it's area and other notable features.  </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        id="amenityDescription"
                                                                        className=""
                                                                        placeholder="Enter facility description"
                                                                        required
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                <FormField
                                                    control={amenityForm.control}
                                                    name="amenityReminder"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="mb-4">
                                                                <div className="flex flex-col gap-1 mb-2">
                                                                    <FormLabel className=""> Reminder <span className="text-destructive"> * </span> </FormLabel>
                                                                    <FormDescription className="text-muted-foreground"> Set a reminder with important notes or guidelines for residents to review before using the facility. </FormDescription>
                                                                </div>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className=""
                                                                        id="amenityReminder"
                                                                        placeholder="Enter facility reminder"
                                                                        required
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
                                        <Card className="flex flex-col gap-2 pt-5 overflow-hidden">
                                            <CardContent>

                                                <div className="flex flex-col pb-6">
                                                    <Label className="text-lg font-semibold"> Facility Images <span className="text-muted-foreground"> (Optional) </span> </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Attach images of the facility. You can upload up to 3 images. </p>
                                                </div>

                                                <div className="grid gap-2">
                                                    {images && images[0] && (
                                                        <Dialog>
                                                            <DialogTrigger onClick={() => setRotatingIndex(rotatingIndex)}>
                                                                <img
                                                                    src={images[rotatingIndex]} className="aspect-video w-full rounded-md object-cover cursor-pointer"
                                                                />
                                                            </DialogTrigger>

                                                            <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">

                                                                <Button
                                                                    className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === 0) {
                                                                            setCurrentIndex(images.length - 1)
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
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === images.length - 1) {
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
                                                                    src={images[currentIndex]} className="aspect-video rounded-md object-contain"
                                                                />

                                                            </DialogContent>

                                                        </ Dialog>
                                                    )}

                                                    <div className="grid grid-cols-3 gap-2">
                                                        {images && images.map((image: any, index: number) => (
                                                            <div className="group relative">
                                                                <Button
                                                                    className="h-5 w-5 rounded-full absolute -top-2 -right-2 flex z-50"
                                                                    onClick={() => { handleRemoveImage(index) }}
                                                                    size="icon"
                                                                    type="button"
                                                                    variant="destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                                <img
                                                                    className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]"
                                                                    onClick={() => setRotatingIndex(index)}
                                                                    src={image}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {images.length! !== 3 && images.length! <= 3 && (
                                                        <button type="button" className="relative flex flex-col gap-2 aspect-video w-full items-center justify-center rounded-md border border-dashed">
                                                            <Upload className="h-6 w-6 text-muted-foreground" />
                                                            <div className="flex flex-col">
                                                                <span className="text-muted-foreground text-base font-medium"> Click here to upload images </span>
                                                                <span className="text-muted-foreground text-xs font-normal"> The total file size should not exceed 15 MB. </span>
                                                            </div>
                                                            <span className="sr-only"> Upload </span>
                                                            <FormField
                                                                control={amenityForm.control}
                                                                name="amenityImages"
                                                                render={({ field: { value, onChange, ...fieldProps } }) => {
                                                                    return (
                                                                        <FormItem>
                                                                            <FormLabel className="hidden"> Amenity Image </FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    accept="image/jpeg, image/png, image/jpg"
                                                                                    className="block absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-50 disabled:opacity-0 !mt-0 pointer"
                                                                                    disabled={images.length >= 3}
                                                                                    id="amenityImages"
                                                                                    multiple
                                                                                    onChange={handleImages}
                                                                                    title="Drag and drop an image file or click here to upload."
                                                                                    type="file"
                                                                                    {...fieldProps}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        </button>
                                                    )}
                                                </div>

                                            </CardContent>
                                        </Card>

                                        <Card className="flex flex-col gap-2 pt-5 overflow-hidden">
                                            <CardContent className="flex flex-col gap-2">
                                                <div className="flex flex-col">
                                                    <Label className="text-lg font-semibold"> Facility Visibility <span className="text-destructive"> * </span> </Label>
                                                    <p className="text-sm font-normal text-muted-foreground"> Choose if you want unit owners to see this amenity or not. </p>
                                                </div>
                                                <div>
                                                    <FormField
                                                        control={amenityForm.control}
                                                        name="amenityVisibility"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>

                                                                    <FormControl>
                                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                            <SelectTrigger id="amenityVisibility" aria-label="Select status">
                                                                                <SelectValue placeholder="Select status" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                                <SelectItem value="Archived"> Archived </SelectItem>
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </FormControl>

                                                                    <FormMessage />

                                                                </FormItem>
                                                            )
                                                        }}
                                                    />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}

                        </form>

                    </Form>

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}