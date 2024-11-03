


// shadcn components

// shadcn Avatar
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar";

// shadcn Breadcrumbs
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

// shadcn Cards
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";

// shadcn Dropdown Menu
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

// shadcn Badge
import { Badge } from "@/components/ui/badge";

// shadcn Button
import { Button } from "@/components/ui/button";

// shadcn Input
import { Input } from "@/components/ui/input";

// shadcn Label
import { Label } from "@/components/ui/label";

// shadcn Text Area
import { Textarea } from "@/components/ui/textarea";



// Lucide Icons
import {
    MoreHorizontal,
    SquarePen
} from "lucide-react";



// Custom Components

// Navbar Componenet
import Navbar from "@/components/layout/Navbar";

// Sidebar Component
import Sidebar from "@/components/layout/Sidebar";

// Announcement Component
import Announcement from "@/pages/Members/Announcements/Announcement"

// Announcement Form Component

// Multiple Selector Creatable Component
import MultipleSelectorCreatable from "@/components/custom/MultipleSelectorCreatable";



// Utility
import {
    useEffect
} from "react";



// Hooks
// Announcements Hook Import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext";

// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";




// Interface
interface announcement {
    blkLt: string,
    id: number,
    content: String,
    badges: Array<String>,
    archived: boolean
}




const MemberAnnouncements = () => {

    const { user } = useAuthContext()

    // const [announcements, setAnnouncements] = useState<Array<announcement>>([]);
    const { announcements, dispatch } = useAnnouncementsContext()


    // Page Name
    useEffect(() => {
        document.title = "Announcements | GCTMS "
    }, []);

    useEffect(() => {

        const fetchAnnouncements = async () => {

            const response = await fetch('http://localhost:4000/api/announcements')
            const json = await response.json()

            if (response.ok) {

                dispatch({type: 'SET_ANNOUNCEMENTS', payload: json})

            }

        }

        fetchAnnouncements()
    }, [dispatch])





    return (

        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto ">

                    <Navbar />

                    <div className="flex min-h-screen w-full flex-col">

                        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-black-bg p-4 md:gap-8 md:p-10">

                            <div className="mx-auto grid w-full max-w-6xl gap-2">
                                <h1 className="text-3xl font-semibold"> Announcements </h1>
                            </div>

                            <div className="mx-auto grid w-full max-w-6xl items-start gap-6">

                                <div className="grid gap-6">

                                    {announcements && announcements.map(announcement => (
                                        <Announcement key={announcement._id} announcement={announcement} />
                                    ))}

                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>



        </>

    )
}

export default MemberAnnouncements