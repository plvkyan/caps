


const Amenity = require("../models/amenityModel")
const mongoose = require('mongoose')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



// GET all unarchived amenities
const getAmenities = async (req, res) => {

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.stat === "Unarchived";
    });

    res.status(200).json(amenities)
}

// GET all unarchived amenities
const getArchivedAmenities = async (req, res) => {

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.stat === "Archived";
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





// CREATE new amenity
const createAmenity = async (req, res) => {

    console.log(req.file, 16);

    const { amenityName, amenityType, amenityAddress, amenityCreator, amenityDescription, amenityQuantity, amenityQuantityMin, amenityQuantityMax, amenityReminder, stat } = req.body

    try {

        const exists = await Amenity.findOne({ amenityName })



        if (exists) {
            throw Error('Amenity already exists')
        }

        // Add amenity to database
        const amenity = await Amenity.create({ amenityName, amenityType, amenityCreator, amenityDescription, amenityAddress, amenityQuantity, amenityQuantityMin, amenityQuantityMax, amenityReminder, stat })
        res.status(200).json(amenity)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}





// DELETE an amenity
const deleteAmenity = async (req, res) => {
    const { amenityName } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: 'No such amenity' })
    // }

    const amenity = await Amenity.findOneAndDelete({ amenityName: amenityName })

    if (!amenity) {
        return res.status(400).json({ error: 'No such amenity' })
    }

    res.status(200).json(amenity)

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
    deleteAmenity,
    getAmenities,
    getArchivedAmenities,
    getSpecificAmenity,
    updateAmenity
}