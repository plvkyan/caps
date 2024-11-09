


// Imports

// Variable Declarations
// API Base URL
const apiBaseUrl = import.meta.env.VITE_API_URL;
// API Users URL
const apiUsersUrl = apiBaseUrl + '/users';



// POST request to create a new user
export const createUser = async (userBlkLt: String, userPassword: String, userEmail: String | undefined, userMobileNo: String | undefined, userRole: String, userPosition: String, userStatus: String | undefined, userVisibility: String | undefined) => {
    return (await fetch(apiUsersUrl + '/signup', {
        body: JSON.stringify({
            userBlkLt: userBlkLt,
            userPassword: userPassword, 
            userEmail: userEmail, 
            userMobileNo: userMobileNo, 
            userRole: userRole, 
            userPosition: userPosition, 
            userStatus: userStatus, 
            userVisibility: userVisibility,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }));
}

// POST request to create a new user
export const bulkCreateUsers = async (startBlock: number, endBlock: number, startLot: number, endLot: number, defaultPassword: String, defaultStatus: String | undefined, defaultVisibility: String | undefined) => {
    return (await fetch(apiUsersUrl + '/signup/bulk', {
        body: JSON.stringify({
            startBlock: startBlock,
            endBlock: endBlock,
            startLot: startLot,
            endLot: endLot,
            defaultPassword: defaultPassword, 
            defaultStatus: defaultStatus, 
            defaultVisibility: defaultVisibility,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
    }));
}





// GET request to get all users
// GET request to get a single user
export const getSingleUser = async (userId: String) => {
    return (await fetch(apiUsersUrl + '/single/' + userId));
}

// GET request to get all users
export const getAllUsers = async () => {
    return (await fetch(apiUsersUrl));
}

// GET request to get all users
export const getArchivedUsers = async () => {
    return (await fetch(apiUsersUrl + "/archived"));
}

// GET request to get unarchived unit owners
export const getUnitOwners = async () => {
    return (await fetch(apiUsersUrl + '/unarchived/unit-owners'));
}




// PATCH functions
export const updateUser = async (_id: String, user: any) => {
    return (await fetch(apiUsersUrl + '/' + _id, {
        body: JSON.stringify({
            user
        }), headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
    }))
}

export const bulkArchiveUsers = async (archiverId: String, userIds: Array<String>) => {
    return (await fetch(apiUsersUrl + '/archive/bulk', {
        body: JSON.stringify({
            archiverId: archiverId,
            userIds: userIds,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
    }));
}

export const bulkUnarchivedUsers = async (archiverId: String, userIds: Array<String>) => {
    return (await fetch(apiUsersUrl + '/unarchive/bulk', {
        body: JSON.stringify({
            archiverId: archiverId,
            userIds: userIds,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
    }));
}