


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
// Bills Data Table Components Imports
import BillTable from "@/pages/Bills/BillTable"
import { BillTableColumns } from "@/pages/Bills/BillColumns"

// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";




// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// React Imports
import { 
    useEffect, 
    useState 
} from "react"
import {toast} from "sonner";


// Types Imports




// Data Imports
// Bills API Import
import { 
    getUnarchivedBills, 
    getUserBills 
} from "@/data/bills-api"

import { BillType } from "@/types/bill-type"





export default function BillPage() {



    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Reservations state
    const [bills, setBills] = useState<BillType[]>([]);



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Bills | GCTMS";
    }, []);

     // Fetching unarchived bills effect
     useEffect(() => {
        async function fetchUnarchivedBills() {
            setBills([]);

            if (user.userRole === "Admin") {
                const unarchivedBillsResult = await getUnarchivedBills();
                const unarchivedBills = await unarchivedBillsResult.json();
                if (!ignore && unarchivedBillsResult.ok) {
                    setBills(unarchivedBills);
                }
                if (!ignore && !unarchivedBillsResult.ok) {
                    console.log("All unarchived bills fetch failed.");
                }
            } 
            
            if (user.userRole !== "Admin" && user.userPosition === "Unit Owner") {
                const userUnarchivedBillsResult = await getUserBills(user._id);
                const userUnarchivedBills = await userUnarchivedBillsResult.json();
                if (!ignore && userUnarchivedBillsResult.ok) {
                    console.log("User unarchived bills fetched successfully.");
                    setBills(userUnarchivedBills);
                }
                if (!ignore && !userUnarchivedBillsResult.ok) {
                    console.log("User unarchived bills fetch failed.");
                }
            }
        }

        let ignore = false;
        fetchUnarchivedBills();
        return () => {
            ignore = true;
        }
    }, []);
   

    useEffect(() => {
        if (sessionStorage.getItem("unarchiveSuccessful")) {
            toast.success("Bill successfully unarchived", {
                duration: 10000,
                closeButton: true,
            })
            sessionStorage.removeItem("unarchiveSuccessful");
        }
    }, [])



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
                                            Bills
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

                    <BillTable columns={BillTableColumns} data={bills} />

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}