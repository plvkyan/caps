


// Imports

// Lucide React Icon Imports
import {
    Archive,
    ArchiveX,
    CalendarRange,
    ChevronDown,
    ChevronLeft,
    ChevronUp,
    Copy,
    Download,
    EllipsisVertical,
    Eye,
    EyeOff,
    Info,
    RotateCcw,
    Share
} from "lucide-react"


// shadcn Components Imports
// shadcn Alert Dialog Component Imports
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

// shadcn Card Component Imports
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

// shadcn Collapsible Component Imports
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

// shadcn Dialog Component Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

// shadcn Dropdown Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Input Component Import
import { Input } from "@/components/ui/input"

// shadcn Label Component Import
import { Label } from "@/components/ui/label"

// shadcn NavUser Component Imports
import { NavUser } from "@/components/nav-user"

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

// shadcn Select Component Import
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// shadcn Separator Component Imports
import { Separator } from "@/components/ui/separator"

// shadcn Sidebar Component Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

// shadcn Toast Import
import { toast } from "sonner"

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Components Imports
// Loading spinner component import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner"

// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Data table imports
// User bill data table component import
import UserBillTable from "@/pages/Users/UserBillTable"

// User bill data table columns component import
import { UserBillTableColumns } from "@/pages/Users/UserBillTableColumns"

// User reservation data table component import
import UserReservationTable from "@/pages/Users/UserReservationTable"

// User reservation data table columns component import
import { UserReservationTableColumns } from "@/pages/Users/UserReservationColumns"



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext"



// Utility Imports
// date-fns Imports
import { format } from "date-fns"

// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Reservation Type Import
import { UserType } from "@/types/user-type"



// API call imports
// bill-api imports
import { getCreatedBills, getUserBills } from "@/data/bills-api"

// reservation-api imports
import { getUserUnarchivedReservations } from "@/data/reservation-api"

// user-api imports
import {
    archiveUser,
    getSingleUser,
    getUsersMadeBy,
    unarchiveUser,
    updateUser
} from "@/data/user-api"



// Type imports
// Bill type import
import { BillType } from "@/types/bill-type"

// Reservation type import
import { ReservationType } from "@/types/reservation-type"
import { Checkbox } from "@/components/ui/checkbox"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
// import { AmenityType } from "@/types/amenity-type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserUserTable from "./UserUserTable"
import { UserTableColumns } from "./UserColumns"
import { AmenityTableColumns } from "../Amenities/AmenityColumns"
import UserAmenityTable from "./UserAmenityTable"
import { getCreatedAmenities } from "@/data/amenity-api"
import { AmenityType } from "@/types/amenity-type"





