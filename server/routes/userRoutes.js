


// Requires
// The express module is used to create a new router
const express = require('express')
// The userController module is used to import the user controller functions
const { 
    createUser, 
    deleteUser, 
    getUser, 
    getUsers, 
    getArchivedUsers, 
    getUnitOwners,
    loginUser, 
    updateUser, 
    bulkCreateUsers,
    bulkArchiveUsers,
    bulkUnarchiveUsers
} = require('../controllers/userController')



// Variables
// The router variable is used to create a new router
const router = express.Router()





// Middlewares



// Routes
// DELETE routes
// DELETE a new user
router.delete('/:id', deleteUser)




// POST routes
// Login route
router.post('/login', loginUser)
// Create user route
router.post('/signup', createUser)
// Create multiple users route
router.post('/signup/bulk', bulkCreateUsers)





// GET all users
router.get('/', getUsers)

// GET all unarchived unitowner users
router.get('/unarchived/unit-owners', getUnitOwners)

// GET all archived users
router.get('/archived', getArchivedUsers)

// GET a single user
router.get('/single/:id', getUser)






// PATCH functions
// UPDATE a user
router.patch('/:id', updateUser)
// ARCHIVE multiple users
router.patch('/archive/bulk', bulkArchiveUsers)
// UNARCHIVE multiple users
router.patch('/unarchive/bulk', bulkUnarchiveUsers)



module.exports = router
