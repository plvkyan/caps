import { AnnouncementsContext } from "@/context/AnnouncementContext";

import { useContext } from 'react';





export const useAnnouncementsContext = () => {

    const context = useContext(AnnouncementsContext)

    if (!context) {
        throw Error("useAnnouncementsContext must be used inside an AnnouncementsContextProvider")
    }




    
    return context

}