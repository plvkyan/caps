// Imports
const Reservation = require('../models/reservationModel');
const fns = require('date-fns');

const checkPendingReservations = async (req, res, next) => {
    try {
        // Get current date
        const currentDate = new Date();

        // Find reservations where:
        // 1. reservation date is less than current date
        // 2. last status is "Pending"
        const reservations = await Reservation.find({
            reservationDate: { $lt: currentDate }
        });

        // Check each reservation
        for (const reservation of reservations) {
            // Get the latest status
            const lastStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
            
            // If the last status is "Pending", add "Void" status
            if (lastStatus && lastStatus.status === "Pending") {
                reservation.reservationStatus.push({
                    status: "Void",
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
        console.error('Error in checkPendingReservations:', error);
        next(error);
    }
}

module.exports = checkPendingReservations;
