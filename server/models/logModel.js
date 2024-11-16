


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
    },
    logMessage: {
        type: String,
        required: true
    },
    logSource: {
        type: String,
        required: true,
    },
    logLink: {
        type: String,
        required: false,
    },
    logData: {
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});