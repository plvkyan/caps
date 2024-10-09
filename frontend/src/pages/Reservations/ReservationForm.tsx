


// Imports
// Lucide React Icons Import
import {
    CalendarIcon,
    ChevronLeft,
} from "lucide-react"



// shadcn Components Import
// shadcn Button Import 
import { Button } from "@/components/ui/button"

// shadcn Calendar Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Card Import
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// shadcn Form Import
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

// shadcn Input Import
import { Input } from "@/components/ui/input"

// shadcn Popover Import
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// shadcn RadioGroup Import
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"

// shadcn Select Import
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

// shadcn Separator Import
import { Separator } from "@/components/ui/separator"

// shadcn Skeleton Import
import { Skeleton } from "@/components/ui/skeleton"

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea"

// shadcn Toast Import
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"



// Utility Imports
// cn Import
import { cn } from "@/lib/utils"

// date-fns Date Format Import
import { format } from "date-fns"

// React Import
import * as React from 'react';

// React Day Picker Matcher Import
import { Matcher } from "react-day-picker"

// React Hook Form useForm Import
import { useForm } from "react-hook-form";

// React Router Dom useNavigate Import
import { useNavigate } from "react-router-dom"

// React useEffect and useState Import
import {
    useEffect,
    useState
} from "react"

// zod Import
import * as zod from "zod";

// zodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"

// Reservation Hook for Reservatinos
import { useReservationsContext } from "@/hooks/useReservationsContext"





// The data types of the form field requirements
const formSchema = zod
    .object(
        {
            blkLt: zod.string().optional(),
            blkLtPosition: zod.string().optional(),
            amenityAddress: zod.string().optional(),
            amenityName: zod.string().optional(),
            amenityType: zod.enum(["Facility", "Equipment"]),
            reservationDate: zod.date(),
            reserveeEmail: zod.string().email().optional(),
            reservationQuantity: zod.coerce.number().min(1, {
                message: "You can't reserve less than 1 amenity."
            }),
            reservationReason: zod.string().optional(),
            reservationStatus: zod.string().optional(),
            stat: zod.string().optional()
        }
    );





