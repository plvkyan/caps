





// Custom Components Import
// Columns Import
import { columns } from "@/pages/Admin/Reservations/AdminReservationColumn"

// Data Table Import
import { ReservationsTable } from "@/pages/Reservations/ReservationsTable"

// Reservation Form
import { ReservationForm } from "@/pages/Reservations/ReservationForm";

// Reservation Amenity Details
import { ReservationAmenities } from "@/pages/Reservations/ReservationAmenities";


// Hooks Import

// Reservations Hook
import { useReservationsContext } from "@/hooks/useReservationsContext";

// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility
import { useEffect, useState } from "react";



// Data and Types Import
import { ReservationType } from "@/types/reservation-type";
import LayoutWrapper from "@/components/layout/LayoutWrapper";




export default function Reservations() {



    // Contexts
    // Authentication Context
    const { user } = useAuthContext();

    // Reservations Context
    const { reservations, dispatch } = useReservationsContext();



    // States
    // Data States
    const [allUnarchivedReservations, setAllUnarchivedReservations] = useState<ReservationType[]>([]);

    // Amenity States
    const [amenityList, setAmenityList] = useState()



    // Use Effects
    // Document Title Use Effect
    useEffect(() => {
        document.title = "Reservations | GCTMS "
    }, []);

    // GET ALL Unarchived Reservations Use Effect for Reservation Table
    useEffect(() => {

        const fetchReservations = async () => {

            let json;

            if (user.position === "Admin") {

                const response = await fetch('http://localhost:4000/api/reservations');

                json = await response.json();

                if (response.ok) {

                    console.log(json)
                    dispatch({ type: 'SET_RESERVATIONS', payload: json });

                }
            }

            if (user.position !== "Admin") {

                const response = await fetch('http://localhost:4000/api/reservations/' + user.blkLt);

                json = await response.json();

                if (response.ok) {

                    dispatch({ type: 'SET_RESERVATIONS', payload: json });

                }

            }

        }

        fetchReservations();



        const fetchAmenities = async () => {

            const response = await fetch('http://localhost:4000/api/amenities/');

            const json = await response.json();

            if (response.ok) {

                console.log(amenityList)
                setAmenityList(json);


            }

        }

        fetchAmenities();



    }, [dispatch])

    // Set Reservations Use Effect
    useEffect(() => {

        setAllUnarchivedReservations(reservations)
        console.log(reservations)

    }, [reservations])





    return (



        <LayoutWrapper>



            {
                (location.pathname === "/reservations" && allUnarchivedReservations) &&
                (
                    <>
                        <div className="mr-auto grid w-full max-w-6xl gap-2">
                            <h1 className="text-3xl font-semibold"> Reservations </h1>
                        </div>

                        {
                            (user.position === "Admin" && reservations && amenityList) && 
                            (
                                <ReservationAmenities reservations={reservations} amenityList={amenityList} />
                            )
                        }

                        <ReservationsTable columns={columns} data={allUnarchivedReservations} />
                    </>
                )
            }       

            {
                (location.pathname === "/reservations/form" && amenityList)
                && (
                    <ReservationForm amenityList={amenityList} />
                )
            }

        </LayoutWrapper>



    )





}




