


const express = require('express')
const router = express.Router()



const { 

    createBill,
    deleteBill,
    getArchivedBills,
    getBill,
    getUnarchivedBills,
    getUserBills,
    updateBill,

} = require('../controllers/billController')


const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)




// GET all unarchived bills
router.get('/', getUnarchivedBills)

// GET all unarchived bills
router.get('/:blkLt', getUserBills)

// GET all archived bills
router.get('/archived', getArchivedBills)

// GET a single bill
router.get('/details/:id', getBill)

// POST a new bill
router.post('/', createBill)

// DELETE a bill
router.delete('/:id', deleteBill)

// UPDATE a bill
router.patch('/:id', updateBill)





module.exports = router