


const Amenity = require("../models/amenityModel")
const mongoose = require('mongoose')








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
// Archive multiple amenities
const archiveMultipleAmenities = async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of amenity IDs' });
    }

    try {
        // First check if all IDs are valid and amenities exist
        const existingAmenities = await Promise.all(
            ids.map(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error(`Invalid amenity ID: ${id}`);
                }
                const amenity = await Amenity.findById(id);
                if (!amenity) {
                    throw new Error(`Amenity not found with ID: ${id}`);
                }
                if (amenity.amenityVisibility === "Archived") {
                    throw new Error(`Amenity ${amenity.amenityName} is already archived`);
                }
                return amenity;
            })
        );

        // If all validations pass, proceed with updates
        const updates = await Promise.all(
            ids.map(async (id) => {
                const amenity = await Amenity.findOneAndUpdate(
                    { _id: id, amenityVisibility: "Unarchived" },
                    { amenityVisibility: "Archived" },
                    { new: true }
                );
                return amenity;
            })
        );

        res.status(200).json(updates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Unarchive an amenity
const unarchiveAmenity = async (req, res) => {
    const { id } = req.params

    try {
        const existingAmenity = await Amenity.findById(id)
        
        if (!existingAmenity) {
            return res.status(404).json({ error: 'Amenity not found' })
        }

        if (existingAmenity.amenityVisibility === "Unarchived") {
            return res.status(400).json({ error: 'Amenity is already unarchived' })
        }

        const amenity = await Amenity.findOneAndUpdate(
            { _id: id }, 
            { amenityVisibility: "Unarchived" }, 
            { new: true }
        )

        res.status(200).json(amenity)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Unarchive multiple amenities
const unarchiveMultipleAmenities = async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Please provide an array of amenity IDs' });
    }

    try {
        const existingAmenities = await Promise.all(
            ids.map(async (id) => {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    throw new Error(`Invalid amenity ID: ${id}`);
                }
                const amenity = await Amenity.findById(id);
                if (!amenity) {
                    throw new Error(`Amenity not found with ID: ${id}`);
                }
                if (amenity.amenityVisibility === "Unarchived") {
                    throw new Error(`Amenity ${amenity.amenityName} is already unarchived`);
                }
                return amenity;
            })
        );

        const updates = await Promise.all(
            ids.map(async (id) => {
                const amenity = await Amenity.findOneAndUpdate(
                    { _id: id, amenityVisibility: "Archived" },
                    { amenityVisibility: "Unarchived" },
                    { new: true }
                );
                return amenity;
            })
        );

        res.status(200).json(updates);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




// GET controllers
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





module.exports = {



    // POST controllers
    createAmenity,



    // DELETE controllers
    deleteAmenity,
   


    // PATCH controllers
    archiveAmenity,
    archiveMultipleAmenities,
    unarchiveAmenity,
    unarchiveMultipleAmenities,
    updateAmenity,



    // GET controllers
    getAmenities,
    getArchivedAmenities,
    getSpecificAmenity,
}