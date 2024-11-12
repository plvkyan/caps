


const Amenity = require("../models/amenityModel")
const Reservation = require("../models/reservationModel")
const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary');






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
        const amenityReservations = await Reservation.find({
            'reservationAmenities._id': id
        }).sort({ createdAt: -1 });
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

// Get available stock for multiple equipments on a specific date
const getEquipmentsAvailableStock = async (req, res) => {
    const { date } = req.params;
    const { amenityIds } = req.body;

    try {
        // Parse the date and normalize to start of day
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        // Fetch all approved reservations for the specified equipments
        const reservations = await Reservation.find({
            "reservationAmenities._id": { $in: amenityIds }
        }).select('reservationDate reservationAmenities reservationStatus -_id');

        // Filter reservations where the latest status is "Approved"
        const approvedReservations = reservations.filter(reservation => {
            const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
            return latestStatus.status === "Approved";
        });

        // Fetch the maximum stock of all equipments
        const amenities = await Amenity.find({
            _id: { $in: amenityIds }
        }).select('_id amenityStockMax');

        // Create a map of reserved quantities for each equipment
        const reservedQuantities = {};
        amenityIds.forEach(id => reservedQuantities[id] = 0);

        // Calculate total reserved quantity for each equipment on the target date
        approvedReservations.forEach(reservation => {
            const reservationDate = new Date(reservation.reservationDate);
            reservationDate.setHours(0, 0, 0, 0);

            if (reservationDate.getTime() === targetDate.getTime()) {
                reservation.reservationAmenities.forEach(amenity => {
                    if (amenityIds.includes(amenity._id.toString())) {
                        reservedQuantities[amenity._id.toString()] += amenity.amenityQuantity;
                    }
                });
            }
        });

        // Create a map of amenities for easier lookup
        const amenityMap = new Map(amenities.map(amenity => [amenity._id.toString(), amenity]));

        // Calculate available stock maintaining the original order
        const availableStock = amenityIds.map(id => ({
            amenityId: id,
            availableStock: amenityMap.get(id).amenityStockMax - (reservedQuantities[id] || 0)
        }));

        console.log("Available stock fetched successfully for multiple equipments.");
        res.status(200).json(availableStock);
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
// Add a new comment to a reservation
// Add a new comment to a reservation
const addReservationComment = async (req, res) => {
    const { id } = req.params;
    const { commentContent, commentAuthor, commentAuthorId, commentAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Check if the reservation is completed
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];
        if (latestStatus && latestStatus.status === "Completed") {
            return res.status(400).json({
                error: 'Cannot add comments to completed reservations.'
            })
        }

        // Create new comment object
        const newComment = {
            commentContent,
            commentDate: new Date(),
            commentAuthorId,
            commentAuthor,
            commentAuthorPosition
        };

        // Add comment to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationComments: newComment } },
            { new: true }
        );

        console.log("Comment added successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error adding comment: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Approve a single reservation
const approveReservation = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            });
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is pending
        if (!latestStatus || latestStatus.status !== "Pending") {
            return res.status(400).json({
                error: 'Only pending reservations can be approved',
                description: 'Reservation status of type ' + latestStatus.status + ' cannot be approved.'
            });
        }

        // For Facility reservations, check if facility is already reserved for that date
        if (reservation.reservationType === "Facility") {
            for (const amenity of reservation.reservationAmenities) {
                const existingReservation = await Reservation.findOne({
                    'reservationAmenities._id': amenity._id,
                    'reservationDate': reservation.reservationDate,
                    'reservationStatus.status': 'Approved',
                    '_id': { $ne: id } // exclude current reservation
                });

                if (existingReservation) {
                    return res.status(400).json({
                        error: 'Facility already reserved',
                        description: `${amenity.amenityName} is already reserved for this date.`
                    });
                }
            }
        }
        // For Equipment or Equipment and Facility reservations, check stock availability
        else if (['Equipment', 'Equipment and Facility'].includes(reservation.reservationType)) {
            for (const amenity of reservation.reservationAmenities) {
                // Get all approved reservations for this equipment on the same date
                const approvedReservations = await Reservation.find({
                    'reservationAmenities._id': amenity._id,
                    'reservationDate': reservation.reservationDate,
                    'reservationStatus.status': 'Approved'
                });

                // Calculate total reserved quantity
                const reservedQuantity = approvedReservations.reduce((total, res) => {
                    const equipment = res.reservationAmenities.find(a => a._id.toString() === amenity._id.toString());
                    return total + (equipment ? equipment.amenityQuantity : 0);
                }, 0);

                // Get the equipment's maximum stock
                const equipmentDoc = await Amenity.findById(amenity._id);
                const availableStock = equipmentDoc.amenityStockMax - reservedQuantity;

                // Check if there's enough stock
                if (amenity.amenityQuantity > availableStock) {
                    return res.status(400).json({
                        error: 'Insufficient stock',
                        description: `Not enough stock available for ${amenity.amenityName}. Available: ${availableStock}, Requested: ${amenity.amenityQuantity}`
                    });
                }
            }
        }

        // Create new status object
        const newStatus = {
            status: "Approved",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation approved successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error approving reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}


// Reject a single reservation
const rejectReservation = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is pending
        if (!latestStatus || latestStatus.status !== "Pending") {
            return res.status(400).json({
                error: 'Only pending reservations can be rejected',
                description: 'Reservation status of type ' + latestStatus.status + ' cannot be rejected.'
            })
        }

        // Create new status object
        const newStatus = {
            status: "Rejected",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation rejected successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error rejecting reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Archive a single reservation
const archiveReservation = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            });
        }

        // Check if reservation is already archived
        if (reservation.reservationVisibility === "Archived") {
            return res.status(400).json({
                error: 'Reservation is already archived',
                description: 'This reservation has already been archived.'
            });
        }

        // Update reservation visibility to archived
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { reservationVisibility: "Archived" },
            { new: true }
        );

        console.log("Reservation archived successfully.");
        res.status(200).json(updatedReservation);

    } catch (error) {
        console.log("Error archiving reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Archive a single reservation
const unarchiveReservation = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            });
        }

        // Check if reservation is already unarchived
        if (reservation.reservationVisibility === "Unarchived") {
            return res.status(400).json({
                error: 'Reservation is already unarchived',
                description: 'This reservation has already been unarchived.'
            });
        }

        // Update reservation visibility to unarchived
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { reservationVisibility: "Unarchived" },
            { new: true }
        );

        console.log("Reservation unarchived successfully.");
        res.status(200).json(updatedReservation);

    } catch (error) {
        console.log("Error unarchiving reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Mark a reservation as ongoing
const setReservationOngoing = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is approved
        if (!latestStatus || latestStatus.status !== "Approved") {
            return res.status(400).json({
                error: 'Only accepted reservations can be set as ongoing',
                description: 'Reservation status of type ' + latestStatus.status + ' cannot be ongoing.'
            })
        }

        // Create new status object
        const newStatus = {
            status: "Ongoing",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation set to ongoing successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error setting reservation to ongoing: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Mark a reservation as for return
const setReservationForReturn = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Check if reservation type is valid for return
        if (!['Equipment', 'Equipment and Facility'].includes(reservation.reservationType)) {
            return res.status(400).json({
                error: 'Only reservations with equipments can be set as for return',
                description: 'Reservation of type ' + reservation.reservationType + ' cannot be for return.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is ongoing
        if (!latestStatus || latestStatus.status !== "Ongoing") {
            return res.status(400).json({
                error: 'Only ongoing reservations can be set as for return',
                description: 'Reservation status of type ' + latestStatus.status + ' cannot be for return.'
            })
        }

        // Create new status object
        const newStatus = {
            status: "For Return",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation set to for return successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error setting reservation to for return: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Mark a reservation as returned
const setReservationReturned = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Check if reservation type is valid for return
        if (!['Equipment', 'Equipment and Facility'].includes(reservation.reservationType)) {
            return res.status(400).json({
                error: 'Only reservations with equipments can be set as returned',
                description: 'Reservation of type ' + reservation.reservationType + ' cannot be returned.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is for return
        if (!latestStatus || latestStatus.status !== "For Return") {
            return res.status(400).json({
                error: 'Only for return reservations can be set as returned',
                description: 'Reservation status of type ' + latestStatus.status + ' cannot be returned.'
            })
        }

        // Create new status object
        const newStatus = {
            status: "Returned",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation set to returned successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error setting reservation to returned: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Mark a reservation as completed
const setReservationCompleted = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Different validation based on reservation type
        if (['Equipment', 'Equipment and Facility'].includes(reservation.reservationType)) {
            // For Equipment or Equipment and Facility reservations
            if (!latestStatus || latestStatus.status !== "Returned") {
                return res.status(400).json({
                    error: 'Only returned reservations can be set as completed',
                    description: 'Reservation status of type ' + latestStatus.status + ' cannot be completed.'
                })
            }
        } else if (reservation.reservationType === "Facility") {
            // For Facility reservations
            if (!latestStatus || latestStatus.status !== "Ongoing") {
                return res.status(400).json({
                    error: 'Only for ongoing reservations can be set as completed',
                    description: 'Reservation status of type ' + latestStatus.status + ' cannot be completed.'
                })
            }
        }

        // Create new status object
        const newStatus = {
            status: "Completed",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation set to completed successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error setting reservation to completed: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

// Reject a single reservation
const setReservationCancelled = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Check if the reservation is pending
        if (!latestStatus || latestStatus.status !== "Pending") {
            return res.status(400).json({
                error: 'Only pending reservations can be cancelled',
                description: 'Reservation status of type \'' + latestStatus.status + '\' cannot be cancelled.'
            })
        }

        // Create new status object
        const newStatus = {
            status: "Cancelled",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation cancelled successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error cancelling reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

const setReservationVoid = async (req, res) => {
    const { id } = req.params;
    const { statusAuthorId, statusAuthor, statusAuthorPosition } = req.body;

    try {
        // Find the reservation first
        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(400).json({
                error: 'Reservation not found',
                description: 'There might be internal errors. Please try again later.'
            })
        }

        // Get the latest status
        const latestStatus = reservation.reservationStatus[reservation.reservationStatus.length - 1];

        // Define allowed statuses
        const allowedStatuses = ["Approved", "Ongoing", "For Return", "Returned", "Completed"];

        // Check if the latest status is allowed to be voided
        if (!latestStatus || !allowedStatuses.includes(latestStatus.status)) {
            return res.status(400).json({
                error: 'Invalid status for voiding',
                description: `Only reservations with status ${allowedStatuses.join(", ")} can be voided. Current status: ${latestStatus.status}`
            })
        }

        // Create new status object
        const newStatus = {
            status: "Void",
            statusDate: new Date(),
            statusAuthorId,
            statusAuthor,
            statusAuthorPosition
        };

        // Add status to reservation
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { $push: { reservationStatus: newStatus } },
            { new: true }
        );

        console.log("Reservation voided successfully.");
        res.status(200).json(updatedReservation);
    } catch (error) {
        console.log("Error voiding reservation: ", error.message);
        res.status(400).json({ error: error.message });
    }
}

const uploadReservationImages = async (req, res) => {

    const { id } = req.params;
    let { reservationImages } = req.body;

    try {
        // Initialize imagesBuffer array
        let imagesBuffer = [];

        const oldReservation = await Reservation.findById(id);
        const oldReservationImages = oldReservation.reservationImages;

        // Loop to upload each image from reservationImages array to cloudinary
        for (let i = 0; i < reservationImages.length; i++) {
            // Upload each individual image to cloudinary

            // Skip if the current image is already an object (has been uploaded)
            if (typeof reservationImages[i] === 'object') {
                imagesBuffer.push(reservationImages[i]);
                continue;
            }

            const imageUploadData = await cloudinary.uploader.upload(reservationImages[i], {
                folder: "gctms_imgs/reservations",
            });

            console.log(`Image ${i + 1} uploaded successfully.`);

            // Push the uploaded image data to the imagesBuffer array
            imagesBuffer.push({
                public_id: imageUploadData.public_id,
                url: imageUploadData.secure_url,
            });
        }

        // Check if the old amenity has no images and if there are new images
        if (oldReservationImages.length === 0 && reservationImages.length !== 0) {

            console.log("\nThere are no old images, we'll upload the new ones.");

            // Loop to upload each image from amenityImages array to cloudinary
            for (let i = 0; i < reservationImages.length; i++) {

                // Upload each individual image to cloudinary
                const newImageUpload = await cloudinary.uploader.upload(reservationImages[i], {
                    folder: "gctms_imgs/reservations",
                });

                // Push the uploaded image data to the imagesBuffer array
                imagesBuffer.push({
                    public_id: newImageUpload.public_id,
                    url: newImageUpload.secure_url,
                })

                console.log("Picture " + i + " uploaded successfully.");
            }

            // Set amenityImages to the imagesBuffer
            reservationImages = imagesBuffer;
        }

        // Check if the old amenity has images and if there are no new images
        if (oldReservationImages.length !== 0 && reservationImages.length === 0) {

            console.log("\nThere are no new images, we'll delete the old ones.");

            // Since there are no new images, delete the old images
            for (let i = 0; i < oldReservationImages.length; i++) {

                // Get the public_id of each individual old image
                const oldImageId = oldReservationImages[i].public_id;

                // If the public_id exists, delete the old image from cloudinary
                if (oldImageId) {
                    await cloudinary.uploader.destroy(oldImageId);
                }

                console.log("Picture " + i + " deleted successfully.");
            }

            // Set amenityImages to the imagesBuffer
            reservationImages = imagesBuffer;
        }

        // Check if the old amenity has images and if there are new images
        if (oldReservationImages.length !== 0 && reservationImages.length !== 0) {

            console.log("\nThere are old images and new images, we'll check if there are old images in the new images array.");

            // Check if the new images array has no public_id
            if (!Object.hasOwn(reservationImages[0], 'public_id')) {

                console.log("\nIt's the first element and it's a new image. It means there are no old images and only new images to upload.");
                console.log("\nLet's first delete the old images.");

                for (let i = 0; i < oldReservationImages.length; i++) {

                    // Get the public_id of each individual old image
                    const oldImageId = oldReservationImages[i].public_id;

                    // If the public_id exists, delete the old image from cloudinary
                    if (oldImageId) {
                        await cloudinary.uploader.destroy(oldImageId);
                    }

                    console.log("\nPicture " + i + " deleted successfully.");
                }

                console.log("\nNow, let's upload the new images.");

                for (let i = 0; i < reservationImages.length; i++) {

                    // Upload each individual image to cloudinary
                    const newImageUpload = await cloudinary.uploader.upload(reservationImages[i].url, {
                        folder: "gctms_imgs/reservations",
                    });

                    // Push the uploaded image data to the imagesBuffer array
                    imagesBuffer.push({
                        public_id: newImageUpload.public_id,
                        url: newImageUpload.secure_url,
                    })

                    console.log("Picture " + i + " uploaded successfully.");
                }

                reservationImages = imagesBuffer;
            }



            // Check if the new images array has a public_id
            if (Object.hasOwn(reservationImages[0], 'public_id')) {

                console.log("\nIt's the first element and it's an old image. It means there are old images and new images to compare.");
                console.log("\nLet's first compare the old images.");

                // Outer loop for comparing the old images to the new ones
                for (let i = 0; i < oldReservationImages.length; i++) {

                    console.log(i);

                    // Inner loop for comparing the new images to the old ones
                    for (let j = 0; j < reservationImages.length; j++) {

                        console.log(j)

                        // Check if the new image is the same as the old image
                        if (oldReservationImages[i].public_id === reservationImages[j].public_id) {

                            console.log("\nIt's the same image. Let's add it to the buffer.");

                            // Push the old image to the imagesBuffer array
                            imagesBuffer.push({
                                public_id: oldReservationImages[i].public_id,
                                url: oldReservationImages[i].url,
                            });

                            break;
                        }

                        // Check if the new image is different from the old image
                        if (j === reservationImages.length - 1) {

                            console.log("It's a different image, bro. Let's delete the old one.");

                            const oldImageId = oldReservationImages[i].public_id;

                            if (oldImageId) {
                                await cloudinary.uploader.destroy(oldImageId);
                            }

                            console.log("Picture " + i + " deleted successfully.");
                        }

                    }
                }

                console.log("\nNow, let's upload the rest of the new images.")
                for (let k = imagesBuffer.length; k < reservationImages.length; k++) {

                    // Upload each individual image to cloudinary
                    const newImageUpload = await cloudinary.uploader.upload(reservationImages[k], {
                        folder: "gctms_imgs/reservations",
                    });

                    // Push the uploaded image data to the imagesBuffer array
                    imagesBuffer.push({
                        public_id: newImageUpload.public_id,
                        url: newImageUpload.secure_url,
                    })

                    console.log("Picture " + k + " uploaded successfully.");

                }
            }

            // Set amenityImages to the imagesBuffer
            reservationImages = imagesBuffer;


        }

        reservationImages = imagesBuffer;

        // Update the reservation with new images
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { reservationImages: imagesBuffer },
            { new: true }
        );

        console.log("Reservation images uploaded successfully.");
        res.status(200).json(updatedReservation);

    } catch (error) {
        console.log("Error uploading reservation images: ", error.message);
        res.status(400).json({ error: error.message });
    }

}

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

const batchArchiveReservations = async (req, res) => {
    const { reservationIds } = req.body;

    // Input validation
    if (!reservationIds?.length) {
        return res.status(400).json({
            success: false,
            error: "Missing required field: reservationIds"
        });
    }

    if (!Array.isArray(reservationIds)) {
        return res.status(400).json({
            success: false,
            error: "reservationIds must be an array"
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

        // Check if any reservations are already archived
        const alreadyArchived = await Reservation.find({
            _id: { $in: reservationIds },
            reservationVisibility: "Archived"
        });

        if (alreadyArchived.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Some reservations are already archived"
            });
        }

        // Perform the update
        const result = await Reservation.updateMany(
            { _id: { $in: reservationIds } },
            { reservationVisibility: "Archived" },
            { new: true }
        );

        // Get updated documents
        const updatedReservations = await Reservation.find({
            _id: { $in: reservationIds }
        });

        console.log(`Successfully archived ${result.modifiedCount} reservations`);

        return res.status(200).json({
            success: true,
            modifiedCount: result.modifiedCount,
            updatedReservations
        });

    } catch (error) {
        console.error("Batch archive error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to archive reservations",
            details: error.message
        });
    }
}

const batchUnarchiveReservations = async (req, res) => {
    const { reservationIds } = req.body;

    // Input validation
    if (!reservationIds?.length) {
        return res.status(400).json({
            success: false,
            error: "Missing required field: reservationIds"
        });
    }

    if (!Array.isArray(reservationIds)) {
        return res.status(400).json({
            success: false,
            error: "reservationIds must be an array"
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

        // Check if any reservations are already unarchived
        const alreadyUnarchived = await Reservation.find({
            _id: { $in: reservationIds },
            reservationVisibility: "Unarchived"
        });

        if (alreadyUnarchived.length > 0) {
            return res.status(400).json({
                success: false,
                error: "Some reservations are already unarchived"
            });
        }

        // Perform the update
        const result = await Reservation.updateMany(
            { _id: { $in: reservationIds } },
            { reservationVisibility: "Unarchived" },
            { new: true }
        );

        // Get updated documents
        const updatedReservations = await Reservation.find({
            _id: { $in: reservationIds }
        });

        console.log(`Successfully unarchived ${result.modifiedCount} reservations`);

        return res.status(200).json({
            success: true,
            modifiedCount: result.modifiedCount,
            updatedReservations
        });

    } catch (error) {
        console.error("Batch unarchive error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to unarchive reservations",
            details: error.message
        });
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

        // Check facility availability first
        for (const reservation of reservations) {
            if (reservation.reservationType === "Facility") {
                for (const amenity of reservation.reservationAmenities) {
                    // Check if facility is already reserved for that date
                    const existingReservation = await Reservation.findOne({
                        'reservationAmenities._id': amenity._id,
                        'reservationDate': reservation.reservationDate,
                        'reservationStatus.status': 'Approved',
                        '_id': { $ne: reservation._id } // exclude current reservation
                    });

                    if (existingReservation) {
                        return res.status(400).json({
                            success: false,
                            error: 'Facility already reserved',
                            description: `${amenity.amenityName} is already reserved for ${reservation.reservationDate}`
                        });
                    }
                }
            }
        }

        // Create a map to track total requested quantities per amenity and date
        const stockRequests = new Map();

        // Check stock availability for equipment reservations
        for (const reservation of reservations) {
            if (['Equipment', 'Equipment and Facility'].includes(reservation.reservationType)) {
                for (const amenity of reservation.reservationAmenities) {
                    const key = `${amenity._id}-${reservation.reservationDate}`;

                    // Initialize or update the stock request
                    if (!stockRequests.has(key)) {
                        stockRequests.set(key, {
                            amenityId: amenity._id,
                            date: reservation.reservationDate,
                            totalRequested: 0,
                            amenityName: amenity.amenityName
                        });
                    }
                    // Add current reservation's quantity to total
                    stockRequests.get(key).totalRequested += amenity.amenityQuantity;
                }
            }
        }

        // Validate stock availability for all requests
        for (const [_, request] of stockRequests) {
            // Get all approved reservations for this equipment on the same date
            const approvedReservations = await Reservation.find({
                'reservationAmenities._id': request.amenityId,
                'reservationDate': request.date,
                'reservationStatus.status': 'Approved'
            });

            // Calculate total reserved quantity
            const reservedQuantity = approvedReservations.reduce((total, res) => {
                const equipment = res.reservationAmenities.find(a =>
                    a._id.toString() === request.amenityId.toString());
                return total + (equipment ? equipment.amenityQuantity : 0);
            }, 0);

            // Get the equipment's maximum stock
            const equipmentDoc = await Amenity.findById(request.amenityId);
            const availableStock = equipmentDoc.amenityStockMax - reservedQuantity;

            // Check if there's enough stock for the combined requests
            if (request.totalRequested > availableStock) {
                return res.status(400).json({
                    success: false,
                    error: 'Insufficient stock',
                    description: `Not enough stock available for ${request.amenityName}. Available: ${availableStock}, Total Requested: ${request.totalRequested}`
                });
            }
        }

        // If all validations pass, perform the update
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
    uploadReservationImages,
    getEquipmentUnavailableDates,
    getEquipmentAvailableStock,
    getEquipmentsAvailableStock,
    getFacilityUnavailableDates,

    // DELETE controllers
    deleteReservation,

    // PATCH controllers
    archiveReservation,
    unarchiveReservation,
    batchArchiveReservations,
    batchUnarchiveReservations,
    addReservationComment,
    approveReservation,
    rejectReservation,
    setReservationOngoing,
    setReservationForReturn,
    setReservationReturned,
    setReservationCompleted,
    setReservationCancelled,
    setReservationVoid,
    batchApproveReservations,
    batchRejectReservations,
    updateReservation,
}