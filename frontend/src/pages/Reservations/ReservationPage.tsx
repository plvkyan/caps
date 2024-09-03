


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
import ReservationDetails from "./ReservationDetails"
import LayoutWrapper from "@/components/layout/LayoutWrapper"





export function ReservationPage() {

    const { id } = useParams()




    useEffect(() => {
        document.title = "Reservations | GCTMS "
    }, []);

    const { reservations, dispatch } = useReservationsContext()
    const [ amenityReservations, setAmenityReservations ] = useState()
    const [ users, setUsers ] = useState();
    // Amenity States
    const [amenityList, setAmenityList] = useState()



    useEffect(() => {

        const fetchReservations = async () => {

            const response = await fetch('http://localhost:4000/api/reservations/details/' + id)

            const json = await response.json()

            if (response.ok) {

                console.log(json)
                dispatch({ type: 'SET_RESERVATIONS', payload: json })

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchReservations()




        const fetchAmenityReservations = async () => {

            const response = await fetch('http://localhost:4000/api/reservations/details/' + id)

            const json = await response.json()

            if (response.ok) {

                console.log(json)
                dispatch({ type: 'SET_RESERVATIONS', payload: json })

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchAmenityReservations()



        const fetchUsers = async () => {

            const response = await fetch('http://localhost:4000/api/users/')

            const json = await response.json()

            if (response.ok) {

                console.log(json)
                setUsers(json)

            }

            if (!response.ok) {

                console.log(json)

            }

        }

        fetchUsers()

        const fetchAmenities = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/');

            const json = await response.json();

            if (response.ok) {

                console.log(amenityList)
                setAmenityList(json);


            }

        }

        fetchAmenities();

    }, [])

    console.log(reservations)






    return (



        <LayoutWrapper>


            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">



                    {(reservations && users) && (
                        <ReservationDetails reservations={reservations} users={users} amenityList={amenityList}/>
                    )
                    }




                </div>

            </main>




        </LayoutWrapper>



    )

}
