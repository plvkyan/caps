


// Requires
// The jwt module is used to create a token for the user
const jwt = require('jsonwebtoken')
// The mongoose module is used to interact with the MongoDB database
const mongoose = require('mongoose')
// The User model is used to interact with the User collection in the database
const User = require('../models/userModel')



// Create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })
}





// POST methods
// Create user
const createUser = async (req, res) => {

    // Get user's block and lot number, password, email, mobile number, role, position, status, and visibility from the request body
    const {
        userBlkLt,
        userPassword,
        userEmail,
        userMobileNo,
        userRole,
        userPosition,
        userStatus,
        userVisibility,
    } = req.body

    try {

        // Create the user account using the User model static method
        const user = await User.signup(userBlkLt, userPassword, userEmail, userMobileNo, userRole, userPosition, userStatus, userVisibility);

        // Create a token
        const token = createToken(user._id)

        // Return the user and token
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}



// Login user
const loginUser = async (req, res) => {

    // Get user's block and lot number and password from the request body
    const { userBlkLt, userPassword } = req.body

    try {
        // Check if user exists
        const user = await User.login(userBlkLt, userPassword)

        // Check if user is archived
        const existingUser = await User.findOne({ blktLt: userBlkLt })

        // Check if user is archived
        if (existingUser?.stat === "Archived") {
            return res.status(403).json({
                error: "Your account is archived. Please contact GCHOAI to reactivate it."
            })
        }

        // Create a token
        const token = createToken(user._id)

        const _id = user._id;
        const userRole = user.userRole;
        const userPosition = user.userPosition;
        const userStatus = user.userStatus;
        const userVisibility = user.userVisibility;

        // Return the user and token
        res.status(200).json({ _id, userBlkLt, userRole, userPosition, userStatus, userVisibility, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Bulk create users
const bulkCreateUsers = async (req, res) => {
    const { startBlock, endBlock, startLot, endLot, defaultPassword, defaultStatus, defaultVisibility } = req.body;

    try {

        const createUsers = await User.bulkSignup(startBlock, endBlock, startLot, endLot, defaultPassword, defaultStatus, defaultVisibility);
        
        res.status(200).json(createUsers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



// GET all users
const getUsers = async (req, res) => {
    try {
        // Get all active (unarchived) users directly from database
        const activeUsers = await User.find({ userVisibility: "Unarchived" })
            .sort({ createdAt: -1 })
            .lean() // Convert to plain JavaScript object for better performance
        res.status(200).json(activeUsers)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
}


// GET all archived users
const getArchivedUsers = async (req, res) => {

    const initUsers = await User.find({}).sort({ createdAt: -1 })

    const users = initUsers.filter(function (user) {
        return user.stat === "Archived";
    });

    res.status(200).json(users)
}


// GET all users
const getUnitOwners = async (req, res) => {
    try {
        const unitOwners = await User.find({ 
            userVisibility: "Unarchived",
            userPosition: "Unit Owner" 
        })
        .sort({ createdAt: -1 })
        .lean()

        res.status(200).json(unitOwners)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch unit owners" })
    }
}


// GET single user
const getUser = async (req, res) => {
    try {
        const { id } = req.params

        // Validate if ID is provided
        if (!id) {
            return res.status(400).json({ error: "User ID is required" })
        }

        // Validate if ID format is correct
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" })
        }

        // Find user and select necessary fields only
        const user = await User.findById(id)
            .select('-password') // Exclude password from response
            .lean() // Convert to plain JavaScript object for better performance

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        // Check if user is archived
        if (user.stat === "Archived") {
            return res.status(403).json({ error: "This user account is archived" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}





// DELETE a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)

}





// UPDATE an announcement
const updateUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such user' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
}







module.exports = { bulkCreateUsers, createUser, getArchivedUsers, getUsers, getUnitOwners, getUser, deleteUser, updateUser, loginUser }