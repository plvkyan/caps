


const Reservation = require("../models/reservationModel")
const mongoose = require('mongoose')






// POST controllers
// Create a new reservation
const createReservation = async (req, res) => {

    const {
        reserveeId,
        reserveeBlkLt,
        reserveePosition,
        reserveeEmail,
        reservationType,
        reservationAmenities,
        reservationDate,
        reservationReason,
        reservationComments,
        reservationImages,
        reservationStatus,
        reservationVisibility,
        interactedBy,
        interactedByPosition,
        interactionDate,
    } = req.body

    try {
        // Add new reservation document to database
        const newReservationDocument = await Reservation.create({
            reserveeId,
            reserveeBlkLt,
            reserveePosition,
            reserveeEmail,
            reservationType,
            reservationAmenities,
            reservationDate,
            reservationReason,
            reservationComments,
            reservationImages,
            reservationStatus,
            reservationVisibility,
            interactedBy,
            interactedByPosition,
            interactionDate,
        });
        console.log("New reservation created successfully.");
        res.status(200).json(newReservationDocument)
    } catch (error) {
        console.log("Error creating new reservation: ", error.message);
        res.status(400).json({ error: error.message })
    }
}





// GET controllers
// All reservations
const getAllReservations = async (req, res) => {
    try {
        const allReservations = await Reservation.find({}).sort({ createdAt: -1 });
        console.log("All reservations fetched successfully.");
        res.status(200).json(allReservations);
    } catch (error) {
        console.log("Error fetching all reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Single reservation
const getReservation = async (req, res) => {

    const { id } = req.params

    try {
        const reservation = await Reservation.findById(id);
        console.log("Reservation fetched successfully.");
        res.status(200).json(reservation);
    } catch (error) {
        console.log("Error fetching reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Unarchived reservations
const getUnarchivedReservations = async (req, res) => {
    try {
        const unarchivedReservations = await Reservation.find({ reservationVisibility: "Unarchived" }).sort({ createdAt: -1 });
        console.log("Unarchived reservations fetched successfully.");
        res.status(200).json(unarchivedReservations);
    } catch (error) {
        console.log("Error fetching unarchived reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Unarchived and pending reservations
const getUnarchivedPendingReservations = async (req, res) => {
    try {
        const unarchivedPendingReservations = await Reservation.find({
            reservationStatus: "Pending",
            reservationVisibility: "Unarchived"
        }).sort({ createdAt: -1 });
        console.log("Unarchived pending reservations fetched successfully.");
        res.status(200).json(unarchivedPendingReservations);
    } catch (error) {
        console.log("Error fetching unarchived pending reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Unarchived and approved reservations
const getUnarchivedApprovedReservations = async (req, res) => {
    try {
        const unarchivedApprovedReservations = await Reservation.find({
            reservationStatus: "Approved",
            reservationVisibility: "Unarchived"
        }).sort({ createdAt: -1 });
        console.log("Unarchived approved reservations fetched successfully.");
        res.status(200).json(unarchivedApprovedReservations);
    } catch (error) {
        console.log("Error fetching unarchived approved reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Archived reservations
const getArchivedReservations = async (req, res) => {
    try {
        const archivedReservations = await Reservation.find({ reservationVisibility: "Archived" }).sort({ createdAt: -1 });
        console.log("Archived reservations fetched successfully.");
        res.status(200).json(archivedReservations);
    } catch (error) {
        console.log("Error fetching archived reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Archived and pending reservations
const getArchivedPendingReservations = async (req, res) => {
    try {
        const archivedPendingReservations = await Reservation.find({
            reservationStatus: "Pending",
            reservationVisibility: "Archived"
        }).sort({ createdAt: -1 });
        console.log("Archived pending reservations fetched successfully.");
        res.status(200).json(archivedPendingReservations);
    } catch (error) {
        console.log("Error fetching archived pending reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Archived and approved reservations
const getArchivedApprovedReservations = async (req, res) => {
    try {
        const archivedApprovedReservations = await Reservation.find({
            reservationStatus: "Approved",
            reservationVisibility: "Archived"
        }).sort({ createdAt: -1 });
        console.log("Archived approved reservations fetched successfully.");
        res.status(200).json(archivedApprovedReservations);
    } catch (error) {
        console.log("Error fetching archived approved reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all reservations
const getAmenityReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityReservations = await Reservation.find({ amenityId: id }).sort({ createdAt: -1 });
        console.log("Amenity reservations fetched successfully.");
        res.status(200).json(amenityReservations);
    } catch (error) {
        console.log("Error fetching amenity reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all pending reservations
const getAmenityPendingReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityPendingReservations = await Reservation.find({
            amenityId: id,
            reservationStatus: "Pending",
        }).sort({ createdAt: -1 });
        console.log("All amenity pending reservations fetched successfully.");
        res.status(200).json(amenityPendingReservations);
    } catch (error) {
        console.log("Error fetching all amenity pending reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all approved reservations
const getAmenityApprovedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityApprovedReservations = await Reservation.find({
            amenityId: id,
            reservationStatus: "Approved",
        }).sort({ createdAt: -1 });
        console.log("Amenity approved reservations fetched successfully.");
        res.status(200).json(amenityApprovedReservations);
    } catch (error) {
        console.log("Error fetching amenity approved reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all rejected reservations
const getAmenityRejectedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityRejectedReservations = await Reservation.find({
            amenityId: id,
            reservationStatus: "Rejected"
        }).sort({ createdAt: -1 });
        console.log("All amenity rejected reservations fetched successfully.");
        res.status(200).json(amenityRejectedReservations);
    } catch (error) {
        console.log("Error fetching all amenity rejected reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all archived reservations
const getAmenityArchivedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityArchivedReservations = await Reservation.find({
            amenityId: id,
            reservationVisibility: "Archived"
        }).sort({ createdAt: -1 });
        console.log("All amenity archived reservations fetched successfully.");
        res.status(200).json(amenityArchivedReservations);
    } catch (error) {
        console.log("Error fetching all amenity archived reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all completed reservations
const getAmenityCompletedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityCompletedReservations = await Reservation.find({
            amenityId: id,
            reservationStatus: "Completed",
        }).sort({ createdAt: -1 });
        console.log("All amenity completed reservations fetched successfully.");
        res.status(200).json(amenityCompletedReservations);
    } catch (error) {
        console.log("Error fetching all amenity completed reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Amenity all expired reservations
const getAmenityExpiredReservations = async (req, res) => {

    const { id } = req.params

    try {
        const amenityExpiredReservations = await Reservation.find({
            amenityId: id,
            reservationStatus: "Expired",
        }).sort({ createdAt: -1 });
        console.log("All amenity expired reservations fetched successfully.");
        res.status(200).json(amenityExpiredReservations);
    } catch (error) {
        console.log("Error fetching all amenity expired reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all reservations
const getUserReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userReservations = await Reservation.find({ reserveeId: id }).sort({ createdAt: -1 });
        console.log("All user reservations fetched successfully.");
        res.status(200).json(userReservations);
    } catch (error) {
        console.log("Error fetching all user reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all unarchived reservations
const getUserUnarchivedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userUnarchivedReservations = await Reservation.find({
            reserveeId: id,
            reservationVisibility: "Unarchived"
        }).sort({ createdAt: -1 });
        console.log("All user unarchived reservations fetched successfully.");
        res.status(200).json(userUnarchivedReservations);
    } catch (error) {
        console.log("Error fetching all user unarchived reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all archived reservations
const getUserArchivedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userArchivedReservations = await Reservation.find({
            reserveeId: id,
            reservationVisibility: "Archived"
        }).sort({ createdAt: -1 });
        console.log("All user archived reservations fetched successfully.");
        res.status(200).json(userArchivedReservations);
    } catch (error) {
        console.log("Error fetching all user archived reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all pending reservations
const getUserPendingReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userPendingReservations = await Reservation.find({
            reserveeId: id,
            reservationStatus: "Pending",
        }).sort({ createdAt: -1 });
        console.log("All user pending reservations fetched successfully.");
        res.status(200).json(userPendingReservations);
    } catch (error) {
        console.log("Error fetching all user pending reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all approved reservations
const getUserApprovedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userApprovedReservations = await Reservation.find({
            reserveeId: id,
            reservationStatus: "Approved",
        }).sort({ createdAt: -1 });
        console.log("All user approved reservations fetched successfully.");
        res.status(200).json(userApprovedReservations);
    } catch (error) {
        console.log("Error fetching all user approved reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// User all rejected reservations
const getUserRejectedReservations = async (req, res) => {

    const { id } = req.params

    try {
        const userRejectedReservations = await Reservation.find({
            reserveeId: id,
            reservationStatus: "Rejected",
        }).sort({ createdAt: -1 });
        console.log("All user rejected reservations fetched successfully.");
        res.status(200).json(userRejectedReservations);
    } catch (error) {
        console.log("Error fetching all user rejected reservations: ", error.message);
        res.status(400).json({ error: error.message });
    }
}



// DELETE controllers
// Delete a reservation
const deleteReservation = async (req, res) => {

    const { id } = req.params

    try {
        const reservation = await Reservation.findOneAndDelete({ id: id })
        console.log("Reservation deleted successfully.");
        res.status(200).json(reservation);
    } catch (error) {
        console.log("Error deleting reservation: ", error.message);
        res.status(400).json({ error: error.message })
    }
}



// PATCH controllers
// Updated a reservation
const updateReservation = async (req, res) => {

    const { id } = req.params

    try {
        const reservation = await Reservation.findOneAndUpdate({ id: id }, {
            ...req.body
        })
        console.log("Reservation updated successfully.");
        res.status(200).json(reservation);
    } catch (error) {
        console.log("Error updating reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}




module.exports = {
    // POST controllers
    createReservation,

    // GET controllers
    getAllReservations,
    getReservation,
    getUnarchivedReservations,
    getUnarchivedPendingReservations,
    getUnarchivedApprovedReservations,
    getArchivedReservations,
    getArchivedPendingReservations,
    getArchivedApprovedReservations,
    getAmenityReservations,
    getAmenityPendingReservations,
    getAmenityApprovedReservations,
    getAmenityRejectedReservations,
    getAmenityArchivedReservations,
    getAmenityCompletedReservations,
    getAmenityExpiredReservations,
    getUserReservations,
    getUserUnarchivedReservations,
    getUserArchivedReservations,
    getUserPendingReservations,
    getUserApprovedReservations,
    getUserRejectedReservations,

    // DELETE controllers
    deleteReservation,

    // PATCH controllers
    updateReservation
}