import { AmenitiesContext } from "@/context/AmenityContext";

import { useContext } from 'react';





export const useAmenitiesContext = () => {

    const context = useContext(AmenitiesContext)

    if (!context) {
        throw Error("useAmenitiesContext must be used inside an AmenitiesContextProvider")
    }




    
    return context

}