


// Imports

// Lucide Icons Imports
import {
    CirclePlus,
    MoreHorizontal,
} from "lucide-react";



// shadcn Component Imports
// shadcn Alert Dialog Imports
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

// shadcn Badge Imports
import { Badge } from "@/components/ui/badge"

// shadcn Button Imports
import { Button } from "@/components/ui/button";

// shadcn Card Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// shadcn Dropdown Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// shadcn Skeleton Imports
import { Skeleton } from "@/components/ui/skeleton";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// shadcn Tab Imports
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

// shadcn Toast Import
import { toast } from "sonner";



// Custom Component Imports
// Layout Wrapper Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Utility Imports
// React Router Dom Imports
// useNavigate Hook Import
import { useNavigate } from "react-router-dom";

// React Imports
// useEffect Hook Import
import { useEffect, useState } from "react";



// Types
// Amenity Type Import
import { AmenityType } from "@/types/amenity-type";
import { deleteAmenity } from "@/data/amenity-api";
import { set } from "date-fns";





const AmenitiesList = () => {



    // States
    // Specific Amenity State
    const [deletedAmenity, setDeletedAmenity] = useState<AmenityType>({
        _id: "",
        amenityName: "",
        amenityType: "",
        amenityAddress: "",
        amenityDescription: "",
        amenityStock: 0,
        amenityStockMax: 0,
        amenityQuantityMin: 0,
        amenityQuantityMax: 0,
        amenityReminder: "",
        amenityCreator: "",
        amenityImages: [
            {
                url: "",
                public_id: ""
            }
        ],
        amenityVisibility: ""
    });

    // Amenity List State
    const [amenityList, setAmenityList] = useState<AmenityType[] | null>(null);

    // Delete Dialog State
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    // React Router Dom Navigate
    const navigate = useNavigate();



    // Use Effect for API calls
    // Use Effect for Fetching Amenities
    useEffect(() => {

        document.title = "Amenities | GCTMS";

        const fetchAmenities = async () => {

            const amenityListResponse = await fetch('http://localhost:4000/api/amenities/');

            const amenityListData = await amenityListResponse.json();

            if (amenityListResponse.ok) {
                console.log("Amenity list fetched successfully.");
                setAmenityList(amenityListData);
            } else if (!amenityListResponse.ok) {
                console.log("Fetching amenities failed: " + amenityListData);
            }

        }

        fetchAmenities();

    }, []);



    // Functions
    // Function to navigate to the equipment form page
    const equipmentFormRoute = () => {
        const equipmentFormPath = '/amenities/equipment/form';
        navigate(equipmentFormPath);
    }

    // Function to navigate to the facility form page
    const facilityFormRoute = () => {
        const facilityFormPath = '/amenities/facility/form';
        navigate(facilityFormPath);
    }

    // Amenity Details Route
    const amenityDetailsRoute = (id) => {
        const amenityDetailsPath = '/amenities/details/' + id;
        navigate(amenityDetailsPath);
    }

    // Archive Function
    const setArchive = async (amenity) => {

        amenity.amenityVisibility = "Archived"

        const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(amenity)
        })

        const json = await response.json()

        if (response.ok) {

            console.log("archive amenity successful", json);
        }

    }

    // Unarchive Function
    const setUnarchive = async (amenity) => {

        amenity.amenityVisibility = "Unarchived"

        const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(amenity)
        })

        const json = await response.json()

        if (response.ok) {

            console.log("unarchive amenity successful", json);

        }

    }

    const deleteReservation = async (amenity: AmenityType) => {
        if (!amenity || !amenity._id) {
            console.error("Invalid amenity data");
            toast.error("Invalid amenity data.");
            return;
        }

        try {
            const response = await deleteAmenity(amenity._id);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Failed to delete amenity:", errorData);
                toast.error("Failed to delete amenity.");
                return;
            }

            // Update the amenity list state
            setAmenityList((prevList) => prevList?.filter((item) => item._id !== amenity._id) || null);

            toast.success("Amenity deleted successfully."),
            {
                closeButton: true,
            }
        } catch (error) {
            console.error("Error deleting amenity:", error);
            toast.error("An error occurred while deleting the amenity.",
                {
                    closeButton: true,
                }
            );
        } finally {
            setShowDeleteDialog(false);
        }
    };





    return (



        <LayoutWrapper>

            {/* Delete dialog for deleting the reservation */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        {/* Deletion message */}
                        <AlertDialogTitle> Are you sure you want to delete this amenity? </AlertDialogTitle>

                        <AlertDialogDescription>
                            This action cannot be undone. This amenity will permanently deleted and be no longer be accessible by anyone.
                        </AlertDialogDescription>

                    </AlertDialogHeader>



                    <AlertDialogFooter>

                        {/* Delete dialog cancel button */}
                        <AlertDialogCancel> Cancel </AlertDialogCancel>

                        {/* Delete dialog delete button */}
                        <Button
                            variant={"destructive"}
                            onClick={() => { setShowDeleteDialog(false); deleteReservation(deletedAmenity) }}
                        >
                            Delete
                        </Button>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>


            <div className="mr-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold"> Amenities </h1>
            </div>

            <Tabs className="flex flex-col gap-2" defaultValue="all">

                <div className="flex items-center ">

                    <TabsList>
                        <TabsTrigger value="all"> All </TabsTrigger>
                        <TabsTrigger value="facility"> Facility </TabsTrigger>
                        <TabsTrigger value="equipment"> Equipment </TabsTrigger>
                    </TabsList>

                    <div className="ml-auto flex items-center gap-2">

                    </div>

                </div>



                <TabsContent value="all">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">

                            <div className="flex flex-col gap-2">
                                <CardTitle> Amenities </CardTitle>
                                <CardDescription>
                                    List of all amenities  available for reservation.
                                </CardDescription>
                            </div>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>


                                    {amenityList && amenityList.map((amenity) => {

                                        return (

                                            <TableRow key={amenity._id}>
                                                {/* <TableRow> */}

                                                <TableCell className="flex flex-row items-center gap-4" onClick={() => { amenityDetailsRoute(amenity._id); }}>
                                                    <Skeleton className="h-24 w-24 " />
                                                </TableCell>

                                                <TableCell onClick={() => { amenityDetailsRoute(amenity._id); }}>
                                                    <div>
                                                        <div className="font-medium"> {amenity.amenityName} </div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {amenity.amenityType == "Facility" ? amenity.amenityAddress : amenity.amenityStock + " remaining"}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id); }}>
                                                    {amenity.amenityType}
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id); }}>
                                                    <Badge className="text-xs" variant="secondary">
                                                        {amenity.amenityVisibility}
                                                    </Badge>
                                                </TableCell>

                                                <TableCell className="items-end">

                                                    <DropdownMenu>

                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                type="button"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">

                                                            <DropdownMenuLabel> Actions </DropdownMenuLabel>

                                                            <DropdownMenuSeparator />

                                                            {
                                                                (amenity.amenityVisibility == "Unarchived") &&
                                                                (
                                                                    <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                )
                                                            }

                                                            {
                                                                (amenity.amenityVisibility == "Archived") &&
                                                                (
                                                                    <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                )
                                                            }

                                                            <DropdownMenuItem onClick={() => { setShowDeleteDialog(true); setDeletedAmenity(amenity) }} className="text-destructive"> Delete </DropdownMenuItem>


                                                        </DropdownMenuContent>

                                                    </DropdownMenu>

                                                </TableCell>

                                            </TableRow>

                                        )
                                    })

                                    }



                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>



                <TabsContent value="facility">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <CardTitle> Facilities </CardTitle>
                                <CardDescription>
                                    List of all facilities  available for reservation.
                                </CardDescription>
                            </div>

                            <Button className="flex gap-2" onClick={facilityFormRoute}>
                                <CirclePlus className="h-5 w-5" />
                                Add Facility
                            </Button>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>



                                    {amenityList && amenityList.map((amenity) => {

                                        if (amenity.amenityType == "Facility") {

                                            return (

                                                <TableRow key={amenity._id}>
                                                    {/* <TableRow> */}

                                                    <TableCell className="flex flex-row items-center gap-4" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <Skeleton className="h-24 w-24 " />
                                                    </TableCell>

                                                    <TableCell onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <div>
                                                            <div className="font-medium"> {amenity.amenityName} </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {amenity.amenityAddress}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        {amenity.amenityType}
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <Badge className="text-xs" variant="secondary">
                                                            {amenity.amenityVisibility}
                                                        </Badge>
                                                    </TableCell>

                                                    <TableCell className="items-end">

                                                        <DropdownMenu>

                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                                                {
                                                                    (amenity.amenityVisibility == "Unarchived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                {
                                                                    (amenity.amenityVisibility == "Archived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                <DropdownMenuItem onClick={() => { setShowDeleteDialog(true); setDeletedAmenity(amenity) }} className="text-destructive"> Delete </DropdownMenuItem>


                                                            </DropdownMenuContent>

                                                        </DropdownMenu>

                                                    </TableCell>

                                                </TableRow>

                                            )


                                        }
                                    })


                                    }



                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>



                <TabsContent value="equipment">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <CardTitle> Amenities </CardTitle>
                                <CardDescription>
                                    List of all amenities  available for reservation.
                                </CardDescription>
                            </div>

                            <Button className="flex gap-2" onClick={equipmentFormRoute}>
                                <CirclePlus className="h-5 w-5" />
                                Add Equipment
                            </Button>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>



                                    {amenityList && amenityList.map((amenity) => {

                                        if (amenity.amenityType == "Equipment") {

                                            return (

                                                <TableRow key={amenity._id}>
                                                    {/* <TableRow> */}

                                                    <TableCell className="flex flex-row items-center gap-4" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <Skeleton className="h-24 w-24 " />
                                                    </TableCell>

                                                    <TableCell onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <div>
                                                            <div className="font-medium"> {amenity.amenityName} </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {amenity.amenityStock + " remaining"}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        {amenity.amenityType}
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell" onClick={() => { amenityDetailsRoute(amenity._id) }}>
                                                        <Badge className="text-xs" variant="secondary">
                                                            {amenity.amenityVisibility}
                                                        </Badge>
                                                    </TableCell>

                                                    <TableCell className="items-end">

                                                        <DropdownMenu>

                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    aria-haspopup="true"
                                                                    size="icon"
                                                                    type="button"
                                                                    variant="ghost"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">Toggle menu</span>
                                                                </Button>
                                                            </DropdownMenuTrigger>

                                                            <DropdownMenuContent align="end">

                                                                <DropdownMenuLabel> Actions </DropdownMenuLabel>

                                                                <DropdownMenuSeparator />

                                                                {
                                                                    (amenity.amenityVisibility == "Unarchived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                {
                                                                    (amenity.amenityVisibility == "Archived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                <DropdownMenuItem onClick={() => { setShowDeleteDialog(true); setDeletedAmenity(amenity) }} className="text-destructive"> Delete </DropdownMenuItem>


                                                            </DropdownMenuContent>

                                                        </DropdownMenu>

                                                    </TableCell>

                                                </TableRow>

                                            )


                                        }
                                    })


                                    }


                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>


            </Tabs>

        </ LayoutWrapper>



    )

};



export default AmenitiesList;