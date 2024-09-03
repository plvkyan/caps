import { useEffect, useState } from "react";
import { columns } from "@/pages/Admin/Users/columns"
import { DataTable } from "@/pages/Admin/Users/data-table"
import { PaymentType } from "@/types/payment-type";
import paymentData from "@/data/payment-data";
import { UserType } from "@/types/user-type";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { useUsersContext } from "@/hooks/useUsersContext";












export default function AdminArchivedUsers() {

    useEffect(() => {
        document.title = "Archived Users | GCTMS "
    }, []);

    const { users, dispatch } = useUsersContext()
    const [data, setData] = useState<UserType[]>([]);



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




