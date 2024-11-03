


// Variables
// API calls base URL
const apiBaseUrl = 'http://localhost:4000/api/';
// Amenities API URL
const apiAmenitiesUrl = apiBaseUrl + 'amenities';



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
