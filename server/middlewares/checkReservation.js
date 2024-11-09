


// Imports

// Reservation model import
const Reservation = require('../models/reservationModel');

const Amenity = require('../models/amenityModel');

// Date-fns import
const fns = require('date-fns')

const checkReservation = async (req, res, next) => {
    try {
        const reservations = await Reservation.find({ reservationVisibility: "Unarchived" });
        const currentDate = new Date();

        for (const reservation of reservations) {
            const reservationDate = new Date(reservation.reservationDate);
            const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

            if (latestStatus.status === "Approved") {
                if ((fns.isEqual(reservationDate, currentDate) || fns.isPast(reservationDate)) && 
                    !reservation.reservationStatus.some(status => status.status === "Ongoing")) {
                    await Reservation.findByIdAndUpdate(
                        reservation._id,
                        {
                            $push: {
                                reservationStatus: {
                                    status: "Ongoing",
                                    statusDate: new Date(),
                                    statusAuthorId: "System",
                                    statusAuthor: "System",
                                    statusAuthorPosition: "System"
                                }
                            }
                        }
                    );
                }

                if ((reservation.reservationType === "Equipment" || 
                    reservation.reservationType === "Equipment and Facility") && 
                    fns.isPast(reservationDate) &&
                    !reservation.reservationStatus.some(status => status.status === "For Return")) {
                    await Reservation.findByIdAndUpdate(
                        reservation._id,
                        {
                            $push: {
                                reservationStatus: {
                                    status: "For Return",
                                    statusDate: new Date(),
                                    statusAuthorId: "System",
                                    statusAuthor: "System",
                                    statusAuthorPosition: "System"
                                }
                            }
                        }
                    );
                }
            }
        }
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = checkReservation;