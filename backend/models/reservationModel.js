


const mongoose = require('mongoose')





const Schema = mongoose.Schema



const reservationSchema = new Schema({

    blkLt: {
        type: String,
        required: false,
    },
    blkLtPosition: {
        type: String,
        required: false,
    },
    amenityAddress: {
        type: String,
        required: false
    },
    amenityName: {
        type: String,
        required: true
    },
    amenityType: {
        type: String,
        required: true
    },
    reservationComment: {
        type: String,
        required: false
    },
    reservationCommentSubject: {
        type: String,
        required: false
    },
    reservationDate: {
        type: Date,
        required: true
    },
    reserveeEmail: {
        type: String,
        required: false
    },
    reservationQuantity: {
        type: Number,
        required: false,
    },
    reservationStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    reservationReason: {
        type: String,
        required: false
    },
    interactedBy: {
        type: String,
        required: false,
    },
    interactedByPosition: {
        type: String,
        required: false,
    },
    interactionDate: {
        type: Date,
        required: false,
    },
    stat: {
        type: String,
        required: true,
        default: "Unarchived"
    }

}, {timestamps: true });



module.exports = mongoose.model("Reservation", reservationSchema)

