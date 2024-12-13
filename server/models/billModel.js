


const mongoose = require('mongoose')
const User = require('../models/userModel')





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
    billPayors: [
        {
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
            },
            billPaymentMode: {
                type: String,
                required: false,
            }
        }
    ],
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
    },
    archiveDate: {
        type: Date,
        required: false,
    },

}, { timestamps: true });




billSchema.statics.setPaid = async function(billId, userId) {
    try {
        const bill = await this.findById(billId);
        if (!bill) {
            throw Error('Bill not found');
        }

        const updatedBill = await this.findOneAndUpdate(
            { 
                _id: billId,
                'billPayors.payorId': userId 
            },
            {
                $set: {
                    'billPayors.$.billStatus': 'Paid',
                    'billPayors.$.billPaidDate': new Date()
                }
            },
            { new: true }
        );

        if (!updatedBill) {
            throw Error('User is not a payor for this bill');
        }

        // Check for other overdue bills
        const overdueBills = await this.find({
            'billPayors.payorId': userId,
            'billPayors.billStatus': 'Overdue',
            'billDueDate': { $lte: new Date() },
            'billVisibility': 'Unarchived'
        });

        // If no overdue bills and user is Delinquent, update status to Outstanding
        if (overdueBills.length === 0) {
            const User = mongoose.model('User');
            const user = await User.findById(userId);
            if (user && user.userStatus === 'Delinquent') {
                await User.findByIdAndUpdate(userId, {
                    userStatus: 'Outstanding'
                });
            }
        }

        return updatedBill;
    } catch (error) {
        throw error;
    }
}


module.exports = mongoose.model("Bill", billSchema)

