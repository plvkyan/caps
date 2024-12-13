


const express = require('express')
const router = express.Router()

const { 

    createAnnouncement,
    deleteAnnouncement,
    getAnnouncement,
    getAnnouncements,
    getArchivedAnnouncements,
    updateAnnouncement,
    getUserAnnouncements

} = require('../controllers/announcementController')


const requireAuth = require('../middlewares/requireAuth');




// Require auth for all announcement routes
// router.use(requireAuth)



// GET all announcements
router.get('/', getAnnouncements)

// GET all announcements
router.get('/archived', getArchivedAnnouncements)

// GET a single announcement
router.get('/:id', getAnnouncement)

// POST a new announcement
router.post('/', createAnnouncement)

// DELETE an announcement
router.delete('/:id', deleteAnnouncement)

// UPDATE an announcement
router.patch('/:id', updateAnnouncement)

router.get('/user/:id', getUserAnnouncements)





module.exports = router