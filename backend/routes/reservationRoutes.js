


const express = require('express')
const router = express.Router()

const { 

    createReservation,
    deleteReservation,
    getApprovedReservations,
    getAmenityReservations,
    getArchivedReservations,
    getReservation,
    getReservations,
    getUserReservations,
    updateReservation

} = require('../controllers/reservationController')


const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)



router.get('/approved', getApprovedReservations)

// GET all unarchived reservations
router.get('/', getReservations)

// GET all unarchived and unrejected reservations

// GET all unarchived and unrejected reservations of a specific amenity
router.get('/approved/:amenityName', getAmenityReservations)

// GET all unarchived reservations from members
router.get('/:blkLt', getUserReservations)

// GET all archived reservations
router.get('/archive/asd', getArchivedReservations)

// GET a single reservation
router.get('/details/:id', getReservation)

// POST a new reservation
router.post('/', createReservation)

// DELETE a reservation
router.delete('/:id', deleteReservation)

// UPDATE a reservation
router.patch('/:id', updateReservation)

// UPDATE a reservation
router.patch('/details/edit/:id', updateReservation)





module.exports = router