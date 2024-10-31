


const express = require('express')
const router = express.Router()

const { 
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
   updateReservation,
   batchApproveReservations,
   batchRejectReservations,
   getFacilityUnavailableDates,
   getEquipmentUnavailableDates,
   getEquipmentAvailableStock
} = require('../controllers/reservationController')





// POST routes
// Create a new reservation
router.post('/', createReservation);





// GET routes
// All reservations
router.get('/', getAllReservations);

// Single reservation
router.get('/:id', getReservation);

// Unarchived reservations
router.get('/unarchived/a', getUnarchivedReservations);

// Unarchived and pending reservations
router.get('/unarchived/pending', getUnarchivedPendingReservations);

// Unarchived and approved reservations
router.get('/unarchived/approved', getUnarchivedApprovedReservations);

// Archived reservations
router.get('/archived', getArchivedReservations);

// Archived and pending reservations
router.get('/archived/pending', getArchivedPendingReservations);

// Archived and approved reservations
router.get('/archived/approved', getArchivedApprovedReservations);

// Amenity reservations
router.get('/amenity/:id', getAmenityReservations);

// Amenity pending reservations
router.get('/amenity/pending/:id', getAmenityPendingReservations);

// Amenity approved reservations
router.get('/amenity/approved/:id', getAmenityApprovedReservations);

// Amenity rejected reservations
router.get('/amenity/rejected/:id', getAmenityRejectedReservations);

// Amenity archived reservations
router.get('/amenity/archived/:id', getAmenityArchivedReservations);

// Amenity completed reservations
router.get('/amenity/completed/:id', getAmenityCompletedReservations);

// Amenity expired reservations
router.get('/amenity/expired/:id', getAmenityExpiredReservations);

// User reservations
router.get('/user/:id', getUserReservations);

// User unarchived reservations
router.get('/user/unarchived/:id', getUserUnarchivedReservations);

// User archived reservations
router.get('/user/archived/:id', getUserArchivedReservations);

// User pending reservations
router.get('/user/pending/:id', getUserPendingReservations);

// User approved reservations
router.get('/user/approved/:id', getUserApprovedReservations);

// User rejected reservations
router.get('/user/rejected/:id', getUserRejectedReservations);




// ASDFA
router.get('/amenity/facility/unavailable/:id', getFacilityUnavailableDates)
router.get('/amenity/equipment/stock/:id/:date', getEquipmentAvailableStock)
router.get('/amenity/equipment/unavailable/:id', getEquipmentUnavailableDates)




// DELETE routes
// Delete a reservation
router.delete('/:id', deleteReservation)





// PATCH routes
// Update a reservation
router.patch('/:id', updateReservation)

// Batch update reservations
router.patch('/update/batch/approve', batchApproveReservations)
router.patch('/update/batch/reject',  batchRejectReservations)





module.exports = router