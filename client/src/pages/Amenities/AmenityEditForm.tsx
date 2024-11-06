


// Imports
// Lucide Icon Imports
import {
    ChevronLeft,
    ChevronRight,
    Info,
    Save,
    TriangleAlert,
    Upload,
    X
} from "lucide-react";



// shadcn Component Imports
// shadcn AppSidebar Component Import
import { AppSidebar } from "@/components/app-sidebar";

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

// shadcn Card Component Import
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

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

// shadcn Nav User Component Import
import { NavUser } from "@/components/nav-user";

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
} from "@/components/ui/table";

// shadcn Textarea Component Imports
import { Textarea } from "@/components/ui/textarea";

// shadcn Theme Toggle Component Import
import { ThemeToggle } from "@/components/custom/ThemeToggle";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Component Imports



// Hooks Imports
// Authentication Hook Import



// Utility Imports
// React Imports
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



// API Call Imports
// All unarchived amenities API Import
import { editAmenity, getSingleAmenity } from "@/data/amenity-api.ts";
import { Separator } from "@/components/ui/separator";
import { AmenityType } from "@/types/amenity-type";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";





const amenityFormSchema = z.object({
    _id: z.string(),
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


export default function AmenityEditForm() {



    // Hooks
    // Navigate context
    const navigate = useNavigate();



    // States
    // Amenity state
    const [amenity, setAmenity] = useState<AmenityType>();
    // Error state
    const [error, setError] = useState<string>("");
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // Image-related states
    // Images state
    const [images, setImages] = useState<any>();
    // Image preview current index state
    const [currentImage, setCurrentImage] = useState<number>(0);
    // Image preview rotating index state
    const [rotatingImage, setRotatingImage] = useState<number>(0);
    // Image preview visibility state
    const [showImagePreview, setShowImagePreview] = useState<boolean>(false);



    // Form
    // Form hook
    const amenityForm = useForm<z.infer<typeof amenityFormSchema>>({
        resolver: zodResolver(amenityFormSchema),

    });



    // Effects
    // Effect to fetch amenity
    useEffect(() => {
        const fetchAmenity = async () => {
            try {
                setLoading(true);
                const id = location.pathname.split('/').pop() || '';
                const response = await getSingleAmenity(id);
                const data = await response.json();

                setAmenity(data);
                amenityForm.reset(data);
                setImages(data.amenityImages);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch amenity');
            } finally {
                setLoading(false);
            }
        };

        fetchAmenity();
    }, [amenityForm]);

    // Effect to rotate through images automatically
    useEffect(() => {
        const interval = setInterval(() => {
            if (images.length <= 1) {
                setRotatingImage(0);
            } else {
                setRotatingImage((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [images]);



    // Functions
    // Submit function
    const handleSubmit = async (values: z.infer<typeof amenityFormSchema>) => {
        try {
            setLoading(true);

            const updatedValues = {
                ...values,
                _id: location.pathname.split('/').pop() || '',
                amenityStock: values.amenityStockMax,
                amenityImages: images
            };

            const response = await editAmenity(updatedValues);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to edit amenity');
            }

            sessionStorage.setItem(
                "amenityEdited",
                `The ${data.amenityType.toLowerCase()} amenity '${data.amenityName}' has been edited successfully.`
            );

            amenityForm.reset();
            setImages([]);
            navigate("/amenities/" + location.pathname.split('/').pop());
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to edit amenity');
        } finally {
            setLoading(false);
        }
    };

    // Image handling functions
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFiles = Array.from(e.target.files || []);
        const totalImages = images.length + imageFiles.length;

        if (totalImages > 3 || imageFiles.length > 3) {
            setError("Maximum of 3 images allowed");
            return;
        }

        imageFiles.forEach(setFileToBase);
    };

    const setFileToBase = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            setImages(prev => [...prev, { url: reader.result }]);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => {
            const updatedImages = [...prev];
            updatedImages.splice(index, 1);
            return updatedImages;
        });

        console.log("Before", rotatingImage);

        // Adjust rotating image index if needed
        if (rotatingImage >= index && rotatingImage > 0) {
            setRotatingImage(prev => prev - 1);
        }

        console.log("After", rotatingImage);
    };


    // Functions

    return (

        <SidebarProvider>

            <AppSidebar />

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
                                            Edit amenity
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

                    <Form {...amenityForm}>

                        <form className="flex flex-col gap-4 p-8 pt-4" onSubmit={amenityForm.handleSubmit(handleSubmit)}>

                            {/* Page header */}
                            <div className="flex flex-row items-center gap-4">
                                {/* Return to Amenity List button */}
                                <Button
                                    className="h-7 w-7"
                                    onClick={() => history.back()}
                                    size="icon"
                                    title="Back Button"
                                    type="button"
                                    variant="outline"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>
                                </Button>

                                {/* Container for the header */}
                                <div className="flex flex-col">
                                    {/* Page header */}
                                    <h1 className="font-semibold text-2xl"> Edit {amenity ? `${amenity.amenityName} details` : "amenity details"} </h1>
                                    {/* Page header description */}
                                    {amenity && amenity.amenityType === "Equipment" ?
                                        <h3 className="font-light text-muted-foreground"> An equipment amenity for unit owners to reserve. </h3> :
                                        <h3 className="font-light text-muted-foreground"> A facility amenity for unit owners to reserve. </h3>
                                    }
                                </div>
                                <Button
                                    disabled={loading}
                                    className={"ml-auto"}
                                    type="submit"
                                    size="sm"
                                    variant="default"
                                >
                                    <Save className={"h-7 w-7 " + (loading ? "hidden" : "block")} />
                                    <LoadingSpinner className={"h-7 w-7 " + (loading ? "block" : "hidden")} />
                                    Save changes
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
                            <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                                <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">

                                    {/* Card for amenity basic information */}
                                    <Card>

                                        <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">

                                            <div className="flex flex-col pb-6">

                                                <Label className="text-lg font-semibold"> {amenity ? amenity.amenityType : "Amenity"} basic information </Label>
                                                <p className="text-sm font-normal text-muted-foreground"> Enter the appropriate details for the this {amenity ? amenity.amenityType.toLowerCase() : "amenity"}. </p>

                                            </div>

                                            <FormField
                                                control={amenityForm.control}
                                                name="amenityName"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="mb-4">
                                                            <div className="flex flex-col gap-1 mb-2">
                                                                <FormLabel className=""> Name <span className="text-destructive"> * </span> </FormLabel>
                                                                <FormDescription className="text-muted-foreground"> The {amenity ? amenity.amenityType.toLowerCase() : "amenity"} name should be descriptive–preferably singular. </FormDescription>
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

                                            {/* Amenity type */}
                                            {amenity && amenity.amenityType === "Facility" && (
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
                                            )}

                                            <FormField
                                                control={amenityForm.control}
                                                name="amenityDescription"
                                                render={({ field }) => {

                                                    return (
                                                        <FormItem className="mb-4">
                                                            <div className="flex flex-col gap-1 mb-2">
                                                                <FormLabel className=""> Description <span className="text-destructive"> * </span> </FormLabel>
                                                                {amenity && amenity.amenityType === "Equipment" ?
                                                                    <FormDescription className="text-muted-foreground"> Describe the equipment in detail. For example, it's appearance and functionality. </FormDescription> :
                                                                    <FormDescription className="text-muted-foreground"> Describe the facility in detail, including it's area and other notable features. </FormDescription>
                                                                }
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
                                                                {amenity && amenity.amenityType === "Equipment" ?
                                                                    <FormDescription className="text-muted-foreground"> Is there anything that the borrower needs to know? </FormDescription> :
                                                                    <FormDescription className="text-muted-foreground"> Set a reminder with important notes or guidelines for residents to review before using the facility. </FormDescription>
                                                                }
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



                                    {/* Card for equipment stock levels */}
                                    {amenity && amenity.amenityType === "Equipment" && (
                                        <Card>
                                            <CardContent className="flex flex-col gap-2 pt-5 max-h-svh">
                                                <div className="flex flex-col pb-2">
                                                    <Label className="text-lg font-semibold"> Equipment stock levels </Label>
                                                    <p className="text-sm text-muted-foreground"> Stock levels help prevent overbooking and maintain optimal availability. </p>
                                                </div>

                                                <Table>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell className="flex flex-col gap-1">
                                                                <Label className="font-medium"> Maximum stock <span className="text-destructive"> * </span> </Label>
                                                                <p className="text-muted-foreground"> The total quantity of this equipment that the system can allocate to the unit owners. </p>
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
                                                                <p className="text-muted-foreground"> The smallest amount of units a resident can reserve for this equipment. </p>
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
                                                                                        min={amenity.amenityQuantityMin}
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
                                                                <p className="text-muted-foreground"> The largest amount of units a resident can reserve for this equipment. </p>
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
                                                                                        max={amenity.amenityQuantityMax}
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
                                    )}

                                </div>

                                {/* Card for amenity images */}
                                <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
                                    <Card className="flex flex-col gap-2 pt-5 overflow-hidden">
                                        <CardContent>

                                            <div className="flex flex-col pb-6">
                                                <Label className="text-lg font-semibold"> {amenity ? amenity.amenityType : "Amenity"} images <span className="text-muted-foreground"> (Optional) </span> </Label>
                                                <p className="text-sm font-normal text-muted-foreground"> Attach images of the {amenity ? amenity.amenityType.toLowerCase() : "amenity"}. You can upload up to 3 images. </p>
                                            </div>

                                            <div className="grid gap-2">
                                                {images && images[0] && (
                                                    <img
                                                        className="aspect-video w-full rounded-md object-cover cursor-pointer"
                                                        onClick={() => { setCurrentImage(rotatingImage); setShowImagePreview(true) }}
                                                        src={images[rotatingImage].url ? images[rotatingImage].url : images[rotatingImage]}
                                                    />
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
                                                                onClick={() => setRotatingImage(index)}
                                                                src={image.url ? image.url : image[index]}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {images && images.length! !== 3 && images.length! <= 3 && (
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
                                                <Label className="flex gap-1 items-center text-lg font-semibold">
                                                    {amenity ? amenity.amenityType : "Amenity"} visibility
                                                    <span className="text-muted-foreground"> (Optional) </span>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info className="h-4 w-4 text-muted-foreground" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-sm"> It's 'Unarchived' by default. Archiving will hide the amenity. </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </Label>
                                                <p className="text-sm font-normal text-muted-foreground"> Choose if you want unit owners to see this {amenity ? amenity.amenityType.toLowerCase() : "amenity"} or not. </p>
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



                        </form>

                    </Form>

                </main>


                {/* Image preview dialog */}
                {images && images.length > 0 && (
                    <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>

                        <DialogContent className="p-0 max-w-[80%] max-h-[80%] items-center">

                            <DialogTitle className="sr-only"> Amenity image preview </DialogTitle>
                            <DialogDescription className="sr-only"> Preview amenity image when clicked </DialogDescription>

                            <Button
                                className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                disabled={images && images.length === 1}
                                type="button"
                                onClick={() => setCurrentImage((prev) => prev === 0 ? images.length - 1 : prev - 1)}
                                size="icon"
                                variant="outline"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <Button
                                className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                disabled={images && images.length === 1}
                                type="button"
                                onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                                size="icon"
                                variant="outline"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                            <img src={images[currentImage].url ? images[currentImage].url : images[currentImage]} className="aspect-video w-full h-full rounded-md object-contain" />

                        </DialogContent>

                    </Dialog>
                )}



            </SidebarInset>

        </ SidebarProvider>

    )



}