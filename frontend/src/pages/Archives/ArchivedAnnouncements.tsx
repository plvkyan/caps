

// Imports

// shadcn Component Imports
// shadcn Avatar
// import {
//     Avatar,
//     AvatarImage,
//     AvatarFallback
// } from "@/components/ui/avatar";



// Custom Components Import
// Announcement Component
import AnnouncementDetails from "@/pages/Announcements/AnnouncementDetails"


// Utility Imports
// React Imports
import {
    useEffect,
} from "react";



// Hook Imports
// Announcements Hook Import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext";

// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";





const ArchivedAnnouncements = () => {



    // Contexts
    // Announcements Context
    const { announcements, dispatch } = useAnnouncementsContext()



    // Use Effects
    // Page Name Use Effect
    useEffect(() => {
        document.title = "Archived Announcements | GCTMS "
    }, []);

    // Use effect for GETTING announcements
    useEffect(() => {

        const fetchAnnouncements = async () => {

            const response = await fetch('http://localhost:4000/api/announcements/archived')

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_ANNOUNCEMENTS', payload: json })

            }

        }

        fetchAnnouncements()

    }, [dispatch])





    return (

        <>



            <main className="flex bg-light-bg min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-black-bg p-4 md:gap-8 md:p-10">

                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold"> Archived Announcements </h1>
                </div>

                <div className="mx-auto grid w-full max-w-6xl items-start gap-6">

                    <div className="grid gap-6">

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

                                <div className="text-center my-20"> No archived announcements found. </div>
                            )
                        }

                    </div>

                </div>

            </main>



        </>

    )
}

export default ArchivedAnnouncements