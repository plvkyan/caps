





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

// shadcn Checkbox Import
import { Checkbox } from "@/components/ui/checkbox";

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

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea"

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"



// Custom Component Imports
// LayoutWrapper Component Import



// Utility Imports
// cn Import
import { cn } from "@/lib/utils"

// Date format Import
import { format } from "date-fns"

// Link Import
import { Link } from "react-router-dom"

// React Import Everything
import * as React from 'react';

// zod Import
import * as zod from "zod";

// React useForm Import
import { useForm } from "react-hook-form";

// zodResolver Import
import { zodResolver } from "@hookform/resolvers/zod";

// useEffect and useState Import for React
import {
    useEffect,
    useState
} from "react"

// Matcher for React Day Picker
import { Matcher } from "react-day-picker"



// Hooks
// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"

// Reservation Hook for Reservatinos
import { useReservationsContext } from "@/hooks/useReservationsContext"

// Amenity Hook for Amenities
import { useAmenitiesContext } from "@/hooks/useAmenitiesContext"



const items = [
    {
        id: "facility",
        label: "Facility",
    },
    {
        id: "equipment",
        label: "Equipment",
    },
] as const



// The data types of the form field requirements
const formSchema = zod
    .object({
        blkLt: zod.string({
            invalid_type_error: "Sa blkLtmali is required"
        }).optional(),
        blkLtPosition: zod.string().optional(),
        amenityAddress: zod.string().optional(),
        equipmentName: zod.string().optional(),
        facilityName: zod.string().optional(),
        amenityType: zod.array(zod.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
        }),
        reservationDate: zod.date(),
        reservationQuantity: zod.coerce.number().min(1).max(20).optional(),
        reservationStatus: zod.string().optional(),
        reservationReason: zod.string().optional(),
        stat: zod.string().optional()
    })










