


const Announcement = require("../models/announcementModel")
const mongoose = require('mongoose')



// GET all announcements
const getAnnouncements = async (req, res) => {

    const initAnnouncements = await Announcement.find({}).sort({ createdAt: -1 })

    const announcements = initAnnouncements.filter(function (announcement) {
        return announcement.stat === "Unarchived";
    });

    res.status(200).json(announcements)
}





// GET all archived announcements
const getArchivedAnnouncements = async (req, res) => {

    const initAnnouncements = await Announcement.find({}).sort({ createdAt: -1 })

    const announcements = initAnnouncements.filter(function (announcement) {
        return announcement.stat === "Archived";
    });

    res.status(200).json(announcements)
}





// GET single announcement
const getAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such announcement" })
    }

    const announcement = await Announcement.findById(id)

    if (!announcement) {
        return res.status(404).json({ error: "No such announcement" })
    }

    res.status(200).json(announcement)
}



// CREATE new announcement
const createAnnouncement = async (req, res) => {
    const { blkLt, blkLtPosition, content, badges, archived } = req.body

    try {

        // Add document to database
        const announcement = await Announcement.create({ blkLt, blkLtPosition, content, badges, archived })
        res.status(200).json(announcement)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}



// DELETE a announcement
const deleteAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such announcement' })
    }

    const announcement = await Announcement.findOneAndDelete({ _id: id })

    if (!announcement) {
        return res.status(400).json({ error: 'No such announcement' })
    }

    res.status(200).json(announcement)

}



// UPDATE an announcement
const updateAnnouncement = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such announcement' })
    }

    const announcement = await Announcement.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!announcement) {
        return res.status(400).json({ error: 'No such announcement' })
    }

    res.status(200).json(announcement)
}

const getUserAnnouncements = async (req, res) => {
    const { id } = req.params

    const initAnnouncements = await Announcement.find({}).sort({ createdAt: -1 })

    const announcements = initAnnouncements.filter(function (announcement) {
        return announcement.authorId === id;
    });

    res.status(200).json(announcements)
}



module.exports = {
    createAnnouncement,
    deleteAnnouncement,
    getAnnouncement,
    getAnnouncements,
    getArchivedAnnouncements,
    updateAnnouncement,
    getUserAnnouncements
}