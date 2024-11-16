


// Requires
const mongoose = require('mongoose');



// Variables
const Schema = mongoose.Schema;



// Schema
const notificationSchema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    recipientIds: [{
        type: Schema.Types.ObjectId,
    }],
    recipientRole: {
        type: String,
        required: false,
        enum: ['Admin', 'Unit Owner', '']
    },
    notificationMessage: {
        type: String,
        required: true
    },
    notificationLink: {
        type: String,
        required: false,
    },
    notificationReadStatus: [{
        type: Schema.Types.ObjectId,
    }],
    notificationData: {
        type: Object,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Notification', notificationSchema);


