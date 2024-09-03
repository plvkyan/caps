


const mongoose = require('mongoose')





const Schema = mongoose.Schema




// Functions
const amenitySchema = new Schema({

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
    amenityQuantity: {
        type: Number,
        required: false
    },
    amenityQuantityMin: {
        type: Number,
        required: false
    },
    amenityQuantityMax: {
        type: Number,
        required: false
    },
    stat: {
        type: String,
        required: true,
        default: "Unarchived"
    },
}, {timestamps: true });



module.exports = mongoose.model("Amenity", amenitySchema)

