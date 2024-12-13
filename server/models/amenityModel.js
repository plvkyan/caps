


const mongoose = require('mongoose')
const cloudinary = require('../utils/cloudinary');
const { init } = require('./announcementModel');





const Schema = mongoose.Schema





// Functions
const amenitySchema = new Schema({

    amenityName: {
        type: String,
        required: true,
    },
    amenityType: {
        type: String,
        required: true,
    },
    amenityAddress: {
        type: String,
        required: false
    },
    amenityDescription: {
        type: String,
        required: false
    },
    amenityStock: {
        type: Number,
        required: false
    },
    amenityStockMax: {
        type: Number,
        required: false
    },
    amenityQuantityMin: {
        type: Number,
        required: false
    },
    amenityQuantityMax: {
        type: Number,
        required: false
    },
    amenityReminder: {
        type: String,
        required: false
    },
    amenityCreatorId: {
        type: String,
        required: true
    },
    amenityCreatorBlkLt: {
        type: String,
        required: true,
    },
    amenityCreatorPosition: {
        type: String,
        required: true,
    },
    amenityImages: [
        {
            _id: {
                type: String,
                required: false
            },
            public_id: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            }
        }
    ],
    amenityVisibility: {
        type: String,
        required: true,
        default: "Unarchived"
    },
    archiveDate: {
        type: Date,
        required: false,
    }
}, { timestamps: true });



// 
function amenityDataValidation(
    amenityName,
    amenityType,
    amenityAddress,
    amenityDescription,
    amenityStock,
    amenityStockMax,
    amenityQuantityMin,
    amenityQuantityMax,
    amenityReminder,
    amenityCreatorId,
    amenityCreatorBlkLt,
    amenityCreatorPosition,
    amenityImages,
    amenityVisibility
) {

    if (amenityType !== "Equipment" && amenityType !== "Facility") {
        throw Error(
            'Invalid amenity type: ' + amenityType + '. This should not be possible unless you have backdoor access to the system. Please contact the developers.'
        );
    }

    if (!amenityReminder) {
        throw Error('Amenity reminder cannot be empty.');
    }

    if (!amenityDescription) {
        throw Error('Amenity description cannot be empty.');
    }

    if (amenityType === "Facility" && !amenityAddress) {
        throw Error('Amenity address cannot be empty.');
    }

    if (amenityType === "Equipment") {

        if (!amenityStock) {
            throw Error('Current stock cannot be empty.');
        }

        if (!amenityStockMax) {
            throw Error('Maximum stock cannot be empty.');
        }

        if (!amenityQuantityMin) {
            throw Error('Minimum quantity of reserved equipment cannot be empty.');
        }

        if (!amenityQuantityMax) {
            throw Error('Maximum quantity of reserved equipment cannot be empty.');
        }
        
        if (amenityStock <= 0) {
            throw Error('Current stock cannot be equal to or less than 0.');
        }

        if (amenityStockMax <= 0) {
            throw Error('Maximum stock cannot be equal to or less than 0.');
        }

        if (amenityStockMax < amenityStock) {
            throw Error('Current stock cannot exceed the maximum stock. Set the maximum stock to a higher number or lower the current stock.');
        }

        if (amenityQuantityMin <= 0) {
            throw Error('Minimum quantity of reserved equipment cannot be equal to or less than 0.');
        }

        if (amenityQuantityMin > amenityStockMax) {
            throw Error('Minimum quantity of reserved equipment cannot exceed the maximum stock.');
        }

        if (amenityQuantityMax <= 0) {
            throw Error('Maximum quantity of reserved equipment cannot be equal to or less than 0.');
        }

        if (amenityQuantityMax > amenityStockMax) {
            throw Error('Maximum quantity of reserved equipment cannot exceed the maximum stock.');
        }

        if (amenityQuantityMax < amenityQuantityMin) {
            throw Error('Minimum quantity of reserved equipment cannot exceed the maximum number of reserved equipment.');
        }
    }

    if (amenityImages.length > 3) {
        throw Error('You can only upload up to 3 images.');
    }

    console.log("You pass.");

}



