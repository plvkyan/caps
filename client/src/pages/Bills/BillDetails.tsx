


// Imports
// Lucide Icon Imports
import {
    Archive,
    ArchiveX,
    ChevronLeft,
    EllipsisVertical,
    Star,
    StarOff,
    Trash2
} from "lucide-react"



// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge"

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
import { Button } from "@/components/ui/button"

// shadcn Card Import
import {
    Card,
    CardContent,
} from "@/components/ui/card"

// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Label Component Import
import { Label } from "@/components/ui/label"

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

// shadcn Sonner Import
import { toast } from "sonner"

// shadcn Table Component Imports
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"




// Custom Components Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext"



// Utility Imports
// date-fns format Import
import { format } from "date-fns"

// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Bill Type Import
import { BillType } from "@/types/bill-type"



// Data Imports
// Get a single bill API call import
import { archiveBill, getBill, unarchiveBill, updateBillPayorStatus } from "@/data/bills-api"
import { useNavigate } from "react-router-dom"





export default function Userdetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();

    const navigate = useNavigate();

    // States
    // Bills state
    const [bill, setBills] = useState<BillType>();

    // Bill status state
    type BillStatusType = {
        payorId: string;
        payorBlkLt: string;
        payorEmail: string;
        billStatus: string;
        billPaidDate: Date | undefined;
    };

    const [billStatus, setBillStatus] = useState<BillStatusType>({
        payorId: "",
        payorBlkLt: "",
        payorEmail: "",
        billStatus: "Pending",
        billPaidDate: undefined,
    });

    const PHPesos = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    });


    // Use Effects
    // Page title effect
    useEffect(() => {

        if (bill) {
            document.title = `${bill.billTitle} details | GCTMS`;
        } else {
            document.title = `Bill details | GCTMS`
        }

        if (bill && user) {
            const status = bill.billPayors.find((payor) => payor.payorId === user._id);
            if (status) {
                setBillStatus(status);
            }
        }

    }, [bill]);

    useEffect(() => {

        if (sessionStorage.getItem("paidSuccessfully")) {
            toast.success("Bill paid successfully", {
                closeButton: true,
                duration: 10000,
                description: sessionStorage.getItem("paidSuccessfully"),
            });
            sessionStorage.removeItem("paidSuccessfully");
        }

        if (sessionStorage.getItem("paidFailed")) {
            toast.success("Bill payment failed", {
                description: sessionStorage.getItem("paidFailed"),
                duration: 10000,
                closeButton: true,
            });
            sessionStorage.removeItem("paidFailed");
        }

        if (sessionStorage.getItem("setPaidSuccess")) {
            toast.success("Payor successfully set as paid", {
                duration: 10000,
                closeButton: true,
            })
            sessionStorage.removeItem("setPaidSuccess");
        }

        if (sessionStorage.getItem("unarchiveSuccessful")) {
            toast.success("Bill successfully unarchived", {
                duration: 10000,
                closeButton: true,
            })
            sessionStorage.removeItem("unarchiveSuccessful");
        }

    })

    // Fetching unarchived reservations effect
    useEffect(() => {

        const fetchBill = async () => {

            try {
                const response = await getBill(location.pathname.split('/').pop() || '');

                const data = await response.json();

                if (!response.ok) {
                    console.log(data)
                    throw data;
                }


                setBills(data);
            } catch (error) {
                console.log(error)
                toast.error((error as { error?: string }).error || "Error fetching bill.", {
                    closeButton: true,
                    description: (error as { description?: string }).description || null,
                });
            }
        }

        fetchBill();

    }, []);



    // Functions
    // Pay bill function
    const handlePayment = async () => {

        if (bill) {

            const email = (user.userEmail === "" || user.userEmail === undefined || user.userEmail === null) ? "noemails@example.com" : user.userEmail
            const mobileNo = (user.mobileNo === "" || user.mobileNo === undefined || user.mobileNo === null) ? "0" : user.mobileNo

            const response = await fetch('https://api.paymongo.com/v1/checkout_sessions', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: 'Basic c2tfdGVzdF8xUXRDR2pxOWVWSGRoSDlkR21HQUJ6RTM6'
                },
                body: JSON.stringify({
                    data: {
                        attributes: {
                            billing: {
                                email: email,
                                phone: mobileNo
                            },
                            send_email_receipt: true,
                            show_description: false,
                            show_line_items: true,
                            cancel_url: 'https://www.google.com',
                            description: JSON.stringify({
                                billId: bill._id,
                                payorId: user._id,
                                payorBlkLt: user.userBlkLt,
                            }),
                            line_items: [
                                {
                                    currency: bill.billCurrency,
                                    amount: bill.billAmount * 100,
                                    description: 'test',
                                    name: bill.billTitle,
                                    quantity: bill.billQuantity
                                }
                            ],
                            payment_method_types: [
                                'qrph',
                                'billease',
                                'card',
                                'dob',
                                'dob_ubp',
                                'brankas_bdo',
                                'brankas_landbank',
                                'brankas_metrobank',
                                'gcash',
                                'grab_pay',
                                'paymaya'
                            ],
                            success_url: 'https://google.com',
                            statement_descriptor: 'Kyan Lumanog'
                        }
                    }
                })
            })

            const data = await response.json();

            if (response.ok) {
                window.location.replace(data.data.attributes.checkout_url);
            }

            if (!response.ok) {
                console.log(data);
                toast.error("Internal error", {
                    closeButton: true,
                    duration: 10000
                })
            }

        }

    }


    const setAsPaid = async (billId, payorId) => {

        const response = await updateBillPayorStatus(billId, payorId);

        if (response.ok) {
            sessionStorage.setItem("setPaidSuccess", "");
            window.location.reload();
        }
    }

    const handleUnarchive = async () => {
        if (!bill?._id) {
            toast.error("Bill ID not found");
            return;
        }

        try {
            const response = await unarchiveBill(bill._id,);

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("unarchiveSuccessful", "true");
            navigate("/bills");
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to unarchive bill.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    }

    const handleArchive = async () => {
        if (!bill?._id) {
            toast.error("Bill ID not found");
            return;
        }

        try {
            const response = await archiveBill(bill._id,);

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("archiveSuccessful", "true");
            navigate("/bills");
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to archive bill.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
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
                                        <BreadcrumbLink href="/bills">
                                            Bills
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Bill details
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

                {bill && (

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
                                <h1 className="flex gap-4 items-center font-semibold text-2xl">
                                    {bill.billTitle}

                                    {billStatus.billStatus === "Pending" && user.userPosition === "Unit Owner" ? <Badge variant="warning"> {billStatus.billStatus} </Badge> :
                                        billStatus.billStatus === "Paid" && user.userPosition === "Unit Owner" ? <Badge variant="default"> {billStatus.billStatus} </Badge> :
                                            billStatus.billStatus === "Overdue" && user.userPosition === "Unit Owner" ? <Badge variant="destructive"> {billStatus.billStatus} </Badge> : null}
                                </h1>

                                {/* Page header description */}
                                <p className="font-light text-muted-foreground">
                                    Issued on: {format(bill.createdAt, "PPPp")}
                                </p>

                            </div>

                            {user && user.userPosition === "Unit Owner" && (
                                <Button
                                    className="ml-auto"
                                    onClick={handlePayment}
                                >
                                    Pay bill
                                </Button>
                            )}

                            {user && user.userPosition !== "Unit Owner" && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>

                                        <Button
                                            className="ml-auto h-7 w-7"
                                            size="icon"
                                            variant="outline"
                                        >
                                            <EllipsisVertical className="h-4 w-4" />
                                        </Button>

                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="mt-1">
                                        <DropdownMenuGroup>
                                            {bill && bill.billVisibility === "Unarchived" && (
                                                <DropdownMenuItem
                                                    onClick={handleArchive}
                                                >
                                                    <Archive className="h-4 w-4" />
                                                    Archive
                                                </DropdownMenuItem>
                                            )}
                                            {bill && bill.billVisibility === "Archived" && (
                                                <DropdownMenuItem
                                                    onClick={handleUnarchive}
                                                >
                                                    <ArchiveX className="h-4 w-4" />
                                                    Unarchive
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuGroup>

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}



                        </div>



                        {/* Page content */}
                        <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                            {/* Main column */}
                            <div className="grid gap-6 auto-rows-max lg:col-span-2 items-start">

                                {/* Basic information card */}
                                <Card>

                                    <CardContent className="flex flex-col gap-4 pt-5">

                                        <div className="flex flex-col">
                                            <Label className="text-lg font-semibold"> Bill basic information </Label>
                                            <p className="text-sm text-muted-foreground font-light">  Upload up to 6 images of the amenity to document their condition before and after use. </p>
                                        </div>

                                        <Separator />

                                        {(user && user.userPosition === "Unit Owner" && user.userStatus === "Outstanding") ?
                                            <div className="flex flex-row gap-3 p-4 mb-2 items-center text-primary border border-primary rounded-md bg-primary/10">
                                                <Star className="h-4 w-4" />
                                                <p className="text-sm"> You are an oustanding member of the GCHOAI. Keep it up! </p>
                                            </div> :
                                            (user && user.userPosition === "Unit Owner" && user.userStatus === "Delinquent") ?
                                                <div className="flex flex-row gap-3 p-4 mb-2 items-center text-warning border border-warning rounded-md bg-warning/10">
                                                    <StarOff className="min-size-4" />
                                                    <p className="text-sm"> You are a delinquent member of the GCHOAI. Please pay your bills before their due dates. </p>
                                                </div> : null
                                        }

                                        <div className="flex flex-col gap-1.5">
                                            <Label className="text-sm text-muted-foreground font-light">
                                                Bill Title
                                            </Label>
                                            <p className="text-sm"> {bill.billTitle} </p>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <Label className="text-sm text-muted-foreground font-light">
                                                Bill Type
                                            </Label>
                                            <p className="text-sm"> {bill.billType} payment </p>
                                        </div>

                                        <div className="flex flex-col gap-1.5">
                                            <Label className="text-sm text-muted-foreground font-light">
                                                Bill Description
                                            </Label>
                                            <p className="text-sm"> {bill.billDescription} </p>
                                        </div>

                                        <Table className="mt-3 mb-1">
                                            <TableHeader>
                                                <TableRow className="hover:bg-transparent border-t">
                                                    <TableHead className="py-2 h-fit">
                                                        Qty
                                                    </TableHead>
                                                    <TableHead className="py-2 h-fit">
                                                        Currency
                                                    </TableHead>
                                                    <TableHead className="py-2 h-fit text-right">
                                                        Amount Due
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                <TableRow className="hover:bg-transparent">
                                                    <TableCell> {bill.billQuantity} </TableCell>
                                                    <TableCell> {bill.billCurrency} </TableCell>
                                                    <TableCell className=" text-right"> {bill.billAmount} </TableCell>
                                                </TableRow>
                                            </TableBody>
                                            <TableFooter>
                                                <TableRow>
                                                    <TableCell colSpan={2} className="p-3 h-fit"> Subtotal </TableCell>
                                                    <TableCell className="p-3 h-fit text-right"> {PHPesos.format(bill.billAmount)} </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>

                                        <div className="grid md:grid-cols-2 gap-6 my-4">

                                            <div className="flex flex-col gap-3 md:gap-6">

                                                <div className="flex flex-col gap-1">
                                                    <Label className="text-sm text-muted-foreground font-light">
                                                        Issued by:
                                                    </Label>
                                                    <span className="flex flex-row items-center gap-2 text-sm">
                                                        {bill.billCreatorBlkLt}
                                                        <Badge variant="outline" className="w-fit"> {bill.billCreatorPosition} </Badge>
                                                    </span>
                                                </div>

                                                <div className="flex flex-col gap-1">
                                                    <Label className="text-sm text-muted-foreground font-light">
                                                        Issued on:
                                                    </Label>
                                                    <span className="text-sm">
                                                        {format(bill.createdAt, "PPPp")}
                                                    </span>
                                                </div>

                                            </div>

                                            <div className="flex flex-col gap-3 md:gap-6">

                                                {user && user.userPosition === "Unit Owner" && (
                                                    <div className="flex flex-col gap-1">
                                                        <Label className="text-sm text-muted-foreground font-light">
                                                            Issued to:
                                                        </Label>
                                                        <span className="flex flex-row items-center gap-2 text-sm">
                                                            {billStatus.payorBlkLt}
                                                            <Badge variant="outline" className="w-fit"> Unit Owner </Badge>
                                                        </span>
                                                    </div>
                                                )}


                                                <div className="flex flex-col gap-1">
                                                    <Label className="text-sm text-muted-foreground font-light">
                                                        Due on:
                                                    </Label>
                                                    <p className="text-sm">
                                                        {format(bill.billDueDate, "PPPp")}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            </div>

                            {/* Secondary column */}
                            <div className="grid gap-6 auto-rows-max items-start">

                                {/* Basic information card */}
                                {user && user.userPosition === "Unit Owner" && (
                                    <Card>

                                        <CardContent className="flex flex-col gap-4 pt-5">

                                            <div className="flex flex-col">
                                                <Label className="text-lg font-semibold"> Summary </Label>
                                            </div>

                                            <Separator />

                                            <div className="flex flex-col gap-1.5">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    Bill Title
                                                </Label>
                                                <p className="text-sm"> {bill.billTitle} </p>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    Issued to:
                                                </Label>
                                                <span className="flex flex-row items-center gap-2 text-sm">
                                                    {billStatus.payorBlkLt}
                                                    <Badge variant="outline" className="w-fit"> Unit Owner </Badge>
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1">
                                                <Label className="text-sm text-muted-foreground font-light">
                                                    Due on:
                                                </Label>
                                                <p className="text-sm">
                                                    {format(bill.billDueDate, "PPPp")}
                                                </p>
                                            </div>

                                            <Table className="mt-3 mb-1">
                                                <TableCaption className="text-xs font-light"> Please note that online transactions are powered by PayMongo. They will charge a small transaction fee depending on your mode of payment. </TableCaption>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-transparent border-t">
                                                        <TableHead className="py-2 h-fit">
                                                            Qty
                                                        </TableHead>
                                                        <TableHead className="py-2 h-fit">
                                                            Currency
                                                        </TableHead>
                                                        <TableHead className="py-2 h-fit text-right">
                                                            Amount Due
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow className="hover:bg-transparent">
                                                        <TableCell> {bill.billQuantity} </TableCell>
                                                        <TableCell> {bill.billCurrency} </TableCell>
                                                        <TableCell className=" text-right"> {bill.billAmount} </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                                <TableFooter>
                                                    <TableRow>
                                                        <TableCell colSpan={2} className="p-3 h-fit"> Subtotal </TableCell>
                                                        <TableCell className="p-3 h-fit text-right"> {PHPesos.format(bill.billAmount)} </TableCell>
                                                    </TableRow>
                                                </TableFooter>
                                            </Table>

                                        </CardContent>

                                    </Card>
                                )}

                                {user && user.userPosition !== "Unit Owner" && (
                                    <Card>

                                        <CardContent className="flex flex-col gap-4 pt-5">

                                            <div className="flex flex-col">
                                                <Label className="text-lg font-semibold"> Bill payors </Label>
                                            </div>

                                            <div className="">

                                                {bill.billPayors.map((payor, index) => {

                                                    if (index === bill.billPayors.length - 1) {
                                                        return (
                                                            <div
                                                                className="flex flex-row justify-between p-3 cursor-pointer hover:bg-muted/30"
                                                            >
                                                                <div className="flex flex-col">
                                                                    <Label className="text-sm">
                                                                        {payor.payorBlkLt} <span className="text-muted-foreground"> {payor.billStatus} </span>
                                                                    </Label>
                                                                    <p className="text-sm text-muted-foreground"> {payor.billStatus} </p>
                                                                </div>

                                                                {payor.billStatus === "Paid" && (
                                                                    <Button disabled size="sm"> Already paid </Button>
                                                                )}

                                                                {payor.billStatus !== "Paid" && (
                                                                    <Button size="sm" onClick={() => setAsPaid(bill._id, payor.payorId)}> Set as paid </Button>
                                                                )}
                                                            </div>
                                                        )
                                                    }

                                                    return (
                                                        <div
                                                            className="flex flex-row justify-between p-3 cursor-pointer hover:bg-muted/30 border-b"
                                                        >
                                                            <div className="flex flex-col">
                                                                <Label className="text-sm">
                                                                    {payor.payorBlkLt} <span className="text-muted-foreground"> {payor.billStatus} </span>
                                                                </Label>
                                                                <p className="text-sm text-muted-foreground"> {payor.billStatus} </p>
                                                            </div>

                                                            {payor.billStatus === "Paid" && (
                                                                <Button disabled size="sm"> Already paid </Button>
                                                            )}

                                                            {payor.billStatus !== "Paid" && (
                                                                <Button size="sm" onClick={() => setAsPaid(bill._id, payor.payorId)}> Set as paid </Button>
                                                            )}
                                                        </div>
                                                    )
                                                })}

                                            </div>

                                        </CardContent>

                                    </Card>
                                )}

                            </div>
                        </div>


                    </main>

                )}


            </SidebarInset>

        </SidebarProvider>
    )
}