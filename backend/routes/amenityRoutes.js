


const express = require('express')
const router = express.Router()
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const { 
   
   createAmenity,
   deleteAmenity,
   getAmenities,
   getArchivedAmenities,
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

// GET all unarchived amenities
router.get('/archived', getArchivedAmenities);

// GET a specific amenity
router.get('/:amenityName', getSpecificAmenity);

// POST a new amenity
router.post('/', upload.single('amenityImage'), createAmenity);

// UPDATE an amenity
router.patch('/:amenityName', updateAmenity)



module.exports = router