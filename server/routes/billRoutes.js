


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
    unarchiveMultipleBills,
    getAllBillPresets,
    getArchivedBillPresets,

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




// POST routes
// POST a new bill
router.post('/', createBill)





// DELETE routes
// DELETE a bill
router.delete('/:id', deleteBill)





// PATCH routes
// UPDATE a bill
router.patch('/:id', updateBill)

router.patch('/status/paid', updateBillPayorStatus);

router.patch('/visibility/archive/:id', archiveBill);

router.patch('/visibility/unarchive/:id', unarchiveBill);

router.patch('/visibility/unarchive/bulk/_', unarchiveMultipleBills)








// PRESETS
// POST a new bill preset
router.post('/presets', createBillPreset) 



// GET all bill presets
router.get('/presets/all', getAllBillPresets)

// GET all unarchived bill presets
router.get('/presets/unarchived', getUnarchivedBillPresets)

// GET all archived bill presets
router.get('/presets/archived', getArchivedBillPresets)





module.exports = router