




import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";



export const ReservationAmenities = (reservations, amenityList) => {

    const allReservations = reservations.reservations

    console.log(allReservations)

    const pendingReservations = allReservations.filter(function (reservation) {
        return reservation.reservationStatus === "Pending";
    });

    const acceptedReservations = allReservations.filter(function (reservation) {
        return reservation.reservationStatus === "Approved";
    })

    console.log(acceptedReservations)

    const rejectedReservations = allReservations.filter(function (reservation) {
        return reservation.reservationStatus === "Rejected";
    })



    console.log(amenityList)









    return (

        <>
            <div className="grid gap-4 md:grid-cols-3 md:gap-5 min-[1160px]:grid-cols-3">



                {/* <div className="grid gap-4 md:grid-rows-3 md:gap-7 min-[1160px]:grid-rows-3 h-fit">


                    <Card className="h-fit p-0">

                        <CardHeader className="grid h-fit grid-cols-3 items-center gap-6 p-3 pl-7">

                            <CardTitle className="text-2xl mt-1 text-center"> 200 </CardTitle>
                            <CardDescription className="text-lg col-span-2 text-center"> Remaining Chairs </CardDescription>

                        </CardHeader>

                    </Card>
 
                    <Card className="h-fit p-0">

                        <CardHeader className="h-fit grid grid-cols-3 items-center gap-6 p-3 pl-7">

                            <CardTitle className="text-2xl mt-1 text-center"> 5 </CardTitle>
                            <CardDescription className="text-lg col-span-2 text-center"> Remaining Tents </CardDescription>

                        </CardHeader>

                    </Card>

                    <Card className="h-fit p-0">

                        <CardHeader className="h-fit grid grid-cols-3 items-center gap-6 p-3 pl-7">

                            <CardTitle className="text-2xl mt-1 text-center"> 20 </CardTitle>
                            <CardDescription className="text-lg col-span-2 text-center"> Remaining Tables </CardDescription>

                        </CardHeader>

                    </Card>
                    
                </div> */}





                <Card className="h-fit">

                    <CardHeader className="">
                        <CardDescription className="text-base"> Pending Reservations </CardDescription>
                        <CardTitle className="text-7xl"> {pendingReservations.length} </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {
                            (pendingReservations.length === 0) && (
                                <div className="text-sm text-muted-foreground">
                                    There are currently no pending reservations.
                                </div>
                            )
                        }

                        {
                            (pendingReservations.length > 0) && (
                                <div className="text-sm text-muted-foreground">
                                    {((pendingReservations.length / allReservations.length) * 100).toFixed(2)}% of reservations are pending.
                                </div>
                            )
                        }

                    </CardContent>

                    <CardFooter>
                        <Progress value={((pendingReservations.length / allReservations.length) * 100)} aria-label="25% increase" />
                    </CardFooter>

                </Card>



                <Card className="h-fit">

                    <CardHeader className="">
                        <CardDescription className="text-base"> Approved Reservations </CardDescription>
                        <CardTitle className="text-7xl"> {acceptedReservations.length} </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {
                            (acceptedReservations.length === 0) && (
                                <div className="text-sm text-muted-foreground">
                                    There are currently no accepted reservations.
                                </div>
                            )
                        }

                        {
                            (acceptedReservations.length > 0) && (
                                <div className="text-sm text-muted-foreground">
                                    {((acceptedReservations.length / allReservations.length) * 100).toFixed(2)}% of reservations are accepted.
                                </div>
                            )
                        }

                    </CardContent>

                    <CardFooter>
                        <Progress value={((acceptedReservations.length / allReservations.length) * 100)} />
                    </CardFooter>

                </Card>

                <Card className="h-fit">

                    <CardHeader className="">
                        <CardDescription className="text-base"> Rejected Reservations </CardDescription>
                        <CardTitle className="text-7xl"> {rejectedReservations.length} </CardTitle>
                    </CardHeader>

                    <CardContent>

                        {
                            (rejectedReservations.length === 0) && (
                                <div className="text-sm text-muted-foreground">
                                    There are currently no rejected reservations.
                                </div>
                            )
                        }

                        {
                            (rejectedReservations.length > 0) && (
                                <div className="text-sm text-muted-foreground">
                                    {((rejectedReservations.length / allReservations.length) * 100).toFixed(2)}% of reservations are rejected.
                                </div>
                            )
                        }

                    </CardContent>

                    <CardFooter>
                        <Progress value={((rejectedReservations.length / allReservations.length) * 100)} />
                    </CardFooter>

                </Card>



            </div >

        </>

    )

}