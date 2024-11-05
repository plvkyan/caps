// Imports

// Reservation model import
const Reservation = require('../models/reservationModel');

// Date-fns import
const fns = require('date-fns')




const checkOngoingReservation = async (req, res, next) => {

    try {
        // Get current date
        const currentDate = new Date();

        // Find reservations where date matches current date (ignoring time)
        const reservations = await Reservation.find({
            reservationDate: {
                $gte: fns.startOfDay(currentDate),
                $lte: fns.endOfDay(currentDate)
            }
        });

        // For each matching reservation, add Ongoing status if not already present
        for (const reservation of reservations) {
            const hasOngoing = reservation.reservationStatus.some(status => status.status === "Ongoing");

            if (!hasOngoing) {
                reservation.reservationStatus.push({
                    status: "Ongoing",
                    statusDate: new Date(),
                    statusAuthorId: "SYSTEM",
                    statusAuthor: "Automatic",
                    statusAuthorPosition: "System",
                });
                await reservation.save();
            }
        }

        next();
    } catch (error) {

    }

}


module.exports = checkOngoingReservation;