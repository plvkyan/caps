


// Imports
// Lucide icon imports
import { Info } from "lucide-react"



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

// shadcn Tab Component Imports
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

// Shadcn toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { toast } from "sonner";



// Data table imports
// Archived amenities table import
import ArchiveAmenitytable from "@/pages/Archives/ArchiveAmenityTable"

// Archived amenities columns import
import { AmenityTableColumns } from "@/pages/Amenities/AmenityColumns"

// Archived reservations table import
import ArchiveReservationTable from "@/pages/Archives/ArchiveReservationTable"

// Archived reservations columns import
import { ReservationTableColumns } from "@/pages/Reservations/ReservationColumns"

// Archived users table import
import ArchiveUserTable from "@/pages/Archives/ArchiveUserTable"

// Archived users column import
import { UserTableColumns } from "@/pages/Users/UserColumns"



// Hook Imports
// Announcements hook import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext";



// Utility Imports
// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Amenity type import
import { AmenityType } from "@/types/amenity-type"

// Reservation type import
import { ReservationType } from "@/types/reservation-type"

// User type import
import { UserType } from "@/types/user-type"


// Data Imports
// All unarchived amenity data import
import { getArchivedAmenities } from "@/data/amenity-api"

// All unarchived reservation data Import
import { getArchivedReservations } from "@/data/reservation-api.ts";

// All user unarchived reservation data Import
import { getArchivedUsers } from "@/data/user-api"
import AnnouncementDetails from "../Announcements/AnnouncementDetails"
import ArchiveBillTable from "./ArchiveBillTable"
import { getArchivedBills } from "@/data/bills-api"
import { BillTableColumns } from "../Bills/BillColumns"
import { BillType } from "@/types/bill-type"






export default function ArchivePage() {


    // Contexts
    // Announcements Context
    const { announcements, dispatch } = useAnnouncementsContext()



    // States
    // Amenities state
    const [amenities, setAmenities] = useState<AmenityType[]>([]);
    // Bills state
    const [bills, setBills] = useState<BillType[]>([]);
    // Reservations state
    const [reservations, setReservations] = useState<ReservationType[]>([]);
    // Reservations state
    const [users, setUsers] = useState<UserType[]>([]);



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Archives | GCTMS";
    }, []);

    useEffect(() => {

        if (sessionStorage.getItem("unarchiveSuccessful")) {
            toast.success("Users unarchived successfully", { 
                closeButton: true,
                description: sessionStorage.getItem("unarchiveSuccessful"),
                duration: 10000
            });
            sessionStorage.removeItem("unarchiveSuccessful");
        }
        
    }, []);

    // Fetching unarchived reservations effect
    useEffect(() => {
        const fetchArchivedReservations = async () => {
            try {
                const response = await getArchivedReservations();
                if (!response.ok) throw new Error('Failed to fetch archived reservations');

                const data = await response.json();
                setReservations(data);
            } catch (error) {
                toast.error('Error fetching archived reservations', {
                    closeButton: true,
                    duration: 5000,
                });
            }
        };

        fetchArchivedReservations();
    }, [reservations]);

    // Fetching unarchived amenities effect
    useEffect(() => {
        const fetchArchivedAmenities = async () => {
            try {
                const response = await getArchivedAmenities();
                if (!response.ok) throw new Error('Failed to fetch archived amenities');

                const data = await response.json();
                setAmenities(data);
            } catch (error) {
                toast.error('Error fetching archived amenities', {
                    closeButton: true,
                    duration: 5000,
                });
            }
        };

        fetchArchivedAmenities();
    }, [amenities]);

    // Fetching unarchived amenities effect
    useEffect(() => {
        const fetchArchivedBills = async () => {
            try {
                const response = await getArchivedBills();
                if (!response.ok) throw new Error('Failed to fetch archived bills');

                const data = await response.json();
                setBills(data);
            } catch (error) {
                toast.error('Error fetching archived bills', {
                    closeButton: true,
                    duration: 5000,
                });
            }
        };

        fetchArchivedBills();
    }, [bills]);

    useEffect(() => {

        const fetchArchivedAnnouncements = async () => {

            const response = await fetch(import.meta.env.VITE_API_URL + '/announcements/archived');

            const data = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_ANNOUNCEMENTS', payload: data });
            }

        }

        fetchArchivedAnnouncements();

    }, [announcements])

    // Fetching unarchived amenities effect
    useEffect(() => {
        const fetchArchivedUsers = async () => {
            try {
                const response = await getArchivedUsers();
                if (!response.ok) throw new Error('Failed to fetch archived users');

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                toast.error('Error fetching archived users', {
                    closeButton: true,
                    duration: 5000,
                });
            }
        };

        fetchArchivedUsers();
    }, [users]);



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

                    <div className="flex flex-col">
                        <h1 className="flex gap-2 items-center font-semibold text-2xl">
                            Archives
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                        <Info className="w-4 h-4" />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent align="center">
                                    <p> Wait nakalimutan ko ilalagay ko, gagi. </p>
                                </TooltipContent>
                            </Tooltip>
                        </h1>
                        <p className="font-light text-muted-foreground"> View all archived data hidden from unit owners, which will be retained for one year from its creation date before permanent deletion. </p>
                    </div>

                    <Tabs defaultValue="amenities">

                        <TabsList className="p-0 mb-6 justify-start h-fit w-full rounded-none border-b bg-transparent overflow-x-hidden overflow-y-auto">
                            <TabsTrigger value="amenities" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Amenities </TabsTrigger>
                            <TabsTrigger value="announcements" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Announcements </TabsTrigger>
                            <TabsTrigger value="bills" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Bills </TabsTrigger>
                            <TabsTrigger value="reservations" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Reservations </TabsTrigger>
                            <TabsTrigger value="users" className="rounded-none px-4 !bg-transparent border-b-transparent border-b-2 data-[state=active]:text-primary data-[state=active]:border-primary"> Users </TabsTrigger>
                        </TabsList>

                        <TabsContent value="amenities" className="flex flex-col gap-4 m-0">
                            <ArchiveAmenitytable data={amenities} columns={AmenityTableColumns} />
                        </TabsContent>

                        <TabsContent value="announcements" className="flex flex-col gap-4 m-0">
                            {announcements && announcements.map( announcement => (
                                <AnnouncementDetails key={announcement._id} announcement={announcement} />
                            ))}
                            {announcements != null && announcements.length < 1 && (
                                <div className="text-center my-20"> No archived announcements found. </div>
                            )}
                        </TabsContent>

                        <TabsContent value="bills" className="flex flex-col gap-4 m-0">
                            <ArchiveBillTable data={bills} columns={BillTableColumns} />
                        </TabsContent>

                        <TabsContent value="reservations" className="flex flex-col gap-4 m-0">
                            <ArchiveReservationTable data={reservations} columns={ReservationTableColumns} />
                        </TabsContent>

                        <TabsContent value="users" className="flex flex-col gap-4 m-0">
                            <ArchiveUserTable data={users} columns={UserTableColumns} />
                        </TabsContent>

                    </Tabs>




                </main>

            </SidebarInset>

        </SidebarProvider>
    )
}