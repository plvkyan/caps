


// Imports
// Lucide Icons Import
import {
    ChevronLeft,
    CirclePlus,
    Info,
    TriangleAlert
} from "lucide-react";

// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Dialog Component Imports
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn NavUser Component Import
import { NavUser } from "@/components/nav-user"

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Sonner Component Import
import { toast } from "sonner"

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Components Imports
// Loading spinner component Import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Hooks Imports
// Authentication Hook Import
// import { useAuthContext } from "@/hooks/useAuthContext";



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



// Data Imports
// User API Imports
import { bulkCreateUsers } from "@/data/user-api";





const userBulkFormSchema = z.object({
    startBlock: z.coerce.number().min(1, "Starting block is required."),
    endBlock: z.coerce.number().min(1, "Starting block is required."),
    startLot: z.coerce.number().min(1, "Starting block is required."),
    endLot: z.coerce.number().min(1, "Starting block is required."),
    defaultPassword: z.string().min(1, "Password is required."),
    defaultConfirmPassword: z.string().min(1, "Confirm password is required."),
    defaultStatus: z.string().optional(),
    defaultVisibility: z.string().optional(),
})
    .refine(
        (data) => {
            return data.defaultPassword === data.defaultConfirmPassword;
        }, {
        message: "Passwords do not match.",
        path: ["userConfirmPassword"],
    }
    )





