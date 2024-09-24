


// Imports

// Lucide Icons Imports
import {
    CirclePlus,
    File,
    ListFilter,
    MoreHorizontal,
} from "lucide-react";



// shadcn Component Imports
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
    DropdownMenuCheckboxItem,
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
import { Amenity } from "@/types/amenities";

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";





const ArchivedAmenities = () => {


    const { toast } = useToast()

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)



    // React Router Dom Navigate
    const navigate = useNavigate();

    const [amenityList, setAmenityList] = useState<Amenity[] | null>(null);

    const [am, setAm] = useState<Amenity | null>(null);



    // Use Effect for API calls
    // Use Effect for Fetching Amenities
    useEffect(() => {

        const fetchAmenities = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/archived');

            const json = await response.json();

            if (response.ok) {

                console.log(amenityList)
                setAmenityList(json);


            }

        }

        fetchAmenities();

    }, []);



    // Functions
    // Function to navigate to the equipment form page
    const equipmentFormRoute = () => {

        const path = '/amenities/equipment/form';
        navigate(path);

    }

    // Function to navigate to the facility form page
    const facilityFormRoute = () => {

        const path = '/amenities/facility/form';
        navigate(path);

    }

    // Amenity Details Route
    const amenityDetailsRoute = (amenity) => {

        const fetchReservations = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName)

            const json = await response.json()

            if (response.ok) {

                console.log(json)
                const path = '/amenities/details/' + amenity.amenityName;
                navigate(path)

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchReservations()
    }

    // Archive Function
    const setArchive = async (amenity) => {

        amenity.stat = "Archived"

        const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(amenity)
        })

        const json = await response.json()

        if (response.ok) {

            toast({

                title: "Amenity archived",
                description: amenity.amenityName + " is archived",

            })
        }

    }

    // Unarchive Function
    const setUnarchive = async (amenity) => {

        amenity.stat = "Unarchived"

        const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(amenity)
        })

        const json = await response.json()

        if (response.ok) {

            toast({

                title: "Amenity archived",
                description: amenity.amenityName + " is unarchived",

            })

        }

    }

    const deleteReservation = async (amenity) => {

        const response = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
            method: 'DELETE'
        })

        const json = await response.json()

        console.log(json)

        if (response.ok) {

            window.location.reload();

            toast({

                title: "Amenity deleted",
                description: amenity.amenityName + " is deleted successfully",

            })
        }

    }





    return (



        <>

            <Toaster />

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
                            onClick={ ()=> {deleteReservation(am)}}
                        >
                            Delete
                        </Button>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>


            <div className="mr-auto grid w-full max-w-6xl gap-2 mt-12 mb-2">
                <h1 className="text-3xl font-semibold"> Archived Amenities </h1>
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

                                            // <TableRow onClick={() => { amenityDetailsRoute(amenity); console.log(amenity); }}>
                                            <TableRow>

                                                <TableCell className="flex flex-row items-center gap-4">
                                                    <Skeleton className="h-24 w-24 " />
                                                </TableCell>

                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium"> {amenity.amenityName} </div>
                                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                                            {amenity.amenityType == "Facility" ? amenity.amenityAddress : amenity.amenityQuantity + " remaining"}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell">
                                                    {amenity.amenityType}
                                                </TableCell>

                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge className="text-xs" variant="secondary">
                                                        {amenity.stat}
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
                                                                    (amenity.stat == "Unarchived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                {
                                                                    (amenity.stat == "Archived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                <DropdownMenuItem onClick={() => {setShowDeleteDialog(true); setAm(amenity)}} className="text-destructive"> Delete </DropdownMenuItem>


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

                                                // <TableRow onClick={() => { amenityDetailsRoute(amenity); console.log(amenity); }}>
                                                <TableRow>

                                                    <TableCell className="flex flex-row items-center gap-4">
                                                        <Skeleton className="h-24 w-24 " />
                                                    </TableCell>

                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium"> {amenity.amenityName} </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {amenity.amenityAddress}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell">
                                                        {amenity.amenityType}
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            {amenity.stat}
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
                                                                    (amenity.stat == "Unarchived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                {
                                                                    (amenity.stat == "Archived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                <DropdownMenuItem onClick={() => {setShowDeleteDialog(true); setAm(amenity)}} className="text-destructive"> Delete </DropdownMenuItem>


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

                                                // <TableRow onClick={() => { amenityDetailsRoute(amenity); console.log(amenity); }}>
                                                <TableRow>

                                                    <TableCell className="flex flex-row items-center gap-4">
                                                        <Skeleton className="h-24 w-24 " />
                                                    </TableCell>

                                                    <TableCell>
                                                        <div>
                                                            <div className="font-medium"> {amenity.amenityName} </div>
                                                            <div className="hidden text-sm text-muted-foreground md:inline">
                                                                {amenity.amenityQuantity + " remaining"}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell">
                                                        {amenity.amenityType}
                                                    </TableCell>

                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            {amenity.stat}
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
                                                                    (amenity.stat == "Unarchived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setArchive(amenity) }}> Archive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                {
                                                                    (amenity.stat == "Archived") &&
                                                                    (
                                                                        <DropdownMenuItem onClick={() => { setUnarchive(amenity) }}> Unarchive </DropdownMenuItem>
                                                                    )
                                                                }

                                                                <DropdownMenuItem onClick={() => {setShowDeleteDialog(true); setAm(amenity)}} className="text-destructive"> Delete </DropdownMenuItem>


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

        </>



    )

};



export default ArchivedAmenities;