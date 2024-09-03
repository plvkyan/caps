


const Reservation = require('../models/reservationModel');
const fns = require('date-fns')



const checkReservation = async (req, rest, next) => {

    try {

        const initReservations = await Reservation.find({}).sort({ createdAt: -1 });

        const uncompletedReservations = initReservations.filter(function (reservations) {
            return reservations.reservationStatus != "Completed"
        })

        const expiredReservations = uncompletedReservations.filter(function (reservations) {
            return fns.format(reservations.reservationDate, "yyyy/MM/dd") < fns.format(new Date(), "yyyy/MM/dd");
        })



        if (expiredReservations) {

            expiredReservations.forEach(
                (reservation) => Reservation.updateMany(
                    {"$set":{"reservationStatus": "Expired"}}
                )
            )

        }

        console.log("Wow. Checking already existing reservations worked.");
        next();
        
    } catch (error) {

        console.log(error)

    }

}


module.exports = checkReservation;