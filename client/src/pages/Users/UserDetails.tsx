


// Imports
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

// shadcn Dropdown Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn Select Component Import
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"
// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
// shadcn Toast Import
import { toast } from "sonner"



// Custom Components Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Data table imports
// Data table column definitions imports
// Data table component import



// Hooks Imports
// Authentication Hook Import



// Utility Imports
// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Reservation Type Import
import { UserType } from "@/types/user-type"



// Data Imports
import { archiveUser, getSingleUser, unarchiveUser } from "@/data/user-api"
import { Button } from "@/components/ui/button"
import { Archive, ArchiveX, ChevronLeft, EllipsisVertical, RotateCcw, Share } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ReservationType } from "@/types/reservation-type"
import { getUserUnarchivedReservations } from "@/data/reservation-api"
import { BillType } from "@/types/bill-type"
import { getUserBills } from "@/data/bills-api"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner"
import { format } from "date-fns"
import UserReservationTable from "./UserReservationTable"
import { UserReservationTableColumns } from "./UserReservationColumns"
import { useAuthContext } from "@/hooks/useAuthContext"





export default function UserDetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Reservations state
    const [users, setUsers] = useState<UserType>();

    const [reservations, setReservations] = useState<ReservationType[]>();

    const [loading, setLoading] = useState<boolean>(false);

    const [bills, setBills] = useState<BillType[]>();

    const [billChoice, setBillChoice] = useState<string>("Pending");

    const [pendingBills, setPendingBills] = useState<BillType[]>();

    const [paidBills, setPaidBills] = useState<BillType[]>();

    const [overdueBills, setOverdueBills] = useState<BillType[]>();

    const [averageRating, setAverageRating] = useState<number>();



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "User Details | GCTMS";
    }, []);

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

        const fetchUser = async () => {

            try {
                const response = await getSingleUser(location.pathname.split('/').pop() || '');

                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }


                setUsers(data);
            } catch (error) {
                toast.error((error as { error?: string }).error || "Error fetching reservations.", {
                    closeButton: true,
                    description: (error as { description?: string }).description || null,
                });
            }
        }

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserReservations = async () => {
            if (!users?._id) return;

            try {
                const result = await getUserUnarchivedReservations(users._id);
                const data = await result.json();

                if (result.ok) {
                    setReservations(data);
                }
            } catch (error) {
                console.error("Error fetching reservations: ", error);
            }
        };

        const fetchUserBills = async () => {
            if (!users?._id) return;

            try {
                const result = await getUserBills(users._id);
                const data = await result.json();

                if (result.ok) {
                    setBills(data);
                }
            } catch (error) {
                console.error("Error fetching bills: ", error);
            }
        };

        fetchUserBills();
        fetchUserReservations();
    }, [users]);

    useEffect(() => {

        if (!users) return;

        if (bills) {
            setPendingBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === users._id && payor.billStatus === "Pending"
                )
            ));
            setPaidBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === users._id && payor.billStatus === "Paid"
                )
            ));
            setOverdueBills(bills.filter((bill) =>
                bill.billPayors.some(payor =>
                    payor.payorId === users._id && payor.billStatus === "Overdue"
                )
            ));
        }

        if (bills && users) {
            const paidBillsForUser = bills.filter(bill =>
                bill.billPayors.some(payor =>
                    payor.payorId === users._id &&
                    payor.billStatus === "Paid" &&
                    payor.billPaidDate
                )
            );

            if (paidBillsForUser.length > 0) {
                const totalDays = paidBillsForUser.reduce((sum, bill) => {
                    const payor = bill.billPayors.find(p => p.payorId === users._id);
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

    const handleArchiveUser = async () => {
        if (!users?._id) {
            toast.error("Cannot find user.", { closeButton: true });
            return;
        }

        setLoading(true);

        try {
            const response = await archiveUser(user._id, users._id);
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
        if (!users?._id) {
            toast.error("Cannot find user.", { closeButton: true });
            return;
        }

        setLoading(true);

        try {
            const response = await unarchiveUser(users._id);
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

                {(users && reservations && bills) ? (

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
                                <h1 className="font-semibold text-2xl"> {users.userBlkLt + " details"} </h1>

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
                                        {users.userVisibility === "Archived" ? (
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

                                        <DropdownMenuItem>
                                            <Share className="h-4 w-4" />
                                            Export .xslx
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>

                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem
                                        className="text-destructive focus:text-red-500"
                                    >
                                        <RotateCcw className="h-4 w-4" />
                                        Reset password
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>



                        </div>

                        {users.userRole === "Unit Owner" && users.userPosition === "Unit Owner" && (

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
                                                {(users.userStatus === "Delinquent") ? <span className="text-warning"> Delinquent </span> : null}
                                                {(users.userStatus === "Outstanding") ? <span className="text-primary"> Outstanding </span> : null}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {(users.userStatus === "Delinquent") ? "They have pending overdue bills." : null}
                                                {(users.userStatus === "Outstanding") ? "They have a good history of payments." : null}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card className="flex flex-col justify-between">
                                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">

                                            {billChoice === "Paid" ? <CardTitle className="text-sm font-medium"> Paid bills  </CardTitle> : billChoice === "Pending" ? <CardTitle className="text-sm font-medium"> Pending bills  </CardTitle> : billChoice === "Overdue" ? <CardTitle className="text-sm font-medium"> Overdue bills  </CardTitle> : <CardTitle className="text-sm font-medium"> All bills  </CardTitle>}

                                            <Select
                                                defaultValue={
                                                    overdueBills && overdueBills.length > 0 ? "Overdue" :
                                                        pendingBills && pendingBills.length > 0 ? "Pending" :
                                                            "Paid"
                                                }
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
                                                <p className="text-sm"> {users.userBlkLt} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User role
                                                </Label>
                                                <p className="text-sm"> {users.userRole} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User position
                                                </Label>
                                                <p className="text-sm"> {users.userPosition} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User membership status
                                                </Label>
                                                <p className="text-sm"> {users.userStatus} </p>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User visibility
                                                </Label>
                                                <p className="text-sm"> {users.userVisibility} </p>
                                            </div>

                                        </div>

                                        <div className="flex flex-col lg:flex-row justify-between gap-4 pt-5">

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User password
                                                </Label>

                                                <Button variant="destructive" size="sm">
                                                    <RotateCcw />
                                                    Reset password
                                                </Button>
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User email
                                                </Label>

                                                {users.userEmail ? (
                                                    <p className="text-sm"> {users.userEmail} </p>
                                                )
                                                    : (
                                                        <p className="text-sm"> No email provided. </p>
                                                    )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User mobile no.
                                                </Label>

                                                {users.userMobileNo ? (
                                                    <p className="text-sm"> {users.userMobileNo} </p>
                                                )
                                                    : (
                                                        <p className="text-sm"> No mobile number provided. </p>
                                                    )}
                                            </div>

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    User created at
                                                </Label>

                                                <p className="text-sm"> {format(users.createdAt, "Pp")} </p>
                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            </div>

                            <Card className="col-span-3">

                                <CardContent className="flex flex-col gap-4 pt-5">

                                    {/* Reservations header */}
                                    <div className="flex flex-col">
                                        <Label className="text-lg font-semibold"> {users.userBlkLt + " reservations"} </Label>
                                        <p className="text-sm font-normal text-muted-foreground"> A list of all reservations for this {users.userRole.toLowerCase()}. </p>
                                    </div>

                                    <div className="flex flex-col">

                                        <UserReservationTable data={reservations} columns={UserReservationTableColumns}></UserReservationTable>

                                    </div>

                                </CardContent>

                            </Card>

                        </div>






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