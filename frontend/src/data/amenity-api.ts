


const apiBaseUrl = 'http://localhost:4000/api/';
const apiAmenitiesUrl = apiBaseUrl + 'amenities';


export const createAmenity = async (amenityData: any) => {
    return (await fetch(apiAmenitiesUrl, {
        body: JSON.stringify(amenityData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }));
}

export const getUnarchivedAmenities = async () => {
    return (await fetch(apiAmenitiesUrl + '/all/unarchived'));
}

export const deleteAmenity = async (id: string) => {
    return (await fetch(apiAmenitiesUrl + '/' + id, {
        method: 'DELETE'
    }));
}