export default function UserDetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Reservations state
    const [currUser, setCurrUser] = useState<UserType>();
    const [amenities, setAmenities] = useState<AmenityType[]>();
    const [users, setUsers] = useState<UserType[]>();
    const [reservations, setReservations] = useState<ReservationType[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [bills, setBills] = useState<BillType[]>();
    // const [billPresets, setBillPresets] = useState<BillPresetType[]>();
    const [billChoice, setBillChoice] = useState<string>("All");
    const [pendingBills, setPendingBills] = useState<BillType[]>();
    const [paidBills, setPaidBills] = useState<BillType[]>();
    const [overdueBills, setOverdueBills] = useState<BillType[]>();
    const [averageRating, setAverageRating] = useState<number>();
    const [newGeneratedPassword, setNewGeneratedPassword] = useState<string>("");
    const [resetConfirmation, setResetConfirmation] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Export states
    // Show export states
    const [showExportDialog, setShowExportDialog] = useState<boolean>(false);
    const [showBillOptions, setShowBillOptions] = useState<boolean>(false);
    const [showReservationOptions, setShowReservationOptions] = useState<boolean>(false);
    const [showAmenityOptions, setShowAmenityOptions] = useState<boolean>(false);
    const [showUserOptions, setShowUserOptions] = useState<boolean>(false);

    // Included export info states
    const [includeUserBasicInfo, setIncludeUserBasicInfo] = useState<boolean>(true);
    const [includeUserReservations, setIncludeUserReservations] = useState<boolean>(true);
    const [includeUserBills, setIncludeUserBills] = useState<boolean>(true);
    const [includeAdminAmenities, setIncludeAdminAmenities] = useState<boolean>(true);
    const [includeAdminUsers, setIncludeAdminUsers] = useState<boolean>(true);

    // Bill info filter states
    const [exportBillDueDateRange, setExportBillDueDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportBillCreationDateRange, setExportBillCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportBillPaidDateRange, setExportBillPaidDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportBillStatus, setBillExportStatus] = useState<String[]>(["Pending", "Paid", "Overdue"]);
    const [exportBillVisibility, setBillExportVisibility] = useState<String>("Unarchived");
    const [exportBillType, setBillExportType] = useState<String>("All");

    // Reservation info filter states
    const [exportReservationDateRange, setExportReservationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportReservationCreationDateRange, setExportReservationCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportReservationStatus, setExportReservationStatus] = useState<String[]>(["Pending", "Cancelled", "Void", "Approved", "Rejected", "Ongoing", "For Return", "Returned", "Completed"])
    const [exportReservationVisibility, setExportReservationVisibility] = useState<String>("Unarchived");
    const [exportReservationType, setExportReservationType] = useState<String>("All");
    const [exportReservationAuthorRole, setExportReservationAuthorRole] = useState<String>("All");

    // Amenity info filter states
    const [exportAmenityType, setExportAmenityType] = useState<String>("All");
    const [exportAmenityCreationDateRange, setExportAmenityCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportAmenityVisibility, setExportAmenityVisibility] = useState<String>("Unarchived");

    // User info filter states
    const [exportUserCreationDateRange, setExportUserCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined })
    const [exportUserVisibility, setExportUserVisibility] = useState<String>("Unarchived");
    const [exportUserRole, setExportUserRole] = useState<String>("All");
    const [exportUserPosition, setExportUserPosition] = useState<String[]>(['Unit Owner', 'Admin', 'Auditor', 'Treasurer', 'Secretary', 'Vice President', 'President']);
    const [exportUserStatus, setExportUserStatus] = useState<String>("All");


    console.log(users);
    console.log(exportBillVisibility);
    console.log(exportBillType);
    console.log(exportReservationVisibility);
    console.log(exportReservationType);
    console.log(exportReservationAuthorRole);
    console.log(exportAmenityType);
    console.log(exportAmenityVisibility);
    console.log(exportUserRole);
    console.log(exportUserVisibility);
    console.log(exportUserStatus);

    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = currUser?.userBlkLt + " Details | GCTMS";
    }, [currUser]);

    useEffect(() => {

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("User archived successfully", {
                closeButton: true,
                // description: sessionStorage.getItem("archiveSuccessful"),
            });
            sessionStorage.removeItem("archiveSuccessful");
        }

        if (sessionStorage.getItem("unarchiveSuccessful")) {
            toast.success("User unarchived successfully", {
                closeButton: true,
                // description: sessionStorage.getItem("unarchiveSuccessful"),
            });
            sessionStorage.removeItem("unarchiveSuccessful");
        }

        if (sessionStorage.getItem("bulkUsersSuccessful")) {
            toast.success("New users created successfully.", {
                description: sessionStorage.getItem("bulkUsersSuccessful"),
                duration: 5000,
                closeButton: true,
            });
            sessionStorage.removeItem("bulkUsersSuccessful");
        }

    }, [])

    // Fetching unarchived reservations effect
    useEffect(() => {

        const fetchUserDetails = async () => {

            try {
                const response = await getSingleUser(location.pathname.split('/').pop() || '');
                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }

                setCurrUser(data);
            } catch (error) {
                toast.error((error as { error?: string }).error || "Error fetching user details.", {
                    closeButton: true,
                    description: (error as { description?: string }).description || null,
                    duration: 10000,
                });
            }
        }

        fetchUserDetails();
    }, []);

    useEffect(() => {

        if (!currUser || !currUser?._id) return;

        const fetchUnitOwnerBills = async () => {
            try {
                const result = await getUserBills(currUser._id);
                const data = await result.json();

                if (result.ok) {
                    setBills(data);
                }
            } catch (error) {
                toast.error("Error fetching bills", {
                    closeButton: true,
                    duration: 10000,
                })
            }
        }

        const fetchUserReservations = async () => {
            try {
                const result = await getUserUnarchivedReservations(currUser._id);
                const data = await result.json();

                if (result.ok) {
                    setReservations(data);
                }
            } catch (error) {
                toast.error("Error fetching reservations", {
                    closeButton: true,
                    duration: 10000,
                })
            }
        }

        const fetchAdminBills = async () => {
            try {
                const result = await getCreatedBills(currUser._id);
                const data = await result.json();

                if (result.ok) {
                    console.log("YOOO", data);
                    setBills(data);
                }
            } catch (error) {
                console.log(error);
                toast.error("Error fetching bills", {
                    closeButton: true,
                    duration: 10000,
                })
            }
        }

        // const fetchAdminBillPresets = async () => {
        //     try {
        //         const result = await getCreatedBillPresets(currUser._id);
        //         const data = await result.json();

        //         if (result.ok) {
        //             setBillPresets(data);
        //         }
        //     } catch (error) {
        //         toast.error("Error fetching bill presets", {
        //             closeButton: true,
        //             duration: 10000,
        //         })
        //     }
        // }

        const fetchAdminUsers = async () => {
            try {
                const result = await getUsersMadeBy(currUser._id);
                const data = await result.json();

                if (result.ok) {
                    console.log('')
                    setUsers(data);
                }
            } catch (error) {
                toast.error("Error fetching users", {
                    closeButton: true,
                    duration: 10000,
                })
            }
        }

        const fetchAdminAmenities = async () => {
            try {
                const result = await getCreatedAmenities(currUser._id);
                const data = await result.json();

                if (result.ok) {
                    console.log('')
                    setAmenities(data);
                }
            } catch (error) {
                toast.error("Error fetching amenities", {
                    closeButton: true,
                    duration: 10000,
                })
            }
        }

        if (currUser && (currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner")) {
            fetchUnitOwnerBills();
        }

        if (currUser && (currUser.userRole === "Admin" && currUser.userPosition !== "Unit Owner")) {
            fetchAdminUsers();
            // fetchAdminBillPresets();
            fetchAdminBills();
            fetchAdminAmenities();
        }

        fetchUserReservations();

    }, [currUser])

    useEffect(() => {

        if (!currUser || (currUser.userRole === "Admin" && currUser.userPosition !== "Unit Owner")) return;

        if (bills) {

            setPendingBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === currUser._id && payor.billStatus === "Pending"
                )
            ));

            setPaidBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === currUser._id && payor.billStatus === "Paid"
                )
            ));

            setOverdueBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === currUser._id && payor.billStatus === "Overdue"
                )
            ));

            const paidBillsForUser = bills.filter(bill =>
                bill.billPayors.some(payor =>
                    payor.payorId === currUser._id &&
                    payor.billStatus === "Paid" &&
                    payor.billPaidDate
                )
            );

            if (paidBillsForUser.length > 0) {
                const totalDays = paidBillsForUser.reduce((sum, bill) => {
                    const payor = bill.billPayors.find(p => p.payorId === currUser._id);
                    if (payor && payor.billPaidDate) {
                        const dueDate = new Date(bill.billDueDate);
                        const paidDate = new Date(payor.billPaidDate);
                        const daysDifference = Math.floor((paidDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
                        return sum + daysDifference;
                    }
                    return sum;
                }, 0);

                setAverageRating(Math.round(totalDays / paidBillsForUser.length));
            }
        }

    }, [bills]);

    useEffect(() => {

        if (exportUserRole == "Admin" && exportUserPosition.includes("Unit Owner")) {
            setExportUserPosition(exportUserPosition.filter(p => p !== "Unit Owner"));
        }

        if (exportUserRole === "Unit Owner") {
            setExportUserPosition(["Unit Owner"]);
        }

    }, [exportUserRole])

    const handleArchiveUser = async () => {
        if (!currUser?._id) {
            toast.error("Cannot find user.", { closeButton: true });
            return;
        }

        setLoading(true);

        try {
            const response = await archiveUser(user._id, currUser._id);
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = {
                    400: data.error === 'Some users are already archived'
                        ? "Some selected users are already archived"
                        : data.error === 'Invalid or empty user IDs array'
                            ? "Invalid selection of users"
                            : data.error,
                    404: "User was not archived",
                    500: "Server error occurred while archiving user"
                }[response.status] || "Error archiving user";

                throw new Error(errorMessage);
            }

            sessionStorage.setItem("archiveSuccessful", "Yeah.");
            window.location.reload();

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error archiving user", {
                closeButton: true
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUnarchiveUser = async () => {
        if (!currUser?._id) {
            toast.error("Cannot find user.", { closeButton: true });
            return;
        }

        setLoading(true);

        try {
            const response = await unarchiveUser(currUser._id);
            const data = await response.json();

            if (!response.ok) {
                const errorMessage = {
                    400: data.error === 'Some users are already unarchived'
                        ? "Some selected users are already unarchived"
                        : data.error === 'Invalid or empty user IDs array'
                            ? "Invalid selection of users"
                            : data.error,
                    404: "User was not unarchived",
                    500: "Server error occurred while unarchiving user"
                }[response.status] || "Error unarchiving user";

                throw new Error(errorMessage);
            }

            sessionStorage.setItem("unarchiveSuccessful", "Yeah.");
            window.location.reload();

        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error unarchiving user", {
                closeButton: true
            });
        } finally {
            setLoading(false);
        }
    };

    const evaluatePasswordStrength = (password) => {
        let score = 0;

        if (!password) return '';

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
                return '';
        }
    }

    const generateStrongPassword = () => {
        const length = 12;
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let password = '';

        // Ensure at least one character from each category
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));

        // Fill the rest with random characters from all categories
        const allChars = lowercase + uppercase + numbers + symbols;
        for (let i = password.length; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    const handleResetPassword = async () => {
        if (!currUser) {
            toast.error("Cannot find user.", { closeButton: true });
            return;
        }

        try {
            setLoading(true);

            let newPassword = generateStrongPassword();
            while (evaluatePasswordStrength(newPassword) !== 'Strong') {
                newPassword = generateStrongPassword();
            }


            currUser.userPassword = newPassword;

            const response = await updateUser(currUser._id, currUser);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to update password");
            }

            toast.success("Password updated successfully.", {
                closeButton: true,
                duration: 10000
            })

            setNewGeneratedPassword(newPassword);
            // setResetConfirmation(false);
            setShowNewPassword(true);

        } catch (error: any) {
            toast.error(error.message || "Failed to update user information", {
                closeButton: true,
                duration: 10000,
            });
        } finally {
            setResetConfirmation(false);
            setLoading(false);
        }

    }




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

                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/users">
                                            Users
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            User details
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

                {(currUser && reservations) ? (

                    <main className="flex flex-col gap-4 p-8 pt-4">



                        {/* Page header */}
                        <div className="flex flex-row items-center gap-4">

                            {/* Return to Amenity List button */}
                            <Button
                                className="h-7 w-7 aspect-square hidden md:flex"
                                onClick={() => history.back()}
                                size="icon"
                                type="button"
                                variant="outline"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only"> Back </span>
                            </Button>

                            {/* Container for the header */}
                            <div className="flex flex-col">

                                {/* Page header */}
                                <h1 className="font-semibold text-2xl"> {currUser.userBlkLt + " details"} </h1>

                                {/* Page header description */}
                                <p className="font-light text-muted-foreground">
                                    View and manage details about each user, including their contact information, HOA role, account status, and recent activities within the community system.
                                </p>

                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>

                                    <Button
                                        className="ml-auto h-7 w-7 aspect-square"
                                        size="icon"
                                        variant="outline"
                                    >
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>

                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end" className="mt-1">

                                    <DropdownMenuGroup>
                                        {currUser.userVisibility === "Archived" ? (
                                            <DropdownMenuItem
                                                onClick={handleUnarchiveUser}
                                            >
                                                {loading ? <LoadingSpinner className="h-4 w-4" /> : <ArchiveX className="h-4 w-4" />}
                                                Unarchive
                                            </DropdownMenuItem>
                                        )
                                            : (
                                                <DropdownMenuItem
                                                    onClick={handleArchiveUser}
                                                >
                                                    <Archive className="h-4 w-4" />
                                                    Archive
                                                </DropdownMenuItem>
                                            )}
                                        <DropdownMenuItem
                                            onClick={() => setShowExportDialog(true)}
                                        >
                                            <Share className="h-4 w-4" />
                                            Export
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>


                                    {((currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner" && user.userRole === "Admin") ||
                                        (currUser.userRole === "Admin" && user.userRole === "Admin" && user.userPosition === "President")) && (

                                            <>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-red-500"
                                                    onClick={() => setResetConfirmation(true)}
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                    Reset password
                                                </DropdownMenuItem>
                                            </>
                                            
                                        )}


                                </DropdownMenuContent>

                            </DropdownMenu>



                        </div>

                        {bills && currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner" && (

                            <>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Membership status
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-1">
                                            <div className="text-2xl font-bold">
                                                {(currUser.userStatus === "Delinquent") ? <span className="text-warning"> Delinquent </span> : null}
                                                {(currUser.userStatus === "Outstanding") ? <span className="text-primary"> Outstanding </span> : null}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {(currUser.userStatus === "Delinquent") ? "They have pending overdue bills." : null}
                                                {(currUser.userStatus === "Outstanding") ? "They have a good history of payments." : null}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

                                            {billChoice === "Paid" ? <CardTitle className="text-sm font-medium"> Paid bills  </CardTitle> : billChoice === "Pending" ? <CardTitle className="text-sm font-medium"> Pending bills  </CardTitle> : billChoice === "Overdue" ? <CardTitle className="text-sm font-medium"> Overdue bills  </CardTitle> : <CardTitle className="text-sm font-medium"> All bills  </CardTitle>}

                                            <Select
                                                defaultValue="All"
                                                onValueChange={(value) => setBillChoice(value)}
                                            >
                                                <SelectTrigger className="max-w-36 h-fit">
                                                    <SelectValue placeholder="Select bill type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem value="All"> All </SelectItem>
                                                        <SelectItem value="Paid"> Paid </SelectItem>
                                                        <SelectItem value="Pending"> Pending </SelectItem>
                                                        <SelectItem value="Overdue"> Overdue </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                        </CardHeader>

                                        {billChoice === "All" && (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold"> {bills.length} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {bills.length > 0
                                                        ? `A total of ${bills.length} bills have been issued to this user.`
                                                        : "Unit owner has no bills."}
                                                </p>
                                            </CardContent>
                                        )}

                                        {billChoice === "Paid" && (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className={"text-2xl font-bold " + (paidBills && paidBills.length > 0 ? "text-primary" : null)}> {paidBills?.length} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {paidBills && paidBills.length > 0
                                                        ? `Out of ${bills.length} bills issued have been paid by this user.`
                                                        : "User has no paid bills."}
                                                </p>
                                            </CardContent>
                                        )}

                                        {billChoice === "Pending" && (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className={"text-2xl font-bold " + (pendingBills && pendingBills.length > 0 ? "text-warning" : null)}> {pendingBills?.length} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {pendingBills && pendingBills.length > 0
                                                        ? `The next bill due date is on ${new Date(Math.max(...pendingBills.map(bill => new Date(bill.billDueDate).getTime()))).toLocaleDateString()}.`
                                                        : "User has no pending bills."}
                                                </p>
                                            </CardContent>
                                        )}

                                        {billChoice === "Overdue" && (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className={"text-2xl font-bold " + (overdueBills && overdueBills.length > 0 ? "text-destructive" : null)}> {overdueBills?.length} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {overdueBills && overdueBills.length > 0
                                                        ? `The latest due date is on ${new Date(Math.max(...overdueBills.map(bill => new Date(bill.billDueDate).getTime()))).toLocaleDateString()}.`
                                                        : "User has no overdue bills."}
                                                </p>
                                            </CardContent>
                                        )}


                                    </Card>

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Average days to pay bills
                                            </CardTitle>
                                        </CardHeader>

                                        {averageRating && averageRating > 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-destructive"> {averageRating} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays late, {averageRating} days after the due date.
                                                </p>
                                            </CardContent>
                                        ) : averageRating && averageRating < 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-primary"> {Math.abs(averageRating)} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays on time, {Math.abs(averageRating)} days before the due date.

                                                </p>
                                            </CardContent>
                                        ) : (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold"> 0 </div>
                                                <p className="text-sm text-muted-foreground">
                                                    They have not paid any bills yet.
                                                </p>
                                            </CardContent>
                                        )}
                                    </Card>

                                </div>

                                {/* <div className="grid gap-4 md:grid-cols-2">

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Average days to pay bills
                                            </CardTitle>
                                        </CardHeader>

                                        {averageRating && averageRating > 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-destructive"> {averageRating} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays late, {averageRating} days after the due date.
                                                </p>
                                            </CardContent>
                                        ) : averageRating && averageRating < 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-primary"> {Math.abs(averageRating)} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays on time, {Math.abs(averageRating)} days before the due date.

                                                </p>
                                            </CardContent>
                                        ) : (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold"> 0 </div>
                                                <p className="text-sm text-muted-foreground">
                                                    They have not paid any bills yet.
                                                </p>
                                            </CardContent>
                                        )}
                                    </Card>

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">
                                                Average days to pay bills
                                            </CardTitle>
                                        </CardHeader>

                                        {averageRating && averageRating > 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-destructive"> {averageRating} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays late, {averageRating} days after the due date.
                                                </p>
                                            </CardContent>
                                        ) : averageRating && averageRating < 0 ? (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold text-primary"> {Math.abs(averageRating)} </div>
                                                <p className="text-sm text-muted-foreground">
                                                    Usually pays on time, {Math.abs(averageRating)} days before the due date.

                                                </p>
                                            </CardContent>
                                        ) : (
                                            <CardContent className="flex flex-col gap-1">
                                                <div className="text-2xl font-bold"> 0 </div>
                                                <p className="text-sm text-muted-foreground">
                                                    They have not paid any bills yet.
                                                </p>
                                            </CardContent>
                                        )}
                                    </Card>

                                </div> */}

                            </>


                        )}

                        <div className="grid gap-4 md:grid-cols-[250px_1fr] lg:grid-cols-3">

                            <div className="col-span-3 grid auto-rows-max items-start gap-6">

                                <Card className="sticky top-5">

                                    <CardHeader className="bg-muted/50 gap-0 space-y-0">

                                        <Label className="text-base font-semibold">
                                            User basic information
                                        </Label>
                                        <p className="text-sm text-muted-foreground"> Their username, display name, role in the system, position in the HOA, and their credentials. </p>

                                    </CardHeader>

                                    <CardContent className="flex flex-col justify-between gap-4 pt-5">

                                        <div className="flex flex-col lg:flex-row justify-between gap-4">

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User block and lot
                                                </Label>
                                                <p className="text-sm"> {currUser.userBlkLt} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User role
                                                </Label>
                                                <p className="text-sm"> {currUser.userRole} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User position
                                                </Label>
                                                <p className="text-sm"> {currUser.userPosition} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User membership status
                                                </Label>
                                                <p className="text-sm"> {currUser.userStatus} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User visibility
                                                </Label>
                                                <p className="text-sm"> {currUser.userVisibility} </p>
                                            </div>

                                        </div>

                                        <div className="flex flex-col lg:flex-row justify-between gap-4 pt-5">

                                            {((currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner" && user.userRole === "Admin") ||
                                                (currUser.userRole === "Admin" && user.userRole === "Admin" && user.userPosition === "President")) && (
                                                    <div className="flex flex-col gap-1.5">
                                                        <Label className="text-sm text-muted-foreground font-light">
                                                            User password
                                                        </Label>

                                                        <Button
                                                            onClick={() => setResetConfirmation(true)}
                                                            size="sm"
                                                            variant="destructive"
                                                        >
                                                            <RotateCcw />
                                                            Reset password
                                                        </Button>
                                                    </div>
                                                )}

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User email
                                                </Label>

                                                {currUser.userEmail ? (
                                                    <p className="text-sm"> {currUser.userEmail} </p>
                                                )
                                                    : (
                                                        <p className="text-sm"> No email provided. </p>
                                                    )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User mobile no.
                                                </Label>

                                                {currUser.userMobileNo ? (
                                                    <p className="text-sm"> {currUser.userMobileNo} </p>
                                                )
                                                    : (
                                                        <p className="text-sm"> No mobile number provided. </p>
                                                    )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User created at
                                                </Label>

                                                <p className="text-sm"> {format(currUser.createdAt, "Pp")} </p>
                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            </div>

                            {amenities && bills && users && currUser.userRole === "Admin" && currUser.userPosition !== "Unit Owner" && (

                                <Tabs
                                    className="col-span-3 grid auto-rows-max item-start mt-4"
                                    defaultValue="amenities"
                                >

                                    <TabsList className="p-0 mb-6 justify-start h-fit w-full rounded-none border-b bg-transparent overflow-x-hidden overflow-y-auto mb-5">
                                        <TabsTrigger value="amenities" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Amenities </TabsTrigger>
                                        <TabsTrigger value="announcements" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Announcements </TabsTrigger>
                                        <TabsTrigger value="bills" className="rounded-none px-4 !bg-transzparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Bills </TabsTrigger>
                                        <TabsTrigger value="reservations" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Reservations </TabsTrigger>
                                        <TabsTrigger value="users" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Users </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="amenities" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} amenities </h1>
                                            <p className="text-sm text-muted-foreground"> A list of all amenities created by this admin. </p>
                                        </div>

                                        <UserAmenityTable data={amenities} columns={AmenityTableColumns} />
                                    </TabsContent>

                                    <TabsContent value="bills" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} bills </h1>
                                            <p className="text-sm text-muted-foreground"> Amenities inaccessible from unit owners. </p>
                                        </div>

                                        <UserBillTable data={bills} columns={UserBillTableColumns} currUser={currUser} />
                                    </TabsContent>

                                    <TabsContent value="reservations" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} reservations </h1>
                                            <p className="text-sm text-muted-foreground">A list of all reservations placed by this admin. </p>
                                        </div>

                                        <UserReservationTable data={reservations} columns={UserReservationTableColumns} />
                                    </TabsContent>

                                    <TabsContent value="users" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} users </h1>
                                            <p className="text-sm text-muted-foreground"> A list of all users created by this admin. </p>
                                        </div>

                                        <UserUserTable data={users} columns={UserTableColumns} />
                                    </TabsContent>

                                </Tabs>

                            )}

                            {bills && currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner" && (

                                <Tabs
                                    className="col-span-3 grid auto-rows-max item-start mt-4"
                                    defaultValue="bills"
                                >

                                    <TabsList className="p-0 mb-6 justify-start h-fit w-full rounded-none border-b bg-transparent overflow-x-hidden overflow-y-auto mb-5">
                                        <TabsTrigger value="bills" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Bills </TabsTrigger>
                                        <TabsTrigger value="reservations" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Reservations </TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="bills" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} bills </h1>
                                            <p className="text-sm text-muted-foreground"> A list of all bills issued to this unit owner. </p>
                                        </div>

                                        <UserBillTable data={bills} columns={UserBillTableColumns} currUser={currUser} />
                                    </TabsContent>

                                    <TabsContent value="reservations" className="flex flex-col gap-4 m-0">

                                        <div className="flex flex-col">
                                            <h1 className="font-medium"> {currUser.userBlkLt} reservations </h1>
                                            <p className="text-sm text-muted-foreground"> A list of all reservations placed by this unit owner. </p>
                                        </div>

                                        <UserReservationTable data={reservations} columns={UserReservationTableColumns} />
                                    </TabsContent>

                                </Tabs>

                            )}

                        </div>

                        <AlertDialog
                            open={resetConfirmation}
                            onOpenChange={setResetConfirmation}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Reset password?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will generate a new password for this user that will be shown to you only once.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        disabled={loading}
                                        onClick={() => {
                                            handleResetPassword();
                                        }}
                                    >
                                        {loading ? <LoadingSpinner className="h-4 w-4" /> : null}
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Dialog
                            open={showNewPassword}
                            onOpenChange={() => { setShowNewPassword(false); setNewGeneratedPassword("") }}
                        >
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle> New password </DialogTitle>
                                    <DialogDescription>
                                        Copy the new password below and show it to the user. This will only be shown once and will be lost forever.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-2">
                                    <div className="relative flex">
                                        <Input id="newPassword" value={newGeneratedPassword} className="col-span-3" type={showPassword ? "text" : "password"} />
                                        <Button
                                            className="absolute w-7 h-7 top-[6px] right-0.5 bg-background hover:bg-background cursor-pointer"
                                            onClick={() => setShowPassword(!showPassword)}
                                            type="button"
                                        >
                                            {showPassword ? <Eye className="text-muted-foreground w-4 h-4 right-0 top-0" /> : <EyeOff className="text-muted-foreground w-4 h-4 right-3 top-3" />}
                                        </Button>
                                        <Button
                                            className="absolute w-7 h-7 top-[6px] right-7 bg-background hover:bg-background cursor-pointer"
                                            onClick={() => { navigator.clipboard.writeText(newGeneratedPassword); toast.success("Password copied to clipboard.", { closeButton: true, duration: 10000 }) }}
                                            type="button"
                                        >
                                            <Copy className="text-muted-foreground w-4 h-4 right-0 top-0" />
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>

                            <DialogContent className="md:min-w-[70%] max-h-[80%] overflow-scroll">

                                {/* Export options header */}
                                <DialogHeader>

                                    <DialogTitle>
                                        Export Options
                                    </DialogTitle>

                                    <DialogDescription>
                                        Please select the information to include in the export. All are selected by default.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* User basic information */}
                                {currUser && currUser.userRole === "Unit Owner" && currUser.userPosition === "Unit Owner" && (
                                    <>

                                        <div
                                            className={"flex items-center justify-between w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 cursor-pointer "
                                                + (!includeUserBasicInfo ? "text-muted-foreground/50" : "text-white/90")
                                            }
                                            onClick={() => setIncludeUserBasicInfo(!includeUserBasicInfo)}
                                        >
                                            <Label className="text-sm"> Unit owner basic information </Label>
                                            <Checkbox
                                                checked={includeUserBasicInfo}
                                                onCheckedChange={(checked) => setIncludeUserBasicInfo(!!checked)}
                                            />
                                        </div>

                                        <Collapsible
                                            className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                                            disabled={!includeUserBills}
                                            onOpenChange={setShowBillOptions}
                                            open={!includeUserBills ? false : showBillOptions}
                                        >

                                            <Checkbox
                                                checked={includeUserBills}
                                                onCheckedChange={(checked) => setIncludeUserBills(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeUserBills ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Unit owner bills </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showBillOptions || !includeUserBills ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="">

                                                <div className="flex flex-wrap gap-y-6 gap-x-16 my-4">

                                                    {/* Export bill due date range */}
                                                    <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export bill due date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included bill due dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> All dates included by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export bills due on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillDueDateRange?.from && exportBillDueDateRange?.to
                                                                            ? `${format(exportBillDueDateRange.from, "MMM d, yyyy")} - ${format(exportBillDueDateRange.to, "MMM d, yyyy")}`
                                                                            : "All due dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillDueDateRange?.from}
                                                                        selected={exportBillDueDateRange}
                                                                        onSelect={setExportBillDueDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Export bill creation date range */}
                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export bill creation date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included bill creation dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> All dates included by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export bills created on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillCreationDateRange?.from && exportBillCreationDateRange?.to
                                                                            ? `${format(exportBillCreationDateRange.from, "MMM d, yyyy")} - ${format(exportBillCreationDateRange.to, "MMM d, yyyy")}`
                                                                            : "All creation dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillCreationDateRange?.from}
                                                                        selected={exportBillCreationDateRange}
                                                                        onSelect={setExportBillCreationDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Export paid date range */}
                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export paid date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included paid dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> Include all dates by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export bills paid on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillPaidDateRange?.from && exportBillPaidDateRange?.to
                                                                            ? `${format(exportBillPaidDateRange.from, "MMM d, yyyy")} - ${format(exportBillPaidDateRange.to, "MMM d, yyyy")}`
                                                                            : "All paid dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillPaidDateRange?.from}
                                                                        selected={exportBillPaidDateRange}
                                                                        onSelect={setExportBillPaidDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                    </div>

                                                    <div className="w-full">
                                                        <div className="flex flex-col gap-4 pt-1 pb-4">

                                                            <Label className="text-sm text-muted-foreground"> Bill status </Label>

                                                            <div className="flex flex-row flex-wrap gap-12">

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.length === 3}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([
                                                                                    'Pending',
                                                                                    'Paid',
                                                                                    'Overdue',
                                                                                ]);
                                                                            } else {
                                                                                setBillExportStatus([]);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> All </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Pending')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Pending']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Pending'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Pending </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Paid')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Paid']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Paid'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Paid </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Overdue')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Overdue']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Overdue'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Overdue </Label>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* Export reservation visibility */}
                                                    {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                                        <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                            {/* Export visibility header */}
                                                            <Label className="text-sm text-muted-foreground"> Bill visibility </Label>

                                                            {/* Export visibility input */}
                                                            <Select
                                                                defaultValue="Unarchived"
                                                                onValueChange={(value) => setBillExportVisibility(value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select visibility of exported bills" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="All"> All </SelectItem>
                                                                        <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                        <SelectItem value="Archived"> Archived </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>

                                                        </div>

                                                    )}

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export type header */}
                                                        <Label className="text-sm text-muted-foreground"> Bill type </Label>

                                                        {/* Export type input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setBillExportType(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type of exported bills" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="One-time"> One-time </SelectItem>
                                                                    <SelectItem value="Recurring"> Recurring </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                </div>

                                            </CollapsibleContent>

                                        </Collapsible>

                                        <Collapsible
                                            className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                                            disabled={!includeUserReservations}
                                            onOpenChange={setShowReservationOptions}
                                            open={!includeUserReservations ? false : showReservationOptions}
                                        >

                                            <Checkbox
                                                checked={includeUserReservations}
                                                onCheckedChange={(checked) => setIncludeUserReservations(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeUserReservations ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Unit owner reservations </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showReservationOptions || !includeUserReservations ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="">

                                                {/* Export options content */}
                                                <div className="flex flex-wrap gap-y-3 gap-x-16 my-4">

                                                    {/* Export reservation date range amenities */}
                                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                                        {/* Export reservation date range header */}
                                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            Included reservation dates
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                            <Info className="w-4 h-4" />
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p> Include all dates by default. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </Label>

                                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                            Export reservations placed on these dates:
                                                        </p>

                                                        {/* Date Range Filter Button */}
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    className="justify-start font-normal"
                                                                    id="date"
                                                                    variant="outline"
                                                                >
                                                                    <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                    {exportReservationDateRange?.from && exportReservationDateRange?.to
                                                                        ? `${format(exportReservationDateRange.from, "MMM d, yyyy")} - ${format(exportReservationDateRange.to, "MMM d, yyyy")}`
                                                                        : "All reservation dates"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit">
                                                                <Calendar
                                                                    initialFocus
                                                                    mode="range"
                                                                    defaultMonth={exportReservationDateRange?.from}
                                                                    selected={exportReservationDateRange}
                                                                    onSelect={setExportReservationDateRange}
                                                                    numberOfMonths={2}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    {/* Export created date range amenities */}
                                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                                        {/* Export including other amenities header */}
                                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            Included creation dates
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                            <Info className="w-4 h-4" />
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p> Include all dates by default. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </Label>
                                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                            Export reservations created within these dates:
                                                        </p>

                                                        {/* Date Range Filter Button */}
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    className="justify-start font-normal"
                                                                    id="date"
                                                                    variant="outline"
                                                                >
                                                                    <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                    {exportReservationCreationDateRange?.from && exportReservationCreationDateRange?.to
                                                                        ? `${format(exportReservationCreationDateRange.from, "MMM d, yyyy")} - ${format(exportReservationCreationDateRange.to, "MMM d, yyyy")}`
                                                                        : "All creation dates"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit">
                                                                <Calendar
                                                                    initialFocus
                                                                    mode="range"
                                                                    defaultMonth={exportReservationCreationDateRange?.from}
                                                                    selected={exportReservationCreationDateRange}
                                                                    onSelect={setExportReservationCreationDateRange}
                                                                    numberOfMonths={2}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    {/* Export reservation status */}
                                                    <div className="flex flex-col gap-4 pt-1 pb-4 w-full">
                                                        <Label className="text-sm text-muted-foreground"> Reservation Status </Label>
                                                        <div className="flex flex-row flex-wrap gap-12">
                                                            {[
                                                                { label: 'All', value: 'All', statuses: ['Pending', 'Cancelled', 'Void', 'Approved', 'Rejected', 'Ongoing', 'For Return', 'Returned', 'Completed'] },
                                                                { label: 'Pending', value: 'Pending' },
                                                                { label: 'Approved', value: 'Approved' },
                                                                { label: 'Rejected', value: 'Rejected' },
                                                                { label: 'Ongoing', value: 'Ongoing' },
                                                                { label: 'Void', value: 'Void' },
                                                                { label: 'Cancelled', value: 'Cancelled' },
                                                                { label: 'For Return', value: 'For Return' },
                                                                { label: 'Returned', value: 'Returned' },
                                                                { label: 'Completed', value: 'Completed' }
                                                            ].map(({ label, value, statuses }) => (
                                                                <div key={value} className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={value === 'All' ? exportReservationStatus.length === 9 : exportReservationStatus.includes(value)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (value === 'All') {
                                                                                setExportReservationStatus(checked ? statuses ?? [] : []);
                                                                            } else {
                                                                                setExportReservationStatus(checked ? [...exportReservationStatus, value] : exportReservationStatus.filter(status => status !== value));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> {label} </Label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Export reservation visibility */}
                                                    {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                                        <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                            {/* Export visibility header */}
                                                            <Label className="text-sm text-muted-foreground"> Reservation visibility </Label>

                                                            {/* Export visibility input */}
                                                            <Select
                                                                defaultValue="Unarchived"
                                                                onValueChange={(value) => setExportReservationVisibility(value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select visibility of exported reservations" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="All"> All </SelectItem>
                                                                        <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                        <SelectItem value="Archived"> Archived </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>

                                                        </div>

                                                    )}


                                                    {/* Export reservation type */}
                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export reservation type header */}
                                                        <Label className="text-sm text-muted-foreground"> Reservation types </Label>

                                                        {/* Export reservation type input */}
                                                        <Select
                                                            defaultValue="Equipment and Facility"
                                                            onValueChange={(value) => setExportReservationType(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select types of reservations" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="Equipment"> Equipment </SelectItem>
                                                                    <SelectItem value="Facility"> Facility </SelectItem>
                                                                    <SelectItem value="Equipment and Facility"> Equipment and Facility </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                                        <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                            {/* Export creator type header */}
                                                            <Label className="text-sm text-muted-foreground"> Author role </Label>

                                                            {/* Export creator type input */}
                                                            <Select
                                                                defaultValue="All"
                                                                onValueChange={(value) => setExportReservationAuthorRole(value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select user roles" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="All"> All </SelectItem>
                                                                        <SelectItem value="Unit Owners"> Unit Owners </SelectItem>
                                                                        <SelectItem value="Admins"> Admins </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                    )}


                                                </div>

                                            </CollapsibleContent>

                                        </Collapsible>

                                    </>
                                )}

                                {/* User basic information */}
                                {currUser && currUser.userRole === "Admin" && currUser.userPosition !== "Unit Owner" && (
                                    <>

                                        <div
                                            className={"flex items-center justify-between w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 cursor-pointer "
                                                + (!includeUserBasicInfo ? "text-muted-foreground/50" : "text-white/90")
                                            }
                                            onClick={() => setIncludeUserBasicInfo(!includeUserBasicInfo)}
                                        >
                                            <Label className="text-sm"> Admin basic information </Label>
                                            <Checkbox
                                                checked={includeUserBasicInfo}
                                                onCheckedChange={(checked) => setIncludeUserBasicInfo(!!checked)}
                                            />
                                        </div>

                                        <Collapsible
                                            className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                                            disabled={!includeUserReservations}
                                            onOpenChange={setShowReservationOptions}
                                            open={!includeUserReservations ? false : showReservationOptions}
                                        >

                                            <Checkbox
                                                checked={includeUserReservations}
                                                onCheckedChange={(checked) => setIncludeUserReservations(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeUserReservations ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Admin reservations </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showReservationOptions || !includeUserReservations ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="">

                                                {/* Export options content */}
                                                <div className="flex flex-wrap gap-y-3 gap-x-16 my-4">

                                                    {/* Export reservation date range amenities */}
                                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                                        {/* Export reservation date range header */}
                                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            Included reservation dates
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                            <Info className="w-4 h-4" />
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p> Include all dates by default. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </Label>

                                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                            Export reservations placed on these dates:
                                                        </p>

                                                        {/* Date Range Filter Button */}
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    className="justify-start font-normal"
                                                                    id="date"
                                                                    variant="outline"
                                                                >
                                                                    <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                    {exportReservationDateRange?.from && exportReservationDateRange?.to
                                                                        ? `${format(exportReservationDateRange.from, "MMM d, yyyy")} - ${format(exportReservationDateRange.to, "MMM d, yyyy")}`
                                                                        : "All reservation dates"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit">
                                                                <Calendar
                                                                    initialFocus
                                                                    mode="range"
                                                                    defaultMonth={exportReservationDateRange?.from}
                                                                    selected={exportReservationDateRange}
                                                                    onSelect={setExportReservationDateRange}
                                                                    numberOfMonths={2}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    {/* Export created date range amenities */}
                                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                                        {/* Export including other amenities header */}
                                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            Included creation dates
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                            <Info className="w-4 h-4" />
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p> Include all dates by default. </p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </Label>
                                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                            Export reservations created within these dates:
                                                        </p>

                                                        {/* Date Range Filter Button */}
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    className="justify-start font-normal"
                                                                    id="date"
                                                                    variant="outline"
                                                                >
                                                                    <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                    {exportReservationCreationDateRange?.from && exportReservationCreationDateRange?.to
                                                                        ? `${format(exportReservationCreationDateRange.from, "MMM d, yyyy")} - ${format(exportReservationCreationDateRange.to, "MMM d, yyyy")}`
                                                                        : "All creation dates"}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-fit">
                                                                <Calendar
                                                                    initialFocus
                                                                    mode="range"
                                                                    defaultMonth={exportReservationCreationDateRange?.from}
                                                                    selected={exportReservationCreationDateRange}
                                                                    onSelect={setExportReservationCreationDateRange}
                                                                    numberOfMonths={2}
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    {/* Export reservation status */}
                                                    <div className="flex flex-col gap-4 pt-1 pb-4 w-full">
                                                        <Label className="text-sm text-muted-foreground"> Reservation Status </Label>
                                                        <div className="flex flex-row flex-wrap gap-12">
                                                            {[
                                                                { label: 'All', value: 'All', statuses: ['Pending', 'Cancelled', 'Void', 'Approved', 'Rejected', 'Ongoing', 'For Return', 'Returned', 'Completed'] },
                                                                { label: 'Pending', value: 'Pending' },
                                                                { label: 'Approved', value: 'Approved' },
                                                                { label: 'Rejected', value: 'Rejected' },
                                                                { label: 'Ongoing', value: 'Ongoing' },
                                                                { label: 'Void', value: 'Void' },
                                                                { label: 'Cancelled', value: 'Cancelled' },
                                                                { label: 'For Return', value: 'For Return' },
                                                                { label: 'Returned', value: 'Returned' },
                                                                { label: 'Completed', value: 'Completed' }
                                                            ].map(({ label, value, statuses }) => (
                                                                <div key={value} className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={value === 'All' ? exportReservationStatus.length === 9 : exportReservationStatus.includes(value)}
                                                                        onCheckedChange={(checked) => {
                                                                            if (value === 'All') {
                                                                                setExportReservationStatus(checked ? statuses ?? [] : []);
                                                                            } else {
                                                                                setExportReservationStatus(checked ? [...exportReservationStatus, value] : exportReservationStatus.filter(status => status !== value));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> {label} </Label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Export reservation visibility */}
                                                    {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                                        <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                            {/* Export visibility header */}
                                                            <Label className="text-sm text-muted-foreground"> Reservation visibility </Label>

                                                            {/* Export visibility input */}
                                                            <Select
                                                                defaultValue="Unarchived"
                                                                onValueChange={(value) => setExportReservationVisibility(value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select visibility of exported reservations" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="All"> All </SelectItem>
                                                                        <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                        <SelectItem value="Archived"> Archived </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>

                                                        </div>

                                                    )}


                                                    {/* Export reservation type */}
                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export reservation type header */}
                                                        <Label className="text-sm text-muted-foreground"> Reservation types </Label>

                                                        {/* Export reservation type input */}
                                                        <Select
                                                            defaultValue="Equipment and Facility"
                                                            onValueChange={(value) => setExportReservationType(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select types of reservations" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="Equipment"> Equipment </SelectItem>
                                                                    <SelectItem value="Facility"> Facility </SelectItem>
                                                                    <SelectItem value="Equipment and Facility"> Equipment and Facility </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                                        <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                            {/* Export creator type header */}
                                                            <Label className="text-sm text-muted-foreground"> Author role </Label>

                                                            {/* Export creator type input */}
                                                            <Select
                                                                defaultValue="All"
                                                                onValueChange={(value) => setExportReservationAuthorRole(value)}
                                                            >
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select user roles" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectItem value="All"> All </SelectItem>
                                                                        <SelectItem value="Unit Owners"> Unit Owners </SelectItem>
                                                                        <SelectItem value="Admins"> Admins </SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>

                                                    )}


                                                </div>

                                            </CollapsibleContent>

                                        </Collapsible>

                                        <Collapsible
                                            className="relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                                            disabled={!includeAdminAmenities}
                                            onOpenChange={setShowAmenityOptions}
                                            open={!includeAdminAmenities ? false : showAmenityOptions}
                                        >

                                            <Checkbox
                                                checked={includeAdminAmenities}
                                                onCheckedChange={(checked) => setIncludeAdminAmenities(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeAdminAmenities ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Amenities created by this admin </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showAmenityOptions || !includeAdminAmenities ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent>

                                                <div className="flex flex-wrap gap-y-3 gap-x-16 my-4">

                                                    {/* Export reservation date range amenities */}

                                                    <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export reservation date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included creation dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> Include all dates by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export amenities created within these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportAmenityCreationDateRange?.from && exportAmenityCreationDateRange?.to
                                                                            ? `${format(exportAmenityCreationDateRange.from, "MMM d, yyyy")} - ${format(exportAmenityCreationDateRange.to, "MMM d, yyyy")}`
                                                                            : "All creation dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportAmenityCreationDateRange?.from}
                                                                        selected={exportAmenityCreationDateRange}
                                                                        onSelect={setExportAmenityCreationDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                    </div>

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export type header */}
                                                        <Label className="text-sm text-muted-foreground"> Amenity type </Label>

                                                        {/* Export type input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setExportAmenityType(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type of exported amenities" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Equipment"> Equipment </SelectItem>
                                                                    <SelectItem value="Facility"> Facility </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export visibility header */}
                                                        <Label className="text-sm text-muted-foreground"> Amenity visibility </Label>

                                                        {/* Export visibility input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setExportAmenityVisibility(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select visibility of exported amenities" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                    <SelectItem value="Archived"> Archived </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                </div>



                                            </CollapsibleContent>


                                        </Collapsible>

                                        <Collapsible
                                            className={"relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"}
                                            disabled={!includeUserBills}
                                            onOpenChange={setShowBillOptions}
                                            open={!includeUserBills ? false : showBillOptions}
                                        >

                                            <Checkbox
                                                checked={includeUserBills}
                                                onCheckedChange={(checked) => setIncludeUserBills(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeUserBills ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Bills created by this admin </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showBillOptions || !includeUserBills ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="">

                                                <div className="flex flex-wrap gap-y-6 gap-x-16 my-4">

                                                    {/* Export bill due date range */}
                                                    <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export bill due date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included bill due dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> All dates included by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export bills due on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillDueDateRange?.from && exportBillDueDateRange?.to
                                                                            ? `${format(exportBillDueDateRange.from, "MMM d, yyyy")} - ${format(exportBillDueDateRange.to, "MMM d, yyyy")}`
                                                                            : "All due dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillDueDateRange?.from}
                                                                        selected={exportBillDueDateRange}
                                                                        onSelect={setExportBillDueDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Export bill creation date range */}
                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export bill creation date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included bill creation dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> All dates included by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export bills created on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillCreationDateRange?.from && exportBillCreationDateRange?.to
                                                                            ? `${format(exportBillCreationDateRange.from, "MMM d, yyyy")} - ${format(exportBillCreationDateRange.to, "MMM d, yyyy")}`
                                                                            : "All creation dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillCreationDateRange?.from}
                                                                        selected={exportBillCreationDateRange}
                                                                        onSelect={setExportBillCreationDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                        {/* Export paid date range */}
                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export paid date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included paid dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> Include all dates by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export payors paid on these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportBillPaidDateRange?.from && exportBillPaidDateRange?.to
                                                                            ? `${format(exportBillPaidDateRange.from, "MMM d, yyyy")} - ${format(exportBillPaidDateRange.to, "MMM d, yyyy")}`
                                                                            : "All paid dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportBillPaidDateRange?.from}
                                                                        selected={exportBillPaidDateRange}
                                                                        onSelect={setExportBillPaidDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>

                                                    </div>

                                                    <div className="w-full">
                                                        <div className="flex flex-col gap-4 pt-1 pb-4">

                                                            <Label className="text-sm text-muted-foreground"> Bill status </Label>

                                                            <div className="flex flex-row flex-wrap gap-12">

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.length === 3}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([
                                                                                    'Pending',
                                                                                    'Paid',
                                                                                    'Overdue',
                                                                                ]);
                                                                            } else {
                                                                                setBillExportStatus([]);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> All </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Pending')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Pending']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Pending'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Pending </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Paid')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Paid']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Paid'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Paid </Label>
                                                                </div>

                                                                <div className="flex items-center gap-2">
                                                                    <Checkbox
                                                                        checked={exportBillStatus.includes('Overdue')}
                                                                        onCheckedChange={(checked) => {
                                                                            if (checked) {
                                                                                setBillExportStatus([...exportBillStatus, 'Overdue']);
                                                                            } else {
                                                                                setBillExportStatus(exportBillStatus.filter(status => status !== 'Overdue'));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <Label className="text-sm"> Overdue </Label>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>

                                                    {/* Export reservation visibility */}
                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export visibility header */}
                                                        <Label className="text-sm text-muted-foreground"> Bill visibility </Label>

                                                        {/* Export visibility input */}
                                                        <Select
                                                            defaultValue="Unarchived"
                                                            onValueChange={(value) => setBillExportVisibility(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select visibility of exported bills" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                    <SelectItem value="Archived"> Archived </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export type header */}
                                                        <Label className="text-sm text-muted-foreground"> Bill type </Label>

                                                        {/* Export type input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setBillExportType(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type of exported bills" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="One-time"> One-time </SelectItem>
                                                                    <SelectItem value="Recurring"> Recurring </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                </div>

                                            </CollapsibleContent>

                                        </Collapsible>

                                        <Collapsible
                                            className="relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                                            disabled={!includeAdminUsers}
                                            onOpenChange={setShowUserOptions}
                                            open={!includeAdminUsers ? false : showUserOptions}
                                        >

                                            <Checkbox
                                                checked={includeAdminUsers}
                                                onCheckedChange={(checked) => setIncludeAdminUsers(!!checked)}
                                                className="absolute top-5 right-6 z-50"
                                            />

                                            <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                                                + (!includeAdminUsers ? "text-muted-foreground/50" : "text-white/90")}
                                            >

                                                <Label className="text-sm cursor-pointer"> Users created by this admin </Label>
                                                <div className="flex items-center justify-center h-6 w-6 rounded-md hover:bg-accent">
                                                    {!showUserOptions || !includeAdminUsers ? <ChevronDown className="h-4 w-4" />
                                                        : < ChevronUp className="h-4 w-4" />}
                                                </div>

                                            </CollapsibleTrigger>

                                            <CollapsibleContent>
                                                <div className="flex flex-wrap gap-y-3 gap-x-16 my-4">

                                                    <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                                        <div className="flex-intial min-w-[250px] flex flex-col">

                                                            {/* Export reservation date range header */}
                                                            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                Included user creation dates
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                                <Info className="w-4 h-4" />
                                                                            </div>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p> Include all dates by default. </p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </Label>

                                                            <p className="font-light text-sm text-muted-foreground pb-1.5">
                                                                Export users created within these dates:
                                                            </p>

                                                            {/* Date Range Filter Button */}
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        className="justify-start font-normal"
                                                                        id="date"
                                                                        variant="outline"
                                                                    >
                                                                        <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                                        {exportUserCreationDateRange?.from && exportUserCreationDateRange?.to
                                                                            ? `${format(exportUserCreationDateRange.from, "MMM d, yyyy")} - ${format(exportUserCreationDateRange.to, "MMM d, yyyy")}`
                                                                            : "All creation dates"}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-fit">
                                                                    <Calendar
                                                                        initialFocus
                                                                        mode="range"
                                                                        defaultMonth={exportUserCreationDateRange?.from}
                                                                        selected={exportUserCreationDateRange}
                                                                        onSelect={setExportUserCreationDateRange}
                                                                        numberOfMonths={2}
                                                                    />
                                                                </PopoverContent>
                                                            </Popover>

                                                        </div>

                                                    </div>

                                                    {exportUserRole && exportUserRole === "All" && (

                                                        <div className="flex flex-col gap-4 pt-1 pb-4 w-full">
                                                            <Label className="text-sm text-muted-foreground"> User positions </Label>
                                                            <div className="flex flex-row flex-wrap gap-12">
                                                                {[
                                                                    { label: 'All', value: 'All', positions: ['Unit Owner', 'Admin', 'Auditor', 'Treasurer', 'Secretary', 'Vice President', 'President'] },
                                                                    { label: 'Unit Owner', value: 'Unit Owner' },
                                                                    { label: 'Admin', value: 'Admin' },
                                                                    { label: 'Auditor', value: 'Auditor' },
                                                                    { label: 'Treasurer', value: 'Treasurer' },
                                                                    { label: 'Secretary', value: 'Secretary' },
                                                                    { label: 'Vice President', value: 'Vice President' },
                                                                    { label: 'President', value: 'President' },
                                                                ].map(({ label, value, positions: statuses }) => (
                                                                    <div key={value} className="flex items-center gap-2">
                                                                        <Checkbox
                                                                            checked={value === 'All' ? exportUserPosition.length === 7 : exportUserPosition.includes(value)}
                                                                            onCheckedChange={(checked) => {
                                                                                if (value === 'All') {
                                                                                    setExportUserPosition(checked ? statuses ?? [] : []);
                                                                                } else {
                                                                                    setExportUserPosition(checked ? [...exportUserPosition, value] : exportUserPosition.filter(status => status !== value));
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label className="text-sm"> {label} </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    )}

                                                    {exportUserRole && exportUserRole === "Admin" && (

                                                        <div className="flex flex-col gap-4 pt-1 pb-4 w-full">
                                                            <Label className="text-sm text-muted-foreground"> User positions </Label>
                                                            <div className="flex flex-row flex-wrap gap-12">
                                                                {[
                                                                    { label: 'All', value: 'All', positions: ['Admin', 'Auditor', 'Treasurer', 'Secretary', 'Vice President', 'President'] },
                                                                    { label: 'Admin', value: 'Admin' },
                                                                    { label: 'Auditor', value: 'Auditor' },
                                                                    { label: 'Treasurer', value: 'Treasurer' },
                                                                    { label: 'Secretary', value: 'Secretary' },
                                                                    { label: 'Vice President', value: 'Vice President' },
                                                                    { label: 'President', value: 'President' },
                                                                ].map(({ label, value, positions: statuses }) => (
                                                                    <div key={value} className="flex items-center gap-2">
                                                                        <Checkbox
                                                                            checked={value === 'All' ? exportUserPosition.length === 6 : exportUserPosition.includes(value)}
                                                                            onCheckedChange={(checked) => {
                                                                                if (value === 'All') {
                                                                                    setExportUserPosition(checked ? statuses ?? [] : []);
                                                                                } else {
                                                                                    setExportUserPosition(checked ? [...exportUserPosition, value] : exportUserPosition.filter(status => status !== value));
                                                                                }
                                                                            }}
                                                                        />
                                                                        <Label className="text-sm"> {label} </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    )}


                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export visibility header */}
                                                        <Label className="text-sm text-muted-foreground"> User visibility </Label>

                                                        {/* Export visibility input */}
                                                        <Select
                                                            defaultValue="Unarchived"
                                                            onValueChange={(value) => setExportUserVisibility(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select visibility of exported users" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                                    <SelectItem value="Archived"> Archived </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export status header */}
                                                        <Label className="text-sm text-muted-foreground"> User status </Label>

                                                        {/* Export status input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setExportUserStatus(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select visibility of exported users" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Outstanding"> Outstanding </SelectItem>
                                                                    <SelectItem value="Delinquent"> Delinquent </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                                        {/* Export role header */}
                                                        <Label className="text-sm text-muted-foreground"> User role </Label>

                                                        {/* Export role input */}
                                                        <Select
                                                            defaultValue="All"
                                                            onValueChange={(value) => setExportUserRole(value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select role of exported users" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectItem value="All"> All </SelectItem>
                                                                    <SelectItem value="Admin"> Admin </SelectItem>
                                                                    <SelectItem value="Unit Owner"> Unit Owner </SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>

                                                    </div>

                                                </div>

                                            </CollapsibleContent>


                                        </Collapsible>

                                    </>
                                )}

                                <DialogFooter>

                                    <DropdownMenu>

                                        <DropdownMenuTrigger asChild>

                                            <Button
                                                disabled={loading}
                                                size="sm"
                                            >
                                                {loading ? <LoadingSpinner className="h-7 w-7" /> : <Download className="h-7 w-7" />}
                                                Download
                                                <ChevronDown className="h-7 w-7" />
                                            </Button>

                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="center" className="mt-1">
                                            <DropdownMenuItem
                                            // onClick={() => handleExport("excel")}
                                            >
                                                .xslx
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                            // onClick={() => handleExport("csv")}
                                            >
                                                .csv
                                            </DropdownMenuItem>

                                        </DropdownMenuContent>

                                    </DropdownMenu>

                                </DialogFooter>

                            </DialogContent>

                        </Dialog>

                    </main>



                ) : (
                    <div className="flex w-full h-full gap-2 items-center justify-center opacity-90">
                        <LoadingSpinner className="h-6 w-6" />
                        <span className="text-sm"> Loading </span>
                    </div>
                )}


            </SidebarInset>

        </SidebarProvider>
    )
}