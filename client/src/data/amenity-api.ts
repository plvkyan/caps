


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
export const editAmenity = async (amenityData: any) => {
    return (await fetch(apiAmenitiesUrl + '/' + amenityData._id, {
        body: JSON.stringify(amenityData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
    }));
}

export const archiveAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/archive/' + id, {
        method: 'PATCH',
    }));
}

export const unarchiveAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/unarchive/' + id, {
        method: 'PATCH',
    }));
}

export const archiveManyAmenities = async (ids) => {
    return (await fetch(apiAmenitiesUrl + "/update/visibility/batch/archive", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ids: ids, // Replace with actual reservation IDs
        })
    }));
}

export const unarchiveManyAmenities = async (ids) => {
    return (await fetch(apiAmenitiesUrl + "/update/visibility/batch/unarchive", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ids: ids, // Replace with actual reservation IDs
        })
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

// Fetch all unarchived amenities
export const getArchivedAmenities = async () => {
    return (await fetch(apiAmenitiesUrl + '/all/archived'));
}

// Fetch a single amenity
export const getSingleAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/' + id));
}
