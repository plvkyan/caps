


// Lucide React Icons Import
import {
    DollarSign,
    ArrowUpRight,
    CirclePlus
} from "lucide-react"



// shadcn Components Import
// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge"

// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Card Component Import
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"

// shadcn Dialog Component Import
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

// shadcn Input Component Import
import { Input } from "@/components/ui/input"

// shadcn Label Component Import
import { Label } from "@/components/ui/label"

// shadcn Table Component Import
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

// shadcn Textarea Component Import
import { Textarea } from "@/components/ui/textarea"



// Other UI Components Imports
// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper"



// Utility Import
// Use Effect from React Import
import { useEffect } from "react"

// Link from React Router Import
import { Link } from "react-router-dom"



// Hooks Import
import { useAuthContext } from "@/hooks/useAuthContext"





export default function Dashboard() {


    
    // Contexts
    const { user } = useAuthContext();


    // Use Effects
    useEffect(() => {

        if ( user.position === "Admin") {

            document.title = "Admin Dashboard | GCTMS "

        }

        if ( user.position === "Unit Owner") {

            document.title = "Dashboard | GCTMS "

        }

    }, []);





    return (



        <LayoutWrapper>


            <div className="mr-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold"> Dashboard </h1>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5 min-[1160px]:grid-cols-4">



                <Card x-chunk="dashboard-01-chunk-0">

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                        <CardTitle className="text-sm font-medium">
                            Collected Monthly Dues
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>
                    <CardContent>

                        <div className="text-2xl font-bold">₱110,200.00</div>
                        <p className="text-xs text-primary">
                            +20% from last month
                        </p>

                    </CardContent>

                </Card>



                <Card x-chunk="dashboard-01-chunk-1">

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                        <CardTitle className="text-sm font-medium">
                            Uncollected Monthly Dues
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold">₱259,800.00</div>
                        <p className="text-xs text-muted-foreground">
                            67% left unpaid
                        </p>

                    </CardContent>

                </Card>



                <Card x-chunk="dashboard-01-chunk-3">

                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">

                        <CardTitle className="text-sm font-medium">
                            Expected Collection of Monthly Dues
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <div className="text-2xl font-bold"> ₱370,000.00 </div>
                        <p className="text-xs text-muted-foreground">
                            Expected Collection Met Last Month
                        </p>

                    </CardContent>

                </Card>



                <Card x-chunk="dashboard-01-chunk-4">

                    <CardHeader className="pb-3">

                        <CardTitle> Add Bills </CardTitle>
                        <CardDescription className="max-w-lg text-balance leading-relaxed">
                            Create a new bill for HOA members to pay.
                        </CardDescription>

                    </CardHeader>

                    <CardFooter>
                        <Dialog>

                            <DialogTrigger asChild>
                                <Button
                                    className="p-3 max-[640px]:w-full accent"
                                >
                                    <CirclePlus className="h-6 w-6 pr-2" />
                                    Create Bill
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">

                                <DialogHeader>
                                    <DialogTitle> Create a new payment </DialogTitle>
                                    <DialogDescription>
                                        Create new payment for the members.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            defaultValue="Monthly Due for April 2024"
                                            className="col-span-3"
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            defaultValue="Our monthly dues."
                                            className="col-span-3 max-h-48"
                                            placeholder="Type your message here." />
                                    </div>

                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="amount" className="text-right">
                                            Amount
                                        </Label>
                                        <Input
                                            id="amount"
                                            defaultValue="₱1,000.00"
                                            className="col-span-3"
                                        />
                                    </div>

                                </div>

                                <DialogFooter>
                                    <Button type="submit"> Create Payment </Button>
                                </DialogFooter>

                            </DialogContent>

                        </Dialog>
                    </CardFooter>

                </Card>



            </div>



            <div className="grid gap-4 md:gap-8 min-[1460px]:grid-cols-3">

                <Card
                    className="min-[1460px]:col-span-2" x-chunk="dashboard-01-chunk-4"
                >

                    <CardHeader className="flex flex-row items-center">

                        <div className="grid gap-2">
                            <CardTitle> Bills </CardTitle>
                            <CardDescription>
                                Recent bills for members
                            </CardDescription>
                        </div>

                        <Button asChild size="sm" className="ml-auto gap-1">
                            <Link to="/admin/payments">
                                View All
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>

                    </CardHeader>



                    <CardContent>

                        <Table>

                            <TableHeader>

                                <TableRow>

                                    <TableHead> Bill Name </TableHead>
                                    <TableHead className="hidden xl:table-column">
                                        Type
                                    </TableHead>
                                    <TableHead className="hidden xl:table-column">
                                        Status
                                    </TableHead>
                                    <TableHead className="hidden xl:table-column">
                                        Date
                                    </TableHead>
                                    <TableHead className="text-right">Amount</TableHead>

                                </TableRow>

                            </TableHeader>



                            <TableBody>



                                <TableRow>

                                    <TableCell>
                                        <div className="font-medium"> May 2024 Monthly Due </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            May 1, 2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        Sale
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="hidden  lg:hidden xl:table-column">
                                        2023-06-23
                                    </TableCell>

                                    <TableCell className="text-right"> ₱200.00 </TableCell>

                                </TableRow>



                                <TableRow>

                                    <TableCell>
                                        <div className="font-medium"> April 2024 Monthly Due </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            April 1, 2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        Refund
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Declined
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="hidden  lg:hidden xl:table-column">
                                        2023-06-24
                                    </TableCell>

                                    <TableCell className="text-right"> ₱200.00 </TableCell>

                                </TableRow>



                                <TableRow>

                                    <TableCell>
                                        <div className="font-medium"> March 2024 Monthly Due </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            March 1, 2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        Subscription
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="hidden  lg:hidden xl:table-column">
                                        2023-06-25
                                    </TableCell>

                                    <TableCell className="text-right">₱200.00</TableCell>

                                </TableRow>



                                <TableRow>

                                    <TableCell>
                                        <div className="font-medium"> February 2024 Monthly Due  </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            February 1, 2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        Sale
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="hidden  lg:hidden xl:table-column">
                                        2023-06-26
                                    </TableCell>

                                    <TableCell className="text-right">₱450.00</TableCell>

                                </TableRow>



                                <TableRow>

                                    <TableCell>
                                        <div className="font-medium"> January 2024 Monthly Due </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            January 1, 2024
                                        </div>
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        Sale
                                    </TableCell>

                                    <TableCell className="hidden xl:table-column">
                                        <Badge className="text-xs" variant="outline">
                                            Approved
                                        </Badge>
                                    </TableCell>

                                    <TableCell className="hidden  lg:hidden xl:table-column">
                                        2023-06-27
                                    </TableCell>

                                    <TableCell className="text-right">₱200.00</TableCell>

                                </TableRow>



                            </TableBody>

                        </Table>

                    </CardContent>

                </Card>



                <Card x-chunk="dashboard-01-chunk-5">

                    <CardHeader>
                        <CardTitle> Recent Payments </CardTitle>
                    </CardHeader>



                    <CardContent className="grid gap-2">

                        <div className="flex items-center gap-4 py-4 px-2 border-b">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 24 Lt 1
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Just Now
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>



                        <div className="flex items-center gap-4 py-4 px-2 border-b">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 1 Lt 12
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    1 hour ago
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>

                        <div className="flex items-center gap-4 py-4 px-2 border-b">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 7 Lt 14
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    1 hour ago
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>

                        <div className="flex items-center gap-4 py-4 px-2 border-b">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 14 Lt 12
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    2 hours ago
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>

                        <div className="flex items-center gap-4 py-4 px-2 border-b">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 25 Lt 2
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    3 hours ago
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>

                        <div className="flex items-center gap-4 py-4 px-2">

                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">
                                    Blk 25 Lt 22
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    3 hours ago
                                </p>
                            </div>

                            <div className="ml-auto font-medium"> ₱200.00</div>

                        </div>



                    </CardContent>

                </Card>

            </div>

        </LayoutWrapper>



    )





}
