


// Imports

// Lucide Icon Imports
import {
    ChevronLeft,
    PlusCircle,
    Upload,
} from "lucide-react";



// shadcn Component Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

// shadcn Skeleton Component Import
import { Skeleton } from "@/components/ui/skeleton";

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
import * as zod from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


// 
const formSchema = zod.object({

    profileImage: zod
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
    amenityName: zod.string().min(1,
        { message: "Facility name cannot be empty." }
    ),
    amenityType: zod.string(
    ).optional(),
    amenityDescription: zod.string().min(1,
        { message: "Facility description cannot be empty." }
    ),
    amenityAddress: zod.string().min(1,
        { message: "Facility address cannot be empty." }
    ),
    amenityCreator: zod.string(),
    amenityReminder: zod.string().min(1,
        { message: "Facility reminder cannot be empty." }
    ),
    stat: zod.string(
    ).optional(),

});





const AmenityFacilityForm = () => {

    // Use AuthContext to get user data
    const { user } = useAuthContext();



    // React Router Dom Navigate
    const navigate = useNavigate();

    //
    const [error, setError] = useState<string | null>(null);

    // 
    const [image, setImage] = useState<File | undefined | null>();
    console.log(image, 12);

    // Functions
    // Function to navigate to the facility form page
    const returnRoute = () => {

        const path = '/amenities';
        navigate(path);

    }

    // Create Form Function
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amenityName: "",
            amenityType: "Facility",
            amenityDescription: "",
            amenityAddress: "",
            amenityReminder: "",
            amenityCreator: user.blkLt,
            stat: "Unarchived",
        }
    });

    // 
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

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
                                                                <Label htmlFor="name">Name</Label>
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
                                    <CardTitle> Facility Images</CardTitle>
                                    <CardDescription>
                                        Attach images of the new facility. You can upload up to 3 images.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <Input onChange={(e) => setImage((e.target as HTMLInputElement)?.files?.[0])} id="amenityImage" type="file" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle> Facility Status </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">


                                        <div className="grid gap-3">

                                            <Label htmlFor="status"> Status </Label>

                                            <FormField
                                                control={form.control}
                                                name="stat"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="hidden"> Facility Status </FormLabel>
                                                            <FormControl>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <SelectTrigger id="stat" aria-label="Select status">
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