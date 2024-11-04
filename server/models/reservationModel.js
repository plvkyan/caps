


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
    reserveeRole: {
        type: String,
        required: true
    },
    reserveeEmail: {
        type: String,
        required: false
    },
    reservationType: {
        type: String,
        required: true
    },
    reservationAmenities: [
        {
            amenityName: {
                type: String,
                required: true,
            },
            amenityType: {
                type: String,
                required: true,
            },
            amenityAddress: {
                type: String,
                required: false
            },
            amenityDescription: {
                type: String,
                required: false
            },
            amenityStock: {
                type: Number,
                required: false
            },
            amenityStockMax: {
                type: Number,
                required: false
            },
            amenityQuantity: {
                type: Number,
                required: false,
            },
            amenityQuantityMin: {
                type: Number,
                required: false
            },
            amenityQuantityMax: {
                type: Number,
                required: false
            },
            amenityReminder: {
                type: String,
                required: false
            },
            amenityCreator: {
                type: String,
                required: true
            },
            amenityImages: [
                {
                    public_id: {
                        type: String,
                        required: false
                    },
                    url: {
                        type: String,
                        required: false
                    }
                }
            ],
            amenityVisibility: {
                type: String,
                required: true,
                default: "Unarchived"
            },
        }
    ],
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
            commentAuthorId: {
                type: String,
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
    reservationImages: [
        {
            url: {
                type: String,
                required: false
            },
            public_id: {
                type: String,
                required: false
            },
        }
    ],
    reservationStatus: [
        {
            status: {
                type: String,
                required: true,
            },
            statusDate: {
                type: Date,
                required: true,
            },
            statusAuthorId: {
                type: String,
                required: true,
            },
            statusAuthor: {
                type: String,
                required: true,
            },
            statusAuthorPosition: {
                type: String,
                required: true,
            },
        }
    ],
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

}, { timestamps: true });






module.exports = mongoose.model("Reservation", reservationSchema)

