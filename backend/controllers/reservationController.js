


const Amenity = require("../models/amenityModel")
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

// Get unavailable dates for a facility
const getFacilityUnavailableDates = async (req, res) => {

    const { id } = req.params;

    try {
        const approvedReservations = await Reservation.find({
            "reservationAmenities._id": id,
            "reservationStatus.status": "Approved"
        }).select('reservationDate -_id');

        const unavailableDates = approvedReservations.map(reservation => reservation.reservationDate);
        console.log("Unavailable dates fetched successfully.");
        res.status(200).json(unavailableDates);
    } catch (error) {
        console.log("Error fetching unavailable dates: ", error.message);
        res.status(400).json({ error: error.message });
    }
}
// Get unavailable dates for an equipment
const getEquipmentUnavailableDates = async (req, res) => {
    // Extract the equipment ID from the request parameters
    const { id } = req.params;

    try {
        // Fetch all approved reservations that include the specified equipment
        const approvedReservations = await Reservation.find({
            "reservationAmenities._id": id,
            "reservationStatus.status": "Approved"
        }).select('reservationDate reservationAmenities -_id');

        // Initialize an object to track stock changes on each date
        const stockChanges = {};

        // Iterate over each approved reservation
        approvedReservations.forEach(reservation => {
            const reservationDate = reservation.reservationDate;
            // Calculate the next day after the reservation date
            const nextDay = new Date(reservationDate);
            nextDay.setDate(nextDay.getDate() + 1);

            // Iterate over each amenity in the reservation
            reservation.reservationAmenities.forEach(amenity => {
                if (amenity._id.toString() === id) {
                    const quantity = amenity.amenityQuantity;

                    // Initialize stock changes for the reservation date and the next day if not already done
                    if (!stockChanges[reservationDate]) {
                        stockChanges[reservationDate] = 0;
                    }
                    if (!stockChanges[nextDay]) {
                        stockChanges[nextDay] = 0;
                    }

                    // Decrease stock on the reservation date and increase it the next day
                    stockChanges[reservationDate] -= quantity;
                    stockChanges[nextDay] += quantity;
                }
            });
        });

        // Fetch the maximum stock of the equipment
        const reservationWithStock = await Reservation.findOne({
            "reservationAmenities._id": id,
            "reservationStatus.status": "Approved"
        }).select('reservationAmenities -_id');

        // If there are no reservations, return an empty array
        if (!reservationWithStock) {
            console.log("No reservations found.");
            return res.status(200).json([]);
        }

        const amenity = reservationWithStock.reservationAmenities.find(a => a._id.toString() === id);
        let currentStock = amenity.amenityStockMax; // Changed from const to let

        // Initialize an array to store dates when the equipment is unavailable
        const unavailableDates = [];

        // Sort the dates in stockChanges in ascending order
        const sortedDates = Object.keys(stockChanges).sort((a, b) => new Date(a) - new Date(b));

        // Iterate over the sorted dates to calculate the stock on each date
        sortedDates.forEach(date => {
            currentStock += stockChanges[date];
            // If the stock is zero or less, add the date to the unavailable dates array
            if (currentStock <= 0) {
                unavailableDates.push(date);
            }
        });

        // Log success message and send the unavailable dates as a response
        console.log("Unavailable dates fetched successfully.");
        res.status(200).json(unavailableDates);
    } catch (error) {
        // Log error message and send the error as a response
        console.log("Error fetching unavailable dates: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Get available stock for an equipment on a specific date
const getEquipmentAvailableStock = async (req, res) => {
    const { id, date } = req.params;

    try {
        // Parse the date from the request parameters and normalize to start of day
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        // Fetch all reservations that include the specified equipment
        const reservations = await Reservation.find({
            "reservationAmenities._id": id
        }).select('reservationDate reservationAmenities reservationStatus -_id');

        // Filter reservations where the latest status is "Approved"
        const approvedReservations = reservations.filter(reservation => {
            const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
            return latestStatus.status === "Approved";
        });

        // Fetch the maximum stock of the equipment from the Amenity model
        const amenity = await Amenity.findById(id).select('amenityStockMax');

        // If the amenity is not found, return an error
        if (!amenity) {
            console.log("Amenity not found.");
            return res.status(404).json({ error: "Amenity not found" });
        }

        // Calculate total reserved quantity for the target date
        let reservedQuantity = 0;
        approvedReservations.forEach(reservation => {
            const reservationDate = new Date(reservation.reservationDate);
            reservationDate.setHours(0, 0, 0, 0);

            if (reservationDate.getTime() === targetDate.getTime()) {
                reservation.reservationAmenities.forEach(amenity => {
                    if (amenity._id.toString() === id) {
                        reservedQuantity += amenity.amenityQuantity;
                    }
                });
            }
        });

        const availableStock = amenity.amenityStockMax - reservedQuantity;
        
        console.log("Available stock fetched successfully.");
        res.status(200).json({ availableStock });
    } catch (error) {
        console.log("Error fetching available stock: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// const getEquipmentAvailableStock = async (req, res) => {
//     const { id, date } = req.params;

//     try {
//         // Parse the date from the request parameters
//         const targetDate = new Date(date);

//         // Fetch all approved reservations that include the specified equipment
//         const approvedReservations = await Reservation.aggregate([
//             {
//                 $match: {
//                     "reservationAmenities._id": mongoose.Types.ObjectId(id),
//                 }
//             },
//             {
//                 $project: {
//                     reservationDate: 1,
//                     reservationAmenities: 1,
//                     latestStatus: { $arrayElemAt: ["$reservationStatus", -1] }
//                 }
//             },
//             {
//                 $match: {
//                     "latestStatus.status": "Approved"
//                 }
//             },
//             {
//                 $sort: { reservationDate: -1 }
//             }
//         ]);  
//          // Initialize an object to track stock changes on each date
//         const stockChanges = {};

//         // Iterate over each approved reservation
//         approvedReservations.forEach(reservation => {
//             const reservationDate = reservation.reservationDate;
//             // Calculate the next day after the reservation date
//             const nextDay = new Date(reservationDate);
//             nextDay.setDate(nextDay.getDate() + 1);

//             // Iterate over each amenity in the reservation
//             reservation.reservationAmenities.forEach(amenity => {
//                 if (amenity._id.toString() === id) {
//                     const quantity = amenity.amenityQuantity;

//                     // Initialize stock changes for the reservation date and the next day if not already done
//                     if (!stockChanges[reservationDate]) {
//                         stockChanges[reservationDate] = 0;
//                     }
//                     if (!stockChanges[nextDay]) {
//                         stockChanges[nextDay] = 0;
//                     }

//                     // Decrease stock on the reservation date and increase it the next day
//                     stockChanges[reservationDate] -= quantity;
//                     stockChanges[nextDay] += quantity;
//                 }
//             });
//         });

//         // Fetch the maximum stock of the equipment from the Amenity model
//         const amenity = await Amenity.findById(id).select('amenityStockMax');

//         // If the amenity is not found, return an error
//         if (!amenity) {
//             console.log("Amenity not found.");
//             return res.status(404).json({ error: "Amenity not found" });
//         }

//         let currentStock = amenity.amenityStockMax;

//         // Sort the dates in stockChanges in ascending order
//         const sortedDates = Object.keys(stockChanges).sort((a, b) => new Date(a) - new Date(b));

//         // Iterate over the sorted dates to calculate the stock on each date
//         for (const date of sortedDates) {
//             currentStock += stockChanges[date];
//             // If the date matches the target date, return the current stock
//             if (new Date(date).toDateString() === targetDate.toDateString()) {
//                 console.log("Available stock fetched successfully.");
//                 return res.status(200).json({ availableStock: currentStock });
//             }
//         }

//         // If the target date is not found in the stock changes, return the current stock
//         console.log("Available stock fetched successfully.");
//         res.status(200).json({ availableStock: currentStock });
//     } catch (error) {
//         console.log("Error fetching available stock: ", error.message);
//         res.status(400).json({ error: error.message });
//     }
// }

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
// Update a reservation
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

// Batch approve reservations
const batchApproveReservations = async (req, res) => {
    const { reservationIds, updateData } = req.body;

    // Input validation
    if (!reservationIds?.length || !updateData) {
        return res.status(400).json({
            success: false,
            error: "Missing required fields: reservationIds and updateData"
        });
    }

    if (!Array.isArray(reservationIds)) {
        return res.status(400).json({
            success: false,
            error: "reservationIds must be an array"
        });
    }

    // Validate all reservations are in "Pending" status
    const reservations = await Reservation.find({
        _id: { $in: reservationIds }
    });

    const nonPendingReservations = reservations.filter(reservation => {
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
        return latestStatus.status !== "Pending";
    });

    if (nonPendingReservations.length > 0) {
        return res.status(400).json({
            success: false,
            error: "Some reservations are not Pending",
            description: "Reservations must be in \"Pending\" status to be approved."
        });
    }

    // Validate all IDs are valid MongoDB ObjectIds
    const validIds = reservationIds.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
        return res.status(400).json({
            success: false,
            error: "One or more invalid reservation IDs",
            description: "Please ensure all reservation IDs are valid."
        });
    }

    try {
        // First check if all reservations exist
        const count = await Reservation.countDocuments({
            _id: { $in: reservationIds }
        });

        if (count !== reservationIds.length) {
            return res.status(404).json({
                success: false,
                error: "Some reservations were not found",
                description: "Please ensure all reservations exist."
            });
        }

        // Perform the update
        const result = await Reservation.updateMany(
            { _id: { $in: reservationIds } },
            updateData,
            { new: true, runValidators: true }
        );

        // Get updated documents
        const updatedReservations = await Reservation.find({
            _id: { $in: reservationIds }
        });

        console.log(`Successfully updated ${result.modifiedCount} reservations`);

        return res.status(200).json({
            success: true,
            modifiedCount: result.modifiedCount,
            updatedReservations
        });

    } catch (error) {
        console.error("Batch update error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to update reservations",
            details: error.message
        });
    }
}


// Batch reject reservations
const batchRejectReservations = async (req, res) => {
    const { reservationIds, updateData } = req.body;

    // Input validation
    if (!reservationIds?.length || !updateData) {
        return res.status(400).json({
            success: false,
            error: "Missing required fields: reservationIds and updateData"
        });
    }

    if (!Array.isArray(reservationIds)) {
        return res.status(400).json({
            success: false,
            error: "reservationIds must be an array"
        });
    }

    // Validate all reservations are in "Pending" status
    const reservations = await Reservation.find({
        _id: { $in: reservationIds }
    });

    const nonPendingReservations = reservations.filter(reservation => {
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
        return latestStatus.status !== "Pending";
    });

    if (nonPendingReservations.length > 0) {
        return res.status(400).json({
            success: false,
            error: "Some reservations are not Pending",
            description: "Reservations must be in \"Pending\" status to be rejected."
        });
    }

    // Validate all IDs are valid MongoDB ObjectIds
    const validIds = reservationIds.every(id => mongoose.Types.ObjectId.isValid(id));
    if (!validIds) {
        return res.status(400).json({
            success: false,
            error: "One or more invalid reservation IDs"
        });
    }

    try {
        // First check if all reservations exist
        const count = await Reservation.countDocuments({
            _id: { $in: reservationIds }
        });

        if (count !== reservationIds.length) {
            return res.status(404).json({
                success: false,
                error: "Some reservations were not found"
            });
        }

        // Perform the update
        const result = await Reservation.updateMany(
            { _id: { $in: reservationIds } },
            updateData,
            { new: true, runValidators: true }
        );

        // Get updated documents
        const updatedReservations = await Reservation.find({
            _id: { $in: reservationIds }
        });

        console.log(`Successfully updated ${result.modifiedCount} reservations`);

        return res.status(200).json({
            success: true,
            modifiedCount: result.modifiedCount,
            updatedReservations
        });

    } catch (error) {
        console.error("Batch update error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to update reservations",
            details: error.message
        });
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

    //
    getEquipmentUnavailableDates,
    getEquipmentAvailableStock,
    getFacilityUnavailableDates,

    // DELETE controllers
    deleteReservation,

    // PATCH controllers
    batchApproveReservations,
    batchRejectReservations,
    updateReservation,
}