// Static amenity creation method
amenitySchema.statics.createAmenity = async function (
    amenityName,
    amenityType,
    amenityAddress,
    amenityDescription,
    amenityStock,
    amenityStockMax,
    amenityQuantityMin,
    amenityQuantityMax,
    amenityReminder,
    amenityCreatorId,
    amenityCreatorBlkLt,
    amenityCreatorPosition,
    amenityImages,
    amenityVisibility
) {

    // Check if amenity already exists
    const amenityExists = await this.findOne({ amenityName: amenityName })
    // Amenity images buffer
    let imagesBuffer = [];

    // If amenity already exists, throw an error
    if (amenityExists) {
        throw Error('An amenity with the name: ' + amenityName + ' already exists.')
    }

    // Amenity data validation
    amenityDataValidation(
        amenityName,
        amenityType,
        amenityAddress,
        amenityDescription,
        amenityStock,
        amenityStockMax,
        amenityQuantityMin,
        amenityQuantityMax,
        amenityReminder,
        amenityCreatorId,
        amenityCreatorBlkLt,
        amenityCreatorPosition,
        amenityImages,
        amenityVisibility
    );

    // Loop to upload each image from amenityImages array to cloudinary
    for (let i = 0; i < amenityImages.length; i++) {

        // Upload each individual image to cloudinary
        const imageUploadData = await cloudinary.uploader.upload(amenityImages[i], {
            folder: "gctms_imgs/amenities",
        });

        // Push the uploaded image data to the imagesBuffer array
        imagesBuffer.push({
            public_id: imageUploadData.public_id,
            url: imageUploadData.secure_url,
        })

    }

    // Set amenityImages to the imagesBuffer
    amenityImages = imagesBuffer;

    // Create a new amenity
    const newAmenity = await this.create({
        amenityName,
        amenityType,
        amenityAddress,
        amenityDescription,
        amenityStock,
        amenityStockMax,
        amenityQuantityMin,
        amenityQuantityMax,
        amenityReminder,
        amenityCreatorId,
        amenityCreatorBlkLt,
        amenityCreatorPosition,
        amenityImages,
        amenityVisibility
    })

    console.log("Amenity created successfully.");

    // Return the new amenity
    return newAmenity;
}



