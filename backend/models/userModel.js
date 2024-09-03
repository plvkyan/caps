


const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({

    blkLt: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    memberStatus: {
        type: String,
        required: false,
        default: "Outstanding"
    },
    position: {
        type: String,
        required: true,
        default: "Unit Owner",
    },
    role: {
        type: String,
        required: true,
        default: "Unit Owner"
    },
    stat: {
        type: String,
        default: "Unarchived"
    }

}, { timestamps: true })



// Static signup method
userSchema.statics.signup = async function(blkLt, password, memberStatus, role, position, stat) {

    // Validation if login fields are filled
    if (!blkLt || !password) {

        throw Error('All fields must be filled.')

    }

    // Validation if password fields are filled
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password must be at least 8 characters long and contains a lowercase letter,an uppercase letter, a number, and a special character')
    // }

    const exists = await this.findOne({ blkLt })



    if (exists) {
        throw Error('Block and Lot already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ blkLt, password:hash, memberStatus, role, position, stat })

    return user

}





// Static Login Method
userSchema.statics.login = async function(blkLt, password) {

    if (!blkLt || !password) {

        throw Error('All fields must be filled.')

    }

    const user = await this.findOne({ blkLt })

    if (!user) {
        throw Error('Incorrect block and lot')
    }

    const match = await bcrypt.compare(password, user.password)


    if (!match) {
        throw Error('Incorrect password')
    }

    return user

}



module.exports = mongoose.model('User', userSchema)