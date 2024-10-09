


const Reservation = require("../models/reservationModel")
const mongoose = require('mongoose')



// GET all unarchived reservations
const getReservations = async (req, res) => {

    const initReservations = await Reservation.find({}).sort({ createdAt: -1 })

    const reservations = initReservations.filter(function (reservation) {

        return reservation.stat === "Unarchived";
    });

    res.status(200).json(reservations)
}



// GET all unarchived and approved reservations 
const getApprovedReservations = async (req, res) => {

    const initReservations = await Reservation.find({}).sort({ createdAt: -1 })

    const reservations = initReservations.filter(function (reservation) {
        return reservation.reservationStatus === "Approved";
    });

    res.status(200).json(reservations)
}



// GET all unarchived and approved reservations for an amenity
const getAmenityReservations = async (req, res) => {

    const { amenityName } = req.params

    const initReservations = await Reservation.find({}).sort({ createdAt: -1 })

    const reservations = initReservations.filter(function (reservation) {
        return (reservation.amenityName === amenityName && reservation.reservationStatus === "Approved");
    });

    res.status(200).json(reservations)
}



// GET all of someone's unarchived reservations
const getUserReservations = async (req, res) => {

    const { blkLt } = req.params

    const initReservations = await Reservation.find({}).sort({ createdAt: -1 })

    const unarchivedReservations = initReservations.filter(function (reservation) {
        return reservation.stat === "Unarchived";
    });

    const reservations = unarchivedReservations.filter(function (reservation) {
        return reservation.blkLt === blkLt;
    });

    res.status(200).json(reservations)
}





// GET all archived reservations
const getArchivedReservations = async (req, res) => {

    const initReservations = await Reservation.find({}).sort({ createdAt: -1 })

    const reservations = initReservations.filter(function (reservation) {
        return reservation.stat === "Archived";
    });

    res.status(200).json(reservations)
}





// GET single reservation
const getReservation = async (req, res) => {
    
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such reservation" })
    }

    const reservation = await Reservation.findById(id)

    if (!reservation) {
        return res.status(404).json({ error: "No such reservation" })
    }

    res.status(200).json(reservation)
}



// CREATE new reservation
const createReservation = async (req, res) => {

    const { 
        blkLt, 
        blkLtPosition, 
        amenityAddress, 
        amenityName, 
        amenityType, 
        reservationComment,
        reservationCommentSubject,
        reservationDate, 
        reservationQuantity, 
        reservationReason, 
        reservationStatus, 
        reserveeEmail,
        stat 
    } = req.body

    try {

        // Add document to database
        const reservation = await Reservation.create({ 
            blkLt, 
            blkLtPosition, 
            amenityAddress,
            amenityName, 
            amenityType, 
            reservationComment,
            reservationCommentSubject,
            reservationDate, 
            reservationQuantity,
            reservationReason, 
            reservationStatus, 
            reserveeEmail,
            stat 
        })

        res.status(200).json(reservation)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}



// DELETE a reservation
const deleteReservation = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such reservation' })
    }

    const reservation = await Reservation.findOneAndDelete({ _id: id })

    if (!reservation) {
        return res.status(400).json({ error: 'No such reservation' })
    }

    res.status(200).json(reservation)

}



// UPDATE a reservation
const updateReservation = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such reservation' })
    }

    const reservation = await Reservation.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!reservation) {
        return res.status(400).json({ error: 'No such reservation' })
    }

    res.status(200).json(reservation)
    
}




module.exports = {
    createReservation,
    deleteReservation,
    getAmenityReservations,
    getApprovedReservations,
    getArchivedReservations,
    getReservation,
    getReservations,
    getUserReservations,
    updateReservation
}