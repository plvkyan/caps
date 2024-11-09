


// Requires
// The bcrypt module is used to hash the user's password before saving it to the database
const bcrypt = require('bcrypt')
// The mongoose module is used to interact with the MongoDB database
const mongoose = require('mongoose')
// The validator module is used to validate the user's password
const validator = require('validator')



// Variables
// The Schema class is used to create a new schema for the user
const Schema = mongoose.Schema



// Schema
// The user schema contains the following fields:
const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    userBlkLt: {
        type: String,
        required: true,
        unique: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: false,
    },
    userMobileNo: {
        type: String,
        required: false,
    },
    // The user's role in the system
    userRole: {
        type: String,
        required: true,
        default: "Unit Owner"
    },
    // The user's position in the homeowners association
    userPosition: {
        type: String,
        required: true,
        default: "Unit Owner",
    },
    // The user's membership status in the homeowners association
    userStatus: {
        type: String,
        required: false,
        default: "Outstanding"
    },
    // The user's visibility status in the system
    userVisibility: {
        type: String,
        required: false,
        default: "Unarchived"
    },
}, { timestamps: true })


// User static methods
// Static signup method for creating a new user
userSchema.statics.signup = async function(
    userBlkLt, 
    userPassword, 
    userEmail,
    userMobileNo,
    userRole, 
    userPosition, 
    userStatus, 
    userVisibility,
) {
    try {
        // Validation if login fields are filled
        if (!userBlkLt) {
            throw Error('Block and lot is required.')
        }

        if (!userPassword) {
            throw Error('Password is required.')
        }

        // Validation if user already exists
        const userExists = await this.findOne({ userBlkLt: userBlkLt })

        // If user exists, throw error
        if (userExists) {
            throw Error('User account already exists.');
        }

        // Validate unique positions for officers
        const uniquePositions = ['Auditor', 'Treasurer', 'Secretary', 'Vice President', 'President'];
        if (uniquePositions.includes(userPosition)) {
            const existingOfficer = await this.findOne({
                userPosition: userPosition,
                userVisibility: 'Unarchived'
            });

            if (existingOfficer) {
                throw Error(`There is already an unarchived user with the position of '${userPosition}.'`);
            }
        }

        // Hash the user's password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(userPassword, salt)

        // Create the user
        const user = await this.create({
            userBlkLt: userBlkLt, 
            userPassword: hash, 
            userEmail: userEmail,
            userMobileNo: userMobileNo,
            userRole: userRole, 
            userPosition: userPosition, 
            userStatus: userStatus, 
            userVisibility: userVisibility 
        })

        // Return the user
        return user;
    } catch (error) {
        console.error('Error in signup:', error);
        throw error; // Re-throw the error to be handled by the calling function
    }
}




userSchema.statics.bulkSignup = async function(
    startBlock,
    endBlock,
    startLot,
    endLot,
    defaultPassword,
    defaultStatus,
    defaultVisibility
) {
    try {
        const users = [];

        const defaultRole = "Unit Owner";
        const defaultPosition = "Unit Owner";

        // Validate inputs
        if (!startBlock || !endBlock || !startLot || !endLot || !defaultPassword) {
            throw Error('All range parameters and default password are required.');
        }

        // Hash the default password once
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(defaultPassword, salt);

        console.log(defaultStatus)

        // Generate users for each block and lot combination
        for (let block = startBlock; block <= endBlock; block++) {
            for (let lot = startLot; lot <= endLot; lot++) {
                const userBlkLt = `Blk ${block} Lt ${lot}`;

                // Check if user already exists
                const userExists = await this.findOne({ userBlkLt });
                if (userExists) {
                    // return res.status(400).json({ error: 'User already exists', description: "User '" + userExists.userBlkLt + "' already exists." });
                    throw Error("User '" + userExists.userBlkLt + "' already exists.");
                }

                // Create user object
                users.push({
                    userBlkLt,
                    userPassword: hash,
                    userRole: defaultRole,
                    userPosition: defaultPosition,
                    userStatus: defaultStatus,
                    userVisibility: defaultVisibility
                });
            }
        }

        if (users.length === 0) {
            throw Error('No new users to create.');
        }

        // Bulk insert all users
        const createdUsers = await this.insertMany(users);
        return createdUsers;

    } catch (error) {
        console.error('Error in bulk signup:', error);
        throw error;
    }
}




// Static Login Method
userSchema.statics.login = async function(
    userBlkLt, 
    userPassword, 
) {

    // Validation if login fields are filled
    if (!userBlkLt) {
        throw Error('Block and lot is required.')
    }

    if (!userPassword) {
        throw Error('Password is required.')
    }

    // Finding the user account
    const user = await this.findOne({ 
        userBlkLt, 
        userVisibility: 'Unarchived' 
    })   
    
    // If user does not exist, throw error
    if (!user) {
        throw Error('User not found')
    }

    // Compare the user's password with the hashed password
    const isPasswordMatch = await bcrypt.compare(userPassword, user.userPassword)   
    
    // If the passwords do not match, throw error
    if (!isPasswordMatch) {
        throw Error('Incorrect password.')
    }

    // Return the user
    return user;
}



// Export
// The User model is exported
module.exports = mongoose.model('User', userSchema)