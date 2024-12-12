


// Imports
import { TrendingUp } from "lucide-react"

// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

// shadcn Card Component Imports
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"

// shadcn Chart Component Imports
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

import {
    Area,
    AreaChart,
    CartesianGrid,
    Pie,
    PieChart,
    XAxis
} from "recharts"

// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"

// shadcn Select Component Imports
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



// Custom Components Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Data table imports




// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Reservation Type Import
import { ReservationType } from "@/types/reservation-type"



// Data Imports
// All unarchived reservation data Import
import { getUnarchivedReservations, getUserUnarchivedReservations } from "@/data/reservation-api.ts";

// All user unarchived reservation data Import
import { getUnitOwners } from "@/data/user-api"
import { UserType } from "@/types/user-type"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { formatDistanceToNow } from "date-fns"
import { getUnarchivedBills, getUserBills } from "@/data/bills-api"
import { BillType } from "@/types/bill-type"


const revenueChartConfig = {
    date: {
        label: "Revenue",
    },
    currentRevenue: {
        label: "Current",
        color: "hsl(var(--chart-1))",
    },
    previousRevenue: {
        label: "Previous",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const membershipsChartConfig = {
    users: {
        label: "Users",
    },
    delinquent: {
        label: "Delinquent",
        color: "hsl(var(--warning))",
    },
    outstanding: {
        label: "Outstanding",
        color: "hsl(var(--primary))",
    },
}




export default function ReservationPage() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();

    const navigate = useNavigate();



    // States
    // Date range state
    const [dateRange, setDateRange] = useState<string>("Monthly");

    type Revenue = {
        current: number,
        previous: number,
        percentageChange: number,
    }

    const [revenue, setRevenue] = useState<Revenue>();


    type ChartDataType = {
        date: string;
        currentRevenue: number;
        previousRevenue: number;
    }

    const [revenueChartData, setRevenueChartData] = useState<ChartDataType[]>([]);

    // Bills state
    const [bills, setBills] = useState<BillType[]>([]);

    // Reservations state
    const [reservations, setReservations] = useState<ReservationType[]>([]);

    const [users, setUsers] = useState<UserType[]>([]);

    type BillsPaid = {
        total: number,
        paid: number,
        unpaid: number,
    }

    const [billsPaid, setBillsPaid] = useState<BillsPaid>();

    type AcceptedReservations = {
        total: number,
        accepted: number,
    }

    const [acceptedReservations, setAcceptedReservations] = useState<AcceptedReservations>();

    const PHPesos = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    });

    type MembershipType = {
        status: string;
        users: number;
        fill: string;
    };

    const [memberships, setMemberships] = useState<MembershipType[]>([]);

    console.log(reservations);

    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Dashboard | GCTMS";
    }, []);

    useEffect(() => {

        const updateMembershipStatus = () => {
            const delinquentCount = users.filter(user => user.userStatus === "Delinquent").length;
            const outstandingCount = users.filter(user => user.userStatus === "Outstanding").length;

            setMemberships([
                {
                    status: "delinquent",
                    users: delinquentCount,
                    fill: "var(--color-delinquent)",
                },
                {
                    status: "outstanding",
                    users: outstandingCount,
                    fill: "var(--color-outstanding)",
                },
            ]);
        }

        updateMembershipStatus();

    }, [users]);


    // Use Effect for updating bills paid count based on date range
    useEffect(() => {
        const countBillsPaid = () => {
            const now = new Date();
            let startDate = new Date();

            // Set start date based on selected range
            switch (dateRange) {
                case "Weekly":
                    startDate.setDate(now.getDate() - 7);
                    break;
                case "Monthly":
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                case "3 months":
                    startDate.setMonth(now.getMonth() - 3);
                    break;
                case "6 months":
                    startDate.setMonth(now.getMonth() - 6);
                    break;
                case "1 year":
                    startDate.setFullYear(now.getFullYear() - 1);
                    break;
                default:
                    startDate.setMonth(now.getMonth() - 1); // Default to monthly
            }

            let totalCount = 0;
            let paidCount = 0;
            let unpaidCount = 0;

            bills.forEach(bill => {
                if (new Date(bill.createdAt) >= startDate) {
                    totalCount++;
                }

                bill.billPayors.forEach(payor => {
                    if (payor.billStatus === "Paid") {
                        paidCount++;
                    } else {
                        unpaidCount++;
                    }
                });
            });

            setBillsPaid({ total: totalCount, paid: paidCount, unpaid: unpaidCount });
        };

        if (bills.length > 0) {
            countBillsPaid();
        }
    }, [dateRange, bills]);

    useEffect(() => {
        const countAcceptedReservations = () => {
            const now = new Date();
            let startDate = new Date();

            // Set start date based on selected range
            switch (dateRange) {
                case "Weekly":
                    startDate.setDate(now.getDate() - 7);
                    break;
                case "Monthly":
                    startDate.setMonth(now.getMonth() - 1);
                    break;
                case "3 months":
                    startDate.setMonth(now.getMonth() - 3);
                    break;
                case "6 months":
                    startDate.setMonth(now.getMonth() - 6);
                    break;
                case "1 year":
                    startDate.setFullYear(now.getFullYear() - 1);
                    break;
                default:
                    startDate.setMonth(now.getMonth() - 1); // Default to monthly
            }

            let total = 0;
            let accepted = 0;

            reservations.forEach(reservation => {
                if (new Date(reservation.createdAt) >= startDate) {
                    total++;

                    if (reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Pending") {
                        return;
                    }

                    if (reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Rejected") {
                        return;
                    }

                    if (reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Void") {
                        return;
                    }

                    if (reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Cancelled") {
                        return;
                    }

                    accepted++;
                }
            });

            setAcceptedReservations({ total, accepted });
        };

        if (reservations.length > 0) {
            countAcceptedReservations();
        }
    }, [dateRange, reservations]);


    // Use Effect for calculating total revenue based on date range
    useEffect(() => {
        const calculateRevenue = () => {
            const now = new Date();
            let currentStartDate = new Date();
            let previousStartDate = new Date();

            // Set date ranges based on selection
            switch (dateRange) {
                case "Weekly":
                    currentStartDate.setDate(now.getDate() - 7);
                    previousStartDate.setDate(now.getDate() - 14);
                    break;
                case "Monthly":
                    currentStartDate.setMonth(now.getMonth() - 1);
                    previousStartDate.setMonth(now.getMonth() - 2);
                    break;
                case "3 months":
                    currentStartDate.setMonth(now.getMonth() - 3);
                    previousStartDate.setMonth(now.getMonth() - 6);
                    break;
                case "6 months":
                    currentStartDate.setMonth(now.getMonth() - 6);
                    previousStartDate.setMonth(now.getMonth() - 12);
                    break;
                case "1 year":
                    currentStartDate.setFullYear(now.getFullYear() - 1);
                    previousStartDate.setFullYear(now.getFullYear() - 2);
                    break;
            }

            let currentRevenue = 0;
            let previousRevenue = 0;

            bills.forEach(bill => {
                bill.billPayors.forEach(payor => {
                    if (payor.billStatus === "Paid" && payor.billPaidDate) {
                        const paidDate = new Date(payor.billPaidDate);
                        if (paidDate >= currentStartDate && paidDate <= now) {
                            currentRevenue += bill.billAmount;
                        } else if (paidDate >= previousStartDate && paidDate < currentStartDate) {
                            previousRevenue += bill.billAmount;
                        }
                    }
                });
            });

            const percentageChange = previousRevenue === 0 ? 100 :
                ((currentRevenue - previousRevenue) / previousRevenue) * 100;

            return {
                current: Math.round(currentRevenue),
                previous: Math.round(previousRevenue),
                percentageChange: Math.round(percentageChange)
            };
        };

        if (bills.length > 0) {
            const revenue = calculateRevenue();
            // Update your component state or UI with the revenue data
            // You can add state variables to store these values if needed
            setRevenue(revenue);
        }
    }, [dateRange, bills]);

    useEffect(() => {
        const generateChartData = () => {
            if (!bills.length) return;

            const now = new Date();
            let currentStartDate = new Date();
            let previousStartDate = new Date();

            // Set date ranges based on selection
            switch (dateRange) {
                case "Weekly":
                    currentStartDate.setDate(now.getDate() - 7);
                    previousStartDate.setDate(now.getDate() - 14);
                    break;
                case "Monthly":
                    currentStartDate.setMonth(now.getMonth() - 1);
                    previousStartDate.setMonth(now.getMonth() - 2);
                    break;
                case "3 months":
                    currentStartDate.setMonth(now.getMonth() - 3);
                    previousStartDate.setMonth(now.getMonth() - 6);
                    break;
                case "6 months":
                    currentStartDate.setMonth(now.getMonth() - 6);
                    previousStartDate.setMonth(now.getMonth() - 12);
                    break;
                case "1 year":
                    currentStartDate.setFullYear(now.getFullYear() - 1);
                    previousStartDate.setFullYear(now.getFullYear() - 2);
                    break;
            }

            // Create daily data points
            const dailyData: ChartDataType[] = [];
            let currentDate = new Date(previousStartDate);

            while (currentDate <= now) {
                const dateStr = currentDate.toISOString().split('T')[0];
                let currentRevenue = 0;
                let previousRevenue = 0;

                bills.forEach(bill => {
                    bill.billPayors.forEach(payor => {
                        if (payor.billStatus === "Paid" && payor.billPaidDate) {
                            const paidDate = new Date(payor.billPaidDate);
                            const paidDateStr = paidDate.toISOString().split('T')[0];

                            if (paidDateStr === dateStr) {
                                if (paidDate >= currentStartDate) {
                                    currentRevenue += bill.billAmount;
                                } else if (paidDate >= previousStartDate && paidDate < currentStartDate) {
                                    previousRevenue += bill.billAmount;
                                }
                            }
                        }
                    });
                });

                dailyData.push({
                    date: dateStr,
                    currentRevenue,
                    previousRevenue
                });

                currentDate.setDate(currentDate.getDate() + 1);
            }

            setRevenueChartData(dailyData);
        };

        generateChartData();
    }, [dateRange, bills]);


    // Fetching unarchived reservations effect
    useEffect(() => {

        const fetchUnitOwners = async () => {

            const response = await getUnitOwners();

            const data = await response.json();

            if (response.ok) {
                setUsers(data);
            }

        }

        const fetchReservations = async () => {
            try {
                const fetchFunction = user.userRole === "Admin" ? getUnarchivedReservations : () => getUserUnarchivedReservations(user._id);
                const response = await fetchFunction();
                const data = await response.json();

                if (response.ok) {
                    console.log("Fetching reservations successful.")
                    setReservations(data);
                } else {
                    console.log("Fetching reservations failed.")
                }

            } catch (error) {
                console.error("Error fetching reservations: ", error);
            }
        }

        const fetchBills = async () => {
            try {
                const fetchFunction = user.userRole === "Admin" ? getUnarchivedBills : () => getUserBills(user._id);
                const response = await fetchFunction();
                const data = await response.json();

                if (response.ok) {
                    console.log("Fetching bills successful.")
                    setBills(data);
                } else {
                    console.log("Fetching bills failed.")
                }

            } catch (error) {
                console.error("Error fetching bills: ", error);
            }
        }

        fetchBills();
        fetchReservations();
        fetchUnitOwners();

    }, []);





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
                                        <BreadcrumbPage>
                                            Dashboard
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

                <main className="flex flex-col gap-4 p-8 pt-4">

                    <div className="flex items-center">
                        <div className="flex flex-col">
                            <h1 className="flex gap-2 items-center font-semibold text-2xl">
                                Welcome, {user.userPosition}
                            </h1>
                            <p className="font-light text-muted-foreground"> Here's an overview of your latest information. </p>
                        </div>

                        <div className="w-32 ml-auto">
                            <Select
                                defaultValue="Monthly"
                                onValueChange={(value) => setDateRange(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Weekly">Weekly</SelectItem>
                                        <SelectItem value="Monthly">Monthly</SelectItem>
                                        <SelectItem value="3 months">3 months</SelectItem>
                                        <SelectItem value="6 months">6 months</SelectItem>
                                        <SelectItem value="1 year">1 year</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>

                    </div>


                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                        {user && user.userRole === "Admin" && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total revenue
                                    </CardTitle>
                                    <TrendingUp className="h-4 w-4" />
                                </CardHeader>
                                <CardContent className="flex flex-col gap-1">
                                    <div className="text-2xl font-bold">{revenue ? PHPesos.format(revenue.current) : null}</div>
                                    <p className="text-sm text-muted-foreground">

                                        {(revenue && revenue.percentageChange > 0) ? <span className="text-primary"> +{revenue.percentageChange}% </span> : null}
                                        {(revenue && revenue.percentageChange < 0) ? <span className="text-destructive"> {revenue.percentageChange}% </span> : null}
                                        from last {dateRange === "Weekly" ? "week" :
                                            dateRange === "Monthly" ? "month" : dateRange}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {user && user.userRole === "Unit Owner" && (
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Your membership status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-1">
                                    <div className="text-2xl font-bold">
                                        {(user.userStatus === "Delinquent") ? <span className="text-warning"> Delinquent </span> : null}
                                        {(user.userStatus === "Outstanding") ? <span className="text-primary"> Outstanding </span> : null}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {(user.userStatus === "Delinquent") ? "You have less priority than outstanding members" : null}
                                        {(user.userStatus === "Outstanding") ? "You have all the privileges of membership" : null}
                                    </p>
                                </CardContent>
                            </Card>
                        )}


                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Paid bills
                                </CardTitle>
                                <TrendingUp className="h-4 w-4" />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1">
                                <div className="text-2xl font-bold">{billsPaid ? billsPaid.paid : 0}</div>
                                <p className="text-sm text-muted-foreground">
                                    out of {billsPaid ? billsPaid.total : 0} issued the last {dateRange === "Weekly" ? "week" :
                                        dateRange === "Monthly" ? "month" : dateRange}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Accepted Reservations
                                </CardTitle>
                                <TrendingUp className="h-4 w-4" />
                            </CardHeader>
                            <CardContent className="flex flex-col gap-1">
                                <div className="text-2xl font-bold">{acceptedReservations ? acceptedReservations.accepted : 0}</div>
                                <p className="text-sm text-muted-foreground">
                                    out of {acceptedReservations ? acceptedReservations.total : 0} created this {dateRange === "Weekly" ? "week" :
                                        dateRange === "Monthly" ? "month" : dateRange}
                                </p>
                            </CardContent>
                        </Card>

                    </div>

                    {user && user.userRole === "Admin" && (
                        <div className="grid gap-4 md:grid-cols-3">

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Revenue chart
                                    </CardTitle>
                                    <p className="!mt-0 text-sm text-muted-foreground">
                                        Compare last {dateRange === "Weekly" ? "week" :
                                            dateRange === "Monthly" ? "month" : dateRange}'s revenue.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    {revenueChartData && (
                                        <ChartContainer
                                            config={revenueChartConfig}
                                            className="aspect-auto h-[250px] w-full"
                                        >
                                            <AreaChart data={revenueChartData}>
                                                <defs>
                                                    <linearGradient id="fillPreviousRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop
                                                            offset="5%"
                                                            stopColor="var(--color-previousRevenue)"
                                                            stopOpacity={0.8}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="var(--color-previousRevenue)"
                                                            stopOpacity={0.1}
                                                        />
                                                    </linearGradient>
                                                    <linearGradient id="fillCurrentRevenue" x1="0" y1="0" x2="0" y2="1">
                                                        <stop
                                                            offset="5%"
                                                            stopColor="var(--color-currentrevenue)"
                                                            stopOpacity={0.8}
                                                        />
                                                        <stop
                                                            offset="95%"
                                                            stopColor="var(--color-currentrevenue)"
                                                            stopOpacity={0.1}
                                                        />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid vertical={false} />
                                                <XAxis
                                                    dataKey="date"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    tickMargin={8}
                                                    minTickGap={32}
                                                    tickFormatter={(value) => {
                                                        const date = new Date(value)
                                                        return date.toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                        })
                                                    }}
                                                />
                                                <ChartTooltip
                                                    cursor={false}
                                                    content={
                                                        <ChartTooltipContent
                                                            labelFormatter={(value) => {
                                                                return new Date(value).toLocaleDateString("en-US", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })
                                                            }}
                                                            indicator="dot"
                                                        />
                                                    }
                                                />
                                                <Area
                                                    dataKey="previousRevenue"
                                                    type="bump"
                                                    fill="url(#fillPreviousRevenue)"
                                                    stroke="var(--color-previousRevenue)"
                                                    stackId="a"
                                                />
                                                <Area
                                                    dataKey="currentRevenue"
                                                    type="bump"
                                                    fill="url(#fillCurrentRevenue)"
                                                    stroke="var(--color-currentRevenue)"
                                                    stackId="a"
                                                />
                                                <ChartLegend content={<ChartLegendContent />} />
                                            </AreaChart>
                                        </ChartContainer>
                                    )}

                                </CardContent>
                            </Card>

                            {/* Membership status pie chart */}
                            <Card className="">
                                <CardHeader>
                                    <CardTitle className="text-base">
                                        Membership status
                                    </CardTitle>
                                    <p className="!mt-0 text-sm text-muted-foreground">
                                        Current quantity of membership statuses out of {users.length} unit owner users.
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer
                                        config={membershipsChartConfig}
                                        className="mx-auto aspect-square max-h-[250px] px-0"
                                    >
                                        <PieChart>
                                            <ChartTooltip
                                                content={<ChartTooltipContent nameKey="status" hideLabel />}
                                            />
                                            <Pie
                                                data={memberships}
                                                dataKey="users"
                                                labelLine={false}
                                                label={({ payload, ...props }) => {
                                                    return (
                                                        <text
                                                            cx={props.cx}
                                                            cy={props.cy}
                                                            x={props.x}
                                                            y={props.y}
                                                            textAnchor={props.textAnchor}
                                                            dominantBaseline={props.dominantBaseline}
                                                            fill="hsla(var(--foreground))"
                                                        >
                                                            {payload.users}
                                                        </text>
                                                    )
                                                }}
                                                nameKey="status"
                                            />
                                            <ChartLegend
                                                content={<ChartLegendContent nameKey="status" />}
                                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                                            />
                                        </PieChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                        </div>
                    )}


                    <div className="grid gap-4 md:grid-cols-2">

                        <Card className="">
                            <CardHeader className="flex flex-row pb-2">
                                <div className="flex flex-col">
                                    <CardTitle className="text-base">
                                        Reservation list
                                    </CardTitle>
                                    <p className="!mt-0 text-sm text-muted-foreground">
                                        The most recently created reservations.
                                    </p>
                                </div>
                                <Button
                                    className="ml-auto"
                                    onClick={() => navigate("/reservations")}
                                    variant="ghost"
                                >
                                    Show all
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {reservations && reservations.map((reservation, index) => {

                                    if (index >= 5) return null;

                                    if (index === 4) return (
                                        <div
                                            className="flex flex-row justify-between p-3 cursor-pointer hover:bg-muted/30"
                                            onClick={() => navigate("/reservations/" + reservation._id)}
                                        >
                                            <div className="flex flex-col">
                                                <Label className="text-sm">
                                                    {reservation.reserveeBlkLt} <span className="text-muted-foreground">({reservation.reservationStatus[reservation.reservationStatus.length - 1].status})</span>
                                                </Label>
                                                <p className="text-sm text-muted-foreground"> {reservation.reservationType} </p>
                                            </div>

                                            <span className="text-sm text-muted-foreground"> {formatDistanceToNow(reservation.createdAt)} ago </span>
                                        </div>
                                    )

                                    return (
                                        <div
                                            className="flex flex-row justify-between border-b p-3 cursor-pointer hover:bg-muted/30"
                                            onClick={() => navigate("/reservations/" + reservation._id)}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <Label className="text-sm">
                                                    {reservation.reserveeBlkLt} <span className="text-muted-foreground">({reservation.reservationStatus[reservation.reservationStatus.length - 1].status})</span>
                                                </Label>
                                                <p className="text-sm text-muted-foreground"> {reservation.reservationType} </p>
                                            </div>

                                            <span className="text-sm text-muted-foreground"> {formatDistanceToNow(reservation.createdAt)} ago </span>
                                        </div>
                                    )
                                })}

                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardHeader className="flex flex-row pb-2">
                                <div className="flex flex-col gap-1">
                                    <CardTitle className="text-base">
                                        Bill list
                                    </CardTitle>
                                    <p className="!mt-0 text-sm text-muted-foreground">
                                        The most recently created bills.
                                    </p>
                                </div>
                                <Button
                                    className="ml-auto"
                                    onClick={() => navigate("/bills")}
                                    variant="ghost"
                                >
                                    Show all
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {bills && bills.map((bill, index) => {

                                    if (index >= 5) return null;

                                    if (index === 4) return (
                                        <div
                                            className="flex flex-row justify-between p-3 cursor-pointer hover:bg-muted/30"
                                            onClick={() => navigate("/bills/" + bill._id)}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <Label className="text-sm">
                                                    {bill.billTitle}
                                                </Label>
                                                <p className="text-sm text-muted-foreground"> {PHPesos.format(bill.billAmount)} </p>
                                            </div>

                                            <span className="text-sm text-muted-foreground"> {formatDistanceToNow(bill.createdAt)} ago </span>
                                        </div>
                                    )

                                    return (
                                        <div
                                            className="flex flex-row justify-between border-b p-3 cursor-pointer hover:bg-muted/30"
                                            onClick={() => navigate("/bills/" + bill._id)}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <Label className="text-sm">
                                                    {bill.billTitle}
                                                </Label>
                                                <p className="text-sm text-muted-foreground"> {PHPesos.format(bill.billAmount)} </p>
                                            </div>

                                            <span className="text-sm text-muted-foreground"> {formatDistanceToNow(bill.createdAt)} ago </span>
                                        </div>
                                    )
                                })}

                            </CardContent>
                        </Card>

                    </div>

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}