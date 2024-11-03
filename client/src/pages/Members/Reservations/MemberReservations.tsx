


// Custom Components Import

// Columns Import
import { columns } from "@/pages/Members/Reservations/MemberReservationColumn"

// Data Table Import
import { DataTable } from "@/pages/Members/Reservations/MemberReservationDataTable"

// Navbar Import
import Navbar from "@/components/layout/Navbar";

// Sidebar Import
import Sidebar from "@/components/layout/Sidebar";



// Hooks Import

// User Hook Import
import { useUsersContext } from "@/hooks/useUsersContext";



// Utility
import { useEffect, useState } from "react";



// Data Import
import { ReservationType } from "@/types/reservation-type";

// Reservations Hook
import { useReservationsContext } from "@/hooks/useReservationsContext";
import { useAuthContext } from "@/hooks/useAuthContext";











export default function MemberReservations() {

    const { user } = useAuthContext()

    useEffect(() => {
        document.title = "Reservations | GCTMS "
    }, []);

    const { reservations, dispatch } = useReservationsContext()
    const [data, setData] = useState<ReservationType[]>([]);



    useEffect(() => {

        const fetchReservations = async () => {

            const response = await fetch('http://localhost:4000/api/reservations/' + user.blkLt)

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_RESERVATIONS', payload: json })

            }

        }

        fetchReservations()

    }, [dispatch])





    useEffect(() => {

        setData(reservations)

    }, [reservations])

    


    return (

        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />


                    <main className="flex flex-1 flex-col gap-4 bg-light-bg  lg:gap-4">



                        <div className="flex min-h-screen w-full flex-col">

                            <main className="flex flex-1 flex-col bg-light-bg  gap-4 p-4 md:gap-5 md:p-8">

                                <div className="mr-auto grid w-full max-w-6xl gap-2">
                                    <h1 className="text-3xl font-semibold"> Reservations </h1>
                                </div>

                                <DataTable columns={columns} data={data} />

                            </main>

                        </div>

                    </main>

                </div>

            </div>

        </>

    )
}




