


const Amenity = require("../models/amenityModel")
const mongoose = require('mongoose')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('../utils/cloudinary');


// GET all unarchived amenities
const getAmenities = async (req, res) => {

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.amenityVisibility === "Unarchived";
    });

    res.status(200).json(amenities)
}

// GET all unarchived amenities
const getArchivedAmenities = async (req, res) => {

    const initAmenities = await Amenity.find({}).sort({ createdAt: -1 })

    const amenities = initAmenities.filter(function (amenity) {
        return amenity.amenityVisibility === "Archived";
    });

    res.status(200).json(amenities)
}

// GET specific amenity name
const getSpecificAmenity = async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "This ID is not valid." });
    }

    const amenity = await Amenity.findById(id);

    if (!amenity) {
        return res.status(404).json({ error: "This amenity does not exist." });
    }

    res.status(200).json(amenity);
}





// CREATE new amenity
const createAmenity = async (req, res) => {

    const { amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, amenityVisibility } = req.body

    try {

        
        const exists = await Amenity.findOne({ amenityName })
        
        if (exists) {
            throw Error('Amenity already exists')
        }
        
        const amenityData = await Amenity.createAmenity( amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, amenityVisibility )
        // Add amenity to database
        // const amenity = await Amenity.create({ amenityName, amenityType, amenityCreator, amenityDescription, amenityAddress, amenityStockMax, amenityStock, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityVisibility })
        res.status(200).json(amenityData)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }
}




// DELETE an amenity
const deleteAmenity = async (req, res) => {
    const { id } = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: 'No such amenity' })
    // }

    const amenity = await Amenity.findOneAndDelete({ _id: id })

    if (!amenity) {
        return res.status(400).json({ error: 'No such amenity' })
    }

    res.status(200).json(amenity)

}




// PATCH controllers
// UPDATE an amenity
const updateAmenity = async (req, res) => {

    // if (!mongoose.Types.amenityName.isValid(amenityName)) {
    //     return res.status(400).json({ error: 'No such amenity' })
    // }

    console.log(req.body);

    const { _id, amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, amenityVisibility } = req.body

    try {

        const amenity = await Amenity.editAmenity(
            _id, amenityName, amenityType, amenityAddress, amenityDescription, amenityStock, amenityStockMax, amenityQuantityMin, amenityQuantityMax, amenityReminder, amenityCreator, amenityImages, amenityVisibility
        )

        res.status(200).json(amenity)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }

}

// Archive an amenity
const archiveAmenity = async (req, res) => {
    const { id } = req.params

    try {

        console.log(id);
        const existingAmenity = await Amenity.findById(id)

        
        if (!existingAmenity) {
            return res.status(404).json({ error: 'Amenity not found' })
        }

        if (existingAmenity.amenityVisibility === "Archived") {
            return res.status(400).json({ error: 'Amenity is already archived' })
        }

        const amenity = await Amenity.findOneAndUpdate(
            { _id: id }, 
            { amenityVisibility: "Archived" }, 
            { new: true }
        )

        res.status(200).json(amenity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}







module.exports = {
    createAmenity,
    deleteAmenity,
    getAmenities,
    getArchivedAmenities,
    getSpecificAmenity,
    updateAmenity,

    // PATCH controllers
    archiveAmenity,
}