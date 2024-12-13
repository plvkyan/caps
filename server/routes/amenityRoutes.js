


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
   getCreatedAmenities,
   updateAmenity,
   archiveAmenity,
   archiveMultipleAmenities,
   unarchiveMultipleAmenities,
   unarchiveAmenity,

} = require('../controllers/amenityController')



const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)





// POST routes
// POST a new amenity
router.post('/', createAmenity);





// DELETE route
// DELETE an amenity
router.delete('/:id', deleteAmenity);





// PATCH routes
// UPDATE an amenity
router.patch('/:id', updateAmenity);

// ARCHIVE an amenity
router.patch('/archive/:id', archiveAmenity);

// UNARCHIVE an amenity
router.patch('/unarchive/:id', unarchiveAmenity);

// ARCHIVE multiple amenities
router.patch('/update/visibility/batch/archive', archiveMultipleAmenities);

router.patch('/update/visibility/batch/unarchive', unarchiveMultipleAmenities);



// GET routes
// GET all unarchived amenities
router.get('/all/unarchived', getAmenities);

// GET all unarchived amenities
router.get('/all/archived', getArchivedAmenities);

// GET a specific amenity
router.get('/:id', getSpecificAmenity);

router.get('/created-by/:id', getCreatedAmenities);





module.exports = router