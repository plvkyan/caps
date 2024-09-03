


// shadcn Components Imports
// Tabs shadcn Import
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"



// Custom Components Imports
// Archived Announcements Component Import
import ArchivedAnnouncements from "@/pages/Archives/ArchivedAnnouncements.tsx"

// Archived Bills Component Import
// import ArchivedBills from "@/pages/Archives/ArchivedBills"

// Archived Users Component Import
import ArchivedUsers from "@/pages/Archives/ArchivedUsers"

// Archived Reservations Import
import ArchivedReservations from "@/pages/Archives/ArchivedReservations"



// Utility Imports
// Use State Import
import { useState } from "react"
import LayoutWrapper from "@/components/layout/LayoutWrapper"





const Archives = () => {



    // States
    // Tab states
    const [tab, setTab] = useState(localStorage.getItem("tab"));



    // Functions
    // On Change function for tabs
    const onTabChange = (value) => {
        setTab(value);
        localStorage.setItem("tab", value)
    }





    return (



        <LayoutWrapper>



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

                
                
                <TabsContent value="announcements"> <ArchivedAnnouncements /> </TabsContent>
                <TabsContent value="bills"> <ArchivedBills /> </TabsContent>
                <TabsContent value="reservations"> <ArchivedReservations /> </TabsContent>
                <TabsContent value="users"> <ArchivedUsers /> </TabsContent> 
                
               



            </Tabs>



        </LayoutWrapper>



    )





}





export default Archives