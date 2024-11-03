

//@ts-ignore
//@ts-nocheck
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
import { useBillsContext } from "@/hooks/useBillsContext"
import MultipleSelector from "@/components/custom/MultipleSelector"




const optionSchema = zod.object({
    label: zod.string(),
    value: zod.string(),
});


// The data types of the form field requirements
const formSchema = zod
    .object({
        billName: zod.string({
            invalid_type_error: "Bill Name is required."
        }),
        billDescription: zod.string(),
        billCurrency: zod.string().optional(),
        billAmount: zod.coerce.number(),
        billPayor: zod.array(optionSchema).min(1),
        billMadeby: zod.string(),
        billMadeDate: zod.date(),
        billReceivers: zod.array().optional(),
        billDue: zod.date(),
        stat: zod.string().optional(),
    })








export const BillForm = (users) => {


    // Use AuthContext to get user data
    const { user } = useAuthContext();

    // Dispatch for updating bills
    const { dispatch } = useBillsContext()

    // Dispatch for updating amenity quantity
    const [reservationCount, setReservationCount] = useState()

    // For toast confirmation
    const { toast } = useToast()

    // State to check for existing reservation dates
    const [existingReservations, setExistingReservations] = useState<Date[]>([]);

    // State for amenity count 
    const [amenityCount, setAmenityCount] = useState<[]>([]);

    // Get current date and add 7 days
    let date = new Date();
    // date.setDate(date.getDate() + 7);





    // Use Effects
    // GETTING new reservation confirmation and unrejected reservations for calendar 
    useEffect(() => {

        if (localStorage.getItem("newBill")) {

            const newBill = JSON.parse(localStorage.getItem("newBill") as any)

            toast({

                title: "New bill placed",
                description: newBill.billName + " placed costing: " + newBill.billAmount + " PHP" ,

            })

            localStorage.removeItem("newBill")

        }

    }, [])





    // Using Forms
    const form = useForm<zod.infer<typeof formSchema>>({

        // Initializing default values
        resolver: zodResolver(formSchema),
        defaultValues: {
            billName: "",
            billDescription: "",
            billCurrency: "PHP",
            billAmount: 200,
            billMadeby: user.blkLt,
            billMadeDate: new Date(),
            billDue: new Date(date.setMonth(date.getMonth() + 1)),
            stat: "Unarchived",

        }

    })



    // For resting the form
    const { reset } = form;

    // Checking if the form is successfully submitted
    const { isSubmitSuccessful } = form.formState;

    // Check if the form is successfully submitted, then reset its contents
    React.useEffect(() => {

        isSubmitSuccessful && reset()

    }, [isSubmitSuccessful, reset])



    const addUsers = (e) => {

        form.setValue("billPayor", OPTIONS)

    }

    const clearUsers = (e) => {

        form.setValue("billPayor", [])
    }



    const handleSubmit = async (values: zod.infer<typeof formSchema>) => {

        const receivers = values.billPayor.map( (payor) => ({
            receiverBlkLt: payor.value,
            billStatus: "Pending",
            billDue: values.billDue,
        }));

        values.billReceivers = receivers;

        const response = await fetch('http://localhost:4000/api/bills', {
            method: 'POST',
            body: JSON.stringify(values, null, 2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        // Conditional statement if bill creation is successful
        if (response.ok) {

            console.log('New bill created:', json);
            dispatch({ type: 'CREATE_BILL', payload: json })

            localStorage.setItem("newBill", JSON.stringify(json))
            window.location.reload();

        }

        if (!response.ok) {

            console.log('New bill NOT created:', json);
        }




    }

    const [selected, setSelected] = useState<any[]>([]);



    const OPTIONS = users.users.map((u) => ({
        label: u,
        value: u,
    }))


    console.log(OPTIONS)
    console.log(users)

    const emptyOption = [{
    }]

    return (



        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">



            <Form {...form}>

                <form id="reservationForm" onSubmit={form.handleSubmit(handleSubmit)}>

                    <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4">





                        <div className="flex items-center gap-4">


                            <Button variant="outline" size="icon" className="h-7 w-7">

                                <Link to="/bills"> <ChevronLeft className="h-4 w-4" /> </Link>
                                <span className="sr-only"> Back </span>

                            </Button>

                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Create a new bill
                            </h1>

                            <div className="hidden items-center gap-2 md:ml-auto md:flex">

                                <Button size="sm" type="submit" id="reservationForm"> Create Bill </Button>

                            </div>

                        </div>





                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">



                                <Card x-chunk="dashboard-07-chunk-0">

                                    <CardHeader>

                                        <CardTitle> Bill Details </CardTitle>
                                        <CardDescription>

                                            Pick the appropriate amenity you want to reserve.

                                        </CardDescription>

                                    </CardHeader>



                                    <CardContent>

                                        <div className="grid">





                                            {/* First FormField */}
                                            <FormField
                                                control={form.control}
                                                name="billName"
                                                render={({ field }) => {
                                                    return (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">

                                                                <FormLabel className="w-[23%]"> Bill Name </FormLabel>

                                                                <Input
                                                                    id="billName"
                                                                    placeholder="Enter bill name here"
                                                                    type="text"
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

                                                    )
                                                }
                                                }
                                            />





                                            {/* Second FormField */}
                                            <FormField
                                                control={form.control}
                                                name="billDescription"
                                                render={({ field }) => {
                                                    return (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">

                                                                <FormLabel className="w-[23%]"> Bill Description </FormLabel>

                                                                <Textarea
                                                                    id="billDescription"
                                                                    placeholder="Enter bill description here"
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

                                                    )
                                                }
                                                }
                                            />





                                            {/* Third FormField */}
                                            <FormField
                                                control={form.control}
                                                name="billAmount"
                                                render={({ field }) => {
                                                    return (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between">

                                                                <FormLabel className="w-[23%]"> Bill Amount (PHP) </FormLabel>

                                                                <Input
                                                                    id="billAmount"
                                                                    placeholder="Enter bill name here"
                                                                    type="number"
                                                                    min={20}
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

                                                    )
                                                }
                                                }
                                            />





                                            {/* Eighth FormField */}
                                            <FormField
                                                control={form.control}
                                                name="billDue"
                                                render={({ field }) => (

                                                    <FormItem className="flex flex-col">

                                                        <div className="flex gap-6 items-center justify-between pt-3">


                                                            <FormLabel> Bill Due Date </FormLabel>

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
                                                                        initialFocus
                                                                    />



                                                                </PopoverContent>

                                                            </Popover>



                                                        </div>

                                                        <FormDescription className="text-sm text-end">
                                                            The default bill due date is 1 month after the bill creation date.
                                                        </FormDescription>

                                                        <FormMessage />

                                                    </FormItem>
                                                )}
                                            />





                                            {/* Fourth FormField */}
                                            <FormField
                                                control={form.control}
                                                name="billPayor"
                                                render={({ field }) => {
                                                    return (

                                                        <FormItem>

                                                            <div className="flex gap-6 items-center justify-between pt-3" >

                                                                <FormLabel className="w-[23%]"> Bill Payor </FormLabel>

                                                                <MultipleSelector
                                                                    {...field}
                                                                    defaultOptions={OPTIONS}
                                                                    placeholder="Select the receiving users"
                                                                    emptyIndicator={
                                                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                                            no results found.
                                                                        </p>
                                                                    }
                                                                />

                                                            </div>

                                                            <div className="flex w-full gap-4 pt-2 justify-end">

                                                                <Button
                                                                    className="justify-end"
                                                                    onClick={clearUsers}
                                                                    type="button"
                                                                >
                                                                    Clear Users
                                                                </Button>

                                                                <Button
                                                                    className="justify-end"
                                                                    onClick={addUsers}
                                                                    type="button"
                                                                >
                                                                    Add All Users
                                                                </Button>
                                                            </div>

                                                            <div className="grid grid-cols-4 items-center gap-4">

                                                                <div className=""></div>

                                                                <div className="col-span-3">

                                                                    <FormMessage />

                                                                </div>

                                                            </div>

                                                        </FormItem>

                                                    )
                                                }
                                                }
                                            />





                                        </div>

                                    </CardContent>



                                </Card>



                            </div>



                            <div className="grid items-start gap-2">

                                <Card className="">



                                    <CardHeader className="flex flex-row items-start bg-muted/50">

                                        <div className="grid gap-0.5">



                                            {
                                                (
                                                    form.getValues("billName") === ""
                                                ) &&
                                                (
                                                    <CardTitle className="group flex items-center gap-2 text-lg">

                                                        Bill Name

                                                    </CardTitle>
                                                )
                                            }

                                            {
                                                (
                                                    form.watch("billName") !== ""
                                                ) &&
                                                (
                                                    <CardTitle className="group flex items-center gap-2 text-lg">

                                                        {form.watch("billName")}

                                                    </CardTitle>
                                                )
                                            }

                                            <CardDescription> July 1, 2024 </CardDescription>

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

                                            <div className="font-semibold"> Bill Details </div>



                                            <ul className="grid gap-3">

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        Bill Name:
                                                    </span>

                                                    <span> {form.watch("billName")} </span>

                                                </li>

                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        Bill Description:
                                                    </span>

                                                    <span className="text-end ml-12 break-all"> {form.watch("billDescription")} </span>

                                                </li>



                                            </ul>

                                        </div>



                                        <Separator className="my-4" />



                                        <div className="grid gap-3">




                                            <ul className="grid gap-3">



                                                <li className="flex items-center justify-between">

                                                    <span className="text-muted-foreground">
                                                        Bill Due Date:
                                                    </span>

                                                    <span>  </span>

                                                </li>

                                                <span className="text-muted-foreground text-sm text-end"> A bill will be overdue after the bill's due date.  </span>




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

                                <span className="px-2 text-muted-foreground text-sm text-end"> This is how the bill would look like to the payors. </span>





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
