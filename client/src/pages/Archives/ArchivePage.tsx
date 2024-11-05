


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
import { getUnarchivedReservations } from "@/data/reservation-api.ts";

// All user unarchived reservation data Import
import { getUserUnarchivedReservations } from "@/data/reservation-api.ts";





export default function ArchivePage() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Reservations state
    const [reservations, setReservations] = useState<ReservationType[]>([]);

    console.log(reservations);

    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Reservations | GCTMS";
    }, []);

    // Fetching unarchived reservations effect
    useEffect(() => {


        async function fetchUnarchivedReservations() {

            setReservations([]);

            if (user.userPosition === "Admin") {
                const unarchivedReservationsResult = await getUnarchivedReservations();
                const unarchivedReservations = await unarchivedReservationsResult.json();
                if (!ignore && unarchivedReservationsResult.ok) {
                    console.log("All unarchived reservations fetched successfully: ", unarchivedReservations);
                    setReservations(unarchivedReservations);
                }
                if (!ignore && !unarchivedReservationsResult.ok) {
                    console.log("All unarchived reservations fetch failed.");
                }
            } else {
                const userUnarchivedReservationsResult = await getUserUnarchivedReservations(user._id);
                const userUnarchivedReservations = await userUnarchivedReservationsResult.json();
                if (!ignore && userUnarchivedReservationsResult.ok) {
                    console.log("User unarchived reservations fetched successfully.");
                    setReservations(userUnarchivedReservations);
                }
                if (!ignore && !userUnarchivedReservationsResult.ok) {
                    console.log("User unarchived reservations fetch failed.");
                }
            }

        }

        let ignore = false;
        fetchUnarchivedReservations();
        return () => {
            ignore = true;
        }
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
                                            Archives
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


                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}