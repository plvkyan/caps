

//@ts-ignore
//@ts-nocheck

// Imports
// Lucide React Icons Imports
import {
    CalendarIcon,
    Info,
    LucideTablets,
    UserPlus,
    UserX
} from "lucide-react";



// shadcn Components Imports
// shadcn AppSidebar Component Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Component Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Sonner Component Import
import { toast } from "sonner";

// shadcn Tooltip Component Imports
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"





// Custom Componenets Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// useEffect and useState react Imports
import {
    useEffect,
    useState
} from "react";

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Types Imports



// Data Imports
// User API Imports
import { getUnitOwners } from "@/data/user-api";
import { createBill, getBillPresets } from "@/data/bills-api.ts";
import { ChevronLeft, CirclePlus, TriangleAlert } from "lucide-react";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import MultipleSelector, { Option } from "@/components/custom/MultipleSelector";



// Bill Form Schema
const billFormSchema = z.object({
    billTitle: z.string().min(1, "Bill title is required"),
    billType: z.string().min(1, "Bill type is required"),
    billDescription: z.string().min(1, "Bill description is required"),
    billQuantity: z.coerce.number().positive("Bill quantity must be a positive integer"),
    billCurrency: z.string().min(1, "Bill currency is required"),
    billAmount: z.coerce.number().positive("Bill amount must be a positive number").min(20, "Bill amount must be at least 20"),
    billRecurringDate: z.string().optional(),
    billDueDate: z.date().optional(),
    billPayors: z.array(z.any()).min(1, "Bill payors are required"),
    billCreatorId: z.string().min(1, "Bill creator ID is required"),
    billCreatorBlkLt: z.string().min(1, "Bill creator block and lot is required"),
    billCreatorPosition: z.string().min(1, "Bill creator position is required"),
    billVisibility: z.string().min(1, "Bill visibility is required"),
});


// const OPTIONS = [
//     {label: 'imy', value: 'imy'}
// ]


