import { useEffect, useState } from "react";
// Custom Components Import

// Columns Import
import { columns } from "@/pages/Admin/Reservations/AdminReservationColumn"

// Data Table Import
import { DataTable } from "@/pages/Admin/Reservations/AdminReservationDataTable"
import { UserType } from "@/types/user-type";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useUsersContext } from "@/hooks/useUsersContext";
import { useReservationsContext } from "@/hooks/useReservationsContext";
import { ReservationType } from "@/types/reservation-type";












export default function AdminArchivedUsers() {

    useEffect(() => {
        document.title = "Archived Reservations | GCTMS "
    }, []);

    const { reservations, dispatch } = useReservationsContext()
    const [data, setData] = useState<ReservationType[]>([]);




    useEffect(() => {

        const fetchReservations = async () => {

            const response = await fetch('http://localhost:4000/api/reservations/archive/asd')

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

    console.log(reservations)



    return (

        <>




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


        </>

    )
}




