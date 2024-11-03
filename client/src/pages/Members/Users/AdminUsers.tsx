import { useEffect, useState } from "react";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { PaymentType } from "@/types/payment-type";
import paymentData from "@/data/payment-data";
import { UserType } from "@/types/user-type";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";






async function getData(): Promise<UserType[]> {
    // Fetch data from your API here.
    return userData;
}





export default function AdminUsers() {

    useEffect(() => {
        document.title = "Users | GCTMS "
    }, []);

    const [data, setData] = useState<UserType[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            setData(data);
        }

        fetchData();
    })

    return (

        <>

            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

                <Sidebar />

                <div className="flex flex-col overflow-x-auto">

                    <Navbar />


                    <main className="flex flex-1 flex-col gap-4 lg:gap-4">

                        <div className="flex min-h-screen w-full flex-col">

                            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-5 md:p-8">

                                <DataTable columns={columns} data={data} />

                            </main>

                        </div>

                    </main>

                </div>

            </div>

        </>

    )
}




