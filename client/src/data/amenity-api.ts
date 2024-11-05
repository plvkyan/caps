


// Variables
// API calls base URL
const apiBaseUrl = import.meta.env.VITE_API_URL;
// Amenities API URL
const apiAmenitiesUrl = apiBaseUrl + '/amenities';



// POST functions
// Create amenity functions
export const createAmenity = async (amenityData: any) => {
    return (await fetch(apiAmenitiesUrl, {
        body: JSON.stringify(amenityData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }));
}





// PATCH functions
export const archiveAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/archive/' + id, {
        method: 'PATCH',
    }));
}




// DELETE functions
export const deleteAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/' + id, {
        method: 'DELETE'
    }));
}





// GET functions
// Fetch all unarchived amenities
export const getUnarchivedAmenities = async () => {
    return (await fetch(apiAmenitiesUrl + '/all/unarchived'));
}

// Fetch a single amenity
export const getSingleAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/' + id));
}