export default function UserBulkForm() {


    // Contexts
    // Authentication Context
    // const { user } = useAuthContext();



    // Form
    const userForm = useForm<z.infer<typeof userBulkFormSchema>>({
        resolver: zodResolver(userBulkFormSchema),
        defaultValues: {
            defaultPassword: "",
            defaultConfirmPassword: "",
        },
    });




    // States
    // Reservations state
    const [error, setError] = useState<any>(null);
    // State for loading state
    const [loading, setLoading] = useState(false);
    // State for dialog open
    const [open, setOpen] = useState(false);




    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Bulk Create User | GCTMS";
    }, []);





    // Functions
    // Function to handle form submission
    // Handle Submit Function for bulk creating users 
    const handleSubmit = async (values: z.infer<typeof userBulkFormSchema>) => {
        try {
            setLoading(true);

            // Validate if any values are 0 or negative
            if (values.startBlock <= 0 || values.endBlock <= 0 || values.startLot <= 0 || values.endLot <= 0) {
                throw new Error("Block and lot numbers must be greater than 0.");
            }

            // Validate block range
            if (values.startBlock > values.endBlock) {
                throw new Error("Starting block cannot be higher than ending block.");
            }

            // Validate lot range
            if (values.startLot > values.endLot) {
                throw new Error("Starting lot cannot be higher than ending lot.");
            }

            // Post the data to the server
            const response = await bulkCreateUsers(
                values.startBlock,
                values.endBlock,
                values.startLot,
                values.endLot,
                values.defaultPassword,
                values.defaultStatus,
                values.defaultVisibility,
            );

            if (!response.ok) {
                const data = await response.json();
                console.log(data)
                throw new Error(data.error || 'Error creating new user.');
            }

            const totalLots = (values.endLot - values.startLot + 1);
            const totalBlocks = (values.endBlock - values.startBlock + 1);
            const totalAccounts = totalLots * totalBlocks;
            toast.success("New users created successfully.", {
                description: `A total of ${totalAccounts} new users have been created.`,
                closeButton: true,
            });

            // Clear the form and reset states
            setError(null);
            userForm.reset();
        } catch (error: any) {
            setError(error.error || error.message || "Error creating new users.");
            toast.error(error.error || error.message || "Error creating new users.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        } finally {
            setLoading(false);
            setOpen(false);
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
                                        <BreadcrumbLink href="/users">
                                            Users
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Bulk create users
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




                {/* Page content */}
                <main>

                    <Form {...userForm}>

                        <form className="flex flex-col gap-4 p-8 pt-4" onSubmit={userForm.handleSubmit(handleSubmit)}>



                            {/* Header */}
                            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-center">

                                <div className="flex gap-4 w-full items-center">

                                    {/* Header back button */}
                                    <Button
                                        className="h-7 w-7"
                                        onClick={() => history.back()}
                                        size="icon"
                                        type="button"
                                        variant="outline"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        <span className="sr-only"> Back </span>
                                    </Button>


                                    <div className="flex flex-col">

                                        {/* Header title */}
                                        <h1 className="font-semibold text-2xl">
                                            Bulk create users
                                        </h1>

                                        {/* Header Description */}
                                        <p className="font-light text-muted-foreground">
                                            Create multiple users at once with less hassle.
                                        </p>

                                    </div>

                                </div>



                                {/* Submit button */}
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="w-full sm:w-fit sm:ml-auto"
                                            disabled={loading || userForm.watch('startBlock') === undefined || userForm.watch('endBlock') === undefined || userForm.watch('startLot') === undefined || userForm.watch('endLot') === undefined || userForm.watch('defaultPassword') === undefined || userForm.watch('defaultConfirmPassword') === undefined}
                                            type="button"
                                            size="sm"
                                            variant="default"
                                        >
                                            {loading ? <LoadingSpinner className="h-4 w-4" /> : <CirclePlus className="h-7 w-7" />}
                                            Create users
                                        </Button>

                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Confirm bulk user creation
                                            </DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to create {(userForm.watch('endBlock') - userForm.watch('startBlock') + 1) * (userForm.watch('endLot') - userForm.watch('startLot') + 1)} users at once?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex items-center">
                                            <DialogClose asChild>
                                                <Button
                                                    className="w-[90%] sm:w-fit sm:ml-auto"
                                                    disabled={loading}
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                className="w-[90%] sm:w-fit sm:ml-auto"
                                                disabled={loading}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    userForm.handleSubmit(handleSubmit)();
                                                    setOpen(false);
                                                }}
                                                type="submit"
                                                size="sm"
                                                variant="default"
                                            >
                                                {loading ? <LoadingSpinner className="h-4 w-4" /> : <CirclePlus className="h-7 w-7" />}
                                                Create users
                                            </Button>

                                        </DialogFooter>

                                    </DialogContent>

                                </Dialog>

                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-red-500/20 border border-red-500">
                                    <TriangleAlert className="h-5 w-5 text-red-500" />
                                    <span className="text-red-500"> {error} </span>
                                </div>
                            )}




                            {/* Form Fields */}
                            <div className="h-full w-full flex items-center justify-center py-8">

                                <div className="grid grid-cols-1 rounded-md sm:border">


                                    <div className="flex flex-col gap-4 pb-6 sm:p-8 sm:pb-0 md:pb-8">

                                        <div className="flex flex-col my-4">
                                            {/* <UserPlus className="h-6 w-6 text-primary" /> */}
                                            <h3 className="text-base font-semibold"> Default user details </h3>
                                            <p className="text-sm text-muted-foreground"> Enter the range of block and lots and their default details. </p>
                                        </div>

                                        {/* Block range input */}
                                        <div className="flex flex-col gap-3">

                                            <div className="flex flex-col gap-1">
                                                <Label className="">
                                                    Block range
                                                </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enter the starting and ending block numbers to create accounts for all blocks within the range.
                                                </p>
                                            </div>


                                            <div className="flex flex-col sm:flex-row  gap-3 justify-evenly">

                                                {/* Block and lot input */}
                                                <FormField
                                                    control={userForm.control}
                                                    name="startBlock"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormLabel className="flex flex-row gap-1 font-normal">
                                                                    Start
                                                                    <span className="text-destructive"> * </span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="startBlock"
                                                                        placeholder="Enter starting block number"
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

                                                {/* Block and lot input */}
                                                <FormField
                                                    control={userForm.control}
                                                    name="endBlock"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormLabel className="flex flex-row gap-1 font-normal">
                                                                    Last
                                                                    <span className="text-destructive"> * </span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="endBlock"
                                                                        placeholder="Enter last block number"
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

                                            </div>

                                        </div>

                                        {/* Lot range input */}
                                        <div className="flex flex-col gap-3">

                                            <div className="flex flex-col gap-1">
                                                <Label> Lot range </Label>
                                                <p className="text-sm text-muted-foreground">
                                                    Enter the start and end lot numbers to create accounts for all lots within the range.
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-3 justify-evenly">

                                                {/* Block and lot input */}
                                                <FormField
                                                    control={userForm.control}
                                                    name="startLot"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormLabel className="flex flex-row gap-1 font-normal">
                                                                    Start
                                                                    <span className="text-destructive"> * </span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="startLot"
                                                                        placeholder="Enter starting lot number"
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

                                                {/* Block and lot input */}
                                                <FormField
                                                    control={userForm.control}
                                                    name="endLot"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className="flex flex-row items-center gap-2">
                                                                <FormLabel className="flex flex-row gap-1 font-normal">
                                                                    Last
                                                                    <span className="text-destructive"> * </span>
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        id="endLot"
                                                                        placeholder="Enter last lot number"
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

                                            </div>

                                        </div>

                                        {/* Password input */}
                                        <FormField
                                            control={userForm.control}
                                            name="defaultPassword"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="font-normal">
                                                            Password
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="new-password"
                                                                id="defaultPassword"
                                                                placeholder="Enter password"
                                                                required
                                                                type="password"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* Confirm password input */}
                                        <FormField
                                            control={userForm.control}
                                            name="defaultConfirmPassword"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="font-normal">
                                                            Confirm password
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="confirm-password"
                                                                id="defaultConfirmPassword"
                                                                placeholder="Enter password again"
                                                                required
                                                                type="password"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* User membership status input */}
                                        <FormField
                                            control={userForm.control}
                                            name="defaultStatus"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            User status
                                                            <span className="text-muted-foreground"> (Optional) </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> A user is 'Outstanding' by default. Delinquent accounts will be archived after 3 months of delinquency. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <Select
                                                            defaultValue={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select the user's membership status"></SelectValue>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Outstanding"> Outstanding </SelectItem>
                                                                <SelectItem value="Delinquent"> Delinquent </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* User visibility input */}
                                        <FormField
                                            control={userForm.control}
                                            name="defaultVisibility"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            User visibility
                                                            <span className="text-muted-foreground"> (Optional) </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> It's 'Unarchived' by default. Archiving will disable the account. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <Select
                                                            defaultValue={field.value}
                                                            onValueChange={field.onChange}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select the user's access to the system"></SelectValue>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                <SelectItem value="Archived"> Archived </SelectItem>
                                                            </SelectContent>
                                                        </Select>
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

        </SidebarProvider >
    )
}