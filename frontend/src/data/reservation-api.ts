


// Imports

// Type Imports
// Reservation Type Import
// import { ReservationType } from "@/types/reservation-type";



// Variable Declarations
// API Base URL
const apiBaseUrl = 'http://localhost:4000/api/';
// API Reservations URL
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
    return (await fetch(apiReservationsUrl));
}

export const getUnarchivedReservations = async () => {
    return (await fetch(apiReservationsUrl + '/unarchived/a'));
}

export const getSingleReservation = async (reservationId: String) => {
    return (await fetch(apiReservationsUrl + '/' + reservationId));
}

export const getUserReservations = async (userId: String) => {
    return (await fetch(apiReservationsUrl + '/user/' + userId));
}

export const getUserUnarchivedReservations = async (userId: String) => {
    return (await fetch(apiReservationsUrl + '/user/unarchived/' + userId));
}

export const getEquipmentUnavailableDates = async (equipmentId: String) => {
    return (await fetch(apiReservationsUrl + '/amenity/equipment/unavailable/' + equipmentId));
}

export const getFacilityUnavailableDates = async (facilityId: String) => {
    return (await fetch(apiReservationsUrl + '/amenity/facility/unavailable/' + facilityId));
}

export const getEquipmentAvailableStocks = async (equipmentId: String, reservationDate: Date) => {
    return (await fetch(apiReservationsUrl + '/amenity/equipment/stock/' + equipmentId + '/' + reservationDate));
}



// PATCH requests
// PATCH request to archive many reservations
export const archiveManyReservations = async (reservationIds) => {
    return (await fetch(apiReservationsUrl + "/update/batch", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationIds: reservationIds, // Replace with actual reservation IDs
            updateData: {
                reservationVisibility: 'Archived', // Replace with actual fields and values to update
            }
        })
    }));
}

// PATCH request to unarchive many reservations
export const unarchiveManyReservations = async (reservationIds) => {
    return (await fetch(apiReservationsUrl + "/update/batch", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationIds: reservationIds, // Replace with actual reservation IDs
            updateData: {
                reservationVisibility: 'Unarchived', // Replace with actual fields and values to update
            }
        })
    }));
}

// PATCH request to approve many reservations
export const approveManyReservations = async (reservationIds, statusAuthorId, statusAuthor, statusAuthorPosition) => {
    return (await fetch(apiReservationsUrl + "/update/batch/approve", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationIds: reservationIds, // Replace with actual reservation IDs
            updateData: {
                $push: {
                    reservationStatus: {
                        status: 'Approved',
                        statusDate: new Date(),
                        statusAuthorId: statusAuthorId,
                        statusAuthor: statusAuthor,
                        statusAuthorPosition: statusAuthorPosition
                    }
                }
            }
        })
    }));
}

// PATCH request to approve many reservations
export const rejectManyReservations = async (reservationIds, statusAuthorId, statusAuthor, statusAuthorPosition) => {
    return (await fetch(apiReservationsUrl + "/update/batch/reject", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            reservationIds: reservationIds, // Replace with actual reservation IDs
            updateData: {
                $push: {
                    reservationStatus: {
                        status: 'Rejected',
                        statusDate: new Date(),
                        statusAuthorId: statusAuthorId,
                        statusAuthor: statusAuthor,
                        statusAuthorPosition: statusAuthorPosition
                    }
                }
            }
        })
    }));
}


// PATCH request to update a reservation status to approved
export const updateReservationStatusToApproved = async (reservationId, statusAuthorId, statusAuthor, statusAuthorPosition) => {
    return (await fetch(apiReservationsUrl + '/' + reservationId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            updateData: {
                $push: {
                    reservationStatus: {
                        status: 'Approved',
                        statusDate: new Date(),
                        statusAuthorId: statusAuthorId,
                        statusAuthor: statusAuthor,
                        statusAuthorPosition: statusAuthorPosition
                    }
                }
            }
        })
    }));
}

