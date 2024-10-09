


// Requires
const express = require('express')
const router = express.Router()

const { 
    reservationConfirmationEmail,
    reservationRejectionEmail,
    billNotificationEmail,
    billConfirmationEmail,
    billFailureEmail,
} = require('../controllers/emailController')

// SEND a reservation confirmation email
router.post('/reservations/confirmation', reservationConfirmationEmail);

// SEND a reservation rejection email
router.post('/reservations/rejection', reservationRejectionEmail);

// SEND a bill notification email
router.post('/bills/notification', billNotificationEmail);

// SEND a bill confirmation email
router.post('/bills/confirmation', billConfirmationEmail);

// SEND a bill failure email
router.post('/bills/failure', billFailureEmail);





module.exports = router