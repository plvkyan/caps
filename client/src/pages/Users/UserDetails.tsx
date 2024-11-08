


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
import { getSingleUser } from "@/data/user-api"
import { Button } from "@/components/ui/button"
import { Archive, ChevronLeft, EllipsisVertical, Pencil, Share, Trash2 } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"





export default function UserDetails() {


    // Contexts
    // Authentication Context



    // States
    // Reservations state
    const [users, setUsers] = useState<UserType>();


    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Reservations | GCTMS";
    }, []);

    useEffect(() => {

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("Users archived successfully", {
                closeButton: true,
                description: sessionStorage.getItem("archiveSuccessful"),
            });
            sessionStorage.removeItem("archiveSuccessful");
        }

        if (sessionStorage.getItem("bulkUsersSuccessful")) {
            toast.success("New users created successfully.", {
                description: sessionStorage.getItem("bulkUsersSuccessful"),
                duration: 5000,
                closeButton: true,
            });
            sessionStorage.removeItem("bulkUsersSuccessful");
        }

    })

    // Fetching unarchived reservations effect
    useEffect(() => {

        const fetchAllUsers = async () => {

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

        fetchAllUsers();

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

                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/users">
                                            Users
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            User Details
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

                {users && (

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
                                <h1 className="font-semibold text-2xl"> {users.userBlkLt + " Details"} </h1>

                                {/* Page header description */}
                                <p className="font-light text-muted-foreground">
                                    Detailed information covering the facility's address, reservations, and other details.
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
                                        <DropdownMenuItem
                                        >
                                            <Archive className="h-4 w-4" />
                                            Archive
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Share className="h-4 w-4" />
                                            Export .xslx
                                        </DropdownMenuItem>

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



                        </div>

                        <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-3">

                            <div className="grid auto-rows-max items-start gap-6">

                                <Card className="sticky top-5">

                                    <CardHeader className="bg-muted/50">

                                        <Label className="text-base font-semibold">
                                            {users.userBlkLt}
                                        </Label>
                                        <p className="text-sm text-muted-foreground"> {users.userPosition} </p>

                                    </CardHeader>

                                </Card>

                            </div>


                            <div className="grid h-[100vh] auto-rows-max items-start gap-6 lg:col-span-2">

                                <Card className="h-[100vh]">

                                </Card>

                            </div>

                        </div>



                    </main>

                )}


            </SidebarInset>

        </SidebarProvider>
    )
}