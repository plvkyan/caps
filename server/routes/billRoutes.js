


// Requires
// Express require
const express = require('express')
// Router require
const router = express.Router()

// Controllers
const { 



    // GET functions
    getUnarchivedBillPresets,



    // POST functions
    createBillPreset,
    createBill,
    deleteBill,
    getArchivedBills,
    getBills,
    getBill,
    getUnarchivedBills,
    getUserBills,
    updateBill,
    updateBillPayorStatus,
    archiveBill,
    unarchiveBill,

} = require('../controllers/billController')


// const requireAuth = require('../middlewares/requireAuth')




// Require auth for all announcement routes
// router.use(requireAuth)



// GET routes
// GET all bills
router.get('/', getBills)

// GET all unarchived bills
router.get('/unarchived', getUnarchivedBills)

// GET all archived bills
router.get('/archived', getArchivedBills)

// GET all unarchived bills
router.get('/user/:id', getUserBills)

// GET a single bill
router.get('/single/:id', getBill)

router.get('/presets/unarchived', getUnarchivedBillPresets)



// POST routes
// POST a new bill
router.post('/', createBill)
// POST a new bill preset
router.post('/presets', createBillPreset) 




// DELETE routes
// DELETE a bill
router.delete('/:id', deleteBill)





// PATCH routes
// UPDATE a bill
router.patch('/:id', updateBill)

router.patch('/status/paid', updateBillPayorStatus);

router.patch('/visibility/archive/:id', archiveBill);

router.patch('/visibility/unarchive/:id', unarchiveBill);



module.exports = router