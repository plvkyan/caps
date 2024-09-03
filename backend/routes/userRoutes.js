


const express = require('express')
const router = express.Router()

// Controller Function
const { 
    createUser, 
    deleteUser, 
    getUser, 
    getUsers, 
    getArchivedUsers, 
    getUnitOwners,
    loginUser, 
    updateUser 
} = require('../controllers/userController')

// Import checkOverdue Middleware




// Middlewares
// Check Overdue Middleware




// Login route
router.post('/login', loginUser)

// Create user route
router.post('/signup', createUser)

// GET all users
router.get('/', getUsers)

// GET all unarchived unitowner users
router.get('/unitOwners', getUnitOwners)

// GET all archived users
router.get('/archived', getArchivedUsers)

// GET a single user
router.get('/:id', getUser)

// DELETE a new user
router.delete('/:id', deleteUser)

// UPDATE a user
router.patch('/:id', updateUser)



module.exports = router
