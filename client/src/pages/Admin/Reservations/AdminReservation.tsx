


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

// Sidebar Import
import Sidebar from "@/components/layout/Sidebar"

// Navbar import
import Navbar from "@/components/layout/Navbar"



// Utility Imports

// Link Imports
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useReservationsContext } from "@/hooks/useReservationsContext"
import { AdminReservationDetails } from "@/pages/Admin/Reservations/AdminReservationDetails.tsx"





export function AdminReservation() {

    const { id } = useParams()

    


    useEffect(() => {
        document.title = "Reservations | GCTMS "
    }, []);

    const { reservations, dispatch } = useReservationsContext()
    const [data, setData] = useState()
    const [users, setUsers] = useState()



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

        const fetchUsers = async () => {

            const response = await fetch('http://localhost:4000/api/users');

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

    }, [dispatch])





    useEffect(() => {

        setData(reservations)

    }, [reservations])


    console.log(reservations)






    return (

        <>


            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />


                    <main className="flex flex-1 flex-col gap-4 bg-light-bg  lg:gap-4">

                        <div className="flex min-h-screen w-full flex-col">

                            <main className="flex flex-1 flex-col bg-light-bg  gap-4 p-4 md:gap-5 md:p-8">

                                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">

                                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">



                                        {reservations && (
                                            <AdminReservationDetails reservations={reservations} users={users} />
                                        )
                                        }




                                    </div>

                                </main>

                            </main>

                        </div>

                    </main>

                </div>

            </div>





        </>



    )

}
