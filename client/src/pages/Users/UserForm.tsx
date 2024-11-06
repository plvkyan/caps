


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

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn RadioGroup Component Import
import { 
    RadioGroup, 
    RadioGroupItem
} from "@/components/ui/radio-group";

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



// Data Imports
// User API Imports
import { createUser } from "@/data/user-api";






const userFormSchema = z.object({
    userBlkLt: z.string().min(1, "Block and Lot is required."),
    userPassword: z.string().min(1, "Password is required."),
    userConfirmPassword: z.string().min(1, "Confirm password is required."),
    userEmail: z.string().optional(),
    userMobileNo: z.string().optional(),
    userRole: z.string().min(1, "User role is required."),
    userPosition: z.string().min(1, "User position is required."),
    userStatus: z.string().optional(),
    userVisibility: z.string().optional(),
})
    .refine(
        (data) => {
            return data.userPassword === data.userConfirmPassword;
        }, {
        message: "Passwords do not match.",
        path: ["userConfirmPassword"],
    }
    )





export default function UserForm() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // Form
    const userForm = useForm<z.infer<typeof userFormSchema>>({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            userBlkLt: "",
            userPassword: "",
            userConfirmPassword: "",
            userRole: "Unit Owner",
            userPosition: "Unit Owner",
        },
    });




    // States
    // Reservations state
    const [error, setError] = useState<any>(null);
    // State for loading state
    const [loading, setLoading] = useState(false);





    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Create User | GCTMS";
    }, []);

    useEffect(() => {
        if (userForm.watch("userRole") === "Admin") {
            userForm.setValue("userPosition", "Admin");
        }
    }, [userForm.watch("userRole")]);



    // Functions
    // Function to handle form submission
    // Handle Submit Function for CREATING an amenity
    const handleSubmit = async (values: z.infer<typeof userFormSchema>) => {
        try {
            setLoading(true);

            // Post the data to the server
            const response = await createUser(
                values.userBlkLt,
                values.userPassword,
                values.userEmail,
                values.userMobileNo,
                values.userRole,
                values.userPosition,
                values.userStatus,
                values.userVisibility,
            );

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error creating new user.');
            }

            toast.success("User created successfully.", {
                description: "A new '" + values.userRole + "' user has been created.",
                closeButton: true,
            });

            // Reset error state
            setError(null);
            // Clear the form 
            userForm.reset();
            // The user role radiogroup doesn't reset along with the form so reset it manually.
            userForm.setValue("userRole", "Unit Owner");
        } catch (error: any) {
            setError(error.error || "Error creating new user.");
            toast.error((error as { error?: string }).error || "Error creating new user.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
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
                                        <BreadcrumbLink href="/users">
                                            Users
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Create user
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
                                            Create user
                                        </h1>

                                        {/* Header Description */}
                                        <p className="font-light text-muted-foreground">
                                            Create a new user account.
                                        </p>

                                    </div>

                                </div>



                                {/* Submit button */}
                                <Button
                                    className="w-[90%] sm:w-fit sm:ml-auto"
                                    disabled={loading}
                                    type="submit"
                                    size="sm"
                                    variant="default"
                                >
                                    {loading ? <LoadingSpinner className="h-4 w-4" /> : <CirclePlus className="h-7 w-7" />}
                                    Create user
                                </Button>

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

                                <div className="grid grid-cols-1 md:grid-cols-2  rounded-md sm:border">


                                    <div className="flex flex-col gap-4 pb-6 sm:p-8 sm:pb-0 md:pb-8">

                                        <div className="flex flex-col my-4">
                                            {/* <UserPlus className="h-6 w-6 text-primary" /> */}
                                            <h3 className="text-base font-semibold"> User credentials </h3>
                                            <p className="text-sm text-muted-foreground"> Enter user credentials for login and notifications. </p>
                                        </div>

                                        {/* Block and lot input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userBlkLt"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="font-normal">
                                                            Block and lot
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="username"
                                                                id="userBlkLt"
                                                                placeholder="Enter block and lot"
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

                                        {/* Password input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userPassword"
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
                                                                id="userPassword"
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
                                            name="userConfirmPassword"
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
                                                                id="userConfirmPassword"
                                                                placeholder="Enter Password Again"
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

                                        {/* User email input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userEmail"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Email
                                                            <span className="text-muted-foreground"> (Optional) </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> Used for notifications. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>

                                                        <FormControl>
                                                            <Input
                                                                id="userEmail"
                                                                placeholder="Enter Email"
                                                                type="text"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* User mobile number input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userMobileNo"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            Mobile number
                                                            <span className="text-muted-foreground"> (Optional) </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> Used for notifications. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                id="userMobileNo"
                                                                placeholder="Enter Mobile Number"
                                                                type="text"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                    </div>

                                    <div className="flex flex-col gap-4 sm:p-8">

                                        <div className="flex flex-col my-4">
                                            {/* <UserPlus className="h-6 w-6 text-primary" /> */}
                                            <h3 className="text-base font-semibold"> User privileges </h3>
                                            <p className="text-sm text-muted-foreground"> Determines what the user can do and not do. </p>
                                        </div>

                                        {/* User role input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userRole"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-5 mb-2.5">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            User role
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm"> Determines the level of access the user have within the system. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <RadioGroup
                                                                className="flex justify-evenly"
                                                                defaultValue="Unit Owner"
                                                                onValueChange={field.onChange}
                                                            >
                                                                <FormItem className="flex items-center gap-3">
                                                                    <FormControl>
                                                                        <RadioGroupItem value="Unit Owner"/>
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Unit Owner
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center gap-3">
                                                                    <FormControl>
                                                                        <RadioGroupItem disabled={user.userPosition != "President"} value="Admin" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Admin
                                                                    </FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* User position input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userPosition"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem className="flex flex-col gap-2">
                                                        <FormLabel className="flex gap-1 font-normal">
                                                            User position
                                                            <span className="text-destructive"> * </span>
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <Info className="h-4 w-4 text-muted-foreground" />
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p className="text-sm">
                                                                            {userForm.watch("userRole") === "Unit Owner" ? "A user with 'Unit Owner' role can only have the 'Unit Owner' position." : "A user with 'Admin' role can have any position except 'Unit Owner.'"}
                                                                        </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <Select
                                                            defaultValue={field.value}
                                                            disabled={userForm.watch("userRole") === "Unit Owner"}
                                                            onValueChange={field.onChange}
                                                            value={
                                                                userForm.watch("userRole") === "Unit Owner" ? "Unit Owner" : field.value
                                                            }
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select the user's position in the HOA"></SelectValue>
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem disabled={userForm.watch("userRole") === "Admin"} value="Unit Owner"> Unit Owner </SelectItem>
                                                                <SelectItem value="Admin"> Admin </SelectItem>
                                                                <SelectItem value="Auditor"> Auditor </SelectItem>
                                                                <SelectItem value="Treasurer"> Treasurer </SelectItem>
                                                                <SelectItem value="Secretary"> Secretary </SelectItem>
                                                                <SelectItem value="Vice President"> Vice President </SelectItem>
                                                                <SelectItem value="President"> President </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )
                                            }}
                                        />

                                        {/* User membership status input */}
                                        <FormField
                                            control={userForm.control}
                                            name="userStatus"
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
                                            name="userVisibility"
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