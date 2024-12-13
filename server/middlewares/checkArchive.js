const User = require('../models/userModel');
const Bill = require('../models/billModel');
const Announcement = require('../models/announcementModel');
const Amenity = require('../models/amenityModel');
const Reservation = require('../models/reservationModel');

const checkArchive = async (req, res, next) => {
    try {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        // Delete archived items older than one year
        await Promise.all([
            User.deleteMany({ 
                userVisibility: "Archived", 
                archiveDate: { $lt: oneYearAgo } 
            }),
            Bill.deleteMany({ 
                billVisibility: "Archived", 
                archiveDate: { $lt: oneYearAgo } 
            }),
            Announcement.deleteMany({ 
                stat: "Archived", 
                archiveDate: { $lt: oneYearAgo } 
            }),
            Amenity.deleteMany({ 
                amenityVisibility: "Archived",
                archiveDate: { $lt: oneYearAgo } 
            }),
            Reservation.deleteMany({ 
                reservationVisibility: "Archived", 
                archiveDate: { $lt: oneYearAgo } 
            })
        ]);

        next();
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error checking archived items',
            error: error.message 
        });
    }
};

module.exports = checkArchive;