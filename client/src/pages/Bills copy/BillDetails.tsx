


// Lucide React Icons Import
import {
    ChevronLeft,
    Copy,
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
import { useBillsContext } from "@/hooks/useBillsContext"





const formSchema = zod
    .object({
        reservationComment: zod.string().optional(),
        reservationCommentSubject: zod.string().optional(),
    })





export const BillDetails = ({ bills }) => {



    // Contexts
    // Reservations Context Provider
    const { dispatch } = useBillsContext()

    // User Context Provider
    const { user } = useAuthContext()

    // Toast
    const { toast } = useToast()

    // Use Date Today
    const date = new Date()



    // States
    // Delete Dialog
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)







    // Functions
    // Archive Function
    const setArchive = async () => {

        let bill = bills;

        bill.stat = "Archived"

        const response = await fetch('http://localhost:4000/api/bills/' + bills._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_BILL", payload: json })

            toast({

                title: "Bill archived",
                description: bills.amenityName + " by " + bills.blkLt + " is unarchived",

            })
        }

    }

    // Unarchive Function
    const setUnarchive = async () => {

        let bill = bills;

        bill.stat = "Unarchived"

        const response = await fetch('http://localhost:4000/api/bills/' + bills._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bill)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_BILLS", payload: json })

            toast({

                title: "Reservation unarchived",
                description: bills.amenityName + " by " + bills.blkLt + " is archived",

            })

        }

    }



    const navigate = useNavigate();



    const deleteReservation = async () => {

        let bill = bills;

        const response = await fetch('http://localhost:4000/api/bills/' + bills._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        console.log(json)

        if (response.ok) {
            dispatch({ type: 'DELETE_BILL', payload: json })
            window.location.assign("/bills")
        }

    }




    const boom = () => {

        const path = "/bills";
        navigate(path)
        window.location.reload()


    }


    let word;

    const payAction = async () => {

        const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        billing: { email: 'kyanacademics@gmail.com' },
                        send_email_receipt: true,
                        show_description: true,
                        show_line_items: true,
                        cancel_url: 'http://localhost:5173/bills/cancelled',
                        success_url: 'http://localhost:5173/bills/success',
                        line_items: [
                            {
                                currency: 'PHP',
                                amount: bills.billAmount * 100,
                                description: bills.billDesciption,
                                name: bills.billName,
                                quantity: 1
                            }
                        ],
                        payment_method_types: [
                            'billease',
                            'card',
                            'dob',
                            'dob_ubp',
                            'brankas_bdo',
                            'brankas_landbank',
                            'brankas_metrobank',
                            'gcash',
                            'grab_pay',
                            'paymaya'
                        ],
                        description: bills.billDescription,
                    }
                }
            })
        })

        const json = await response.json();

        if (response.ok) {

            console.log("Payment successful.");
            console.log(json.data.id)

            window.location.replace(json.data.attributes.checkout_url);

            let bill = bills;
            bill.billReceivers[0].billStatus = "Paid";

            const response = await fetch('http://localhost:4000/api/bills/' + bills._id, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bill)
            })



        }




    }



    

    return (

        <div>



            <Toaster />

            {/* Delete Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle> Are you sure you want to delete this reservation? </AlertDialogTitle>

                        <AlertDialogDescription>
                            This action cannot be undone. This reservation will no longer be accessible by anyone.
                        </AlertDialogDescription>

                    </AlertDialogHeader>



                    <AlertDialogFooter>


                        <AlertDialogCancel> Cancel </AlertDialogCancel>
                        <Button
                            variant={"destructive"}
                            onClick={deleteReservation}
                        >
                            Delete
                        </Button>

                    </AlertDialogFooter>

                </AlertDialogContent>

            </AlertDialog>



            <div className="flex items-center mb-4 gap-4">



                <Button onClick={boom} variant="outline" size="icon" className="h-7 w-7">

                    <span> <ChevronLeft className="h-4 w-4" /> </span>
                    <span className="sr-only"> Back </span>

                </Button>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {bills.billName}
                </h1>

                {(user.userPosition === "Unit Owner" && bills.billReceivers[0].billStatus !== "Paid"
                ) && (
                        <div className="flex justify-end w-full">
                            <Button onClick={payAction}> Pay Bill </Button>

                        </div>

                    )}

                {(user.userPosition === "Unit Owner" && bills.billReceivers[0].billStatus === "Paid"
                ) && (
                        <div className="flex justify-end w-full">
                            <Button disabled onClick={payAction}> Already Paid </Button>

                        </div>

                    )}



                <div className="hidden items-center gap-2 md:ml-auto md:flex">


                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>

                            {
                                user.userPosition === "Admin" && (
                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>
                                )
                            }

                        </DropdownMenuTrigger>



                        <DropdownMenuContent align="end">

                            {
                                (bills.stat == "Unarchived" && user.userPosition === "Admin") &&
                                (
                                    <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                                )
                            }

                            {
                                (bills.stat == "Archived" && user.userPosition === "Admin") &&
                                (
                                    <DropdownMenuItem onClick={setUnarchive}> Unarchive </DropdownMenuItem>
                                )
                            }

                            <DropdownMenuSeparator />

                            {
                                user.userPosition === "Admin" &&
                                (
                                    <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive"> Delete </DropdownMenuItem>
                                )
                            }

                        </DropdownMenuContent>

                    </DropdownMenu>



                </div>

            </div>





            <div className="grid min-w-[500px] gap-4 mt-2">

                <div className="grid w-full auto-rows-max items-start gap-4 w-full">


                    {user.userPosition === "Admin" && (
                        <Card className="overflow w-full">



                            <CardHeader className="flex flex-row items-start bg-muted/50">

                                <div className="grid gap-0.5">

                                    <CardTitle className="group flex items-center gap-2 text-lg">

                                        {bills.billName}

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only"> Copy Bill ID </span>
                                        </Button>

                                    </CardTitle>

                                    <CardDescription> {formatDistanceToNow(new Date(bills.createdAt), { addSuffix: true })} </CardDescription>

                                </div>



                                <div className="ml-auto flex items-center gap-1">



                                </div>

                            </CardHeader>



                            <CardContent className="p-6 text-sm">



                                <div className="grid gap-3">

                                    <div className="font-semibold"> Bill Details </div>



                                    <ul className="grid gap-3">

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Amount:
                                            </span>

                                            <span className="text-end"> ₱{bills.billAmount}.00 </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Description:
                                            </span>

                                            <span className="text-end ml-4 break-all"> {bills.billDescription} </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Due:
                                            </span>

                                            <span className="text-end"> {format(bills.billReceivers[0].billDue, "yyyy/MM/dd")} </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Made By:
                                            </span>

                                            <span className="text-end ml-4 break-all"> {bills.billMadeby} </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Made Date:
                                            </span>

                                            <span className="text-end ml-4 break-all"> {format(bills.billMadeDate, "yyyy/MM/dd")} </span>

                                        </li>

                                    </ul>

                                </div>



                                <Separator className="my-4" />






                                <div className="grid gap-3">

                                    <div className="flex justify-between border-b pb-4">

                                        <div className="font-semibold"> Payor Details </div>
                                        <div className="font-semibold"> Bill Status </div>

                                    </div>



                                    <ul className="grid gap-3">

                                        {
                                            bills.billReceivers.map((payor) => {

                                                return (

                                                    <li className="flex border-b pt-1 pb-4 items-center justify-between">

                                                        <span className="">
                                                            {payor.receiverBlkLt}
                                                        </span>

                                                        <span className="text-end"> {payor.billStatus} </span>

                                                    </li>

                                                )



                                            })
                                        }



                                    </ul>

                                </div>












                            </CardContent>



                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">

                                <div className="text-xs text-muted-foreground">
                                    Interacting as: {user.userBlkLt}
                                </div>

                            </CardFooter>

                        </Card>
                    )}










                    {user.userPosition == "Unit Owner" && (
                        <Card className="overflow w-full">



                            <CardHeader className="flex flex-row items-start bg-muted/50">

                                <div className="grid gap-0.5">

                                    <CardTitle className="group flex items-center gap-2 text-lg">

                                        {bills.billName}

                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <Copy className="h-3 w-3" />
                                            <span className="sr-only"> Copy Bill ID </span>
                                        </Button>

                                    </CardTitle>

                                    <CardDescription> {formatDistanceToNow(new Date(bills.createdAt), { addSuffix: true })} </CardDescription>

                                </div>



                                <div className="ml-auto flex items-center gap-1">



                                </div>

                            </CardHeader>



                            <CardContent className="p-6 text-sm">



                                <div className="grid gap-3">

                                    <div className="font-semibold"> Bill Details </div>



                                    <ul className="grid gap-3">

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Amount:
                                            </span>

                                            <span className="text-end"> ₱{bills.billAmount}.00 </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Description:
                                            </span>

                                            <span className="text-end ml-4 break-all"> {bills.billDescription} </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Due:
                                            </span>

                                            <span className="text-end"> {format(bills.billReceivers[0].billDue, "yyyy/MM/dd")} </span>

                                        </li>

                                        <li className="flex items-center justify-between">

                                            <span className="text-muted-foreground">
                                                Bill Status:
                                            </span>

                                            <span className="text-end ml-4 break-all"> {bills.billReceivers[0].billStatus} </span>

                                        </li>

                                    </ul>

                                </div>











                            </CardContent>



                            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">

                                <div className="text-xs text-muted-foreground">
                                    Interacting as: {user.userBlkLt}
                                </div>

                            </CardFooter>

                        </Card>
                    )}


                </div>



                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">









                </div>

            </div>



            <div className="flex items-center justify-center gap-2 md:hidden">

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        {
                            user.userPosition === "Admin" && (
                                <Button size="icon" variant="outline" className="h-8 w-8">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                    <span className="sr-only">More</span>
                                </Button>
                            )
                        }

                    </DropdownMenuTrigger>



                    <DropdownMenuContent align="end">

                        {
                            (bills.stat == "Unarchived" && user.userPosition === "Admin") &&
                            (
                                <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                            )
                        }

                        {
                            (bills.stat == "Archived" && user.userPosition === "Admin") &&
                            (
                                <DropdownMenuItem onClick={setUnarchive}> Unarchive </DropdownMenuItem>
                            )
                        }

                        <DropdownMenuSeparator />

                        {
                            user.userPosition === "Admin" &&
                            (
                                <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive"> Delete </DropdownMenuItem>
                            )
                        }

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>






        </div>



    )

}





export default BillDetails