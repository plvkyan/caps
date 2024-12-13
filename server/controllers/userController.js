


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
        userCreatorId,
        userCreatorBlkLt,
        userCreatorPosition,
        userVisibility,
    } = req.body

    try {

        // Create the user account using the User model static method
        const user = await User.signup(userBlkLt, userPassword, userEmail, userMobileNo, userRole, userPosition, userStatus, userCreatorId, userCreatorBlkLt, userCreatorPosition, userVisibility);

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
    const { startBlock, endBlock, startLot, endLot, defaultPassword, defaultStatus, userCreatorId, userCreatorBlkLt, userCreatorPosition, defaultVisibility } = req.body;

    try {

        const createUsers = await User.bulkSignup(startBlock, endBlock, startLot, endLot, defaultPassword, defaultStatus, userCreatorId, userCreatorBlkLt, userCreatorPosition, defaultVisibility);
        
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

        // Get users to be unarchived
        const usersToUnarchive = await User.find({ _id: { $in: userIds } });

        // Check if any users are already unarchived
        const alreadyUnarchived = usersToUnarchive.filter(user => user.userVisibility === "Unarchived");
        if (alreadyUnarchived.length > 0) {
            return res.status(400).json({ 
                error: 'Some users are already unarchived.',
            });
        }

        // Get block/lot numbers of users to be unarchived
        const blkLtNumbers = usersToUnarchive.map(user => user.userBlkLt);  

        // Check for existing unarchived users with same block/lot numbers
        const existingUnarchived = await User.find({
            userBlkLt: { $in: blkLtNumbers },
            userVisibility: "Unarchived"
        });

        if (existingUnarchived.length > 0) {
            return res.status(400).json({
                error: 'Cannot unarchive users. Some block/lot numbers are already in use by unarchived accounts.'
            });
        }

        const positions = usersToUnarchive.map(user => user.userPosition);

        // Skip position validation for Unit Owners and Admins
        if (!positions.every(position => ['Unit Owner', 'Admin'].includes(position))) {
            // Check for existing unarchived users with same positions (excluding Unit Owners and Admins)
            const existingPositions = await User.find({
                userPosition: { $in: positions },
                userVisibility: "Unarchived",
                userPosition: { $nin: ['Unit Owner', 'Admin'] }
            });

            if (existingPositions.length > 0) {
                return res.status(400).json({
                    error: 'Cannot unarchive users. Some positions are already occupied by unarchived accounts.'
                });
            }
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

// Unarchive single user
const unarchiveUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }

        // Get user to be unarchived
        const userToUnarchive = await User.findById(id);
        if (!userToUnarchive) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if user is already unarchived
        if (userToUnarchive.userVisibility === "Unarchived") {
            return res.status(400).json({ error: 'User is already unarchived.' });
        }

        // Check for existing unarchived user with same block/lot number
        const existingUnarchived = await User.findOne({
            userBlkLt: userToUnarchive.userBlkLt,
            userVisibility: "Unarchived"
        });

        if (existingUnarchived) {
            return res.status(400).json({
                error: 'Cannot unarchive user. Block/lot number is already in use by an unarchived account.'
            });
        }

        // Skip position validation for Unit Owners and Admins
        if (!(['Unit Owner', 'Admin'].includes(userToUnarchive.userPosition) && 
            ['Unit Owner', 'Admin'].includes(userToUnarchive.userRole))) {
            
            // Check for existing unarchived user with same position (excluding Unit Owners and Admins)
            const existingPosition = await User.findOne({
                userPosition: userToUnarchive.userPosition,
                userVisibility: "Unarchived",
                userPosition: { $nin: ['Unit Owner', 'Admin'] }
            });

            if (existingPosition) {
                return res.status(400).json({
                    error: `Cannot unarchive user. Position ${userToUnarchive.userPosition} is already occupied.`
                });
            }
        }

        // Update user visibility
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userVisibility: "Unarchived" },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Archive single user
const archiveUser = async (req, res) => {
    const { id } = req.params;
    const { archiverId } = req.body;

    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format.' });
        }

        // Check if user is trying to archive themselves
        if (id === archiverId) {
            return res.status(400).json({ error: 'You cannot archive your own account.' });
        }

        // Get user to be archived
        const userToArchive = await User.findById(id);
        if (!userToArchive) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if user is already archived
        if (userToArchive.userVisibility === "Archived") {
            return res.status(400).json({ error: 'User is already archived.' });
        }

        // Update user visibility
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { userVisibility: "Archived" },
            { new: true }
        );

        res.status(200).json(updatedUser);
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

const getCreatedUsers = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if creator ID is provided
        if (!id) {
            return res.status(400).json({ error: "Creator ID is required" });
        }

        // Find all users created by the specified creator
        const users = await User.find({ 
            userCreatorId: id,
            userVisibility: "Unarchived"
        })
        .sort({ createdAt: -1 })
        .lean();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const getOfficers = async (req, res) => {
    try {
        const officers = await User.find({ 
            userRole: "Admin",
            userPosition: "Unit Owner" 
        })
        .sort({ createdAt: -1 })
        .lean()

        res.status(200).json(officers)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch officers" })
    }
}

// GET all officers
const getAllOfficers = async (req, res) => {
    try {
        const officers = await User.find({ 
            userRole: "Admin",
            userPosition: { 
                $in: ["Unit Owner", "Auditor", "Treasurer", "Secretary", "Vice President", "President"]
            },
            userVisibility: "Unarchived"
        })
        .sort({ createdAt: -1 })
        .lean();

        res.status(200).json(officers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch officers" });
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
    archiveUser,
    unarchiveUser,
    bulkArchiveUsers,
    bulkUnarchiveUsers,
    
    
    
    // GET controllers
    getUser, 
    getUsers, 
    getArchivedUsers, 
    getUnitOwners, 
    getCreatedUsers,
    getAllOfficers,
}