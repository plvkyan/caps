


const Amenity = require("../models/amenityModel")
const mongoose = require('mongoose')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../utils/cloudinary');


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

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This amenity does not exist." });
    }

    const amenity = await Amenity.findById(id);

    if (!amenity) {
        return res.status(404).json({ error: "This amenity does not exist." });
    }

    res.status(200).json(amenity);
}





// CREATE new amenity
const createAmenity = async (req, res) => {S

    const { amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, stat } = req.body

    try {

        
        const exists = await Amenity.findOne({ amenityName })
        
        if (exists) {
            throw Error('Amenity already exists')
        }
        
        const amenityData = await Amenity.createAmenity( amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, stat )
        // Add amenity to database
        // const amenity = await Amenity.create({ amenityName, amenityType, amenityCreator, amenityDescription, amenityAddress, amenityStockMax, amenityStock, amenityQuantityMin, amenityQuantityMax, amenityReminder, stat })
        res.status(200).json(amenityData)

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


    // if (!mongoose.Types.amenityName.isValid(amenityName)) {
    //     return res.status(400).json({ error: 'No such amenity' })
    // }

    const { initialAmenityName, amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, stat } = req.body

    try {

        const amenity = await Amenity.editEquipment(
            initialAmenityName, amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, stat
        )

        res.status(200).json(amenity)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }



}





module.exports = {
    createAmenity,
    deleteAmenity,
    getAmenities,
    getArchivedAmenities,
    getSpecificAmenity,
    updateAmenity
}