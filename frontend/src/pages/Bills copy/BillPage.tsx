


// Lucide React Icons Import
import {
    ChevronLeft,
    Copy,
} from "lucide-react"



// shadcn Components Import

// shadcn Badge Import
import { Badge } from "@/components/ui/badge"

// shadcn Button Import 
import { Button } from "@/components/ui/button"

// shadcn Card Import
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

// shadcn Input Import
import { Input } from "@/components/ui/input"

// shadcn Separator Import
import { Separator } from "@/components/ui/separator"

// shadcn Label Import
import { Label } from "@/components/ui/label"

// shadcn Textarea Import
import { Textarea } from "@/components/ui/textarea"



// Custom Component Imports



// Utility Imports

// Link Imports
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useReservationsContext } from "@/hooks/useReservationsContext"
import { AdminReservationDetails } from "@/pages/Admin/Reservations/AdminReservationDetails.tsx"
import BillDetails from "@/pages/Bills/BillDetails"
import LayoutWrapper from "@/components/layout/LayoutWrapper"
import { useBillsContext } from "@/hooks/useBillsContext"





export function BillPage() {

    const { id } = useParams()




    useEffect(() => {
        document.title = "Bills | GCTMS "
    }, []);

    const { bills, dispatch } = useBillsContext()
    const [ amenityReservations, setAmenityReservations ] = useState()



    useEffect(() => {

        const fetchBills = async () => {

            const response = await fetch('http://localhost:4000/api/bills/details/' + id)

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_BILLS', payload: json })

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchBills()




        const fetchAmenityReservations = async () => {

            const response = await fetch('http://localhost:4000/api/bills/details/' + id)

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_BILLS', payload: json })

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchAmenityReservations()

    } ) 








    return (



        <LayoutWrapper>


            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">



                    {bills && (
                        <BillDetails bills={bills} />
                    )
                    }




                </div>

            </main>




        </LayoutWrapper>



    )

}
