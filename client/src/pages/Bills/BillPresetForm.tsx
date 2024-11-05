


// Imports
// Lucide React Icons Imports
import {
    Info
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

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
import { createBillPreset } from "@/data/bills-api.ts";
import { ChevronLeft, CirclePlus, TriangleAlert } from "lucide-react";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";





// Bill Preset Form Schema
const billPresetFormSchema = z.object({
    billPresetTitle: z.string().min(1, "Bill preset title is required"),
    billPresetType: z.string().min(1, "Bill preset type is required"),
    billPresetDescription: z.string().min(1, "Bill preset description is required"),
    billPresetQuantity: z.coerce.number().positive("Bill preset quantity must be a positive integer"),
    billPresetCurrency: z.string().min(1, "Bill preset currency is required"),
    billPresetAmount: z.coerce.number().positive("Bill preset amount must be a positive number").min(20, "Bill preset amount must be at least 20"),
    billPresetRecurringDate: z.string().optional(),
    billPresetCreatorId: z.string().min(1, "Bill preset creator ID is required"),
    billPresetCreatorBlkLt: z.string().min(1, "Bill preset creator block and lot is required"),
    billPresetCreatorPosition: z.string().min(1, "Bill preset creator position is required"),
    billPresetVisibility: z.string().min(1, "Bill preset visibility is required"),
});





export const BillPresetForm = () => {



    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Error state
    const [error, setError] = useState<String | null>(null);

    // Loading state
    const [loading, setLoading] = useState<boolean>(false);



    // useForms
    const billPresetForm = useForm<z.infer<typeof billPresetFormSchema>>({
        resolver: zodResolver(billPresetFormSchema),
        defaultValues: {
            billPresetTitle: "",
            billPresetType: "One-time",
            billPresetDescription: "",
            billPresetQuantity: 1,
            billPresetCurrency: "PHP",
            billPresetAmount: 0,
            billPresetRecurringDate: undefined,
            billPresetCreatorId: user._id,
            billPresetCreatorBlkLt: user.userBlkLt,
            billPresetCreatorPosition: user.userPosition,
            billPresetVisibility: "Unarchived",
        }
    });



    // Effects




    // Functions
    const handleSubmit = async (values: z.infer<typeof billPresetFormSchema>) => {
        setError(null);
        setLoading(true);

        try {
            const response = await createBillPreset(
                values.billPresetTitle,
                values.billPresetType,
                values.billPresetDescription,
                values.billPresetQuantity,
                values.billPresetCurrency,
                values.billPresetAmount,
                values.billPresetType === 'Recurring' ? values.billPresetRecurringDate : undefined,
                values.billPresetCreatorId,
                values.billPresetCreatorBlkLt,
                values.billPresetCreatorPosition,
                values.billPresetVisibility
            );

            if (!response.ok) {
                const data = await response.json();
                console.log(data.error);
                throw data.error;
            }
            
            toast.success("Bill preset created successfully", {
                closeButton: true,
            });
            billPresetForm.reset(); // Reset form after successful submission
        } catch (error) {
            setError(error ? (error as any) : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };






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
                                            Create bill preset
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

                    <Form {...billPresetForm}>

                        <form
                            className="flex flex-col gap-4 p-8 pt-4"
                            id="billPresetForm"
                            onSubmit={billPresetForm.handleSubmit(handleSubmit)}
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
                                    <h1 className="text-2xl font-semibold">Create bill preset</h1>
                                    <p className="font-light text-muted-foreground">Create a new bill preset for when creating bills.</p>
                                </div>

                                <Button
                                    disabled={loading}
                                    className="ml-auto"
                                    type="submit"
                                    size="sm"
                                    variant="default"
                                >
                                    {loading ? <LoadingSpinner className="h-7 w-7" /> : <CirclePlus className="h-7 w-7" />}
                                    {loading ? "Creating..." : "Create bill preset"}
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

                                <div className="grid grid-cols-1 rounded-md sm:border">

                                    {/* Forms container */}
                                    <div className="flex flex-col gap-4 pb-6 sm:p-8 sm:pb-0 md:pb-8">

                                        {/* Forms header */}
                                        <div className="flex flex-col my-4">
                                            <h3 className="text-base font-semibold"> Bill preset details </h3>
                                            <p className="text-sm text-muted-foreground"> Define key information and default settings used to quickly generate consistent bills with minimal effort. </p>
                                        </div>

                                        {/* Bill type input */}
                                        <FormField
                                            control={billPresetForm.control}
                                            name="billPresetType"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-row gap-5 mt-3 mb-5">
                                                        <FormLabel className="flex w-[200px] gap-1 font-normal">
                                                            Bill preset type
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

                                        {/* Bill preset recurring date input */}
                                        {/* Only show if bill type is recurring */}
                                        {billPresetForm.watch("billPresetType") === "Recurring" && (
                                            <FormField
                                                control={billPresetForm.control}
                                                name="billPresetRecurringDate"
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

                                        {/* Bill preset amount input */}
                                        <FormField
                                            control={billPresetForm.control}
                                            name="billPresetAmount"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill preset amount
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
                                                                id="billPresetAmount"
                                                                min={20}
                                                                placeholder="Enter bill preset title"
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


                                        {/* Bill Preset Title input */}
                                        <FormField
                                            control={billPresetForm.control}
                                            name="billPresetTitle"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill preset title
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
                                                                id="billPresetTitle"
                                                                placeholder="Enter bill preset title"
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

                                        {/* Bill preset description input */}
                                        <FormField
                                            control={billPresetForm.control}
                                            name="billPresetDescription"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill preset description
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                autoComplete="bill-description"
                                                                id="billPresetDescription"
                                                                placeholder="Enter bill preset title"
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
                                            control={billPresetForm.control}
                                            name="billPresetVisibility"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Bill preset visibility
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
                                                                    <SelectValue placeholder="Select bill preset visibility" />
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

export default BillPresetForm;