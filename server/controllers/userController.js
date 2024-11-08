


// Requires
// The bcrypt module is used to hash the user's password before saving it to the database
const bcrypt = require('bcrypt')
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
        const userEmail = user.userEmail;
        const userMobileNo = user.userMobileNo;
        const userRole = user.userRole;
        const userPosition = user.userPosition;
        const userStatus = user.userStatus;
        const userVisibility = user.userVisibility;

        // Return the user and token
        res.status(200).json({ _id, userBlkLt, userEmail, userMobileNo, userRole, userPosition, userStatus, userVisibility, token })
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

// Bulk delete users
const bulkDeleteUsers = async (req, res) => {
    const { userIds } = req.body;

    try {
        // Validate input
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty user IDs array.' });
        }

        // Validate all IDs are valid MongoDB ObjectIDs
        const areValidIds = userIds.every(id => mongoose.Types.ObjectId.isValid(id));
        if (!areValidIds) {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }

        // Delete multiple users
        const result = await User.deleteMany({ _id: { $in: userIds } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'No users were deleted.' });
        }

        res.status(200).json({ 
            message: `Successfully deleted ${result.deletedCount} users`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




// UPDATE a user
const updateUser = async (req, res) => {
    const { id } = req.params
    const updateData = { ...req.body }

    try {
        delete updateData.user.token
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID' })
        }

        // If password is provided, hash it before updating
        if (updateData.user.userPassword) {
            const salt = await bcrypt.genSalt(10)
            updateData.user.userPassword = await bcrypt.hash(updateData.user.userPassword, salt)
        } else {
            // If no password provided, remove it from update data to prevent overwriting
            delete updateData.user.userPassword
        }

        console.log(updateData)

        const user = await User.findByIdAndUpdate(
            id,
            updateData.user,
            { new: true, select: '-userPassword' }
        )

        console.log(user); 
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Bulk archive users
const bulkArchiveUsers = async (req, res) => {
    const { archiverId, userIds } = req.body;

    try {
        // Validate input
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty user IDs array.' });
        }

        // Validate all IDs are valid MongoDB ObjectIDs
        const areValidIds = userIds.every(id => mongoose.Types.ObjectId.isValid(id));
        if (!areValidIds) {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }

        // Check if archiver is trying to archive themselves
        if (userIds.includes(archiverId)) {
            return res.status(400).json({ error: 'You cannot archive your own account.' });
        }

        // Check if any users are already archived
        const existingUsers = await User.find({ _id: { $in: userIds } });
        const alreadyArchived = existingUsers.filter(user => user.userVisibility === "Archived");
        
        if (alreadyArchived.length > 0) {
            return res.status(400).json({ 
                error: 'Some users are already archived.',
            });
        }

        // Update multiple users
        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { userVisibility: "Archived" } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No users were archived.' });
        }

        res.status(200).json({ 
            message: `Successfully archived ${result.modifiedCount} users`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Bulk unarchive users
const bulkUnarchiveUsers = async (req, res) => {
    const { userIds } = req.body;

    try {
        // Validate input
        if (!Array.isArray(userIds) || userIds.length === 0) {
            return res.status(400).json({ error: 'Invalid or empty user IDs array.' });
        }

        // Validate all IDs are valid MongoDB ObjectIDs
        const areValidIds = userIds.every(id => mongoose.Types.ObjectId.isValid(id));
        if (!areValidIds) {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }

        // Check if any users are already unarchived
        const existingUsers = await User.find({ _id: { $in: userIds } });
        const alreadyUnarchived = existingUsers.filter(user => user.userVisibility === "Unarchived");
        
        if (alreadyUnarchived.length > 0) {
            return res.status(400).json({ 
                error: 'Some users are already unarchived.',
            });
        }

        // Update multiple users
        const result = await User.updateMany(
            { _id: { $in: userIds } },
            { $set: { userVisibility: "Unarchived" } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: 'No users were unarchived.' });
        }

        res.status(200).json({ 
            message: `Successfully unarchived ${result.modifiedCount} users`
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        return user.userVisibility === "Archived";
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


















module.exports = { 



    // DELETE controllers
    deleteUser, 
    bulkDeleteUsers,



    // POST controllers
    createUser, 
    bulkCreateUsers, 
    loginUser,
    


    // PATCH controllers
    updateUser, 
    bulkArchiveUsers,
    bulkUnarchiveUsers,
    
    
    
    // GET controllers
    getUser, 
    getUsers, 
    getArchivedUsers, 
    getUnitOwners, 
}