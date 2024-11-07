


// Imports
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
import { UserTableColumns } from "@/pages/Users/UserColumns";
// Data table component import
import UserTable from "@/pages/Users/UserTable";



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
import { getAllUsers } from "@/data/user-api"





export default function UserPage() {


    // Contexts
    // Authentication Context



    // States
    // Reservations state
    const [users, setUsers] = useState<UserType[]>([]);


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
    })

    // Fetching unarchived reservations effect
    useEffect(() => {

        const fetchAllUsers = async () => {

            try {
                const response = await getAllUsers();

                const data = await response.json();

                if (!response.ok) {
                    throw data;
                }

                setUsers(data);
            } catch (error) {
                toast.error((error as {error?: string}).error || "Error fetching reservations.", { 
                    closeButton: true,
                    description: (error as {description?: string}).description || null,
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

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            Users
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

                    <UserTable columns={UserTableColumns} data={users} />

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}