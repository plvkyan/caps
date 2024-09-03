


import { Link } from "react-router-dom";
import larrySuccess from "../assets/larry-shopping.png";


const success = () => {

    setTimeout(function() {
        window.location.replace('/bills');
      }, 50000);

    return (
        <>
        
            <div className="flex flex-col text-center bg-white h-screen w-full justify-center gap-4">
                
            <img
                    src={larrySuccess}
                    alt="Payment Success"
                    className="w-[30%] ml-auto mr-auto"
                />

                <h1 className="text-green-600 text-3xl font-bold"> Payment Success! </h1>
                <Link to="/bills" className="text-black underline"> Redirecting you to your bills page in 5 seconds. </Link>

            </div>
        
        </>
    )
}



export default success