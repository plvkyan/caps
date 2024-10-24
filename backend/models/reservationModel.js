


const mongoose = require('mongoose')





const Schema = mongoose.Schema



const reservationSchema = new Schema({

    // Newly updated fields
    reserveeId: {
        type: String,
        required: true
    },
    reserveeBlkLt: {
        type: String,
        required: true
    },
    reserveePosition: {
        type: String,
        required: true
    },
    reserveeEmail: {
        type: String,
        required: false
    },
    amenityId: {
        type: String,
        required: true
    },
    amenityName: {
        type: String,
        required: true
    },
    amenityType: {  
        type: String,
        required: true
    },
    amenityAddress: {
        type: String,
        required: false
    },
    amenityQuantity: {
        type: Number,
        required: false
    },
    reservationDate: {
        type: Date,
        required: true
    },
    reservationReason: {
        type: String,
        required: false
    },
    reservationComments: [
        {
            commentContent: {
                type: String,
                required: false
            },
            commentDate: {
                type: Date,
                required: false
            },
            commentAuthor: {
                type: String,
                required: false
            },
            commentAuthorPosition: {
                type: String,
                required: false
            }
        }
    ],
    reservationStatus: {
        type: String,
        required: true,
        default: "Pending"
    },
    reservationVisibility: {
        type: String,
        required: true,
        default: "Unarchived"
    },
    interactedBy: {
        type: String,
        required: false
    },
    interactedByPosition: {
        type: String,
        required: false
    },
    interactionDate: {
        type: Date,
        required: false
    }


    // blkLt: {
    //     type: String,
    //     required: false,
    // },
    // blkLtPosition: {
    //     type: String,
    //     required: false,
    // },
    // amenityAddress: {
    //     type: String,
    //     required: false
    // },
    // amenityId: {
    //     type: String,
    //     required: true
    // },
    // amenityType: {
    //     type: String,
    //     required: true
    // },
    // reservationComment: {
    //     type: String,
    //     required: false
    // },
    // reservationCommentSubject: {
    //     type: String,
    //     required: false
    // },
    // reservationDate: {
    //     type: Date,
    //     required: true
    // },
    // reserveeId:{
    //     type: String,
    //     required: false,
    // },
    // reserveeEmail: {
    //     type: String,
    //     required: false
    // },
    // reservationQuantity: {
    //     type: Number,
    //     required: false,
    // },
    // reservationStatus: {
    //     type: String,
    //     required: true,
    //     default: "Pending"
    // },
    // reservationReason: {
    //     type: String,
    //     required: false
    // },
    // interactedBy: {
    //     type: String,
    //     required: false,
    // },
    // interactedByPosition: {
    //     type: String,
    //     required: false,
    // },
    // interactionDate: {
    //     type: Date,
    //     required: false,
    // },
    // stat: {
    //     type: String,
    //     required: true,
    //     default: "Unarchived"
    // }

}, {timestamps: true });



module.exports = mongoose.model("Reservation", reservationSchema)

