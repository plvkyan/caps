


// Imports
// Import express
const express = require('express')

// Import router
const router = express.Router()

// Import exportController
const {
    exportAmenityDetails,
} = require('../controllers/exportController');



// POST requests
// EXPORT amenity details
router.post('/amenities/details', exportAmenityDetails);




// Export router
module.exports = router