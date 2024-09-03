


// Lucide React Icons Import
import {
    CalendarIcon,
    ChevronLeft,
    Copy,
} from "lucide-react"



// shadcn Components Import

// shadcn Badge Import
import { Badge } from "@/components/ui/badge"

// shadcn Button Import 
import { Button } from "@/components/ui/button"

// shadcn Calendar Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Card Import
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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

// shadcn Label Import
import { Label } from "@/components/ui/label"

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



// Custom Component Imports

// Sidebar Import
import Sidebar from "@/components/layout/Sidebar"

// Navbar import
import Navbar from "@/components/layout/Navbar"



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



// Hooks

// AuthContext Hooks for Users
import { useAuthContext } from "@/hooks/useAuthContext"

// Reservation Hook for Reservatinos
import { useReservationsContext } from "@/hooks/useReservationsContext"








const formSchema = zod
    .object({

        amenityAddress: zod.string().optional(),
        amenityName: zod.string().optional(),
        amenityType: zod.string().optional(),
        reservationDate: zod.date().optional(),
        reservationStatus: zod.string().optional(),
        reservationReason: zod.string().optional(),
        stat: zod.string().optional()
    })







export function AdminReservationForm() {



    // Use AuthContext to get user data
    const { user } = useAuthContext();



    // Get current date and add 7 days
    let date = new Date();
    date.setDate(date.getDate() + 7);



    // Dispatch for updating reservations
    const { dispatch } = useReservationsContext()





    const form = useForm<zod.infer<typeof formSchema>>({

        
        resolver: zodResolver(formSchema),
        defaultValues: {
            amenityAddress: "",
            amenityName: "",
            amenityType: "",
            reservationStatus: "Pending",
            reservationReason: "",
            stat: "Unarchived"
        }

    })



    const amenityType = form.watch("amenityType");
    const amenityName = form.watch("amenityName");
    const reservationDate = form.watch("reservationDate");





    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        console.log("This is sad")

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

            console.log('New reservation created:', json);
            dispatch({ type: 'CREATE_RESERVATION', payload: json })
        }

    }

    // try {

    //     const res = formSchema.parse(formSchema)
    //     console.log(formSchema)

    // } catch (err) {
    //     if (err instanceof zod.ZodError) {
    //       console.log(err.issues);
    //     }
    //   } 



    return (



        <>



            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />

                    <main className="flex flex-1 flex-col gap-4 bg-light-bg  lg:gap-4">

                        <div className="flex min-h-screen w-full flex-col">

                            <main className="flex flex-1 flex-col bg-light-bg  gap-4 p-4 md:gap-5 md:p-8">

                                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">





                                    <Form {...form}>

                                        <form id="reservationForm" onSubmit={form.handleSubmit(handleSubmit)}>

                                            <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4">





                                                <div className="flex items-center gap-4">


                                                    <Button variant="outline" size="icon" className="h-7 w-7">

                                                        <Link to="/admin/reservations"> <ChevronLeft className="h-4 w-4" /> </Link>
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
                                                                    {/* <FormField
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
                                                                    /> */}





                                                                    {/* Second FormField */}
                                                                    {amenityType === "Facility" && (
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
                                                                    {/* {amenityType === "Equipment" && (
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
                                                                    )} */}





                                                                    {/* Fourth FormField */}
                                                                    {/* {amenityType === "Facility" && amenityName === "Basketball Court Main Road" && (
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
                                                                    )} */}




                                                                    {/* Fifth FormField */}
                                                                    {/* {amenityType === "Facility" && amenityName === "Basketball Court Side" && (
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
                                                                    )} */}





                                                                    {/* Sixth FormField */}
                                                                    {/* {amenityType === "Facility" && amenityName === "Grand Cedar Pavillion" && (
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
                                                                    )} */}





                                                                    {/* Seventh FormField */}
                                                                    {/* {amenityType === "Equipment" && (
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
                                                                                            required
                                                                                            {...field}
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
                                                                    )} */}



                                                                    <Separator className="my-4" />





                                                                    {/* Eighth FormField */}
                                                                    {/* <FormField
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

                                                                                            <Calendar
                                                                                                mode="single"
                                                                                                selected={field.value}
                                                                                                onSelect={field.onChange}
                                                                                                disabled={
                                                                                                    { before: date }
                                                                                                }
                                                                                                initialFocus
                                                                                            />

                                                                                        </PopoverContent>

                                                                                    </Popover>



                                                                                </div>

                                                                                <FormDescription className="text-xs">
                                                                                    Reservations should not be within the next 7 days or less.
                                                                                </FormDescription>

                                                                                <FormMessage />

                                                                            </FormItem>
                                                                        )}
                                                                    /> */}





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



                                                    <div className="grid auto-rows-max items-start gap-2">

                                                        <Card className="overflow">



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
                                                                                        {/* {reservationQuantity} */}
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

                                                                                    // <span> {format(form.getValues("reservationDate").toString(), "PPP")} </span>

                                                                                )
                                                                            }

                                                                        </li>

                                                                        <li className="flex items-center justify-between">

                                                                            <span className="text-muted-foreground">
                                                                                Reservation Time:
                                                                            </span>

                                                                            <span> 24 hours </span>

                                                                        </li>

                                                                        <span className="text-muted-foreground text-xs"> All reservations are limited to 24 hours. </span>


                                                                    </ul>

                                                                </div>



                                                            </CardContent>



                                                            {
                                                                /*
                                                                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
     
                                                                    <div className="text-xs text-muted-foreground">
                                                                        Interacting as: {user.blkLt}
                                                                    </div>
     
                                                                </CardFooter> 
                                                                */
                                                            }

                                                        </Card>

                                                        <span className="px-2 text-muted-foreground text-xs"> This is how your reservation would look like to the admins. </span>





                                                    </div>



                                                </div>



                                                <div className="flex items-center justify-center gap-2 mt-2 md:hidden">
                                                    <Button type="submit" form="reservationForm" size="sm"> Place Reservation </Button>
                                                </div>





                                            </div>


                                        </form>

                                    </Form>





                                </main>

                            </main>

                        </div>

                    </main>

                </div >

            </div >





        </>



    )

}
