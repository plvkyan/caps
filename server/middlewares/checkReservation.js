


// Imports

// Reservation model import
const Reservation = require('../models/reservationModel');

const Amenity = require('../models/amenityModel');

// Date-fns import
const fns = require('date-fns')



// Function to check if there are any expired reservations and update their status to "Expired"
const checkReservation = async (req, rest, next) => {



    try {





        // Expired reservation function section --- START
        // Fetches all reservations from the database and sorts them by date
        const initReservations = await Reservation.find({}).sort({ createdAt: -1 });

        // Filters out all reservations that are not completed or approved
        const uncompletedReservations = initReservations.filter(function (reservations) {
            return reservations.reservationStatus != "Completed" && reservations.reservationStatus != "Approved";
        })

        // Filters out all reservations that are expired (reservation date is less than today's date)
        const expiredReservations = uncompletedReservations.filter(function (reservations) {
            return fns.format(reservations.reservationDate, "yyyy/MM/dd") < fns.format(new Date(), "yyyy/MM/dd");
        })

        // Takes every expired reservations, archives them and updates their status to "Expired" 
        const expiredFunction = expiredReservations.map( async (reservation) => {

            await Reservation.updateOne({ blkLt: reservation.blkLt , reservationDate: reservation.reservationDate }, {reservationStatus: "Expired", stat: "Archived"});

        })
        // Expired reservation function section --- END





        // Completed reservation function section --- START
        // Filters out all reservations that are approved
        // September 9, 2024 - 10:19 PM - I'm not sure if automatic dapat to o hindi. 
        // Maybe add a functionality where the admin can manually change the status of the reservation to something like "Conflict".
        // Especially for cases of completed reservations without the user actually completing the reservation (returning the item).
        const approvedReservations = initReservations.filter(function (reservations) {
            return reservations.reservationStatus === "Approved";
        })

        // Filters out all reservations that are expired (reservation date is less than today's date)
        const completedReservations = approvedReservations.filter(function (reservations) {
            return fns.format(reservations.reservationDate, "yyyy/MM/dd") < fns.format(new Date(), "yyyy/MM/dd");
        })

        // Takes every completed reservations, archives them and updates their status to "Completed" 
        const completedFunction = completedReservations.map( async (reservation) => {

            await Reservation.updateOne({  blkLt: reservation.blkLt, reservationDate: reservation.reservationDate }, {reservationStatus: "Completed", stat: "Archived"});

        })

        // Add back the item to the amenity quantity
        const addBackFunction = completedReservations.map( async (reservation) => {

            const amenity = await Amenity.findOne({ amenityName: reservation.amenityName });

            await Amenity.updateOne({ amenityName: reservation.amenityName }, { amenityStock: amenity.amenityStock + reservation.reservationQuantity });

        })
        // Completed reservation function section --- END





        // Reject reservation function section --- START
        // Filters out all reservations that are pending
        const pendingReservations = initReservations.filter(function (reservations) {
            return reservations.reservationStatus === "Pending";
        })

        // Rejects all pending reservations that have the same amenity name and reservation date as the approved reservations
        const rejectFunction = approvedReservations.map( (approved) => {

            pendingReservations.filter(async function (pending) { 

                if ((approved.amenityName == pending.amenityName) && (fns.format(approved.reservationDate, "yyyy/MM/dd") == fns.format(pending.reservationDate, "yyyy/MM/dd"))) {

                    await Reservation.updateOne({ amenityName: pending.amenityName, reservationDate: pending.reservationDate, reservationStatus: pending.reservationStatus }, {reservationStatus: "Rejected"});

                }

            })

        })


        // Console log to check if the function worked
        console.log("Wow. Checking already existing reservations worked.");

        next();
        
    } catch (error) {

        console.log(error)

    }

}



module.exports = checkReservation;