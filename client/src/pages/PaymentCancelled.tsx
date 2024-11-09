


import { Link } from "react-router-dom";
import larryFix from "../assets/larry-fix.png";


const cancelled = () => {

    setTimeout(function() {
        window.location.replace('/bills');
      }, 5000);

    return (
        <>
        
            <div className="flex flex-col text-center bg-white h-screen w-full justify-center gap-4">
                
            <img
                    src={larryFix}
                    alt="Payment Success"
                    className="w-[30%] ml-auto mr-auto"
                />

                <h1 className="text-red-600 text-3xl font-bold"> Payment Cancelled. </h1>
                <Link to="/bills" className="text-black underline"> Redirecting you to your bills page in 5 seconds. </Link>

            </div>
        
        </>
    )
}



export default cancelled