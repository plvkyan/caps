


// Imports

// shadcn components
// shadcn Avatar Component Import
// import {
//     Avatar,
//     AvatarImage,
//     AvatarFallback
// } from "@/components/ui/avatar";
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

// Announcement Component
import AnnouncementDetails from "@/pages/Announcements/AnnouncementDetails"

// Announcement Form Component
import AnnouncementForm from "@/pages/Announcements/AnnouncementForm";



// Utility Imports
// Use Effect Import from React
import {
    useEffect
} from "react";



// Hook Imports
// Announcements Context Import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext";

// Authentication Context Import
import { useAuthContext } from "@/hooks/useAuthContext";





const Announcements = () => {



    // Contexts
    // Authentication context
    const { user } = useAuthContext()

    // Announcements Context
    const { announcements, dispatch } = useAnnouncementsContext()



    // Use Effects
    // Use effect for page name
    useEffect(() => {

        document.title = "Announcements | GCTMS"

    }, []);

    // Use effect for GETTING announcements
    useEffect(() => {

        const fetchAnnouncements = async () => {

            const response = await fetch(import.meta.env.VITE_API_URL + '/announcements')

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_ANNOUNCEMENTS', payload: json })

            }

        }

        fetchAnnouncements()

    }, [dispatch])





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
                                            Announcements
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

                    <div className="mx-auto grid w-[60%] max-w-6xl items-start gap-6">

                        <div className="grid gap-6">



                            {
                                user.userRole === "Admin" &&

                                (
                                    <AnnouncementForm />
                                )

                            }

                            {
                                announcements && announcements.map
                                    (announcement =>
                                    (
                                        <AnnouncementDetails key={announcement._id} announcement={announcement} />
                                    )
                                    )
                            }

                            {
                                (announcements != null && announcements.length < 1) &&
                                (

                                    <div className="text-center my-20"> No announcements found. </div>
                                )
                            }



                        </div>

                    </div>

                </main>





            </SidebarInset>

        </SidebarProvider>
    )
}





export default Announcements