


// Imports

// 
import { columns } from "@/pages/Bills/BillsColumns"
import { BillsDataTable } from "@/pages/Bills/BillsDataTable"




// Custom Component Imports



// Utility Imports

// react Imports
import {
    useEffect,
    useState
} from "react";



// Data and Type Import

// Bill Type Import
import { BillType } from "@/types/bill-type";



// Contexts Import
// Bills Context
import { useBillsContext } from "@/hooks/useBillsContext";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { BillForm } from "./BillForm";
import { MultiSelect } from "@/components/custom/MultiSelect";
import { useAuthContext } from "@/hooks/useAuthContext";





export default function BillsList() {



    useEffect(() => {
        document.title = "Bills | GCTMS "
    }, []);





    // Bills Context
    const { bills, dispatch } = useBillsContext()
    const { user } = useAuthContext();
    const [users, setUsers] = useState()
    const [valueLabelUsers, setValueLabelUsers] = useState([{
        label: "",
        value: "",
    }
    ]);

    // Use State with Type of Bill
    const [data, setData] = useState<BillType[]>([]);





    useEffect(() => {






        const fetchEverything = async () => {



            if (user.position === "Unit Owner") {

                const fetchBills = async () => {

                    const response = await fetch('http://localhost:4000/api/bills/' + user.blkLt)

                    const json = await response.json()

                    if (response.ok) {



                        console.log("Youre a unit owner")
                        dispatch({ type: 'SET_BILLS', payload: json })
                        console.log(json);
                        


                    }

                }

                fetchBills();



            }



            if (user.position === "Admin") {

                const fetchBills = async () => {

                    const response = await fetch('http://localhost:4000/api/bills')

                    const json = await response.json()

                    if (response.ok) {

                        console.log("Youre an admin")
                        dispatch({ type: 'SET_BILLS', payload: json })

                    }

                }

                fetchBills();

                const fetchUsers = async () => {

                    const response = await fetch('http://localhost:4000/api/users/unitOwners')

                    const json = await response.json()

                    if (response.ok) {


                        setUsers(json.map((user) => user.blkLt))
                        console.log(users)

                    }


                }

                fetchUsers();

            }



        }

        fetchEverything()






    }, [])





    useEffect(() => {

        console.log(bills)
        setData(bills)

    }, [bills])





    return (


        <LayoutWrapper>



            {
                (location.pathname === "/bills" && data) &&
                (
                    <>

                        <div className="mr-auto grid w-full max-w-6xl gap-2">
                            <h1 className="text-3xl font-semibold"> Bills </h1>
                        </div>

                        <BillsDataTable columns={columns} data={data} />

                    </>
                )
            }



            {
                (location.pathname === "/bills/form" && users)
                && (
                    <BillForm users={users} />
                )
            }

        </LayoutWrapper>



    )
}




