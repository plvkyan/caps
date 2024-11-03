


const express = require('express')
const router = express.Router()


const { 
   createWebhook,
   disableWebhook,
   enableWebhook,
   getWebhook,
   getWebhooks,
   updateWebhook,
} = require('../controllers/webhookController')



router.get('/', getWebhooks)


// // GET all announcements
// router.get('/', getAnnouncements)

// // GET all announcements
// router.get('/archived', getArchivedAnnouncements)

// // GET a single announcement
// router.get('/:id', getAnnouncement)

// POST a new announcement
// router.post('/create', createWebhook)

// // DELETE an announcement
// router.delete('/:id', deleteAnnouncement)

// // UPDATE an announcement
// router.patch('/:id', updateAnnouncement)


module.exports = router;