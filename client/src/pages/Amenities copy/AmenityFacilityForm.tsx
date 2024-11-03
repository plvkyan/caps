


// Imports

// Lucide Icon Imports
import {
    ChevronLeft,
    ChevronRight,
    PlusCircle,
    Upload,
    X,
} from "lucide-react";



// shadcn Component Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

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

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// shadcnc Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toaster Import
import { Toaster } from "@/components/ui/toaster";

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"



// Custom Component Imports
// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Utility Imports
// React Hook Form Imports
import { useForm } from "react-hook-form";

// React Router Dom Imports
import { useNavigate } from "react-router-dom";

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


// 
const formSchema = z.object({
    amenityName: z.string().min(1,
        { message: "Facility name cannot be empty." }
    ),
    amenityType: z.string(
    ).optional(),
    amenityDescription: z.string().min(1,
        { message: "Facility description cannot be empty." }
    ),
    amenityAddress: z.string().min(1,
        { message: "Facility address cannot be empty." }
    ),
    amenityImages: z.any().optional(),
    amenityReminder: z.string().optional(),
    amenityCreator: z.string(),
    amenityVisibility: z.string(
    ).optional(),

});





const AmenityFacilityForm = () => {

    // Use AuthContext to get user data
    const { user } = useAuthContext();



    // React Router Dom Navigate
    const navigate = useNavigate();



    // States
    // State for rotating index of images for image preview
    const [rotatingIndex, setRotatingIndex] = useState(0);
    // State for current index of images for image preview
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for form error message
    const [error, setError] = useState<any>();
    // State for current images uploaded
    const [images, setImages] = useState<any>([]);



    // Functions
    // Function to navigate to the facility form page
    const returnRoute = () => {

        const path = '/amenities';
        navigate(path);

    }

    // Create Form Function
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amenityName: "",
            amenityType: "Facility",
            amenityDescription: "",
            amenityAddress: "",
            amenityReminder: "",
            amenityCreator: user.blkLt,
            amenityVisibility: "Unarchived",
        }
    });



    // 
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {

        values.amenityImages = images;

        const response = await fetch('http://localhost:4000/api/amenities', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json();

        if (!response.ok) {

            setError(json.error);
            console.log('Error creating new equipment amenity: ', json);

        }

        if (response.ok) {

            console.log('New facility amenity created: ', json);
            localStorage.setItem("newAmenity", JSON.stringify(json))
            setImages([]);
            window.location.reload();

        }

    }

    // For toast confirmation
    const { toast } = useToast()

    useEffect(() => {

        if (localStorage.getItem("newAmenity")) {

            const newAmenity = JSON.parse(localStorage.getItem("newAmenity") as any)

            toast({

                title: "Facility amenity created",
                description: `Facility ${newAmenity.amenityName} was successfully created.`,

            })

            localStorage.removeItem("newAmenity")

        }

    }, []);

    // Use Effect for image preview
    useEffect(() => {
        // const imageCheck = () => {
        //     if (rotatingIndex < 0) {
        //         setRotatingIndex(0);
        //     }
        //     if (rotatingIndex >= images.length) {
        //         setRotatingIndex(images.length - 1);
        //     }
        // }
        const intervalId = setInterval(() => {

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
        }, 5000)
        // imageCheck();
        return () => clearInterval(intervalId);
    });



    const handleImages = (e) => {

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
            setImages(oldArray => [...oldArray, reader.result]);
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

            <Form {...form}>

                <form onSubmit={form.handleSubmit(handleSubmit)}>

                    <div className="flex items-center gap-4 mb-3">

                        <Button
                            variant="outline" size="icon"
                            className="h-7 w-7"
                            onClick={returnRoute}
                        >

                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only"> Back </span>

                        </Button>

                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            New Facility
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button size="sm" className="flex gap-1" type="submit">
                                <PlusCircle className="w-4 h-4" />
                                Add Facility </Button>
                        </div>

                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                            <Card x-chunk="dashboard-07-chunk-0">

                                <CardHeader>
                                    <CardTitle> Facility Details </CardTitle>
                                    <CardDescription>
                                        Enter the appropriate details for the new facility.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <div className="grid gap-6">



                                        <FormField
                                            control={form.control}
                                            name="amenityName"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>

                                                        <FormLabel className="hidden"> Facility Name </FormLabel>
                                                        <FormControl>

                                                            <div className="grid gap-2">

                                                                <Label htmlFor="name"> Name </Label>
                                                                <CardDescription> The facility name as how it is generally known. </CardDescription>

                                                                <Input
                                                                    id="amenityName"
                                                                    type="text"
                                                                    className="w-full"
                                                                    placeholder="Enter facility name"
                                                                    {...field}
                                                                />

                                                            </div>

                                                        </FormControl>

                                                        <FormMessage />

                                                        {error && <div className="text-destructive"> {error} </div>}

                                                    </FormItem>
                                                )
                                            }}
                                        />



                                        <FormField
                                            control={form.control}
                                            name="amenityDescription"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="hidden"> Facility Description </FormLabel>
                                                        <FormControl>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="description"> Description </Label>
                                                                <Textarea
                                                                    className="min-h-32"
                                                                    id="amenityDescription"
                                                                    placeholder="Enter facility description"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>

                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                            }}
                                        />



                                        <FormField
                                            control={form.control}
                                            name="amenityAddress"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="hidden"> Amenity Address </FormLabel>
                                                        <FormControl>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="description"> Address </Label>
                                                                <Textarea
                                                                    id="amenityAddress"
                                                                    placeholder="Enter facility address"
                                                                    className="min-h-16"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>

                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                            }}
                                        />



                                        <FormField
                                            control={form.control}
                                            name="amenityReminder"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem>
                                                        <FormLabel className="hidden"> Amenity Reminder </FormLabel>
                                                        <FormControl>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="description"> Reminder </Label>
                                                                <Textarea
                                                                    id="description"
                                                                    placeholder="Enter amenity reminder"
                                                                    className="min-h-16"
                                                                    {...field}
                                                                />
                                                            </div>

                                                        </FormControl>

                                                        <FormMessage />

                                                    </FormItem>
                                                )
                                            }
                                            }
                                        />


                                    </div>
                                </CardContent>
                            </Card>

                        </div>





                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle> Equipment Images </CardTitle>
                                    <CardDescription>
                                        Attach images of the new equipment. You can upload up to 3 images.
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>

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

                                            {images && images?.map((image, index) => (
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
                                                        src={image} className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]" onClick={() => setRotatingIndex(index)}
                                                    />
                                                </div>
                                            )
                                            )}

                                        </div>

                                        {images.length !== 3 && images.length! <= 3 && (
                                            <button type="button" className="relative flex flex-col gap-2 aspect-video w-full items-center justify-center rounded-md border border-dashed">

                                                <Upload className="h-6 w-6 text-muted-foreground" />

                                                <div className="flex flex-col">
                                                    <span className="text-muted-foreground text-base font-medium"> Click here to upload images </span>
                                                    <span className="text-muted-foreground text-xs font-normal"> The total file size should not exceed 15 MB. </span>
                                                </div>

                                                <span className="sr-only"> Upload </span>

                                                <FormField
                                                    control={form.control}
                                                    name="amenityImages"
                                                    render={({ field: { value, onChange, ...fieldProps } }) => {

                                                        return (

                                                            <FormItem>
                                                                <FormLabel className="hidden"> Amenity Image </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        accept="image/jpeg, image/png, image/jpg"
                                                                        className="block absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-50 disabled:opacity-0 !mt-0 pointer"
                                                                        disabled={images.length === 3 || images.length > 3}
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



                        </div>
                    </div>


                </form>

            </Form>

        </LayoutWrapper >



    )
}



export default AmenityFacilityForm;