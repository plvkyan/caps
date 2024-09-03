const mongoose = require('mongoose')

const Schema = mongoose.Schema

const announcementSchema = new Schema({

    blkLt: {
        type: String,
        required: false,
    },
    blkLtPosition: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: true
    },
    badges: {
        type: Array,
        properties: {
            label: {
                type: "string"
            },
            value: {
                type: "string"
            }
        }
    },
    stat: {
        type: String,
        required: true,
        default: "Unarchived"
    }

}, {timestamps: true });



module.exports = mongoose.model("Announcement", announcementSchema)

