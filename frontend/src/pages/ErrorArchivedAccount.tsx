


import { Link } from "react-router-dom";

const ErrorArchivedAccount = () => {

    setTimeout(function () {
        window.location.replace('/bills');
    }, 50000);

    return (
        <>

            <div className="flex flex-col text-center items-center bg-white h-screen w-full justify-center gap-4">


                <h1 className="text-black text-5xl font-bold"> Your account is archived. </h1>
                <p className="text-black">
                    Accounts are archived after 3 months of delinquency.
                    <br /> Please pay your bills in person to reactivate your account.
                </p>

                <Link to="/home">
                    <button className="outline text-black font-semibold py-2 px-4 rounded-lg w-[250px]">
                        Back to home

                    </button>
                </Link>

            </div>

        </>
    )
}



export default ErrorArchivedAccount