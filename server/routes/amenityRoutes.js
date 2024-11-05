


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
   archiveAmenity,

} = require('../controllers/amenityController')



const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)


// DELETE an amenity
router.delete('/:id', deleteAmenity);

// GET all unarchived amenities
router.get('/all/unarchived', getAmenities);

// GET all unarchived amenities
router.get('/all/archived', getArchivedAmenities);

// GET a specific amenity
router.get('/:id', getSpecificAmenity);

// POST a new amenity
router.post('/', createAmenity);

// UPDATE an amenity
router.patch('/:id', updateAmenity)

// ARCHIVE an amenity
router.patch('/archive/:id', archiveAmenity)



module.exports = router