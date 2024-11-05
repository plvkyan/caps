


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
// Data table column definitions imports
import { AmenityTableColumns } from "@/pages/Amenities/AmenityColumns";
// Data table component import
import AmenityTable from "@/pages/Amenities/AmenityTable";



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
import { AmenityType } from "@/types/amenity-type"



// Data Imports
// All unarchived amenities API Import
import { getUnarchivedAmenities } from "@/data/amenity-api.ts";
import { toast } from "sonner"





export default function AmenityPage() {


    // Contexts
    // Authentication Context



    // States
    // Reservations state
    const [amenities, setAmenities] = useState<AmenityType[]>([]);



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Amenities | GCTMS";
    }, []);

    useEffect(() => {
        
        sessionStorage.getItem("archiveSuccess") && toast.success("Amenity archived successfully.", { closeButton: true });
        sessionStorage.removeItem("archiveSuccess");
        
    })

    // Fetching unarchived amenities effect
    useEffect(() => {
        const fetchUnarchivedAmenities = async () => {
            try {
                const response = await getUnarchivedAmenities();
                if (!ignore) {
                    if (response.ok) {
                        const data = await response.json();
                        setAmenities(data);
                    } else {
                        toast.error("Failed to fetch unarchived amenities.", {
                            closeButton: true,
                        });
                    }
                }
            } catch (error) {
                if (!ignore) {
                    console.error("Error fetching unarchived amenities: ", error);
                }
            }
        };

        let ignore = false;
        fetchUnarchivedAmenities();
        return () => {
            ignore = true;
        };
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
                                            Amenities
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

                    <AmenityTable columns={AmenityTableColumns} data={amenities} />

                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}