export const BillForm = () => {



    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Error state
    const [error, setError] = useState<String | null>(null);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);

    // User list state
    const [users, setUsers] = useState<any[]>([]);

    // Multiple Selector Options
    const [options, setOptions] = useState<any[]>([]);

    // Bill Presets state
    const [billPresets, setBillPresets] = useState<any[]>([]);


    // Variables




    // useForms
    const billForm = useForm<z.infer<typeof billFormSchema>>({
        resolver: zodResolver(billFormSchema),
        defaultValues: {
            billTitle: "",
            billType: "One-time",
            billDescription: "",
            billQuantity: 1,
            billCurrency: "PHP",
            billAmount: 0,
            billRecurringDate: undefined,
            billDueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            billCreatorId: user._id,
            billCreatorBlkLt: user.userBlkLt,
            billCreatorPosition: user.userPosition,
            billVisibility: "Unarchived",
        }
    });



    // Effects
    // Effect for fetching unit owners
    useEffect(() => {

        const fetchUnitOwners = async () => {
            try {
                const response = await getUnitOwners();
                if (!response.ok) {
                    throw new Error('Failed to fetch unit owners');
                }
                const data = await response.json();
                setUsers(data);
                setOptions(data.map((user) => ({ label: user.userBlkLt, value: user._id })));
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        const fetchBillPresets = async () => {
            try {
                const response = await getBillPresets();
                if (!response.ok) {
                    throw new Error('Failed to fetch bill presets');
                }
                const data = await response.json();
                setBillPresets(data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        }

        fetchBillPresets();
        fetchUnitOwners();
    }, [])



    // Functions
    // addUsers function
    const addUsers = () => {
        if (options.length === 0) {
            setError("No users found.");
            return
        }

        billForm.setValue("billPayors", options);
    };

    // clearUsers function
    const clearUsers = () => {
        billForm.setValue("billPayors", []);
    };

    // handleBillPresets function
    const handleBillPresets = (preset) => {
        billForm.setValue("billTitle", preset.billPresetTitle);
        billForm.setValue("billType", preset.billPresetType);
        billForm.setValue("billDescription", preset.billPresetDescription);
        billForm.setValue("billAmount", preset.billPresetAmount);
    };

    // Submit function
    const handleSubmit = async (values: z.infer<typeof billFormSchema>) => {
        setError(null);
        setLoading(true);

        if (values.billType === "One-time" && !values.billDueDate) {
            setError("Due date is required for one-time bills");
            setLoading(false);
            return;
        }

        if (values.billType === "Recurring" && !values.billRecurringDate) {
            setError("Recurring date is required for recurring bills");
            setLoading(false);
            return;
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "3d") {
            values.billDueDate = new Date(new Date().setDate(new Date().getDate() + 3));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "1w") {
            values.billDueDate = new Date(new Date().setDate(new Date().getDate() + 7));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "2w") {
            values.billDueDate = new Date(new Date().setDate(new Date().getDate() + 14));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "1m") {
            values.billDueDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "2m") {
            values.billDueDate = new Date(new Date().setMonth(new Date().getMonth() + 2));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "3m") {
            values.billDueDate = new Date(new Date().setMonth(new Date().getMonth() + 3));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "6m") {
            values.billDueDate = new Date(new Date().setMonth(new Date().getMonth() + 6));
        }

        if (values.billType === "Recurring" && values.billRecurringDate === "1y") {
            values.billDueDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }

        const tempPayors = values.billPayors.map((payor) => {
            const matchingUser = users.find((user) => user._id === payor.value);
            if (matchingUser) {
                return {
                    payorId: matchingUser._id,
                    payorBlkLt: matchingUser.userBlkLt,
                    payorEmail: matchingUser.userEmail,
                    billStatus: "Pending",
                    billPaidDate: undefined
                };
            }
        }).filter(Boolean);

        values.billPayors = tempPayors;

        try {
            const response = await createBill(
                values.billTitle,
                values.billType,
                values.billDescription,
                values.billQuantity,
                values.billCurrency,
                values.billAmount,
                values.billType === 'Recurring' ? values.billRecurringDate : undefined,
                values.billDueDate,
                values.billPayors,
                values.billCreatorId,
                values.billCreatorBlkLt,
                values.billCreatorPosition,
                values.billVisibility
            );

            if (!response.ok) {
                const data = await response.json();
                console.log(data.error);
                throw data.error;
            }

            toast.success("Bill created successfully", {
                closeButton: true,
            });
            billForm.reset(); // Reset form after successful submission
        } catch (error) {
            setError(error ? (error as any) : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };


    console.log(options);



    return (

        // The sidebar provider - no changes here
        <SidebarProvider>

            {/* The sidebar itself and its contents - there are changes here */}
            <AppSidebar />

            {/* The inset effect - no changes here */}
            <SidebarInset>

                {/* The header provided along with the sidebar */}
                <header className="flex h-16 shrink-0 p-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

                    {/* Container within the header to organize items */}
                    <div className="w-full flex items-center justify-between gap-2">

                        {/* Container for breadcrumbs and sidebar trigger */}
                        <div className="flex items-center gap-2 p-4">

                            <SidebarTrigger className="" />

                            <Separator orientation="vertical" className="mr-2 h-4" />

                            {/* Page breadcrumbs */}
                            <Breadcrumb>

                                <BreadcrumbList>

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/bills">
                                            Bills
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Create bill
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>

                                </BreadcrumbList>

                            </Breadcrumb>

                        </div>

                        {/* Account navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            <ThemeToggle />
                            <NavUser />
                        </div>

                    </div>

                </header>


                {/* Main content */}
                <main>

                    <Form {...billForm}>

                        <form
                            className="flex flex-col gap-4 p-8 pt-4"
                            id="billForm"
                            onSubmit={billForm.handleSubmit(handleSubmit)}
                        >

                            {/* Page header */}
                            <div className="flex flex-row items-center gap-4">

                                {/* Return to Bill List button */}
                                <Button
                                    className="h-7 w-7"
                                    onClick={() => history.back()}
                                    size="icon"
                                    title="Back Button"
                                    type="button"
                                    variant="outline"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only"> Back </span>
                                </Button>

                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-semibold">Create bill</h1>
                                    <p className="font-light text-muted-foreground">Create a new bill for unit owners to pay.</p>
                                </div>

                                <Button
                                    disabled={loading}
                                    className="ml-auto"
                                    type="submit"
                                    size="sm"
                                    variant="default"
                                >
                                    {loading ? <LoadingSpinner className="h-7 w-7" /> : <CirclePlus className="h-7 w-7" />}
                                    {loading ? "Creating..." : "Create bill"}
                                </Button>

                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-red-500/20 border border-red-500">
                                    <TriangleAlert className="h-5 w-5 text-red-500" />
                                    <span className="text-red-500"> {error} </span>
                                </div>
                            )}

                            <div className="flex py-8 gap-6 items-center justify-center h-full w-full">

                                <div className="grid grid-cols-1 w-[550px] max-w-[550px] rounded-md sm:border">

                                    {/* Forms container */}
                                    <div className="flex flex-col gap-4 pb-6 sm:p-8 sm:pb-0 md:pb-8">

                                        {/* Forms header */}
                                        <div className="flex flex-col my-4">
                                            <h3 className="text-base font-semibold"> Bill details </h3>
                                            <p className="text-sm text-muted-foreground"> Bill details provide the necessary fields to create and configure a new bill. </p>
                                        </div>

                                        {billPresets && (
                                            <div className="flex flex-col gap-2">
                                                <Label className="flex gap-1 font-normal">
                                                    Bill preset
                                                    <span className="text-muted-foreground"> (Optional) </span>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Info className="h-4 w-4 text-muted-foreground" />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-sm">A template for your bills.</p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </Label>
                                                <Select>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select bill preset" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {billPresets.length > 0 ? billPresets.map((preset) => (
                                                            <SelectItem key={preset._id} value={preset.billPresetTitle} onClick={() => handleBillPresets(preset)}>
                                                                {preset.billPresetTitle}
                                                            </SelectItem>
                                                        )) : (
                                                            <SelectItem value="No presets found">
                                                                No presets found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}






                                        {/* Bill type input */}
                                        <FormField
                                            control={billForm.control}
                                            name="billType"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-row gap-5 my-3">
                                                        <FormLabel className="flex w-[200px] gap-1 font-normal">
                                                            Bill type
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> A recurring bill repeats itself after an interval. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                className="flex justify-evenly w-full"
                                                                defaultValue="One-time"
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormItem className="flex items-center gap-3">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="One-time" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        One-time
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center gap-3">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="Recurring" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Recurring
                                                                    </FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* Bill recurring date input */}
                                        {/* Only show if bill type is recurring */}
                                        {billForm.watch("billType") === "Recurring" && (
                                            <FormField
                                                control={billForm.control}
                                                name="billRecurringDate"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem className="flex flex-col gap-2">
                                                            <FormLabel className="flex gap-1 font-normal">
                                                                Recurring interval
                                                                <span className="text-destructive"> * </span>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Info className="h-4 w-4 text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p className="text-sm">How often the bill should repeat.</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    defaultValue={field.value}
                                                                    onValueChange={field.onChange}
                                                                >
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select interval between dates" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="3d">Every 3 days</SelectItem>
                                                                        <SelectItem value="1w">Every week</SelectItem>
                                                                        <SelectItem value="2w">Every 2 weeks</SelectItem>
                                                                        <SelectItem value="1m">Every month</SelectItem>
                                                                        <SelectItem value="2m">Every 2 months</SelectItem>
                                                                        <SelectItem value="3m">Every 3 months</SelectItem>
                                                                        <SelectItem value="6m">Every 6 months</SelectItem>
                                                                        <SelectItem value="1y">Every year</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        )}

                                        {billForm.watch("billType") === "One-time" && (
                                            <FormField
                                                control={billForm.control}
                                                name="billDueDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill due date
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm">The date a bill will be marked as 'Overdue.'</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
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
                                                                            format(field.value, "PPP")
                                                                        ) : (
                                                                            <span>Pick a date</span>
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
                                                                    disabled={(date) =>
                                                                        date > new Date() || date < new Date("1900-01-01")
                                                                    }
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}

                                        {/* Bill amount input */}
                                        <FormField
                                            control={billForm.control}
                                            name="billAmount"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill amount
                                                            <span className="text-muted-foreground"> (in PHP) </span>
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> The lowest amount possible is PHP 20.00. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="bill-title"
                                                                id="billAmount"
                                                                min={20}
                                                                placeholder="Enter Bill title"
                                                                required
                                                                type="number"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />


                                        {/* Bill Title input */}
                                        <FormField
                                            control={billForm.control}
                                            name="billTitle"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill title
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> The name of the preset and the default name of bills. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="bill-title"
                                                                id="billTitle"
                                                                placeholder="Enter Bill title"
                                                                required
                                                                type="text"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* Bill description input */}

                                        <FormField
                                            control={billForm.control}
                                            name="billDescription"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill description
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                autoComplete="bill-description"
                                                                id="billDescription"
                                                                placeholder="Enter Bill title"
                                                                required
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        <FormField
                                            control={billForm.control}
                                            name="billPayors"
                                            render={({ field }) => {
                                                return (

                                                    <FormItem>

                                                        <div className="flex gap-6 items-center justify-between pt-3" >

                                                            <FormLabel className="w-[30%] flex gap-1 font-normal">
                                                                Bill Payor/s
                                                                <span className="text-destructive"> * </span>
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Info className="h-4 w-4 text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p className="text-sm"> The name of the preset and the default name of bills. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </FormLabel>

                                                            <MultipleSelector
                                                                {...field}
                                                                defaultOptions={options}
                                                                placeholder="Select the receiving users"
                                                                emptyIndicator={
                                                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                                        No results found.
                                                                    </p>
                                                                }
                                                            />

                                                        </div>

                                                        <div className="flex w-full gap-4 pt-2 justify-end">

                                                            <Button
                                                                className="justify-end"
                                                                onClick={clearUsers}
                                                                size="sm"
                                                                type="button"
                                                                variant="outline"
                                                            >
                                                                <UserX className="h-4 w-4" />
                                                                Clear Users
                                                            </Button>

                                                            <Button
                                                                className="justify-end"
                                                                onClick={addUsers}
                                                                size="sm"
                                                                type="button"
                                                            >
                                                                <UserPlus className="h-4 w-4 text-primary-foreground" />
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


                                        <FormField
                                            control={billForm.control}
                                            name="billVisibility"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill visibility
                                                            <span className="text-muted-foreground"> (Optional) </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm">It's 'Unarchived' by default. Archiving will hide the preset. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Select
                                                                defaultValue={field.value}
                                                                onValueChange={field.onChange}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select Bill visibility" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Unarchived">Unarchived</SelectItem>
                                                                    <SelectItem value="Archived">Archived</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />




                                    </div>

                                </div>

                            </div>

                        </form>

                    </Form>

                </main>



            </SidebarInset>

        </SidebarProvider>

    )
}

export default BillForm;