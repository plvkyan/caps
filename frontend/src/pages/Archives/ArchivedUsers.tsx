


// Imports

// Hook Imports
// Users Hook Import
import { useUsersContext } from "@/hooks/useUsersContext";



// Custom Components Import
// Users Columns Component Import
import { columns } from "@/pages/Admin/Users/columns"

// Users Data Table Import
import { DataTable } from "@/pages/Admin/Users/data-table"



// Data and Types Import
// User Type Import
import { UserType } from "@/types/user-type";



// Utility Imports
// React Imports
import {
    useEffect,
    useState
} from "react";





export default function ArchivedUsers() {



    // Contexts
    // Users Context
    const { users, dispatch } = useUsersContext()



    // States
    const [data, setData] = useState<UserType[]>([]);



    // Use Effects
    // Page Name Use Effect
    useEffect(() => {
        document.title = "Archived Users | GCTMS "
    }, []);

    // Use effect for GETTING users
    useEffect(() => {

        const fetchUsers = async () => {

            const response = await fetch('http://localhost:4000/api/users/archived')

            const json = await response.json()

            if (response.ok) {

                dispatch({ type: 'SET_USERS', payload: json })

            }

        }

        fetchUsers()

    }, [dispatch])

    // Use effect for setting data
    useEffect(() => {

        setData(users)

    }, [users])





    return (

        <>



            <main className="flex flex-1 flex-col gap-4 lg:gap-4">



                <div className="flex min-h-screen w-full flex-col">

                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-5 md:p-8">

                        <div className="mr-auto grid w-full max-w-6xl gap-2">
                            <h1 className="text-3xl font-semibold"> Archived Users </h1>
                        </div>

                        <DataTable columns={columns} data={data} />

                    </main>

                </div>



            </main>


        </>

    )
}




