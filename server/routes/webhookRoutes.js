


const express = require('express')
const router = express.Router()


const { 
   createWebhook,
   disableWebhook,
   enableWebhook,
   getWebhook,
   // getWebhooks,
   updateWebhook,
} = require('../controllers/webhookController')



// router.get('/', getWebhooks)

router.post('/', (req, res) => {
   const webhookEvent = req.body;

   console.log('Received webhook: ', webhookEvent);

   res.status(200).send('Webhook received');
});



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