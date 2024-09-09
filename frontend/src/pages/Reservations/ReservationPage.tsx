


// Imports

// shadcn Components Import



// Utility Imports
// React Imports
import { useEffect, useState } from "react"

// React Router Dom Imports
import { 
    useParams 
} from "react-router-dom"



// Custom Components Import
// Layout Wrapper Import
import LayoutWrapper from "@/components/layout/LayoutWrapper"

// Reservation Details Import
import ReservationDetails from "./ReservationDetails"



// Hooks Import
// Reservations Hook Import
import { useReservationsContext } from "@/hooks/useReservationsContext"





export function ReservationPage() {

    const { id } = useParams()



    

    const { reservations, dispatch } = useReservationsContext()
    const [ amenityReservations, setAmenityReservations ] = useState()
    const [ users, setUsers ] = useState();

    // Amenity States
    const [amenityList, setAmenityList] = useState()



    // Use Effects
    // Use Effect for Page Name
    useEffect(() => {
        document.title = "Reservations | GCTMS "
    }, []);

    // Huge Use Effect for Fetching Data
    useEffect(() => {

        // Fetching a specific reservation
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



        // 
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
