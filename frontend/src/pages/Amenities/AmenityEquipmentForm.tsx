


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
    TableRow,
} from "@/components/ui/table";

// shadcnc Textarea Component Import
import { Textarea } from "@/components/ui/textarea";



// Custom Component Imports
// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Utility Imports
// React Router Dom Imports
import { useNavigate } from "react-router-dom";

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as zod from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";



//
const formSchema = zod.object({

    amenityName: zod.string().min(1,
        { message: "Equipment name cannot be empty." }
    ),
    amenityType: zod.string(
    ).optional(),
    amenityDescription: zod.string().min(1,
        { message: "Equipment description cannot be empty." }
    ),
    amenityQuantity: zod.coerce.number().min(1,
        { message: "Equipment quantity cannot be zero." }
    ),
    amenityQuantityMax: zod.coerce.number().min(1,
        { message: "Maximum equipment reservation quantity cannot be zero." }
    ),
    amenityReminder: zod.string(
    ).optional(),
    stat: zod.string(
    ).optional(),

});


const AmenityEquipmentForm = () => {



    // React Router Dom Navigate
    const navigate = useNavigate();



    // Functions
    // Function to navigate to the equipment form page
    const returnRoute = () => {

        const path = '/amenities';
        navigate(path);

    }

    // Create Form Function
    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amenityDescription: "",
            amenityName: "",
            amenityType: "Equipment",
            amenityQuantity: 0,
            amenityQuantityMax: 0,
            amenityReminder: "",
            stat: "Unarchived",
        }
    });

    // Handle Submit Function for CREATING an amenity
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        const response = await fetch('http://localhost:4000/api/amenities', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (response.ok) {

            console.log('New equipment amenity created: ', json);

        }

    }



    

    return (



        <LayoutWrapper>

            <Form {...form}>

                <form onSubmit={form.handleSubmit(handleSubmit)}>

                    {/* Container for top row items */}
                    <div className="flex items-center gap-4 mb-3">

                        {/* Return to Amenity List button */}
                        <Button
                            variant="outline" size="icon"
                            className="h-7 w-7"
                            onClick={returnRoute}
                        >

                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only"> Back </span>

                        </Button>

                        {/* Title */}
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            New Equipment
                        </h1>

                        {/* Add Equipment Button */}
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button size="sm" className="flex gap-1" type="submit">
                                <PlusCircle className="w-4 h-4" />
                                Add Equipment </Button>
                        </div>

                    </div>




                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">

                            <Card x-chunk="dashboard-07-chunk-0">

                                {/* Form Title */}
                                <CardHeader>

                                    <CardTitle> Equipment Details</CardTitle>
                                    <CardDescription>
                                        Enter the appropriate details for the new equipment.
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
                                                        <FormLabel className="hidden"> Equipment Name </FormLabel>
                                                        <FormControl>

                                                            <div className="grid gap-2">
                                                                <Label htmlFor="name">Name</Label>
                                                                <Input
                                                                    id="amenityName"
                                                                    className="w-full"
                                                                    placeholder="Enter equipment name"
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                                <FormMessage />
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
                                                        <FormLabel className="hidden"> Amenity Description </FormLabel>
                                                        <FormControl>
                                                            <div className="grid gap-2">
                                                                <Label htmlFor="description">Description</Label>
                                                                <Textarea
                                                                    id="amenityDescription"
                                                                    placeholder="Enter equipment description"   
                                                                    className="min-h-32"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )
                                            }
                                            }
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
                                                                <Label htmlFor="description">Reminder</Label>
                                                                <Textarea
                                                                    id="amenityReminder"
                                                                    className="min-h-32"
                                                                    placeholder="Enter equipment reminder"
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


                            <Card x-chunk="dashboard-07-chunk-1">

                                <CardHeader>

                                    <CardTitle> Equipment Stock </CardTitle>
                                    <CardDescription>
                                        Enter the maximum amount per reservation and the total amount of the equipment.
                                    </CardDescription>

                                </CardHeader>


                                <CardContent>

                                    <Table>

                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="font-semibold">
                                                    Maximum amount per reservation
                                                </TableCell>
                                                <TableCell>

                                                    <FormField
                                                        control={form.control}
                                                        name="amenityQuantity"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="hidden"> Amenity Quantity </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            id="amenityQuantity"
                                                                            type="number"
                                                                            defaultValue="0"
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
                                                    Maximum stocks
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name="amenityQuantityMax"
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>
                                                                    <FormLabel className="hidden"> Amenity Maximum Quantity </FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            id="amenityQuantityMax"
                                                                            type="number"
                                                                            defaultValue="0"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
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

                            
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle> Equipment Images</CardTitle>
                                    <CardDescription>
                                        Attach images of the new equipment. You can upload up to 3 images.
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

                            <Card x-chunk="dashboard-07-chunk-3">

                                <CardHeader>
                                    <CardTitle> Equipment Status </CardTitle>
                                </CardHeader>

                                <CardContent>

                                    <div className="grid gap-6">

                                        <div className="grid gap-3">

                                            <Label htmlFor="status">Status</Label>

                                            <FormField
                                                control={form.control}
                                                name="stat"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <FormLabel className="hidden"> Equipment Status</FormLabel>
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

            </ Form>

        </LayoutWrapper >



    )
}



export default AmenityEquipmentForm;