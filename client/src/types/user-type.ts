


// User type
export type UserType = {
    _id: string,
    userBlkLt: string,
    userPassword: string,
    userEmail: string, 
    userMobileNo: string,
    userRole: string,
    userPosition: string,
    userStatus: string,
    userVisibility: string,
    createdAt: Date,
}



export const STATUS_FILTER_OPTIONS = [
    {
        id: 1,
        value: "Outstanding",
        label: "Outstanding",
    },
    {
        id: 2,
        value: "Delinquent",
        label: "Delinquent",
    },
];

export const ROLE_FILTER_OPTIONS = [
    {
        id: 1,
        value: "Admin",
        label: "Admin",
    },
    {
        id: 2,
        value: "Unit Owner",
        label: "Unit Owner",
    },
];