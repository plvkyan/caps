


// Imports

// Variable Declarations
// API Base URL
const apiBaseUrl = import.meta.env.VITE_API_URL;
// API Bills URL
const apiBillsUrl = apiBaseUrl + '/bills';





// Functions
// GET functions
// Fetch all bills
export const getBills = async () => {
    return await fetch(apiBillsUrl);
}

export const getUnarchivedBills = async () => {
    return await fetch(apiBillsUrl + '/unarchived');
}

// Fetch a single bill
export const getBill = async (id: string) => {
    return await fetch(apiBillsUrl + '/' + id);
}

export const getUserBills = async (id: string) => {
    return await fetch(apiBillsUrl + '/user/' + id);
}

export const getBillPresets = async () => {
    return await fetch(apiBillsUrl + '/presets/unarchived');
}




// POST functions
// Create a bill
export const createBill = async (
    billTitle,
    billType,
    billDescription,
    billQuantity,
    billCurrency,
    billAmount,
    billRecurringDate,
    billDueDate,
    billPayors,
    billCreatorId,
    billCreatorBlkLt,
    billCreatorPosition,
    billVisibility
) => {
    return await fetch(apiBillsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            billTitle,
            billType,
            billDescription,
            billQuantity,
            billCurrency,
            billAmount,
            billRecurringDate,
            billDueDate,
            billPayors,
            billCreatorId,
            billCreatorBlkLt,
            billCreatorPosition,
            billVisibility
        })
    });
}

// Create a bill preset
export const createBillPreset = async (
    billPresetTitle,
    billPresetType,
    billPresetDescription,
    billPresetQuantity,
    billPresetCurrency,
    billPresetAmount,
    billPresetRecurringDate,
    billPresetCreatorId,
    billPresetCreatorBlkLt,
    billPresetCreatorPosition,
    billPresetVisibility
) => {
    return await fetch(apiBillsUrl + "/presets", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            billPresetTitle,
            billPresetType,
            billPresetDescription,
            billPresetQuantity,
            billPresetCurrency,
            billPresetAmount,
            billPresetRecurringDate,
            billPresetCreatorId,
            billPresetCreatorBlkLt,
            billPresetCreatorPosition,
            billPresetVisibility
        })
    });
}
