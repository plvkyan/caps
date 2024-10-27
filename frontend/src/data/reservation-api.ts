
const apiBaseUrl = 'http://localhost:4000/api/';
const apiReservationsUrl = apiBaseUrl + 'reservations';

// POST request to create a new reservation
export const createReservation = async (reservationData) => {
    return (await fetch(apiReservationsUrl, {
        body: JSON.stringify(reservationData),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }));
}

export const getAllReservations = async () => {
    return (await fetch(apiReservationsUrl)).json();
}

export const getUnarchivedReservations = async () => {
    return (await fetch(apiReservationsUrl + '/unarchived/a'));
}

export const getUserReservations = async (id) => {
    return (await fetch(apiReservationsUrl + '/user/' + id)).json();
}

export const getUserUnarchivedReservations = async (id) => {  
    return (await fetch(apiReservationsUrl + '/user/unarchived/' + id)).json();
}