// Static method to edit an amenity
amenitySchema.statics.editAmenity = async function (
    _id,
    amenityName,
    amenityType,
    amenityAddress,
    amenityDescription,
    amenityStock,
    amenityStockMax,
    amenityQuantityMin,
    amenityQuantityMax,
    amenityReminder,
    amenityCreatorId,
    amenityCreatorBlkLt,
    amenityCreatorPosition,
    newAmenityImages,
    amenityVisibility
) {

    // Check if the initial amenity exists and store its data
    const oldAmenityExists = await this.findById({ _id });
    // Check if there's an amenity with the new amenity name
    const newAmenityExists = await this.findOne({ amenityName: amenityName, _id: { $ne: _id } })
    // Store the old amenity's images
    const oldAmenityImages = oldAmenityExists.amenityImages;

    // Amenity images buffer
    let imagesBuffer = [];

    // Check if the amenity's name already exists, if it does, throw an error
    if (!oldAmenityExists) {
        throw Error('Cannot find the amenity you are trying to edit.');
    }

    if (newAmenityExists) {
        throw Error('An amenity with this name already exists.');
    }

    // Amenity data validation
    amenityDataValidation(
        amenityName,
        amenityType,
        amenityAddress,
        amenityDescription,
        amenityStock,
        amenityStockMax,
        amenityQuantityMin,
        amenityQuantityMax,
        amenityReminder,
        amenityCreatorId,
        amenityCreatorBlkLt,
        amenityCreatorPosition,
        newAmenityImages,
        amenityVisibility
    );

    // Check if the old amenity has no images and if there are new images
    if (oldAmenityImages.length === 0 && newAmenityImages.length !== 0) {

        console.log("\nThere are no old images, we'll upload the new ones.");

        // Loop to upload each image from amenityImages array to cloudinary
        for (let i = 0; i < newAmenityImages.length; i++) {

            // Upload each individual image to cloudinary
            const newImageUpload = await cloudinary.uploader.upload(newAmenityImages[i].url, {
                folder: "gctms_imgs/amenities",
            });

            // Push the uploaded image data to the imagesBuffer array
            imagesBuffer.push({
                public_id: newImageUpload.public_id,
                url: newImageUpload.secure_url,
            })

            console.log("Picture " + i + " uploaded successfully.");
        }

        // Set amenityImages to the imagesBuffer
        newAmenityImages = imagesBuffer;
    }

    // Check if the old amenity has images and if there are no new images
    if (oldAmenityImages.length !== 0 && newAmenityImages.length === 0) {

        console.log("\nThere are no new images, we'll delete the old ones.");

        // Since there are no new images, delete the old images
        for (let i = 0; i < oldAmenityImages.length; i++) {

            // Get the public_id of each individual old image
            const oldImageId = oldAmenityImages[i].public_id;

            // If the public_id exists, delete the old image from cloudinary
            if (oldImageId) {
                await cloudinary.uploader.destroy(oldImageId);
            }

            console.log("Picture " + i + " deleted successfully.");
        }

        // Set amenityImages to the imagesBuffer
        newAmenityImages = imagesBuffer;
    }

    // Check if the old amenity has images and if there are new images
    if (oldAmenityImages.length !== 0 && newAmenityImages.length !== 0) {

        console.log("\nThere are old images and new images, we'll check if there are old images in the new images array.");

        // Check if the new images array has no public_id
        if (!Object.hasOwn(newAmenityImages[0], 'public_id')) {

            console.log("\nIt's the first element and it's a new image. It means there are no old images and only new images to upload.");
            console.log("\nLet's first delete the old images.");

            for (let i = 0; i < oldAmenityImages.length; i++) {

                // Get the public_id of each individual old image
                const oldImageId = oldAmenityImages[i].public_id;

                // If the public_id exists, delete the old image from cloudinary
                if (oldImageId) {
                    await cloudinary.uploader.destroy(oldImageId);
                }

                console.log("\nPicture " + i + " deleted successfully.");
            }

            console.log("\nNow, let's upload the new images.");

            for (let i = 0; i < newAmenityImages.length; i++) {

                // Upload each individual image to cloudinary
                const newImageUpload = await cloudinary.uploader.upload(newAmenityImages[i].url, {
                    folder: "gctms_imgs/amenities",
                });

                // Push the uploaded image data to the imagesBuffer array
                imagesBuffer.push({
                    public_id: newImageUpload.public_id,
                    url: newImageUpload.secure_url,
                })

                console.log("Picture " + i + " uploaded successfully.");
            }

            newAmenityImages = imagesBuffer;
        }



        // Check if the new images array has a public_id
        if (Object.hasOwn(newAmenityImages[0], 'public_id')) {

            console.log("\nIt's the first element and it's an old image. It means there are old images and new images to compare.");
            console.log("\nLet's first compare the old images.");

            // Outer loop for comparing the old images to the new ones
            for (let i = 0; i < oldAmenityImages.length; i++) {

                console.log(i);

                // Inner loop for comparing the new images to the old ones
                for (let j = 0; j < newAmenityImages.length; j++) {

                    console.log(j)

                    // Check if the new image is the same as the old image
                    if (oldAmenityImages[i].public_id === newAmenityImages[j].public_id) {

                        console.log("\nIt's the same image. Let's add it to the buffer.");

                        // Push the old image to the imagesBuffer array
                        imagesBuffer.push({
                            public_id: oldAmenityImages[i].public_id,
                            url: oldAmenityImages[i].url,
                        });

                        break;
                    }

                    // Check if the new image is different from the old image
                    if (j === newAmenityImages.length - 1) {

                        console.log("It's a different image, bro. Let's delete the old one.");

                        const oldImageId = oldAmenityImages[i].public_id;

                        if (oldImageId) {
                            await cloudinary.uploader.destroy(oldImageId);
                        }

                        console.log("Picture " + i + " deleted successfully.");
                    }

                }
            }

            console.log("\nNow, let's upload the rest of the new images.")
            for (let k = imagesBuffer.length; k < newAmenityImages.length; k++) {

                console.log("Uploading")

                // Upload each individual image to cloudinary
                const newImageUpload = await cloudinary.uploader.upload(newAmenityImages[k].url, {
                    folder: "gctms_imgs/amenities",
                });

                console.log("Upload finished")

                // Push the uploaded image data to the imagesBuffer array
                imagesBuffer.push({
                    public_id: newImageUpload.public_id,
                    url: newImageUpload.secure_url,
                })

                console.log("Picture " + k + " uploaded successfully.");

            }
        }

        // Set amenityImages to the imagesBuffer
        newAmenityImages = imagesBuffer;


    }

    newAmenityImages = imagesBuffer;

    const amenity = await this.findOneAndUpdate({ _id: _id }, {
        amenityName,
        amenityType,
        amenityAddress,
        amenityDescription,
        amenityStock,
        amenityStockMax,
        amenityQuantityMin,
        amenityQuantityMax,
        amenityReminder,
        amenityCreatorId,
        amenityCreatorBlkLt,
        amenityCreatorPosition,
        amenityImages: newAmenityImages,
        amenityVisibility
    });

    return amenity;
}

