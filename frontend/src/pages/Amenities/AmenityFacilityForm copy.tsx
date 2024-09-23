


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

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// shadcnc Textarea Component Import
import { Textarea } from "@/components/ui/textarea";



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



// 
const formSchema = zod.object({

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
    amenityReminder: zod.string().min(1,
        { message: "Facility reminder cannot be empty." }
    ),
    stat: zod.string(
    ).optional(),

});


const AmenityFacilityForm = () => {



    // React Router Dom Navigate
    const navigate = useNavigate();



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

        if (response.ok) {

            console.log('New facility amenity created: ', json);

        }

    }




    return (



        <LayoutWrapper>

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
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle> Facility Status </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">


                                        <div className="grid gap-3">

                                            <FormField
                                                control={form.control}
                                                name="stat"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="hidden"> Facility Status </FormLabel>
                                                            <FormControl>
                                                                <Label htmlFor="status"> Status </Label>
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
                                                        </FormItem>
                                                    )
                                                }}
                                            />

                                        </div>

                                    </div>
                                </CardContent>
                            </Card>
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
                                        <Skeleton
                                            className="aspect-square w-full rounded-md object-cover h-[300] w-[300]"
                                        />
                                        <div className="grid grid-cols-3 gap-2">
                                            <button>
                                                <Skeleton
                                                    className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"
                                                />
                                            </button>
                                            <button>
                                                <Skeleton
                                                    className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"
                                                />
                                            </button>
                                            <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                            <CardTitle>Archive Product</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing elit.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div></div>
                            <Button size="sm" variant="secondary">
                                Archive Product
                            </Button>
                        </CardContent>
                    </Card> */}
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button variant="outline" size="sm">
                            Discard
                        </Button>
                        <Button size="sm">Save Product</Button>
                    </div>

                </form>

            </Form>

        </LayoutWrapper >



    )
}



export default AmenityFacilityForm;