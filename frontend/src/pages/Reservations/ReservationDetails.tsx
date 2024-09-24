


// Imports

// Lucide React Icons Import
import {
    ChevronLeft,
    MoreVertical,
} from "lucide-react"



// shadcn Components Import
// shadcn Alert Dialog
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

// shadcn Badge Import
import { Badge } from "@/components/ui/badge"

// shadcn Button Import 
import { Button } from "@/components/ui/button"

// shadcn Card Import
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// shadcn Dropdown Import
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

// shadcn Form Import
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

// shadcn Input Import
import { Input } from "@/components/ui/input"

// shadcn Separator Import
import { Separator } from "@/components/ui/separator"

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea"

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"



// Custom Component Imports



// Utility Imports
// Date format Import
import { format, formatDistanceToNow } from "date-fns"

// Link Import
import { Link, useNavigate } from "react-router-dom"

// React Import Everything
import * as React from 'react';

// zod Import
import * as zod from "zod";

// React useForm Import
import { useForm } from "react-hook-form";

// zodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Hook Imports
// User Hook
import { useAuthContext } from "@/hooks/useAuthContext"

// Reservation Hook
import { useReservationsContext } from "@/hooks/useReservationsContext"
import { Skeleton } from "@/components/ui/skeleton"





//
const formSchema = zod
    .object({
        reservationComment: zod.string().optional(),
        reservationCommentSubject: zod.string().optional(),
    })





