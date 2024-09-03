


const express = require('express')
const router = express.Router()

const { 

   getAmenities,
   getSpecificAmenity,
   createAmenity,
   updateAmenity,

} = require('../controllers/amenityController')



const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)




// GET all unarchived amenities
router.get('/', getAmenities);

// GET a specific amenity
router.get('/:amenityName', getSpecificAmenity);

// POST a new amenity
router.post('/', createAmenity);

// UPDATE an amenity
router.patch('/:amenityName', updateAmenity)



module.exports = router