


// shadcn components
// shadcn Avatar Component Import
// import {
//     Avatar,
//     AvatarImage,
//     AvatarFallback
// } from "@/components/ui/avatar";



// Other UI Components Imports
// Announcement Component
import AnnouncementDetails from "@/pages/Announcements/AnnouncementDetails"

// Announcement Form Component
import AnnouncementForm from "@/pages/Announcements/AnnouncementForm";

// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



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

    const { announcements, dispatch } = useAnnouncementsContext()

    // Use Effects
    // Use effect for page name
    useEffect(() => {

        document.title = "Announcements | GCTMS"

    }, []);

    // Use effect for GETTING announcements
    useEffect(() => {

        const fetchAnnouncements = async () => {

            const response = await fetch('http://localhost:4000/api/announcements')

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_ANNOUNCEMENTS', payload: json })

            }

        }

        fetchAnnouncements()

    }, [dispatch])





    return (



        <LayoutWrapper>



            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold"> Announcements </h1>
            </div>

            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">

                <div className="grid gap-6">



                    {
                        user.position === "Admin" &&

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



        </LayoutWrapper >



    )





}





export default Announcements