export const ReservationForm = ({ amenityList }) => {



    // Use AuthContext to get user data
    const { user } = useAuthContext();

    // Get current date and add 7 days
    let date = new Date();
    date.setDate(date.getDate() + 7);

    // Dispatch for updating reservations
    const { dispatch } = useReservationsContext()

    // Dispatch for updating amenity quantity
    const [reservationCount, setReservationCount] = useState()

    // For toast confirmation
    const { toast } = useToast()

    // State to check for existing reservation dates
    const [existingReservations, setExistingReservations] = useState<Date[]>([]);

    // State for amenity count 
    const [amenityCount, setAmenityCount] = useState<[]>([]);





    // Use Effects
    // GETTING new reservation confirmation and unrejected reservations for calendar 
    useEffect(() => {

        if (localStorage.getItem("newReservation")) {

            const newReservation = JSON.parse(localStorage.getItem("newReservation") as any)

            toast({

                title: "Reservation placed",
                description: newReservation.amenityName + " reserved at: " + format(newReservation.reservationDate, "PPP"),

            })

            localStorage.removeItem("newReservation")

        }

    }, [])



    // Using Forms
    const form = useForm<zod.infer<typeof formSchema>>({

        // Initializing default values
        resolver: zodResolver(formSchema),
        defaultValues: {
            blkLt: user.blkLt,
            blkLtPosition: user.position,
            amenityAddress: "",
            facilityName: "",
            equipmentName: "",
            amenityType: [],
            reservationQuantity: 1,
            reservationStatus: "Pending",
            reservationReason: "",
            stat: "Unarchived"
        }

    })

    // Watch for any updates for these fields
    const facilityName = form.watch("facilityName");
    const equipmentName = form.watch("equipmentName");
    const amenityType = form.watch("amenityType");
    const reservationQuantity = form.watch("reservationQuantity");
    const reservationReason = form.watch("reservationReason");



    console.log(amenityType)
    // For resting the form
    const { reset } = form;

    // Checking if the form is successfully submitted
    const { isSubmitSuccessful } = form.formState;

    // Check if the form is successfully submitted, then reset its contents
    React.useEffect(() => {

        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])



    console.log(amenityType)


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



    useEffect(() => {

        const fetchSpecificAmenity = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/' + amenityName)

            const json = await response.json()

            if (response.ok) {

                setAmenityCount(json);

            }

        }

        fetchSpecificAmenity()

    }, [form.watch("amenityName")])



    useEffect(() => {

        const reduceSpecificAmenity = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/' + form.getValues("amenityName"))

            const json = await response.json()

            if (response.ok) {

                setReservationCount(reservationQuantity as any);

                let tempMax = json[0].amenityQuantityMax;

                if (json[0].amenityQuantityMax > json[0].amenityQuantity) {
                    tempMax = json[0].amenityQuantity;
                }

                if ((reservationQuantity as any) > tempMax) {
                    form.setValue("reservationQuantity", tempMax);
                }

                if ((reservationQuantity as any) < json[0].amenityQuantityMin) {
                    form.setValue("reservationQuantity", json[0].amenityQuantityMin);
                }

                json[0].amenityQuantity = json[0].amenityQuantity - (reservationQuantity as any);

                setAmenityCount(json);

            }

        }

        reduceSpecificAmenity()

    }, [reservationQuantity as any])


    // const handleQuantityChange = (e) => {

    //     setAmenityCount(prevCount => prevCount - (reservationQuantity as any))
    //     console.log("amenityCount is updated to" + amenityCount)

    // }






    // useEffect(() => {

    //     const reduceSpecificAmenity = async () => {

    //         const response = await fetch('http://localhost:4000/api/amenities/' + form.getValues("amenityName"))

    //         const json = await response.json()

    //         if (response.ok) {

    //             setReservationCount(reservationQuantity as any);

    //             if ((reservationCount as any) > json[0].amenityQuantityMax) {
    //                 form.setValue("reservationQuantity", json[0].amenityQuantityMax);
    //             }

    //             if ((reservationCount as any) < json[0].amenityQuantityMin) {
    //                 form.setValue("reservationQuantity", json[0].amenityQuantityMin);
    //             }

    //             if (json[0].amenityQuantityMin <= 0) {

    //             }

    //             json[0].amenityQuantity = json[0].amenityQuantity - (reservationQuantity as any);

    //             setAmenityCount(json);

    //         }

    //     }

    //     reduceSpecificAmenity()

    // }, [form.getValues("reservationQuantity") as any])



    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

    

        const response = await fetch('http://localhost:4000/api/reservations', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        // Conditional statement if announcement creation is successful
        if (response.ok) {

            console.log('New reservation placed:', json);
            dispatch({ type: 'CREATE_RESERVATION', payload: json })

            localStorage.setItem("newReservation", JSON.stringify(json))
            window.location.reload()

        }

        if (!response.ok) {

            console.log('New reservation created:', json);
        }

        // arr = amenityCount.find( a => a.amenityName === values.amenityName)
        // console.log(arr)

        // const res = await fetch('https://localhost:4000/api/amenities/' + equipment, {
        //     method: 'PATCH',
        //     body: JSON.stringify(
        //         {
        //             amenityQuantity: amenityCount[0].amenityQuantity
        //         }
        //      ),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })

        // const sheesh = await response.json()

        // // Conditional statement if announcement creation is successful
        // if (res.ok) {

        //     console.log(amenityCount)

        //     console.log('New reservation placed:', sheesh);

        // }

        // if (!res.ok) {

        //     console.log(amenityCount)

        //     console.log(sheesh)
        // }

    }





    return (



        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">



            <Form {...form}>

                <form id="reservationForm" onSubmit={form.handleSubmit(handleSubmit)}>

                    <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4">





                        <div className="flex items-center gap-4">


                            <Button variant="outline" size="icon" className="h-7 w-7">

                                <Link to="/reservations"> <ChevronLeft className="h-4 w-4" /> </Link>
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



                                            {/* First FormField */}
                                            <FormField
                                                control={form.control}
                                                name="amenityType"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem>
                                                            <div className="mb-4">
                                                                <FormLabel className=""> Amenity Type </FormLabel>
                                                                <FormDescription>
                                                                    Select at least one.
                                                                </FormDescription>
                                                            </div>
                                                            {items.map((item) => (
                                                                <FormField
                                                                    key={item.id}
                                                                    control={form.control}
                                                                    name="amenityType"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem
                                                                                key={item.id}
                                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                                            >
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes(item.id)}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, item.id])
                                                                                                : field.onChange(
                                                                                                    field.value?.filter(
                                                                                                        (value) => value !== item.id
                                                                                                    )
                                                                                                )
                                                                                        }}
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-normal">
                                                                                    {item.label}
                                                                                </FormLabel>
                                                                            </FormItem>
                                                                        )
                                                                    }}
                                                                />
                                                            ))}
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }
                                                }
                                            />





                                            {/* Second FormField */}
                                            {amenityType.includes("facility") && (
                                                <FormField
                                                    control={form.control}
                                                    name="facilityName"
                                                    render={({ field }) => (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between py-3">



                                                                <FormLabel className="w-[23%]"> Facility Name </FormLabel>

                                                                <Select onValueChange={field.onChange}>

                                                                    <FormControl className="">
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select the facility." />
                                                                        </SelectTrigger>
                                                                    </FormControl>

                                                                    <SelectContent>
                                                                        <SelectItem value="Basketball Court Main Road"> Basketball Court Main Road </SelectItem>
                                                                        <SelectItem value="Basketball Court Side"> Basketball Court Side </SelectItem>
                                                                        <SelectItem value="Grand Cedar Pavillion"> Grand Cedar Pavillion </SelectItem>
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
                                            )}





                                            {/* Third FormField */}
                                            {amenityType.includes("equipment") && (
                                                <FormField
                                                    control={form.control}
                                                    name="equipmentName"
                                                    render={({ field }) => (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between py-3">



                                                                <FormLabel className="w-[23%]"> Equipment Name </FormLabel>

                                                                <Select onValueChange={field.onChange}>

                                                                    <FormControl className="">
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Select the equipment." />
                                                                        </SelectTrigger>
                                                                    </FormControl>

                                                                    <SelectContent>
                                                                        <SelectItem value="Chairs"> Chairs </SelectItem>
                                                                        <SelectItem value="Tables"> Tables </SelectItem>
                                                                        <SelectItem value="Tents"> Tents </SelectItem>
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
                                            )}





                                            {/* Fourth FormField */}
                                            {(amenityType.includes("facility") && facilityName === "Basketball Court Main Road") && (
                                                <FormField
                                                    control={form.control}
                                                    name="amenityAddress"
                                                    render={({ field }) => (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">



                                                                <FormLabel className="w-[23%]"> Facility Address </FormLabel>

                                                                <Input
                                                                    id="amenityAddress"
                                                                    placeholder=""
                                                                    type="text"
                                                                    value={"Blk 24 Lt 1 Cedar Drive"}
                                                                    required
                                                                    disabled
                                                                />

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
                                            )}




                                            {/* Fifth FormField */}
                                            {(amenityType.includes("facility") && facilityName === "Basketball Court Side") && (
                                                <FormField
                                                    control={form.control}
                                                    name="amenityAddress"
                                                    render={({ field }) => (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">



                                                                <FormLabel className="w-[23%]"> Amenity Address </FormLabel>

                                                                <Input
                                                                    id="amenityAddress"
                                                                    placeholder=""
                                                                    type="text"
                                                                    value={"Blk 14 Lt 12 Greyoak"}
                                                                    required
                                                                    disabled
                                                                />

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
                                            )}





                                            {/* Sixth FormField */}
                                            {(amenityType.includes("facility") && facilityName === "Grand Cedar Pavillion") && (
                                                <FormField
                                                    control={form.control}
                                                    name="amenityAddress"
                                                    render={({ field }) => (
                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">



                                                                <FormLabel className="w-[23%]"> Amenity Address </FormLabel>

                                                                <Input
                                                                    id="amenityAddress"
                                                                    placeholder=""
                                                                    type="text"
                                                                    value={"Blk 25 Lt 1 Cedar Drive"}
                                                                    required
                                                                    disabled
                                                                />

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
                                            )}





                                            {/* Seventh FormField */}
                                            {(amenityType.includes("equipment") && amenityName.includes("Chairs")) && (

                                                <>



                                                    <FormField
                                                        control={form.control}
                                                        name="reservationQuantity"
                                                        render={({ field }) => (

                                                            <FormItem>

                                                                <div className="flex gap-6 items-center justify-between">



                                                                    <FormLabel className="w-[23%]"> Amenity Quantity </FormLabel>

                                                                    <Input
                                                                        id="reservationQuantity"
                                                                        placeholder=""
                                                                        type="number"
                                                                        min={1}
                                                                        max={20}
                                                                        required
                                                                        {...field}
                                                                        disabled={amenityCount[0].amenityQuantity <= 0 ? true : false}
                                                                    />

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


                                                    {form.getValues("amenityName") != "" &&
                                                        (
                                                            <FormDescription className="text-sm text-end">

                                                                {amenityName} left: {amenityCount[0].amenityQuantity}

                                                            </FormDescription>
                                                        )
                                                    }

                                                </>

                                            )
                                            }



                                            {(amenityType.includes("equipment") && amenityName.includes("Tables")) && (

                                                <>



                                                    <FormField
                                                        control={form.control}
                                                        name="reservationQuantity"
                                                        render={({ field }) => (

                                                            <FormItem>

                                                                <div className="flex gap-6 items-center justify-between">



                                                                    <FormLabel className="w-[23%]"> Amenity Quantity </FormLabel>

                                                                    <Input
                                                                        id="reservationQuantity"
                                                                        placeholder=""
                                                                        type="number"
                                                                        min={1}
                                                                        max={2}
                                                                        required
                                                                        {...field}
                                                                        disabled={amenityCount[0].amenityQuantity <= 0 ? true : false}
                                                                    />

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


                                                    {form.getValues("amenityName") != "" &&
                                                        (
                                                            <FormDescription className="text-sm text-end">

                                                                {amenityName} left: {amenityCount[0].amenityQuantity}

                                                            </FormDescription>
                                                        )
                                                    }

                                                </>

                                            )
                                            }



                                            {(amenityType.includes("equipment") && amenityName.includes("Tents")) && (

                                                <>



                                                    <FormField
                                                        control={form.control}
                                                        name="reservationQuantity"
                                                        render={({ field }) => (

                                                            <FormItem>

                                                                <div className="flex gap-6 items-center justify-between">



                                                                    <FormLabel className="w-[23%]"> Amenity Quantity </FormLabel>

                                                                    <Input
                                                                        id="reservationQuantity"
                                                                        placeholder=""
                                                                        type="number"
                                                                        min={1}
                                                                        max={3}
                                                                        required
                                                                        {...field}
                                                                        disabled={amenityCount[0].amenityQuantity <= 0 ? true : false}
                                                                    />

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


                                                    {form.getValues("amenityName") != "" &&
                                                        (
                                                            <FormDescription className="text-sm text-end">

                                                                {amenityName} left: {amenityCount[0].amenityQuantity}

                                                            </FormDescription>
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

                                                        <div className="flex gap-6 items-center justify-between py-3">


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

                                                        <FormDescription className="text-sm text-end">
                                                            Reservations should not be within the next 7 days or less.
                                                        </FormDescription>

                                                        <FormMessage />

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


                                                            <FormLabel> Reservation Reason </FormLabel>

                                                            <Textarea
                                                                className="bg-card border-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
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



                                    <CardHeader className="flex flex-row items-start bg-muted/50">

                                        <div className="grid gap-0.5">

                                            <CardTitle className="group flex items-center gap-2 text-lg">

                                                {user.blkLt}

                                            </CardTitle>

                                            <CardDescription> Placed just now </CardDescription>

                                        </div>



                                        <div className="ml-auto flex items-center gap-1">

                                            {/* 

                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>

                                    <Button size="icon" variant="outline" className="h-8 w-8">
                                        <MoreVertical className="h-3.5 w-3.5" />
                                        <span className="sr-only">More</span>
                                    </Button>

                                </DropdownMenuTrigger>



                                <DropdownMenuContent align="end">

                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Trash</DropdownMenuItem>

                                </DropdownMenuContent>

                            </DropdownMenu> 

                            */}

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
