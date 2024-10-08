


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
    stat: {
        type: String,
        required: true,
        default: "Unarchived"
    },
}, {timestamps: true });



module.exports = mongoose.model("Amenity", amenitySchema)

