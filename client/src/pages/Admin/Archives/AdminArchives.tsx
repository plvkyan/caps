


// shadcn Components Imports

// Tabs shadcn Import
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"




// Custom Components Imports
import Sidebar from "@/components/layout/Sidebar"
import Navbar from "@/components/layout/Navbar"
import AdminArchivedAnnouncements from "./Archived-Announcements/AdminArchivedAnnouncements"
import AdminArchivedUsers from "./Archived-Users/AdminArchivedUsers"

// Utility Imports
import { useState } from "react"
import AdminArchivedReservations from "./Archived-Reservations/AdminArchivedReservations"







const AdminArchives = () => {



    const [tab, setTab] = useState(localStorage.getItem("tab"));

    const onTabChange = (value) => {
        setTab(value);
        localStorage.setItem("tab", value)
    }



    return (



        <>



            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />

                    <main className="flex flex-1 flex-col bg-light-bg  gap-4 lg:gap-4">

                        <div className="flex min-h-screen w-full flex-col">

                            <main className="flex flex-1 flex-col bg-light-bg  gap-4 p-4 md:gap-5 md:p-8">

                                <div className="mr-auto grid w-full max-w-6xl gap-2">
                                    <h1 className="text-3xl font-semibold"> Archives </h1>
                                </div>

                                <Tabs className="" value={localStorage.getItem("tab") as any} onValueChange={onTabChange}>
                                    <TabsList className="w-full bg-light-bg border">
                                        <TabsTrigger value="announcements" className="w-full"> Announcements </TabsTrigger>
                                        <TabsTrigger value="bills" className="w-full"> Bills </TabsTrigger>
                                        <TabsTrigger value="reservations" className="w-full"> Reservations </TabsTrigger>
                                        <TabsTrigger value="users" className="w-full"> Users </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="users"> <AdminArchivedUsers /> </TabsContent>
                                    <TabsContent value="bills"> Change your password here. </TabsContent>
                                    <TabsContent value="reservations"> <AdminArchivedReservations /> </TabsContent>
                                    <TabsContent value="announcements"> < AdminArchivedAnnouncements/> </TabsContent>
                                </Tabs>

                            </main>

                        </div>

                    </main>

                </div>

            </div>



        </>



    )

}

export default AdminArchives