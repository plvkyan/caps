


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

// shadcn Skeleton Import
import { Skeleton } from "@/components/ui/skeleton"

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea"

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"



// Utility Imports
// date-fns format date Import
import { format, formatDistanceToNow } from "date-fns"

// React Router Dom useNavigate Import
import { useNavigate } from "react-router-dom"

// React Import Everything
import * as React from 'react';

// React useForm Import
import { useForm } from "react-hook-form";

// React useEffect, useState Import
import {
    useEffect,
    useState
} from "react"

// zod Import
import * as zod from "zod";

// zodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Hook Imports
// User Hook
import { useAuthContext } from "@/hooks/useAuthContext"

// Reservation Hook
import { useReservationsContext } from "@/hooks/useReservationsContext"





//
const formSchema = zod
    .object(
        {
            reservationComment: zod.string().optional(),
            reservationCommentSubject: zod.string().optional(),
        }
    );





export const ReservationDetails = ({ reservation, users, amenityList }) => {



    // Contexts
    // Reservations Context Provider
    const { dispatch } = useReservationsContext()

    // User Context Provider
    const { user } = useAuthContext()

    // Toast
    const { toast } = useToast()

    // For page navigation
    const navigate = useNavigate();

    // Use Date Today
    const date = new Date()



    // States
    // Delete Dialog
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

    // Email state
    const [censoredEmail, setCensoredEmail] = useState(reservation.reserveeEmail ? reservation.reserveeEmail.substring(0, reservation.reserveeEmail.indexOf("@")) : undefined);




    // useEffects
    // useEffect for censoring email
    useEffect(() => {

        // Censor Email Function
        const censorEmail = () => {

            // Checks if email exists
            if (censoredEmail != undefined) {

                // Create email variable to store censored email
                let email = "";

                // Iterate over the email and replace them with '*' unless it's the first or last letter
                for (let i = 0; i < censoredEmail.length; i++) {

                    // If it's the first letter, keep it
                    if (i === 0) {
                        email += censoredEmail[i];
                        // If it's not the first letter and is before the '@' symbol, censor it
                    } else if (i < (censoredEmail.length - 1)) {
                        email += "*";
                        // Any letter beyond the '@' symbol, keep it
                    } else {
                        email += censoredEmail[i] + reservation.reserveeEmail.substring(reservation.reserveeEmail.indexOf("@"));
                    }

                }

                // Change the state to the censored email
                setCensoredEmail(email);

            }

        }

        // Call Censor Email Function
        censorEmail();

    }, []);



    // New form validated by Zod
    const form = useForm<zod.infer<typeof formSchema>>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            reservationComment: reservation.reservationComment,
            reservationCommentSubject: reservation.reservationCommentSubject,
        }

    })



    // Functions
    // Archive Function
    const setArchive = async () => {

        reservation.stat = "Archived";

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation archived",
                description: "Reservation for " + reservation.amenityName + " by " + reservation.blkLt + " on " + format(reservation.reservationDate, "yyyy/MM/dd") + " has been archived.",

            })
        }

    }

    // Unarchive Function
    const setUnarchive = async () => {

        reservation.stat = "Unarchived"

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation unarchived",
                description: "Reservation for " + reservation.amenityName + " by " + reservation.blkLt + " on " + format(reservation.reservationDate, "yyyy/MM/dd") + " has been archived.",

            })

        }

    }

    // Approved Function
    const setApprove = async (amenityName) => {

        const approveReservation = async () => {

            reservation.reservationStatus = "Approved";
            reservation.interactedBy = user.blkLt;
            reservation.interactionDate = date;

            const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservation)
            })

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: "UPDATE_RESERVATION", payload: json })

                toast({

                    title: "Reservation approved",
                    description: "Reservation for " + reservation.amenityName + " by " + reservation.blkLt + " on " + format(reservation.reservationDate, "yyyy/MM/dd") + " has been approved.",

                })
            }

        }

        approveReservation();

        const reduceAmenityQuant = async () => {

            // Get the current state of amenity
            let amenity = amenityList.filter(function (ame) {
                return ame.amenityName === amenityName;
            })

            // Take the currrent amenity quantity and reduce the desired reservation quantity
            amenity[0].amenityQuantity = amenity[0].amenityQuantity - reservation.reservationQuantity;

            if (reservation.amenityType === "Equipment") {
                const res = await fetch('http://localhost:4000/api/amenities/' + amenityName, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(amenity[0]),
                });

                if (res.ok) {
                    console.log("Amenity quantity reduced.");
                }

                if (!res.ok) {
                    console.log("Amenity quantity not reduced.");
                }


            }


        };

        reduceAmenityQuant();

        const sendConfirmationEmail = async () => {

            if (reservation.reserveeEmail != undefined) {

                const res = await fetch('http://localhost:4000/api/emails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(reservation),
                });

                if (res.ok) {
                    console.log("Confirmation email sent.");
                }

                if (!res.ok) {
                    console.log("Email not sent.");
                }

            } else {
                console.log("No emails provided.");
            }
        }

        sendConfirmationEmail();

    }



    // Rejected Function
    const setReject = async () => {

        reservation.reservationStatus = "Rejected";
        reservation.interactedBy = user.blkLt;
        reservation.interactionDate = date;

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation rejected",
                description: "Reservation for " + reservation.amenityName + " by " + reservation.blkLt + " on " + format(reservation.reservationDate, "yyyy/MM/dd") + " has been rejected.",

            })
        }

    }



    // setReopen Function
    const setReopen = async (amenityName) => {

        reservation.reservationStatus = "Pending";
        reservation.interactedBy = "";
        reservation.interactionDate = undefined;
        reservation.reservationComment = "";
        reservation.reservationCommentSubject = "";

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservation)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_RESERVATION", payload: json })

            toast({

                title: "Reservation reopened",
                description: "Reservation for " + reservation.amenityName + " by " + reservation.blkLt + " on " + format(reservation.reservationDate, "yyyy/MM/dd") + " is now pending.",

            })
        }



        const addAmenity = async () => {

            // Get the current state of amenity
            let amenity = amenityList.filter(function (ame) {
                return ame.amenityName === amenityName;
            })

            // Take the currrent amenity quantity and add back the reservation quantity
            amenity[0].amenityQuantity = amenity[0].amenityQuantity + reservation.reservationQuantity;

            if (reservation.amenityType === "Equipment") {
                const res = await fetch('http://localhost:4000/api/amenities/' + amenityName, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(amenity[0])
                })

                if (res.ok) {
                    console.log("Amenity quantity added back.")
                }

                if (!res.ok) {
                    console.log("Amenity quantity not added back.")
                }


            }


        };

        addAmenity();

    }




    const deleteReservation = async () => {

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        console.log(json)

        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: json })
            window.location.assign("/reservations")
        }

    }

    // 
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        reservation.reservationComment = values.reservationComment;
        reservation.reservationCommentSubject = values.reservationCommentSubject;

        const response = await fetch('http://localhost:4000/api/reservations/' + reservation._id, {
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

    // Navigation Function
    // Navigate back to the reservation list
    const navToList = () => {
        const listPath = "/reservations";
        navigate(listPath)
        window.location.reload()
    }

    //
    let badgeColor;
    let badgeMessage;
    let filteredUser

    //
    filteredUser = users.filter((user) => {
        return user.blkLt === reservation.blkLt;
    })

    //
    if (filteredUser[0].memberStatus === "Outstanding") {
        badgeColor = "default" as any;
        badgeMessage = "Outstanding";
    } else if (filteredUser[0].memberStatus === "Delinquent") {
        badgeColor = "warning" as any;
        badgeMessage = "Delinquent";
    } else if (filteredUser[0].stat === "Archived") {
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
                        <Button variant={"destructive"} onClick={deleteReservation}>
                            Delete
                        </Button>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>


            {/* Container of the entire reservation detail page */}
            <div className="flex items-center gap-4">


                {/* Return button */}
                <Button onClick={navToList} variant="outline" size="icon" className="h-7 w-7">

                    <span> <ChevronLeft className="h-4 w-4" /> </span>
                    <span className="sr-only"> Back </span>

                </Button>

                {/* Reservation title/Amenity name */}
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {reservation.amenityName}
                </h1>

                {/* Reservation status if pending */}
                {
                    (reservation.reservationStatus == "Pending") &&
                    (
                        <Badge variant="warning" className="ml-auto sm:ml-0">
                            Pending
                        </Badge>
                    )
                }

                {/* Reservation status if approved */}
                {
                    (reservation.reservationStatus == "Approved") &&
                    (
                        <Badge variant="default" className="ml-auto sm:ml-0">
                            Approved
                        </Badge>
                    )
                }

                {/* Reservation status if rejected */}
                {
                    (reservation.reservationStatus == "Rejected") &&
                    (
                        <Badge variant="destructive" className="ml-auto sm:ml-0">
                            Rejected
                        </Badge>
                    )
                }

                {/* Reservation status if expired */}
                {
                    (reservation.reservationStatus == "Expired") &&
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
                                        <span className="sr-only"> Mor </span>
                                    </Button>
                                )
                            }

                        </DropdownMenuTrigger>

                        {/* Dropdown menu for archiving/unarchiving */}
                        <DropdownMenuContent align="end">

                            {/* Archive button when unarchived */}
                            {
                                (reservation.stat == "Unarchived" && user.position === "Admin") &&
                                (
                                    <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                                )
                            }

                            {/* Unarchive button when archived */}
                            {
                                (reservation.stat == "Archived" && user.position === "Admin") &&
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
                        (reservation.reservationStatus != "Approved" && reservation.reservationStatus != "Rejected" && reservation.reservationStatus != "Expired" && user.position === "Admin") &&
                        (
                            <>
                                <Button type="submit" form="reservationForm" onClick={setReject} variant="outline" size="sm">
                                    Reject
                                </Button>
                                <Button type="submit" form="reservationForm" onClick={() => { setApprove(reservation.amenityName) }} size="sm"> Approve Reservation </Button>
                            </>
                        )
                    }

                    {/* Reopen button when reservation is approved or rejected */}
                    {
                        (reservation.reservationStatus == "Approved" || reservation.reservationStatus == "Rejected" && reservation.reservationStatus != "Expired" && user.position === "Admin") &&
                        (
                            <>
                                <Button onClick={() => { setReopen(reservation.amenityName) }} variant="outline" size="sm"> Reopen </Button>
                            </>
                        )
                    }

                    {/* Reopen button when reservation is approved or rejected */}
                    {
                        (reservation.reservationStatus == "Expired" && user.position === "Admin") &&
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

                                    {reservation.blkLt}

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



                                <CardDescription> {formatDistanceToNow(new Date(reservation.createdAt), { addSuffix: true })} ({format(reservation.createdAt, "yyyy/MM/dd")}) </CardDescription>

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

                                        <span className="text-end"> {reservation.amenityType} </span>

                                    </li>

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Amenity Name:
                                        </span>

                                        <span className="text-end"> {reservation.amenityName} </span>

                                    </li>

                                    {reservation.amenityType == "Facility" &&
                                        (
                                            <li className="flex items-center justify-between">

                                                <span className="text-muted-foreground">
                                                    Amenity Address:
                                                </span>

                                                <span className="text-end"> {reservation.amenityAddress} </span>

                                            </li>
                                        )
                                    }

                                    {reservation.amenityType == "Equipment" &&
                                        (
                                            <li className="flex items-center justify-between">

                                                <span className="text-muted-foreground">
                                                    Amenity Quantity:
                                                </span>

                                                <span className="text-end"> {reservation.reservationQuantity} </span>

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
                                            Reservee Email:
                                        </span>

                                        <span className="text-end"> {reservation.reserveeEmail ? censoredEmail : "No email provided."} </span>

                                    </li>

                                    <li className="flex items-center justify-between">

                                        <span className="text-muted-foreground">
                                            Reservation Date:
                                        </span>

                                        <span className="text-end"> {format(reservation.reservationDate, "PPP")} </span>

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

                                        <span className="text-end"> {reservation.reservationReason} </span>

                                    </li>

                                </ul>

                            </div>






                            <div className="grid gap-3">

                                {
                                    (
                                        (reservation.reservationStatus == "Approved" || reservation.reservationStatus == "Rejected") && user.position === "Admin") &&
                                    (
                                        <>

                                            <Separator className="mt-4 mb-2" />

                                            {reservation.reservationStatus == "Approved" && (
                                                <div className="font-semibold"> Approval Details </div>
                                            )
                                            }

                                            {reservation.reservationStatus == "Rejected" && (
                                                <div className="font-semibold"> Rejection Details </div>
                                            )
                                            }

                                            <ul className="grid gap-3">

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        {reservation.reservationStatus} by:
                                                    </span>

                                                    <span> {reservation.interactedBy} </span>

                                                </li>

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        {reservation.reservationStatus} on:
                                                    </span>

                                                    <span>
                                                        {formatDistanceToNow(new Date(reservation.interactionDate), { addSuffix: true })} ({format(reservation.interactionDate, "yyyy/MM/dd")})
                                                    </span>



                                                </li>

                                                <li className="flex space-between gap-24">


                                                    <div className="w-[100%]">
                                                        <span className="text-muted-foreground">
                                                            {reservation.reservationCommentSubject}
                                                        </span>
                                                    </div>

                                                    <span className="text-end"> {reservation.reservationComment} </span>

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
                                                                        { ...field }
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
                                                                        { ...field }
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
                                    <span className="sr-only"> More </span>
                                </Button>
                            )
                        }

                    </DropdownMenuTrigger>



                    <DropdownMenuContent align="end">

                        {
                            (reservation.stat == "Unarchived" && user.position === "Admin") &&
                            (
                                <DropdownMenuItem onClick={ setArchive }> Archive </DropdownMenuItem>
                            )
                        }

                        {
                            (reservation.stat == "Archived" && user.position === "Admin") &&
                            (
                                <DropdownMenuItem onClick={ setUnarchive }> Unarchive </DropdownMenuItem>
                            )
                        }

                        <DropdownMenuSeparator />

                        {
                            user.position === "Admin" &&
                            (
                                <DropdownMenuItem onClick={ () => setShowDeleteDialog(true) } className="text-destructive"> Delete </DropdownMenuItem>
                            )
                        }

                    </DropdownMenuContent>

                </DropdownMenu>

                {
                    (reservation.reservationStatus != "Approved" && reservation.reservationStatus != "Rejected" && user.position === "Admin") &&
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
                    (reservation.reservationStatus == "Approved" || reservation.reservationStatus == "Rejected" && user.position === "Admin") &&
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