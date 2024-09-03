


const Amenity = require("../models/amenityModel")
const mongoose = require('mongoose')



// GET all unarchived amenities
const getAmenities = async (req, res) => {

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.stat === "Unarchived";
    });

    res.status(200).json(amenities)
}





// GET specific amenity name
const getSpecificAmenity = async (req, res) => {

    const { amenityName } = req.params

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.amenityName === amenityName;
    });

    res.status(200).json(amenities)
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



// CREATE new amenity
const createAmenity = async (req, res) => {
    
    const { amenityName, amenityType, amenityAddress, amenityQuantity, amenityQuantityMin, amenityQuantityMax, stat } = req.body

    try {

        // Add amenity to database
        const amenity = await Amenity.create({ amenityName, amenityType, amenityAddress, amenityQuantity, amenityQuantityMin, amenityQuantityMax, stat })
        res.status(200).json(amenity)

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
const updateAmenity = async (req, res) => {
    const { amenityName } = req.params

    // if (!mongoose.Types.amenityName.isValid(amenityName)) {
    //     return res.status(400).json({ error: 'No such amenity' })
    // }

    const amenity = await Amenity.findOneAndUpdate({ amenityName: amenityName }, {
        ...req.body
    })

    if (!amenity) {
        return res.status(400).json({ error: 'No such amenity' })
    }

    res.status(200).json(amenity)
}





module.exports = {
    createAmenity,
    getAmenities,
    getSpecificAmenity,
    updateAmenity
}