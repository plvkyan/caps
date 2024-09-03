


const mongoose = require('mongoose')





const Schema = mongoose.Schema



const billSchema = new Schema({

    billName: {
        type: String,
        required: true,
    },
    billDescription: {
        type: String,
        required: true,
        default: "",
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
    billReceivers: {
        type: Array,
        properties: {
            receiverBlkLt: {
                type: String,
                required: true,
            },
            billStatus: {
                type: String,
                required: true,
                default: "Pending"
            },
            billDue: {
                type: Date,
                required: true,
                default: new Date(new Date().setMonth(new Date().getMonth() + 1))
            }
        }
    },
    billMadeby: {
        type: String,
        required: true,
    },
    billMadeDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
    stat: {
        type: String,
        required: true,
        default: "Unarchived"
    }

}, { timestamps: true });

const due = new Date();

const newDate = new Date(new Date().setMonth(due.getMonth() + 1));



module.exports = mongoose.model("Bill", billSchema)

