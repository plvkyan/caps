


// Imports
// Icon Imports from Lucide React
import {
    ChevronLeft,
    ChevronRight,
    TriangleAlert,
    Upload,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

// shadcn Skeleton Component Import
import { Skeleton } from "@/components/ui/skeleton";

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@/components/ui/table";

// shadcn Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toaster Component Import
import { Toaster } from "@/components/ui/toaster";

// shadcn useToast Component Import
import { useToast } from '@/components/ui/use-toast'



// Custom Components Imports
// LayoutWrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Types Imports
// AmenityType Type Import
import { AmenityType } from "@/types/amenity-type";



// Utility Imports
// react Imports
import {
    useEffect,
    useState
} from "react";

// react-hook-form Imports
import { useForm } from "react-hook-form";

// zod Imports
import * as zod from "zod";

// zodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";





// Equipment Edit Form Schema
const equipmentEditFormSchema = zod.object({

    amenityName: zod.string().min(1,
        { message: "Equipment name cannot be empty." }
    ),
    amenityType: zod.string(),
    amenityDescription: zod.string().min(1, {
        message: "Equipment description cannot be empty."
    }),
    amenityStockMax: zod.coerce.number().min(1,
        { message: "Maximum equipment stock cannot be zero or below zero." }
    ),
    // This should not be able to be zero, below zero, or above the maximum stock
    amenityStock: zod.coerce.number().min(1, {
        message: "Equipment stock cannot be zero or below zero."
    }
    ),
    amenityQuantityMin: zod.coerce.number().min(1,
        { message: "Minimum equipment quantity cannot be zero or below zero." }
    ),
    amenityQuantityMax: zod.coerce.number().min(1,
        { message: "Maximum equipment quantity cannot be zero or below zero." }
    ),
    amenityReminder: zod.string().optional(),
    amenityCreator: zod.string(),
    initialAmenityName: zod.string(),
    amenityImages: zod.any().optional(),
    stat: zod.string(),
})

// Facility Edit Form Schema
const facilityEditFormSchema = zod.object({

    amenityName: zod.string().min(1,
        { message: "Facility name cannot be empty." }
    ),
    amenityType: zod.string(),
    amenityDescription: zod.string().min(1, {
        message: "Facility description cannot be empty."
    }
    ),
    amenityAddress: zod.string().min(1, {
        message: "Facility address cannot be empty."
    }
    ),
    amenityReminder: zod.string().optional(),
    amenityCreator: zod.string(),
    initialAmenityName: zod.string(),
    amenityImages: zod.any().optional(),    
    stat: zod.string().optional(),

})





const AmenityEditForm = () => {



    // States
    // State for amenity
    const [amenity, setAmenity] = useState<AmenityType>();

    // State for errors
    const [error, setError] = useState<any>();

    // State for loading
    const [loading, setLoading] = useState(false);

    // State for images
    const [images, setImages] = useState<any>();

    // State for rotating index for image carousel
    const [rotatingIndex, setRotatingIndex] = useState(0);

    // State for current index of the image preview
    const [currentIndex, setCurrentIndex] = useState(0);

    // For toast confirmation
    const { toast } = useToast()





    // useEffects
    // useEffect to for API calls
    useEffect(() => {

        // Log to the console that the page has loaded
        console.log("Amenity Edit Form Loaded");

        // Set the document title
        document.title = "Amenity | GCTMS";

        // Check if there is an edited amenity in the local storage
        if (localStorage.getItem("amenityEdited")) {

            const amenityEdited = JSON.parse(localStorage.getItem("amenityEdited") as any)

            toast({
                title: amenityEdited.amenityType + " amenity edited.",
                description: amenityEdited.amenityName + " has been successfully edited.",
            })

            localStorage.removeItem("amenityEdited")
        }



        // Function to fetch amenity
        const fetchAmenity = async () => {

            // Fetch amenity
            const amenityResponse = await fetch("http://localhost:4000/api/amenities/" + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length));

            // Parse the response to JSON
            const amenityData = await amenityResponse.json();

            // If the response is successful, log to the console that fetching amenity is successful  
            if (amenityResponse.ok) {
                console.log("Fetching amenity successful.");
                setAmenity(amenityData);
                setImages(amenityData.amenityImages);
                setLoading(false);
            } else if (!amenityResponse.ok) {
                console.log("Fetching amenity failed.");
            }

        };

        // Call all API call functions
        // Fetch Amenity
        fetchAmenity();

    }, []);

    useEffect(() => {

        // const imagesCheck = () => {

        //     if (rotatingIndex < 0) {
        //         setRotatingIndex(0);
        //     }

        //     if (rotatingIndex >= imagess.length) {
        //         setRotatingIndex(imagess.length - 1);
        //     }

        // }

        let intervalId = setInterval(() => {

            console.log(images)

            if (images.length <= 0 || images.length === 1) {
                setRotatingIndex(0);
            } else if (rotatingIndex === images.length - 1) {
                setRotatingIndex(0);
            } else if (rotatingIndex >= images.length) {
                setRotatingIndex(0);
            }
            else {
                setRotatingIndex(rotatingIndex + 1);
            }

            console.log(images);
        }, 3000)

        // Pause logic for the carousel
        // if (paused) {
        //   clearInterval(intervalId);
        // } else {
        //   return () => clearInterval(intervalId);
        // }

        return () => clearInterval(intervalId);

    });



    // Facility form values
    const facilityEditForm = useForm<zod.infer<typeof facilityEditFormSchema>>({
        resolver: zodResolver(facilityEditFormSchema),
        defaultValues: async () => {

            const facilityDataResponse = await fetch("http://localhost:4000/api/amenities/" + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length));

            const facilityData = await facilityDataResponse.json();

            if (facilityDataResponse.ok) {
                console.log("Fetching facility successful.");
            } else if (!facilityDataResponse.ok) {
                console.log("Fetching facility failed.");
            }

            return {

                amenityName: facilityData.amenityName,
                amenityType: facilityData.amenityType,
                amenityDescription: facilityData.amenityDescription,
                amenityAddress: facilityData.amenityAddress,
                amenityReminder: facilityData.amenityReminder,
                amenityCreator: facilityData.amenityCreator,
                initialAmenityName: facilityData.amenityName,
                stat: facilityData.stat,

            }
        }
    });

    // Equipment form values
    const equipmentEditForm = useForm<zod.infer<typeof equipmentEditFormSchema>>({
        resolver: zodResolver(equipmentEditFormSchema),
        defaultValues: async () => {

            const equipmentDataResponse = await fetch("http://localhost:4000/api/amenities/" + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length).replace(/%20/g, " "));

            const equipmentData = await equipmentDataResponse.json();

            if (equipmentDataResponse.ok) {
                console.log("Fetching equipment successful.");
            } else if (!equipmentDataResponse.ok) {
                console.log("Fetching equipment failed.");
            }

            return {

                amenityName: equipmentData.amenityName,
                amenityType: equipmentData.amenityType,
                amenityDescription: equipmentData.amenityDescription,
                amenityStockMax: equipmentData.amenityStockMax,
                amenityStock: equipmentData.amenityStock,
                amenityQuantityMin: equipmentData.amenityQuantityMin,
                amenityQuantityMax: equipmentData.amenityQuantityMax,
                amenityReminder: equipmentData.amenityReminder,
                amenityCreator: equipmentData.amenityCreator,
                initialAmenityName: equipmentData.amenityName,
                stat: equipmentData.stat,

            }
        },

    })



    // Patch submit function to update the equipment details
    const equipmentEditSubmit = async (values: zod.infer<typeof equipmentEditFormSchema>) => {

        values.amenityImages = images;

        const equipmentEditResponse = await fetch('http://localhost:4000/api/amenities/' + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length).replace(/%20/g, " "), {
            method: 'PATCH',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const equipmentEditData = await equipmentEditResponse.json();

        if (equipmentEditResponse.ok) {
            console.log('Equipment successfully edited.');
            localStorage.setItem("amenityEdited", JSON.stringify(equipmentEditData))
            window.location.reload();
        } else if (!equipmentEditResponse.ok) {
            console.log('Equipment edit failed.');
            setError(equipmentEditData.error);
        }

    }

    // Patch submit function to update the facility details
    const facilityEditSubmit = async (values: zod.infer<typeof facilityEditFormSchema>) => {

        const facilityEditResponse = await fetch('http://localhost:4000/api/amenities/' + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length).replace(/%20/g, " "), {
            method: 'PATCH',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const facilityEditData = await facilityEditResponse.json();

        if (facilityEditResponse.ok) {
            console.log('Facility successfully edited.');
            localStorage.setItem("amenityEdited", JSON.stringify(facilityEditData))
            window.location.reload();
        } else if (!facilityEditResponse.ok) {
            console.log('Equipment edit failed.');
            setError(facilityEditData.error);
        }

    }


    const handleImage = (e) => {

        const imageFiles = Array.from(e.target.files);

        if (images.length + imageFiles.length > 3) {
            setError("You can only upload up to 3 images. Please remove at least 1 image to upload a new one.");
            return;
        }

        if (imageFiles.length > 3) {
            setError("You can only upload up to 3 images.");
            setImages([]);
            return;
        }

        if (images.length > 3) {
            setError("You can only upload up to 3 images.");
            setImages([]);
            return;
        }



        imageFiles.forEach(file => {
            setFileToBase(file);
        })

    }

    const setFileToBase = (file) => {

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            setImages(oldArray => [...oldArray, { url: reader.result }]);
        }

    }

    const removeImage = (index) => {

        if ((index >= images.length - 1 && rotatingIndex >= images.length - 1) || rotatingIndex >= images.length - 1 && images.length > 1) {
            if (rotatingIndex === 0) {
                setRotatingIndex(0);
            } else {
                setRotatingIndex(rotatingIndex - 1);
            }
        }

        const updatedImagesArray = Array.from(images); // make a separate copy of the array
        updatedImagesArray.splice(index, 1);
        setImages(updatedImagesArray);
    }


    return (



        <LayoutWrapper>



            <Toaster />

            {amenity && amenity.amenityType === "Equipment" &&

                (

                    <Form {...equipmentEditForm}>

                        <form onSubmit={equipmentEditForm.handleSubmit(equipmentEditSubmit)}>

                            <div className="flex items-center gap-4 mb-3">

                                <Button
                                    className="h-7 w-7"
                                    onClick={() => history.back()}
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>

                                </Button>

                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Edit {amenity.amenityName}
                                </h1>

                                <div className="hidden items-center gap-2 md:ml-auto md:flex">

                                    <Button size="sm" className="flex-gap-1" type="submit">
                                        Save Changes
                                    </Button>

                                </div>

                            </div>

                            {error && (
                                <div className="bg-destructive w-full h-fit rounded-lg mb-3 py-4 px-6 flex gap-3 items-center">
                                    <TriangleAlert className="w-6 h-6" />
                                    {error}
                                </div>
                            )}




                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                                    <Card x-chunk="dashboard-07-chunk-0">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Details </CardTitle>
                                            <CardDescription>
                                                Enter the appropriate details for the new equipment.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent>



                                            <div className="grid gap-6">



                                                {/* Equipment Amenity Name Input */}
                                                <FormField
                                                    control={equipmentEditForm.control}
                                                    name="amenityName"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Equipment Name </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid gap-2">

                                                                        <Label htmlFor="amenityName"> Name </Label>

                                                                        <CardDescription> The equipment name should be in plural form. </CardDescription>

                                                                        <Input
                                                                            className="w-full"
                                                                            id="amenityName"
                                                                            type="text"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </ FormItem>

                                                        )
                                                    }}
                                                />



                                                {/* Equipment Amenity Type Input */}
                                                <FormField
                                                    control={equipmentEditForm.control}
                                                    name="amenityDescription"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Amenity Description </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid gap-2">

                                                                        <Label htmlFor="amenityDescription"> Description </Label>

                                                                        <Textarea
                                                                            className="min-h-32"
                                                                            id="amenityDescription"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                {/* Equipment Amenity Reminder Input */}
                                                <FormField
                                                    control={equipmentEditForm.control}
                                                    name="amenityReminder"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Amenity Reminder </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid-gap-2">

                                                                        <Label htmlFor="amenityReminder"> Reminder </Label>
                                                                        <Textarea
                                                                            className="min-h-32"
                                                                            id="amenityReminder"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </FormItem>

                                                        )
                                                    }}
                                                />

                                            </div>



                                        </CardContent>

                                    </Card>



                                    {/* Equipment Stock Card */}
                                    <Card x-chunk="dashboard-07-chunk-1">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Stock</CardTitle>
                                            <CardDescription>
                                                Enter the maximum amount per reservation and the total amount of the equipment.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent>

                                            <Table>

                                                <TableBody>

                                                    <TableRow>

                                                        <TableCell className="font-semibold">
                                                            Maximum {amenity.amenityName} Stock
                                                            <CardDescription className="font-normal"> Changes in the maximum stock will affect the number of current stocks. </CardDescription>

                                                        </TableCell>

                                                        <TableCell>

                                                            <FormField
                                                                control={equipmentEditForm.control}
                                                                name="amenityStockMax"
                                                                render={({ field }) => {

                                                                    return (

                                                                        <FormItem>

                                                                            <FormLabel className="hidden"> Amenity Maximum Stock </FormLabel>

                                                                            <FormControl>

                                                                                <Input
                                                                                    id="amenityStockMax"
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

                                                        <TableCell className="font-semibold">

                                                            Current {amenity.amenityName} Stock
                                                            <CardDescription className="font-normal"> This cannot be lower than 0 or higher than the maximum stock. </CardDescription>

                                                        </TableCell>

                                                        <TableCell>

                                                            <FormField
                                                                control={equipmentEditForm.control}
                                                                name="amenityStock"
                                                                render={({ field }) => {

                                                                    return (

                                                                        <FormItem>

                                                                            <FormLabel className="hidden"> Current {amenity.amenityName} Stocks </FormLabel>

                                                                            <FormControl>

                                                                                <Input
                                                                                    id="amenityStock"
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

                                                        <TableCell className="font-semibold">
                                                            Minimum amount per reservation
                                                        </TableCell>

                                                        <TableCell>

                                                            <FormField
                                                                control={equipmentEditForm.control}
                                                                name="amenityQuantityMin"
                                                                render={({ field }) => {

                                                                    return (

                                                                        <FormItem>

                                                                            <FormLabel className="hidden"> Minimum Amenity Quanitty per Reservation </FormLabel>

                                                                            <FormControl>

                                                                                <Input
                                                                                    id="amenityQuantityMin"
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

                                                        <TableCell className="font-semibold">
                                                            Maximum amount per reservation
                                                        </TableCell>

                                                        <TableCell>

                                                            <FormField
                                                                control={equipmentEditForm.control}
                                                                name="amenityQuantityMax"
                                                                render={({ field }) => {

                                                                    return (

                                                                        <FormItem>

                                                                            <FormLabel className="hidden"> Maximum Amenity Quantity per Reservation </FormLabel>

                                                                            <FormControl>
                                                                                <Input
                                                                                    id="amenityQuantityMax"
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



                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                                    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Images </CardTitle>
                                            <CardDescription>
                                                Attach images of the equipment. You can upload up to 3 images.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent>

                                            <div className="grid gap-2">



                                                {images && images[0] && (
                                                    <Dialog>

                                                        <DialogTrigger onClick={() => setCurrentIndex(rotatingIndex)}>
                                                            <img
                                                                src={images[rotatingIndex].url ? images[rotatingIndex].url : images[rotatingIndex]} className="aspect-video w-full rounded-md object-cover"
                                                            />
                                                        </DialogTrigger>

                                                        <DialogContent className="p-0 aspect-video max-w-[80%] items-center justify-center">

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
                                                                src={images[currentIndex].url ? images[currentIndex].url : images[currentIndex]} className="aspect-video rounded-md object-contain"
                                                            />
                                                        </DialogContent>

                                                    </ Dialog>
                                                )}

                                                <div className="grid grid-cols-3 gap-2">

                                                    {images[0] && images.length > 0 && images.map((image, index) => (
                                                        <div className="group relative">
                                                            <Button
                                                                className="h-5 w-5 rounded-full absolute -top-2 -right-2 group-hover:flex hidden z-50"
                                                                variant="destructive"
                                                                size="icon"
                                                                type="button"
                                                                onClick={() => { removeImage(index) }}>
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                            <img
                                                                src={image.url ? image.url : image[index]} className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]" onClick={() => setRotatingIndex(index)}
                                                            />
                                                        </div>
                                                    )
                                                    )}

                                                </div>

                                                {images.length !== 3 && images.length! <= 3 && (
                                                    <button type="button" className="relative flex flex-col gap-2 aspect-video w-full items-center justify-center rounded-md border border-dashed">

                                                        <Upload className="h-6 w-6 text-muted-foreground" />

                                                        <div className="flex flex-col">
                                                            <span className="text-muted-foreground text-base font-medium"> Click here to upload new images </span>
                                                            <span className="text-muted-foreground text-xs font-normal"> The total file size should not exceed 15 MB. </span>
                                                        </div>

                                                        <span className="sr-only"> Image Upload </span>

                                                        <FormField
                                                            control={equipmentEditForm.control}
                                                            name="amenityImages"
                                                            render={({ field: { value, onChange, ...fieldProps } }) => {

                                                                return (

                                                                    <FormItem>
                                                                        <FormLabel className="hidden"> Amenity Image </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                accept="image/jpeg, image/png, image/jpg"
                                                                                className="block absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-5 disabled:opacity-0 !mt-0 pointer"
                                                                                disabled={images.length === 3 || images.length > 3}
                                                                                id="amenityImages"
                                                                                multiple
                                                                                onChange={handleImage}
                                                                                title=""
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

                                            <CardDescription className="mt-3 text-xs"> <b>  Note: </b>   Uploading new images will overwrite the current set of images. Please be careful as these images may be lost permanently. </CardDescription>

                                        </CardContent>

                                    </Card>



                                    <Card x-chunk="dashboard-07-chunk-3">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Status </CardTitle>
                                            <CardDescription> The equipment's visibility to the unit owners. </CardDescription>

                                        </CardHeader>

                                        <CardContent>

                                            <div className="grid gap-6">

                                                <FormField
                                                    control={equipmentEditForm.control}
                                                    name="stat"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel> Status </FormLabel>

                                                                <FormControl>

                                                                    <Select onValueChange={field.onChange} defaultValue={amenity.stat}>

                                                                        <SelectTrigger id="stat" aria-label="Select stsatus">
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



                )
            }



            {amenity && amenity.amenityType === "Facility" &&

                (

                    <Form {...facilityEditForm}>

                        <form onSubmit={facilityEditForm.handleSubmit(facilityEditSubmit)}>

                            <div className="flex items-center gap-4 mb-3">

                                <Button
                                    className="h-7 w-7"
                                    onClick={() => history.back()}
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>

                                </Button>

                                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                    Edit {amenity.amenityName}
                                </h1>

                                <div className="hidden items-center gap-2 md:ml-auto md:flex">

                                    <Button size="sm" className="flex-gap-1" type="submit">
                                        Save Changes
                                    </Button>

                                </div>

                            </div>

                            {error && (
                                <div className="bg-destructive w-full h-fit rounded-lg mb-3 py-4 px-6 flex gap-3 items-center">
                                    <TriangleAlert className="w-6 h-6" />
                                    {error}
                                </div>
                            )}




                            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                                    <Card x-chunk="dashboard-07-chunk-0">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Details </CardTitle>
                                            <CardDescription>
                                                Enter the appropriate details for the new facility.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent>



                                            <div className="grid gap-6">



                                                {/* Equipment Amenity Name Input */}
                                                <FormField
                                                    control={facilityEditForm.control}
                                                    name="amenityName"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Equipment Name </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid gap-2">

                                                                        <Label htmlFor="amenityName"> Name </Label>

                                                                        <CardDescription> The equipment name should be in plural form. </CardDescription>

                                                                        <Input
                                                                            className="w-full"
                                                                            id="amenityName"
                                                                            type="text"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </ FormItem>

                                                        )
                                                    }}
                                                />



                                                {/* Equipment Amenity Type Input */}
                                                <FormField
                                                    control={facilityEditForm.control}
                                                    name="amenityDescription"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Amenity Description </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid gap-2">

                                                                        <Label htmlFor="amenityDescription"> Description </Label>

                                                                        <Textarea
                                                                            className="min-h-32"
                                                                            id="amenityDescription"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                {/* Equipment Amenity Type Input */}
                                                <FormField
                                                    control={facilityEditForm.control}
                                                    name="amenityAddress"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Amenity Address </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid gap-2">

                                                                        <Label htmlFor="amenityAddress"> Address </Label>

                                                                        <Textarea
                                                                            className="min-h-32"
                                                                            id="amenityDescription"
                                                                            {...field}
                                                                        />

                                                                    </div>

                                                                </FormControl>

                                                                <FormMessage />

                                                            </FormItem>
                                                        )
                                                    }}
                                                />



                                                {/* Equipment Amenity Reminder Input */}
                                                <FormField
                                                    control={facilityEditForm.control}
                                                    name="amenityReminder"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel className="hidden"> Amenity Reminder </FormLabel>

                                                                <FormControl>

                                                                    <div className="grid-gap-2">

                                                                        <Label htmlFor="amenityReminder"> Reminder </Label>
                                                                        <Textarea
                                                                            className="min-h-32"
                                                                            id="amenityReminder"
                                                                            {...field}
                                                                        />

                                                                    </div>

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



                                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                                    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Images </CardTitle>
                                            <CardDescription>
                                                Attach images of the facility. You can upload up to 3 imagess.
                                            </CardDescription>

                                        </CardHeader>



                                        <CardContent>

                                            <div className="grid gap-2">


                                                <Skeleton
                                                    className="aspect-square w-full rounded-md object-cover h-[300] w-[300]"
                                                />

                                                <div className="grid grid-cols-3 gap-2">

                                                    <button type="button">
                                                        <Skeleton className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"></Skeleton>
                                                    </button>

                                                    <button type="button">
                                                        <img
                                                            src={images as string | undefined} className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"
                                                        />
                                                    </button>

                                                    <button type="button" className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                                        <span className="sr-only"> Upload </span>
                                                    </button>
                                                </div>

                                            </div>

                                        </CardContent>

                                    </Card>



                                    <Card x-chunk="dashboard-07-chunk-3">

                                        <CardHeader>

                                            <CardTitle> {amenity.amenityName} Status </CardTitle>
                                            <CardDescription> The facility's visibility to the unit owners. </CardDescription>

                                        </CardHeader>

                                        <CardContent>

                                            <div className="grid gap-6">

                                                <FormField
                                                    control={facilityEditForm.control}
                                                    name="stat"
                                                    render={({ field }) => {

                                                        return (

                                                            <FormItem>

                                                                <FormLabel> Status </FormLabel>

                                                                <FormControl>

                                                                    <Select onValueChange={field.onChange} defaultValue={amenity.stat}>

                                                                        <SelectTrigger id="stat" aria-label="Select stsatus">
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



                )
            }



        </LayoutWrapper>



    )

}

export default AmenityEditForm;