export const ReservationForm = ({ amenityList }) => {





    // Use AuthContext to get user data
    const { user } = useAuthContext();

    // Dispatch for updating reservations
    const { dispatch } = useReservationsContext()

    // React Router Dom Navigate
    const navigate = useNavigate();

    // For toast confirmation
    const { toast } = useToast()

    // Get current date and add 7 days
    let date = new Date();
    date.setDate(date.getDate() + 7);

    // Using Forms
    const form = useForm<zod.infer<typeof formSchema>>({

        // Initializing form default values
        resolver: zodResolver(formSchema),
        defaultValues: {
            blkLt: user.blkLt,
            blkLtPosition: user.position,
            amenityAddress: "",
            amenityName: "",
            amenityType: undefined,
            reservationQuantity: 1,
            reservationStatus: "Pending",
            reservationReason: "",
            stat: "Unarchived"
        }

    })

    // For reseting the form
    const { reset } = form;

    // Checking if the form is successfully submitted
    const { isSubmitSuccessful } = form.formState;



    // States
    // State to check for existing reservation dates
    const [existingReservations, setExistingReservations] = useState<Date[]>([]);



    // Use Effects
    // GETTING new reservation confirmation and unrejected reservations for calendar 
    useEffect(() => {

        // Checking if there's a new reservation stored locally
        if (localStorage.getItem("newReservation")) {

            // Get the details for the new reservation
            const newReservation = JSON.parse(localStorage.getItem("newReservation") as any)

            // Output the details into a toast
            toast({

                // Toast title
                title: "Reservation placed",
                // Toast description
                description: newReservation.amenityName + " reserved at: " + format(newReservation.reservationDate, "PPP") + ". Please wait for approval.",

            })

            // After showing the toast, remove the new reservation details from the local storage
            localStorage.removeItem("newReservation")

        }

    }, [])



    // Watch for any updates for these fields
    const amenityName = form.watch("amenityName");
    const amenityType = form.watch("amenityType");
    const reservationReason = form.watch("reservationReason");

    // Check if the form is successfully submitted, then reset its contents
    React.useEffect(() => {

        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])

    useEffect(() => {

        form.setValue("amenityName", "");

    }, [amenityType])


    useEffect(() => {

        const fetchAmenityReservations = async () => {

            if (amenityType !== undefined && amenityName !== "") {

                const response = await fetch('http://localhost:4000/api/reservations/approved/' + amenityName)

                const json = await response.json()

                if (response.ok) {

                    console.log(json)

                    const reservationzxc = json.map(item => item.reservationDate);
                    reservationzxc.sort((a, b) => (new Date(a) as any) - (new Date(b) as any))

                    const reservations = reservationzxc.filter(function (reservation) {
                        console.log(reservation)
                        return format(reservation, "yyyy/MM/dd") > format(new Date(), "yyyy/MM/dd");
                    })

                    setExistingReservations(json.map(item => item.reservationDate))

                    const getEarliestDate = () => {

                        if (reservations[0] === null || reservations[0] === undefined) {
                            form.setValue("reservationDate", date);
                            console.log("There are no existing reservations for this amenity!");
                            console.log(reservations)
                        } else {

                            let earliestDate = date;

                            for (let i = 0; i <= reservations.length; i++) {

                                const datern = new Date(reservations[i]);
                                console.log(earliestDate.getDate())
                                console.log(datern.getDate())



                                if ((earliestDate.getDate() === datern.getDate()) || (earliestDate.getDate() > datern.getDate())) {
                                    earliestDate.setDate(earliestDate.getDate() + 1);
                                    console.log("Day Added.")
                                } else {
                                    form.setValue("reservationDate", earliestDate);
                                    console.log("Date set.")
                                    break;
                                }

                            }

                        }

                    }

                    getEarliestDate();

                }

            }

        }

        fetchAmenityReservations()

    }, [amenityName])



    // Matcher for disabling pending and reserved dates
    let arrayMatcher: Matcher = existingReservations.map(item => new Date(item));
    arrayMatcher.push({ before: date });


    
    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        const response = await fetch('http://localhost:4000/api/reservations', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        // Conditional statement if reservation creation is successful
        if (response.ok) {

            console.log('New reservation placed:', json);
            dispatch({ type: 'CREATE_RESERVATION', payload: json })

            localStorage.setItem("newReservation", JSON.stringify(json))
            window.location.reload()

        }

        if (!response.ok) {

            console.log('New reservation created:', json);
        }

    }

    // Function to navigate back to the reservations list page
    const returnRoute = () => {

        const path = '/reservations';
        navigate(path);

    }




    return (



        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">



            <Form {...form}>

                <form id="reservationForm" onSubmit={form.handleSubmit(handleSubmit)}>

                    <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4">





                        <div className="flex items-center gap-4">


                            <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={returnRoute}
                            >

                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only"> Back </span>

                            </Button>

                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Place a new reservation
                            </h1>

                            <div className="hidden items-center gap-2 md:ml-auto md:flex">

                                <Button size="sm" type="submit" id="reservationForm"> Place Reservation </Button>

                            </div>

                        </div>





                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">



                                <Card x-chunk="dashboard-07-chunk-0">

                                    <CardHeader>

                                        <CardTitle> Amenity Details </CardTitle>
                                        <CardDescription>

                                            Pick the appropriate amenity you want to reserve.

                                        </CardDescription>

                                    </CardHeader>



                                    <CardContent>


                                        <div className="grid">

                                            <div className="flex gap-2 items-center justify-between py-3">


                                            </div>


                                            {/* First FormField */}
                                            <FormField
                                                control={form.control}
                                                name="amenityType"
                                                render={({ field }) => {
                                                    return (



                                                        <FormItem>

                                                            <div className="flex gap-2 items-center justify-between py-3">



                                                                <FormLabel className="w-[30%]"> Amenity Type </FormLabel>



                                                                <FormControl>

                                                                    <RadioGroup
                                                                        onValueChange={field.onChange}
                                                                        defaultValue={field.value}
                                                                        className="flex w-[58%]"
                                                                    >

                                                                        <FormItem className="flex items-center space-x-3 space-y-0">

                                                                            <FormControl>

                                                                                <RadioGroupItem value="Facility" />

                                                                            </FormControl>

                                                                            <FormLabel className="font-normal">
                                                                                Facility
                                                                            </FormLabel>

                                                                        </FormItem>

                                                                        <FormItem className="flex items-center space-x-3 space-y-0 pl-3 !m-0">

                                                                            <FormControl>
                                                                                <RadioGroupItem value="Equipment" />
                                                                            </FormControl>

                                                                            <FormLabel className="font-normal">
                                                                                Equipment
                                                                            </FormLabel>

                                                                            <FormMessage />

                                                                        </FormItem>

                                                                    </RadioGroup>

                                                                </FormControl>

                                                            </div>

                                                        </FormItem>



                                                    )
                                                }
                                                }
                                            />





                                            {/* Facility FormField */}
                                            {amenityType === "Facility" && (

                                                <>

                                                    <FormField
                                                        control={form.control}
                                                        name="amenityName"
                                                        render={({ field }) => (

                                                            <FormItem>

                                                                <div className="flex gap-6 items-center justify-between py-3">

                                                                    <FormLabel className="w-[23%]"> Amenity Name </FormLabel>

                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                                                                        <FormControl className="">
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select the facility." />
                                                                            </SelectTrigger>
                                                                        </FormControl>

                                                                        <SelectContent>

                                                                            {amenityList && amenityList.map((amenity) => {

                                                                                if (amenity.amenityType === "Facility") {
                                                                                    return (
                                                                                        <SelectItem key={amenity._id} value={amenity.amenityName}> {amenity.amenityName} </SelectItem>
                                                                                    )
                                                                                }

                                                                            })}

                                                                        </SelectContent>

                                                                    </Select>

                                                                </div>

                                                                <div className="grid grid-cols-4 items-center gap-4">

                                                                    <div className=""> </div>

                                                                    <div className="col-span-3">

                                                                        <FormMessage />

                                                                    </div>

                                                                </div>


                                                            </FormItem>

                                                        )}
                                                    />

                                                    {form.getValues("amenityName") != "" && (

                                                        <FormField
                                                            control={form.control}
                                                            name="amenityAddress"
                                                            render={() => (

                                                                <FormItem>

                                                                    <div className="flex gap-6 items-center justify-between">



                                                                        <FormLabel className="w-[23%]"> Amenity Address </FormLabel>

                                                                        {amenityList && amenityList.map((amenity) => {

                                                                            if (amenity.amenityName === form.getValues("amenityName")) {

                                                                                return (
                                                                                    <Input
                                                                                        id="amenityAddress"
                                                                                        placeholder=""
                                                                                        type="text"
                                                                                        value={amenity.amenityAddress}
                                                                                        required
                                                                                        disabled
                                                                                    />
                                                                                )

                                                                            }
                                                                        })}

                                                                    </div>

                                                                    <div className="grid grid-cols-4 items-center gap-4">

                                                                        <div className=""> </div>

                                                                        <div className="col-span-3">

                                                                            <FormMessage />

                                                                        </div>

                                                                    </div>


                                                                </FormItem>

                                                            )}
                                                        />
                                                    )
                                                    }


                                                </>


                                            )}





                                            {/* Equipment FormField */}
                                            {amenityType === "Equipment" && (

                                                <>

                                                    <FormField
                                                        control={form.control}
                                                        name="amenityName"
                                                        render={({ field }) => (

                                                            <FormItem>

                                                                <div className="flex gap-6 items-center justify-between py-3">



                                                                    <FormLabel className="w-[23%]"> Amenity Name </FormLabel>

                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>

                                                                        <FormControl className="">
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select the equipment." />
                                                                            </SelectTrigger>
                                                                        </FormControl>

                                                                        <SelectContent>

                                                                            {amenityList && amenityList.map((amenity) => {

                                                                                if (amenity.amenityType === "Equipment") {
                                                                                    return (
                                                                                        <SelectItem key={amenity._id} value={amenity.amenityName}> {amenity.amenityName} </SelectItem>
                                                                                    )
                                                                                }

                                                                            })}

                                                                        </SelectContent>

                                                                    </Select>


                                                                </div>

                                                                <div className="grid grid-cols-4 items-center gap-4">

                                                                    <div className=""></div>

                                                                    <div className="col-span-3">

                                                                        <FormMessage />

                                                                    </div>

                                                                </div>


                                                            </FormItem>

                                                        )}
                                                    />

                                                    {form.getValues("amenityName") != "" && (

                                                        <FormField
                                                            control={form.control}
                                                            name="reservationQuantity"
                                                            render={({ field }) => (

                                                                <FormItem>

                                                                    <div className="flex gap-6 items-center justify-between">



                                                                        <FormLabel className="w-[23%]"> Amenity Quantity </FormLabel>

                                                                        {amenityList && amenityList.map((amenity) => {

                                                                            if (amenity.amenityName === form.getValues("amenityName")) {

                                                                                return (
                                                                                    <Input
                                                                                        id="reservationQuantity"
                                                                                        placeholder=""
                                                                                        type="number"
                                                                                        min={amenity.amenityQuantityMin}
                                                                                        max={amenity.amenityQuantityMax}
                                                                                        required
                                                                                        {...field}
                                                                                        disabled={amenity.amenityQuantity <= 0 ? true : false}
                                                                                    />
                                                                                )

                                                                            }
                                                                        }
                                                                        )
                                                                        }

                                                                    </div>

                                                                    <div className="grid grid-cols-4 items-center gap-4">

                                                                        <div className=""> </div>

                                                                        <div className="col-span-3 text-right mb-2">

                                                                            <FormMessage />

                                                                        </div>

                                                                    </div>


                                                                </FormItem>
                                                            )}
                                                        />

                                                    )}



                                                    {amenityList && amenityList.map((amenity) => {

                                                        if (amenity.amenityName === form.getValues("amenityName")) {

                                                            return (
                                                                <FormDescription className="text-sm text-end">
                                                                    {amenity.amenityQuantity} {amenity.amenityName.toLowerCase()}{amenity.amenityQuantity <= 1 ? "" : "s"} available for reservation.
                                                                    You can only reserve {amenity.amenityQuantityMax} {amenity.amenityName.toLowerCase()}{amenity.amenityQuantityMax <= 1 ? "" : "s"} at a time.
                                                                </FormDescription>
                                                            )

                                                        }
                                                    }
                                                    )
                                                    }

                                                </>

                                            )
                                            }



                                            <Separator className="my-4" />





                                            {/* Eighth FormField */}
                                            <FormField
                                                control={form.control}
                                                name="reservationDate"
                                                render={({ field }) => (

                                                    <FormItem className="flex flex-col">

                                                        <div className="flex gap-6 items-center justify-between pt-3">


                                                            <FormLabel> Reservation Date </FormLabel>

                                                            <Popover>

                                                                <PopoverTrigger asChild>

                                                                    <FormControl>

                                                                        <Button
                                                                            variant={"outline"}
                                                                            className={cn(
                                                                                "w-[240px] pl-3 text-left font-normal",
                                                                                !field.value && "text-muted-foreground"
                                                                            )}
                                                                            disabled={amenityName === "" ? true : false}
                                                                        >

                                                                            {field.value ? (
                                                                                format(field.value, "yyyy/MM/dd")
                                                                            ) : (
                                                                                <span> Pick a date </span>
                                                                            )}

                                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />

                                                                        </Button>

                                                                    </FormControl>

                                                                </PopoverTrigger>

                                                                <PopoverContent className="w-auto p-0" align="start">

                                                                    {existingReservations &&
                                                                        (
                                                                            <Calendar
                                                                                mode="single"
                                                                                selected={amenityName === "" ? undefined : field.value}
                                                                                onSelect={field.onChange}
                                                                                disabled={
                                                                                    arrayMatcher
                                                                                }
                                                                                initialFocus
                                                                            />
                                                                        )
                                                                    }



                                                                </PopoverContent>

                                                            </Popover>



                                                        </div>

                                                        <FormDescription className="text-sm text-end pb-2">
                                                            Reservations should not be within the next 7 days or less.
                                                        </FormDescription>

                                                    </FormItem>
                                                )}
                                            />




                                            <FormField
                                                control={form.control}
                                                name="reserveeEmail"
                                                render={({ field }) => (

                                                    <FormItem>

                                                        <div className="flex gap-6 items-center justify-between pt-3">

                                                            <FormLabel className=""> Reservee Email (Optional) </FormLabel>

                                                            <Input
                                                                // className="focus-visible:ring-transparent focus-visible:ring-offset-0"
                                                                id="reserveeEmail"
                                                                placeholder="Type your email"
                                                                type="email"
                                                                {...field}
                                                            />

                                                        </div>

                                                        <FormDescription className="text-sm text-end pb-2">
                                                            You are notified of reservation confirmation through emails.
                                                        </FormDescription>

                                                    </FormItem>

                                                )}
                                            />




                                            {/* Ninth FormField */}
                                            <FormField
                                                control={form.control}
                                                name="reservationReason"
                                                render={({ field }) => (

                                                    <FormItem className="flex flex-col">

                                                        <div className="flex gap-6 items-center justify-between py-3 mt-2">


                                                            <FormLabel className="mr-6"> Reservation Reason </FormLabel>

                                                            <Textarea
                                                                // className="focus-visible:ring-transparent focus-visible:ring-offset-0"
                                                                placeholder="Type your reason here ..."
                                                                {...field} />

                                                        </div>

                                                        <FormMessage />

                                                    </FormItem>
                                                )}
                                            />

















                                        </div>

                                    </CardContent>



                                </Card>



                            </div>



                            <div className="grid items-start gap-2">

                                <Card className="">



                                    <CardHeader className="flex flex-col items-start bg-muted/50">

                                        <Skeleton className="w-[20rem] h-48 mb-2" />

                                        <div className="grid gap-0.5">

                                            <CardTitle className="group flex items-center gap-2 text-lg">

                                                {user.blkLt}

                                            </CardTitle>

                                            <CardDescription> Placed just now </CardDescription>

                                        </div>



                                        <div className="ml-auto flex items-center gap-1">



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

                                                    <span> {form.getValues("amenityType")} </span>

                                                </li>

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        Amenity Name:
                                                    </span>

                                                    <span> {form.getValues("amenityName")} </span>

                                                </li>

                                                {amenityType == "Facility" &&
                                                    (
                                                        <li className="flex items-center justify-between">

                                                            <span className="text-muted-foreground">
                                                                Amenity Address:
                                                            </span>

                                                            <span>
                                                                {amenityName == "Basketball Court Main Road" ? "Blk 24 Lt 1 Cedar Drive" : undefined}
                                                                {amenityName == "Basketball Court Side" ? "Blk 14 Lt 12 Greyoak" : undefined}
                                                                {amenityName == "Grand Cedar Pavillion" ? "Blk 25 Lt 1 Cedar Drive" : undefined}
                                                            </span>

                                                        </li>
                                                    )
                                                }

                                                {amenityType == "Equipment" &&
                                                    (
                                                        <li className="flex items-center justify-between">

                                                            <span className="text-muted-foreground">
                                                                Amenity Quantity:
                                                            </span>

                                                            <span>
                                                                {form.getValues("reservationQuantity")}
                                                            </span>

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

                                                    {form.getValues("reservationDate") != null &&
                                                        (

                                                            <span> {format(form.getValues("reservationDate").toString(), "PPP")} </span>

                                                        )
                                                    }

                                                </li>

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        Reservation Time:
                                                    </span>

                                                    <span> 24 hours </span>

                                                </li>

                                                <span className="text-muted-foreground text-sm text-end"> All reservations are set to 24 hours. </span>


                                                <li className="flex flex-col items-start gap-2 justify-between break-all">

                                                    <span className="text-muted-foreground width-96">
                                                        Reservation Reason:
                                                    </span>

                                                    <span> {reservationReason} </span>

                                                </li>


                                            </ul>

                                        </div>



                                    </CardContent>



                                    {
                                        /*
                                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                
                                            <div className="text-sm text-muted-foreground">
                                                Interacting as: {user.blkLt}
                                            </div>
                
                                        </CardFooter> 
                                        */
                                    }

                                </Card>

                                <span className="px-2 text-muted-foreground text-sm text-end"> This is how your reservation would look like to the admins. </span>





                            </div>



                        </div>



                        <div className="flex items-center justify-center gap-2 mt-2 md:hidden">
                            <Button type="submit" form="reservationForm" size="sm"> Place Reservation </Button>
                        </div>



                        <Toaster />

                    </div>


                </form>

            </Form>





        </main>




    )

}
