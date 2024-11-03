


// Requires
const mongoose = require('mongoose');



// Variables
const Schema = mongoose.Schema;



// Schema
const logSchema = new Schema({
    
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    logUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    logAction: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});