


const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const createToken = (_id) => {

    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '1d' })

}


// Login user
const loginUser = async (req, res) => {

    const { blkLt, password } = req.body

    try {

        const user = await User.login( blkLt, password )

        const compareDatabase = User.findOne({ blktLt : blkLt })

        if (compareDatabase) {
            if (compareDatabase.stat == "Archived") {
                return res.status(400).json({ error: "Your account is archived. Reach out to the GCHOAI to unarchive it." })
            }
        }

        // Create a token
        const token = createToken(user._id)

        const role = user.role
        const position = user.position
        const memberStatus = user.memberStatus;
        const stat = user.stat;
        const id = user._id;

        res.status(200).json({  id, blkLt, password, token, role, position, memberStatus, stat })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}





// Create user
const createUser = async (req, res) => {

    const { blkLt, password, memberStatus, role, position, stat } = req.body

    try {

        const user = await User.signup(blkLt, password, memberStatus, role, position, stat)

        const token = createToken(user._id)

        res.status(200).json({ blkLt, token, memberStatus, role, position, stat })

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}





// GET all users
const getUsers = async (req, res) => {

    const initUsers = await User.find({}).sort({createdAt: -1})

    const users = initUsers.filter(function (user) {
        return user.stat === "Unarchived";
    });

    res.status(200).json(users)
}




// GET all archived users
const getArchivedUsers = async (req, res) => {

    const initUsers = await User.find({}).sort({createdAt: -1})

    const users = initUsers.filter(function (user) {
        return user.stat === "Archived";
    });

    res.status(200).json(users)
}


// GET all users
const getUnitOwners = async (req, res) => {

    const initUsers = await User.find({}).sort({createdAt: -1})

    const users = initUsers.filter(function (user) {
        return user.stat === "Unarchived";
    });

    const unitOwners = users.filter(function (user) {
        return user.position === "Unit Owner";
    })

    res.status(200).json(unitOwners)
}



// GET single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such user"})
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({error: "No such user"})
    }

    res.status(200).json(user)
}





// DELETE a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }

    res.status(200).json(user)

}





// UPDATE an announcement
const updateUser = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such user'})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }

    res.status(200).json(user)
}







module.exports = { createUser, getArchivedUsers, getUsers, getUnitOwners, getUser, deleteUser, updateUser, loginUser }