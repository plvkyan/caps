


const mongoose = require('mongoose')





const Schema = mongoose.Schema



const billSchema = new Schema({

    billTitle: {
        type: String,
        required: true,
    },
    billType: {
        type: String,
        required: true,
    },
    billDescription: {
        type: String,
        required: true,
    },
    billQuantity: {
        type: Number,
        required: true,
        default: 1,
    },
    billCurrency: {
        type: String,
        required: true,
        default: "PHP",
    },
    billAmount: {
        type: Number,
        required: true,
    },
    billRecurringDate: {
        type: String,
        required: false,
    },
    billDueDate: {
        type: Date,
        required: true,
        default: new Date(new Date().setMonth(new Date().getMonth() + 1))
    },
    billPayors: {
        type: Array,
        properties: {
            payorId: {
                type: String,
                required: true,
            },
            payorBlkLt: {
                type: String,
                required: true,
            },
            payorEmail: {
                type: String,
                required: false,
            },
            billStatus: {
                type: String,
                required: true,
                default: "Pending"
            },
            billPaidDate: {
                type: Date,
                required: false,
            }
        }
    },
    billCreatorId: {
        type: String,
        required: true,
    },
    billCreatorBlkLt: {
        type: String,
        required: true,
    },
    billCreatorPosition: {
        type: String,
        required: true,
    },
    billVisibility: {
        type: String,
        required: true,
        default: "Unarchived"
    }

}, { timestamps: true });







module.exports = mongoose.model("Bill", billSchema)

