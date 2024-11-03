


import {
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"








import {






    PlusCircle,



    Upload,

} from "lucide-react"



import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"






export function AdminReservationsDetails() {





    return (

        <>



            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">

                    <div className="flex items-center gap-4">

                        <Button variant="outline" size="icon" className="h-7 w-7">
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>

                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Basketball Main Road
                        </h1>

                        <Badge variant="outline" className="ml-auto sm:ml-0">
                            Facility
                        </Badge>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">

                            <Button variant="outline" size="sm">
                                Decline
                            </Button>
                            <Button size="sm"> Approve Reservation </Button>

                        </div>

                    </div>



                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">



                            <Card className="overflow">



                                <CardHeader className="flex flex-row items-start bg-muted/50">

                                    <div className="grid gap-0.5">

                                        <CardTitle className="group flex items-center gap-2 text-lg">
                                            Kyan Lumanog
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <Copy className="h-3 w-3" />
                                                <span className="sr-only"> Copy Order ID </span>
                                            </Button>
                                        </CardTitle>

                                        <CardDescription> 3 hours ago </CardDescription>

                                    </div>



                                    <div className="ml-auto flex items-center gap-1">

                                        <DropdownMenu>

                                            <DropdownMenuTrigger asChild>

                                                <Button size="icon" variant="outline" className="h-8 w-8">
                                                    <MoreVertical className="h-3.5 w-3.5" />
                                                    <span className="sr-only">More</span>
                                                </Button>

                                            </DropdownMenuTrigger>



                                            <DropdownMenuContent align="end">

                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Export</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Trash</DropdownMenuItem>

                                            </DropdownMenuContent>

                                        </DropdownMenu>
                                    </div>

                                </CardHeader>



                                <CardContent className="p-6 text-sm">

                                    <div className="grid gap-3">
                                        <div className="font-semibold"> Reservation Details </div>
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Glimmer Lamps x <span>2</span>
                                                </span>
                                                <span>$250.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">
                                                    Aqua Filters x <span>1</span>
                                                </span>
                                                <span>$49.00</span>
                                            </li>
                                        </ul>
                                        <Separator className="my-2" />
                                        <ul className="grid gap-3">
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>$299.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Shipping</span>
                                                <span>$5.00</span>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Tax</span>
                                                <span>$25.00</span>
                                            </li>
                                            <li className="flex items-center justify-between font-semibold">
                                                <span className="text-muted-foreground">Total</span>
                                                <span>$329.00</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <div className="font-semibold">Shipping Information</div>
                                            <address className="grid gap-0.5 not-italic text-muted-foreground">
                                                <span>Liam Johnson</span>
                                                <span>1234 Main St.</span>
                                                <span>Anytown, CA 12345</span>
                                            </address>
                                        </div>
                                        <div className="grid auto-rows-max gap-3">
                                            <div className="font-semibold">Billing Information</div>
                                            <div className="text-muted-foreground">
                                                Same as shipping address
                                            </div>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Customer Information</div>
                                        <dl className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Customer</dt>
                                                <dd>Liam Johnson</dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Email</dt>
                                                <dd>
                                                    <a href="mailto:">liam@acme.com</a>
                                                </dd>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <dt className="text-muted-foreground">Phone</dt>
                                                <dd>
                                                    <a href="tel:">+1 234 567 890</a>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="grid gap-3">
                                        <div className="font-semibold">Payment Information</div>
                                        <dl className="grid gap-3">
                                            <div className="flex items-center justify-between">
                                                <dt className="flex items-center gap-1 text-muted-foreground">
                                                    <CreditCard className="h-4 w-4" />
                                                    Visa
                                                </dt>
                                                <dd>**** **** **** 4532</dd>
                                            </div>
                                        </dl>
                                    </div>

                                </CardContent>



                                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                                    <div className="text-xs text-muted-foreground">
                                        Updated <time dateTime="2023-11-23">November 23, 2023</time>
                                    </div>
                                    <Pagination className="ml-auto mr-0 w-auto">
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button size="icon" variant="outline" className="h-6 w-6">
                                                    <ChevronLeft className="h-3.5 w-3.5" />
                                                    <span className="sr-only">Previous Order</span>
                                                </Button>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <Button size="icon" variant="outline" className="h-6 w-6">
                                                    <ChevronRight className="h-3.5 w-3.5" />
                                                    <span className="sr-only">Next Order</span>
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </CardFooter>

                            </Card>


                        </div>



                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">





                            <Card x-chunk="dashboard-07-chunk-0">

                                <CardHeader>
                                    <CardTitle> Reservation Comment </CardTitle>
                                    <CardDescription>
                                        Type anything from reason of rejection, reminders, basically anything you want to say.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name"> Subject </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                defaultValue="Gamer Gear Pro Controller"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description"> Message </Label>
                                            <Textarea
                                                id="description"
                                                defaultValue=""
                                                className="min-h-32"
                                            />
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>





                        </div>

                    </div>



                    <div className="flex items-center justify-center gap-2 md:hidden">
                        <Button variant="outline" size="sm">
                            Decline
                        </Button>
                        <Button size="sm"> Approve Reservation </Button>
                    </div>
                </div>

            </main>





            <div className="w-6/12">

            </div>

        </>


    )

}
