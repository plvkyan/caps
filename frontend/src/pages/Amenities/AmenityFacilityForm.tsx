


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
// React Router Dom Imports
import { useNavigate } from "react-router-dom";






const AmenityFacilityForm = () => {



    // React Router Dom Navigate
    const navigate = useNavigate();



    // Functions
    // Function to navigate to the facility form page
    const returnRoute = () => {

        const path = '/amenities';
        navigate(path);

    }





    return (



        <LayoutWrapper>

            <div className="flex items-center gap-4">

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
                    <Button size="sm" className="flex gap-1">
                        <PlusCircle className="w-4 h-4" />
                        Add Facility </Button>
                </div>

            </div>
            
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle> Facility Details</CardTitle>
                            <CardDescription>
                                Enter the appropriate details for the new facility.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        defaultValue="CODING IS FUN TEMPORARY LANG HEHE"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                        className="min-h-32"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description"> Address </Label>
                                    <Textarea
                                        id="description"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                        className="min-h-16"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description"> Reminder </Label>
                                    <Textarea
                                        id="description"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                        className="min-h-16"
                                    />
                                </div>

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
                                    <Label htmlFor="status">Status</Label>
                                    <Select>
                                        <SelectTrigger id="status" aria-label="Select status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unarchived">Unarchived</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
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


        </LayoutWrapper >



    )
}



export default AmenityFacilityForm;