module.exports = mongoose.model("Amenity", amenitySchema)

















// amenity Creation validation
// if (amenityImages.length > 3) {

//     throw Error('You can only upload up to 3 images.');

// }

// if (amenityStock > amenityStockMax) {

//     throw Error('Stock must not exceed the maximum stock.')

// }

// if (amenityQuantityMin > amenityQuantityMax) {

//     throw Error('Minimum quantity must not exceed the maximum quantity.')

// }

// if (amenityStock < amenityQuantityMin) {

//     throw Error('Stock must not be less than the minimum quantity.')

// }

// if (amenityStock < amenityQuantityMax) {

//     throw Error('Stock must not be less than the maximum quantity.')

// }

// if (amenityStock < 0) {

//     throw Error('Stock must not be less than 0.')

// }

// if (amenityStockMax < 0) {

//     throw Error('Maximum stock must not be less than 0.')

// }

// if (amenityQuantityMin < 0) {

//     throw Error('Minimum quantity must not be less than 0.')

// }

// if (amenityQuantityMax < 0) {

//     throw Error('Maximum quantity must not be less than 0.')

// }

// if (amenityStockMax < amenityQuantityMax) {

//     throw Error('Maximum stock must not be less than the maximum quantity.')

// }

// amenity Updated validation
// if (amenityStock > amenityStockMax) {

//     console.log("Amenity stock: " + amenityStock, " Amenity Stock Max: ", amenityStockMax);
//     throw Error('Stock must not exceed the maximum stock.')

// }

// if (amenityQuantityMin > amenityQuantityMax) {

//     throw Error('Minimum quantity must not exceed the maximum quantity.')

// }

// if (amenityStock < amenityQuantityMin) {

//     throw Error('Stock must not be less than the minimum quantity.')

// }

// if (amenityStock < amenityQuantityMax) {

//     throw Error('Stock must not exceed the maximum quantity.')

// }

// if (amenityStock < 0) {

//     throw Error('Stock must not be less than 0.')

// }

// if (amenityStockMax < 0) {

//     throw Error('Maximum stock must not be less than 0.')

// }

// if (amenityQuantityMin < 0) {

//     throw Error('Minimum quantity must not be less than 0.')

// }

// if (amenityQuantityMax < 0) {

//     throw Error('Maximum quantity must not be less than 0.')

// }

// if (amenityStockMax < amenityQuantityMax) {

//     throw Error('Maximum stock must not be less than the maximum quantity.')

// }