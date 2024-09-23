


const express = require('express')
const router = express.Router()

const { 
   
   createAmenity,
   deleteAmenity,
   getAmenities,
   getSpecificAmenity,
   updateAmenity,

} = require('../controllers/amenityController')



const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)


// DELETE an amenity
router.delete('/:amenityName', deleteAmenity);

// GET all unarchived amenities
router.get('/', getAmenities);

// GET a specific amenity
router.get('/:amenityName', getSpecificAmenity);

// POST a new amenity
router.post('/', createAmenity);

// UPDATE an amenity
router.patch('/:amenityName', updateAmenity)



module.exports = router