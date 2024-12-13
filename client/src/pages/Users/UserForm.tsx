


// Imports
// Lucide Icons Import
import {
    ChevronLeft,
    CirclePlus,
    Eye,
    EyeOff,
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

// Phone input component Import
import { PhoneInput } from "@/components/ui/phone-input";

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

import { isValidPhoneNumber } from "react-phone-number-input";



// Data Imports
// User API Imports
import {
    createUser,
    getAllUsers
} from "@/data/user-api";



const passwordValidation = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

const userFormSchema = z.object({
    userBlkLt: z.string().min(1, "Block and Lot is required."),
    userPassword: z.string()
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(passwordValidation, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."),
    userConfirmPassword: z.string().min(1, "Confirm password is required."),
    userEmail: z.string().optional(),
    userMobileNo: z
        .string()
        .refine(isValidPhoneNumber, { message: "Invalid phone number" })
        .optional(),
    userRole: z.string().min(1, "User role is required."),
    userPosition: z.string().min(1, "User position is required."),
    userStatus: z.string().optional(),
    userCreatorId: z.string(),
    userCreatorBlkLt: z.string(),
    userCreatorPosition: z.string(),
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
            userCreatorId: user._id,
            userCreatorBlkLt: user.userBlkLt,
            userCreatorPosition: user.userPosition,
        },
    });



    // States
    // Reservations state
    const [error, setError] = useState<any>(null);
    // State for loading state
    const [loading, setLoading] = useState(false);
    // Password strength state
    const [passwordStrength, setPasswordStrength] = useState("None");
    // Show confirm password state
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // Show password state
    const [showPassword, setShowPassword] = useState(false);




    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Create User | GCTMS";
    }, []);

    useEffect(() => {
        if (userForm.watch("userRole") === "Admin") {
            userForm.setValue("userPosition", "Admin");
        } else if (userForm.watch("userRole") === "Unit Owner") {
            userForm.setValue("userPosition", "Unit Owner");
        }
    }, [userForm.watch("userRole")]);

    useEffect(() => {
        if (userForm.watch().userPassword) {
            setPasswordStrength(evaluatePasswordStrength(userForm.watch().userPassword));
        }

        if (userForm.watch().userPassword === "") {
            setPasswordStrength("None");
        }
    }, [userForm.watch().userPassword]);

    const evaluatePasswordStrength = (password) => {
        let score = 0;

        if (!password) return 'None';

        // Check password length
        if (password.length > 8) score += 1;
        // Contains lowercase
        if (/[a-z]/.test(password)) score += 1;
        // Contains uppercase
        if (/[A-Z]/.test(password)) score += 1;
        // Contains numbers
        if (/\d/.test(password)) score += 1;
        // Contains special characters
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        switch (score) {
            case 0:
                return 'Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'Fair';
            case 4:
                return 'Good';
            case 5:
                return 'Strong';
            default:
                return 'None';
        }
    }



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
                values.userCreatorId,
                values.userCreatorBlkLt,
                values.userCreatorPosition,
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
            console.log(error.message);
            setError(error.message || "Error creating new user.");
            toast.error((error.message) || "Error creating new user.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        } finally {
            setLoading(false);
        }
    };


    // State to track existing positions
    const [existingPositions, setExistingPositions] = useState<string[]>([]);

    // Use Effect to fetch existing positions
    useEffect(() => {
        const fetchExistingPositions = async () => {
            try {
                const response = await getAllUsers();

                const data = await response.json();

                // Filter for unarchived users and get their positions
                const positions = data
                    .filter((user: any) => user.userVisibility !== "Archived")
                    .map((user: any) => user.userPosition);

                setExistingPositions(positions);
            } catch (error) {
                console.error('Error fetching existing positions:', error);
            }
        };

        fetchExistingPositions();
    }, []);

    // Helper function to check if position is taken
    const isPositionTaken = (position: string) => {
        return existingPositions.includes(position) && position !== "Unit Owner";
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

                                <div className="grid grid-cols-1 max-w-[756px] md:grid-cols-2  rounded-md sm:border">

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
                                                    <FormItem className="relative flex flex-col gap-2">
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
                                                                type={showPassword ? "text" : "password"}
                                                                {...field}
                                                            />
                                                        </FormControl>

                                                        <Button
                                                            className="absolute w-7 h-7 top-[23px] right-0.5 bg-background hover:bg-background"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            type="button"
                                                        >
                                                            {showPassword ? <Eye className="absolute text-muted-foreground w-4 h-4 right-3 top-3" /> : <EyeOff className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />}
                                                        </Button>

                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-muted-foreground font-light">Password strength: </span>
                                                            <span className={`text-xs font-semibold ${passwordStrength === 'None' ? 'text-muted-foreground' : passwordStrength === 'Weak' ? 'text-destructive' : passwordStrength === 'Fair' ? 'text-warning' : passwordStrength === "Good" ? 'text-foreground' : passwordStrength === "Strong" ? 'text-primary' : 'text-foreground'}`}>{passwordStrength}</span>
                                                        </div>

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
                                                    <FormItem className="relative flex flex-col gap-2">
                                                        <FormLabel className="font-normal">
                                                            Confirm password
                                                            <span className="text-destructive"> * </span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                autoComplete="confirm-password"
                                                                id="userConfirmPassword"
                                                                placeholder="Enter password again"
                                                                required
                                                                type={showConfirmPassword ? "text" : "password"}
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <Button
                                                            className="absolute w-7 h-7 top-[23px] right-0.5 bg-background hover:bg-background"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            type="button"
                                                        >
                                                            {showConfirmPassword ? <Eye className="absolute text-muted-foreground w-4 h-4 right-3 top-3" /> : <EyeOff className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />}
                                                        </Button>
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
                                                                placeholder="Enter email"
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
                                                                        <p className="text-sm"> Used for recordkeeping, there are no SMS notifications in the system. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <PhoneInput
                                                                id="userMobileNo"
                                                                placeholder="Enter mobile number"
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
                                                                        <RadioGroupItem checked={field.value === "Unit Owner"} value="Unit Owner" />
                                                                    </FormControl>
                                                                    <FormLabel className="font-normal">
                                                                        Unit Owner
                                                                    </FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center gap-3">
                                                                    <FormControl>
                                                                        <RadioGroupItem checked={field.value === "Admin"} disabled={user.userPosition != "President"} value="Admin" />
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

                                        {userForm.watch("userRole") === "Admin" && (

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
                                                                                User positions are unique. If a position is already taken by an unarchived user, it will be disabled.
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
                                                                    <SelectItem
                                                                        value="Admin"
                                                                    >
                                                                        Admin
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        disabled={isPositionTaken("Auditor")}
                                                                        value="Auditor"
                                                                    >
                                                                        Auditor
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        disabled={isPositionTaken("Treasurer")}
                                                                        value="Treasurer">
                                                                        Treasurer
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        disabled={isPositionTaken("Secretary")}
                                                                        value="Secretary"
                                                                    >
                                                                        Secretary
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        disabled={isPositionTaken("Vice President")}
                                                                        value="Vice President"
                                                                    >
                                                                        Vice President
                                                                    </SelectItem>
                                                                    <SelectItem
                                                                        disabled={isPositionTaken("President")}
                                                                        value="President"
                                                                    >
                                                                        President
                                                                    </SelectItem>   </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )
                                                }}
                                            />

                                        )}

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