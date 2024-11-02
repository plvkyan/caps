


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
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['alert', 'message', 'reminder']
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Notification', notificationSchema);