export const ReservationDetails = ({ reservations, users, amenityList }) => {



    // Contexts
    // Reservations Context Provider
    const { dispatch } = useReservationsContext()

    // User Context Provider
    const { user } = useAuthContext()

    // Toast
    const { toast } = useToast()

    // Use Date Today
    const date = new Date()



    // States
    // Delete Dialog
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)



    // New form validated by Zod
    const form = useForm<zod.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            reservationComment: reservations.reservationComment,
            reservationCommentSubject: reservations.reservationCommentSubject,
        }

    })



    // Functions
    // Archive Function
    const setArchive = async () => {

        let reservation = reservations;

        reservation.stat = "Archived"

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation archived",
                description: reservations.amenityName + " by " + reservations.blkLt + " is unarchived",

            })
        }

    }

    // Unarchive Function
    const setUnarchive = async () => {

        let reservation = reservations;

        reservation.stat = "Unarchived"

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation unarchived",
                description: reservations.amenityName + " by " + reservations.blkLt + " is archived",

            })

        }

    }

    // Approved Function
    const setApprove = async (amenityName) => {

        const approve = async () => {

            let reservation = reservations;

            reservation.reservationStatus = "Approved"
            reservation.interactedBy = user.blkLt
            reservation.interactionDate = date

            const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)
            })

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: "UPDATE_RESERVATION", payload: json })

                toast({

                    title: "Reservation approved",
                    description: reservations.amenityName + " by " + reservations.blkLt + " is approved",

                })
            }

        }

        approve()


        const reduceAmenity = async () => {

            // Reduce Amenity
    
            let reservation = reservations;
    
            let amenity = amenityList.filter(function (ame) {
                return ame.amenityName === amenityName;
            })
    
            console.log(amenity)


            const amenityUpdatedQuant = amenity[0].amenityQuantity - reservation.reservationQuantity;

            amenity[0].amenityQuantity = amenityUpdatedQuant;

            console.log(amenity[0].amentyQuantity);
    
            const updated = amenity[0];

            console.log(updated);
    
    
            if (reservation.amenityType === "Equipment") {
                const res = await fetch('http://localhost:4000/api/amenities/' + amenityName, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updated)
                })

                if (res.ok) {
                    console.log("Amenity quantity reduced")
                }

                if (!res.ok) {
                    console.log("Amenity quantity not reduced")
                }


            }
    
    
        };

        reduceAmenity();


    }

    

    // Rejected Function
    const setReject = async () => {

        let reservation = reservations;

        reservation.reservationStatus = "Rejected"
        reservation.interactedBy = user.blkLt
        reservation.interactionDate = date

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation rejected",
                description: reservations.amenityName + " by " + reservations.blkLt + " is rejected",

            })
        }

    }



    // setReopen Function
    const setReopen = async (amenityName) => {

        let reservation = reservations;

        reservation.reservationStatus = "Pending"
        reservation.interactedBy = ""
        reservation.interactionDate = undefined
        reservation.reservationComment = ""
        reservation.reservationCommentSubject = ""

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation reopened",
                description: reservations.amenityName + " by " + reservations.blkLt + " is pending",

            })
        }



        const addAmenity = async () => {

            // Reduce Amenity
    
            let reservation = reservations;
    
            let amenity = amenityList.filter(function (ame) {
                return ame.amenityName === amenityName;
            })
    
            console.log(amenity)


            const amenityUpdatedQuant = amenity[0].amenityQuantity + reservation.reservationQuantity;

            amenity[0].amenityQuantity = amenityUpdatedQuant;

            console.log(amenity[0].amentyQuantity);
    
            const updated = amenity[0];

            console.log(updated);
    
    
            if (reservation.amenityType === "Equipment") {
                const res = await fetch('http://localhost:4000/api/amenities/' + amenityName, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updated)
                })

                if (res.ok) {
                    console.log("Amenity quantity reduced")
                }

                if (!res.ok) {
                    console.log("Amenity quantity not reduced")
                }


            }
    
    
        };

        addAmenity();

    }

    const navigate = useNavigate();

    const routeChange = () => {

        const path = '/admin/reservations/details/edit/' + reservations._id
        navigate(path)

    }

    const deleteReservation = async () => {

        let reservation = reservations;

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        console.log(json)

        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: json })
            window.location.assign("/admin/reservations")
        }

    }

    // 
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        let reservation = reservations;

        reservation.reservationComment = values.reservationComment
        reservation.reservationCommentSubject = values.reservationCommentSubject

        const response = await fetch('http://localhost:4000/api/reservations/' + reservations._id, {
            method: 'PATCH',
            body: JSON.stringify(reservation),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        // Conditional statement if announcement creation is successful
        if (response.ok) {

            dispatch({ type: 'UPDATE_RESERVATION', payload: json })

        }

        if (!response.ok) {

            console.log('New reservation created:', json);
        }

    }

    //
    const boom = () => {

        const path = "/reservations";
        navigate(path)
        window.location.reload()


    }

    //
    let badgeColor;
    let badgeMessage;
    let filteredUser

    //
    filteredUser = users.filter((user) => {

        if (user.blkLt === reservations.blkLt) {
            console.log(user.blkLt);
        }

        return user.blkLt === reservations.blkLt;
    })

    //
    if (filteredUser[0].memberStatus === "Outstanding") {

        badgeColor = "default" as any;
        badgeMessage = "Outstanding";
    }

    //
    if (filteredUser[0].memberStatus === "Delinquent") {
        badgeColor = "warning" as any;
        badgeMessage = "Delinquent";
    }

    //
    if (filteredUser[0].stat === "Archived") {
        badgeColor = "outline" as any;
        badgeMessage = "Archived";
    }





    return (

        <>
            {/* Toaster for reservation confirmation */}
            <Toaster />

            {/* Delete dialog for deleting the reservation */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        {/* Deletion message */}
                        <AlertDialogTitle> Are you sure you want to delete this reservation? </AlertDialogTitle>

                        <AlertDialogDescription>
                            This action cannot be undone. This reservation will permanently deleted and be no longer be accessible by anyone.
                        </AlertDialogDescription>

                    </AlertDialogHeader>



                    <AlertDialogFooter>

                        {/* Delete dialog cancel button */}
                        <AlertDialogCancel> Cancel </AlertDialogCancel>

                        {/* Delete dialog delete button */}
                        <Button
                            variant={"destructive"}
                            onClick={deleteReservation}
                        >
                            Delete
                        </Button>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>


            {/* Container of the entire reservation detail page */}
            <div className="flex items-center gap-4">


                {/* Return button */}
                <Button onClick={boom} variant="outline" size="icon" className="h-7 w-7">

                    <span> <ChevronLeft className="h-4 w-4" /> </span>
                    <span className="sr-only"> Back </span>

                </Button>

                {/* Reservation title/Amenity name */}
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {reservations.amenityName}
                </h1>

                {/* Reservation status if pending */}
                {
                    (reservations.reservationStatus == "Pending") &&
                    (
                        <Badge variant="warning" className="ml-auto sm:ml-0">
                            Pending
                        </Badge>
                    )
                }

                {/* Reservation status if approved */}
                {
                    (reservations.reservationStatus == "Approved") &&
                    (
                        <Badge variant="default" className="ml-auto sm:ml-0">
                            Approved
                        </Badge>
                    )
                }

                {/* Reservation status if rejected */}
                {
                    (reservations.reservationStatus == "Rejected") &&
                    (
                        <Badge variant="destructive" className="ml-auto sm:ml-0">
                            Rejected
                        </Badge>
                    )
                }

                {/* Reservation status if expired */}
                {
                    (reservations.reservationStatus == "Expired") &&
                    (
                        <Badge variant="outline" className="ml-auto sm:ml-0">
                            Expired
                        </Badge>
                    )
                }



                <div className="hidden items-center gap-2 md:ml-auto md:flex">

                    {/* Dropdown button for archiving and deleting */}
                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>

                            {
                                user.position === "Admin" && (
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                )
                            }

                        </DropdownMenuTrigger>


                        {/* Dropdown menu for archiving/unarchiving */}
                        <DropdownMenuContent align="end">

                            {/* Archive button when unarchived */}
                            {
                                (reservations.stat == "Unarchived" && user.position === "Admin") &&
                                (
                                    <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                                )
                            }

                            {/* Unarchive button when archived */}
                            {
                                (reservations.stat == "Archived" && user.position === "Admin") &&
                                (
                                    <DropdownMenuItem onClick={setUnarchive}> Unarchive </DropdownMenuItem>
                                )
                            }

                            {/* Delete button */}
                            <DropdownMenuSeparator />

                            {
                                user.position === "Admin" &&
                                (
                                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive"> Delete </DropdownMenuItem>
                                )
                            }

                        </DropdownMenuContent>

                    </DropdownMenu>

                    {/* Approve and reject button when reservation is pending */}
                    {
                        (reservations.reservationStatus != "Approved" && reservations.reservationStatus != "Rejected" && reservations.reservationStatus != "Expired" && user.position === "Admin") &&
                        (
                            <>
                                <Button type="submit" form="reservationForm" onClick={setReject} variant="outline" size="sm">
                                    Reject
                                </Button>
                                <Button type="submit" form="reservationForm" onClick={ () => { setApprove( reservations.amenityName )}} size="sm"> Approve Reservation </Button>
                            </>
                        )
                    }

                    {/* Reopen button when reservation is approved or rejected */}
                    {
                        (reservations.reservationStatus == "Approved" || reservations.reservationStatus == "Rejected" && reservations.reservationStatus != "Expired" && user.position === "Admin") &&
                        (
                            <>
                                <Button onClick={ () => {setReopen(reservations.amenityName)}} variant="outline" size="sm"> Reopen </Button>
                            </>
                        )
                    }

                    {/* Reopen button when reservation is approved or rejected */}
                    {
                        (reservations.reservationStatus == "Expired" && user.position === "Admin") &&
                        (
                            <>
                                <Button disabled onClick={setReopen} variant="outline" size="sm"> Expired </Button>
                            </>
                        )
                    }

                </div>

            </div>





            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">



                    <Card className="overflow">



                        <CardHeader className="flex flex-row items-start bg-muted/50">

                            <div className="grid gap-0.5">



                                <CardTitle className="group flex items-center gap-2 text-lg">

                                    {reservations.blkLt}

                                    {/* <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only"> Copy Order ID </span>
                                    </Button> */}

                                    <Badge className="w-fit" variant={badgeColor}> {badgeMessage} </Badge>

                                </CardTitle>



                                <CardDescription> {formatDistanceToNow(new Date(reservations.createdAt), { addSuffix: true })} </CardDescription>

                            </div>





                            <div className="ml-auto flex items-center gap-1">

                                <Skeleton className="w-[16rem] h-48 mb-2" />


                            </div>

                        </CardHeader>



                        <CardContent className="p-6 text-sm">



                            <div className="grid gap-3">

                                <div className="font-semibold"> Amenity Details </div>



                                <ul className="grid gap-3">

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Amenity Type:
                                        </span>

                                        <span className="text-end"> {reservations.amenityType} </span>

                                    </li>

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Amenity Name:
                                        </span>

                                        <span className="text-end"> {reservations.amenityName} </span>

                                    </li>

                                    {reservations.amenityType == "Facility" &&
                                        (
                                            <li className="flex items-center justify-between">

                                                <span className="text-muted-foreground">
                                                    Amenity Address:
                                                </span>

                                                <span className="text-end"> {reservations.amenityAddress} </span>

                                            </li>
                                        )
                                    }

                                    {reservations.amenityType == "Equipment" &&
                                        (
                                            <li className="flex items-center justify-between">

                                                <span className="text-muted-foreground">
                                                    Amenity Quantity:
                                                </span>

                                                <span className="text-end"> {reservations.reservationQuantity} </span>

                                            </li>
                                        )
                                    }



                                </ul>

                            </div>



                            <Separator className="my-4" />



                            <div className="grid gap-3">

                                <div className="font-semibold"> Reservation Details </div>



                                <ul className="grid gap-3">

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Reservation Date:
                                        </span>

                                        <span className="text-end"> {format(reservations.reservationDate, "PPP")} </span>

                                    </li>

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Reservation Time:
                                        </span>

                                        <span className="text-end"> 24 hours </span>

                                    </li>

                                    <li className="flex space-between gap-24">


                                        <div className="w-[100%]">
                                            <span className="text-muted-foreground">
                                                Reservation Reason:
                                            </span>
                                        </div>

                                        <span className="text-end"> {reservations.reservationReason} </span>

                                    </li>

                                </ul>

                            </div>






                            <div className="grid gap-3">

                                {
                                    (
                                        (reservations.reservationStatus == "Approved" || reservations.reservationStatus == "Rejected") && user.position === "Admin") &&
                                    (
                                        <>

                                            <Separator className="mt-4 mb-2" />

                                            <div className="font-semibold"> {reservations.reservationStatus} Details </div>

                                            <ul className="grid gap-3">

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        {reservations.reservationStatus} by:
                                                    </span>

                                                    <span> {reservations.interactedBy} </span>

                                                </li>

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        {reservations.reservationStatus} on:
                                                    </span>

                                                    <span> {formatDistanceToNow(new Date(reservations.interactionDate), { addSuffix: true })}  </span>

                                                </li>

                                                <li className="flex space-between gap-24">


                                                    <div className="w-[100%]">
                                                        <span className="text-muted-foreground">
                                                            {reservations.reservationCommentSubject}
                                                        </span>
                                                    </div>

                                                    <span className="text-end"> {reservations.reservationComment} </span>

                                                </li>

                                            </ul>

                                        </>
                                    )
                                }





                            </div>


                        </CardContent>



                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">

                            <div className="text-xs text-muted-foreground">
                                Interacting as: {user.blkLt}
                            </div>

                        </CardFooter>

                    </Card>


                </div>



                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">



                    {
                        user.position === "Admin" &&
                        (
                            <Form {...form}>

                                <form id="reservationForm" onSubmit={form.handleSubmit(handleSubmit)}>



                                    <Card x-chunk="dashboard-07-chunk-0">

                                        <CardHeader>
                                            <CardTitle> Reservation Comment </CardTitle>
                                            <CardDescription>
                                                Type anything from reason of rejection, reminders, basically anything you want to say.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>

                                            <div className="grid gap-6">



                                                <FormField
                                                    control={form.control}
                                                    name="reservationCommentSubject"
                                                    render={({ field }) => (


                                                        <FormItem>

                                                            <div className="grid gap-3">
                                                                <FormLabel> Subject </FormLabel>

                                                                <FormControl>

                                                                    <Input
                                                                        id="reservationCommentSubject"
                                                                        type="text"
                                                                        className="w-full"
                                                                        placeholder="Enter comment subject here"
                                                                        {...field}
                                                                    />

                                                                </FormControl>

                                                            </div>

                                                        </FormItem>



                                                    )}

                                                />



                                                <FormField
                                                    control={form.control}
                                                    name="reservationComment"
                                                    render={({ field }) => (


                                                        <FormItem>

                                                            <div className="grid gap-3">
                                                                <FormLabel> Message </FormLabel>

                                                                <FormControl>

                                                                    <Textarea
                                                                        id="reservationComment"
                                                                        placeholder="Enter comment message here"
                                                                        className="min-h-32"
                                                                        {...field}
                                                                    />

                                                                </FormControl>

                                                            </div>

                                                        </FormItem>



                                                    )}

                                                />



                                            </div>
                                        </CardContent>

                                    </Card>



                                </form>

                            </Form>
                        )
                    }





                </div>

            </div>



            <div className="flex items-center justify-center gap-2 md:hidden">

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        {
                            user.position === "Admin" && (
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                            )
                        }

                    </DropdownMenuTrigger>



                    <DropdownMenuContent align="end">

                        {
                            (reservations.stat == "Unarchived" && user.position === "Admin") &&
                            (
                                <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                            )
                        }

                        {
                            (reservations.stat == "Archived" && user.position === "Admin") &&
                            (
                                <DropdownMenuItem onClick={setUnarchive}> Unarchive </DropdownMenuItem>
                            )
                        }

                        <DropdownMenuSeparator />

                        {
                            user.position === "Admin" &&
                            (
                                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive"> Delete </DropdownMenuItem>
                            )
                        }

                    </DropdownMenuContent>

                </DropdownMenu>

                {
                    (reservations.reservationStatus != "Approved" && reservations.reservationStatus != "Rejected" && user.position === "Admin") &&
                    (
                        <>
                            <Button type="submit" form="reservationForm" onClick={setReject} variant="outline" size="sm">
                                Reject
                            </Button>
                            <Button type="submit" form="reservationForm" onClick={setApprove} size="sm"> Approve Reservation </Button>
                        </>
                    )
                }

                {
                    (reservations.reservationStatus == "Approved" || reservations.reservationStatus == "Rejected" && user.position === "Admin") &&
                    (
                        <>
                            <Button onClick={setReopen} variant="outline" size="sm"> Reopen </Button>
                        </>
                    )
                }

            </div>






        </>



    )

}





export default ReservationDetails