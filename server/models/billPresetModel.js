


const mongoose = require('mongoose')





const Schema = mongoose.Schema


const billPresetSchema = new Schema({
    billPresetTitle: {
        type: String,
        required: true,
    },
    billPresetType: {
        type: String,
        required: true,
    },
    billPresetDescription: {
        type: String,
        required: true,
    },
    billPresetQuantity: {
        type: Number,
        required: true,
        default: 1,
    },
    billPresetCurrency: {
        type: String,
        required: true,
        default: "PHP",
    },
    billPresetAmount: {
        type: Number,
        required: true,
    },
    billPresetRecurringDate: {
        type: String,
        required: false,
    },
    billPresetCreatorId: {
        type: String,
        required: true,
    },
    billPresetCreatorBlkLt: {
        type: String,
        required: true,
    },
    billPresetCreatorPosition: {
        type: String,
        required: true,
    },
    billPresetVisibility: {
        type: String,
        required: true,
        default: "Unarchived"
    }

}, { timestamps: true });





module.exports = mongoose.model("BillPreset", billPresetSchema)
