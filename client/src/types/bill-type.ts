


export type BillType = {
    _id: string,
    billTitle: string,
    billType: string,
    billDescription: string,
    billQuantity: number,
    billCurrency: string,
    billAmount: number,
    billRecurringDate?: Date,
    billDueDate: Date,
    billPayors: 
        {
            payorId: string,
            payorBlkLt: string,
            payorEmail: string,
            billStatus: string,
            billPaidDate: Date,
            billPaymentMode: string,
        }[]
    ,
    billCreatorId: string,
    billCreatorBlkLt: string,
    billCreatorPosition: string,
    billVisibility: string,
    createdAt: Date,
}

export type BillPresetType = {
    _id: string,
    billPresetTitle: string,
    billPresetType: string,
    billPresetDescription: string,
    billPresetQuantity: number,
    billPresetCurrency: string,
    billPresetAmount: number,
    billPresetRecurringDate?: Date,
    billPresetCreatorId: string,
    billPresetCreatorBlkLt: string,
    billPresetCreatorPosition: string,
    billPresetVisibility: string,
    createdAt: Date,
}



export const PAID = {
    id: 1,
    value: "paid",
    label: "Paid",
    color: "default" as const
}

export const PENDING = {
    id: 2,
    value: "pending",
    label: "Pending",
    color: "warning" as const
}

export const OVERDUE = {
    id: 3,
    value: "overdue",
    label: "Overdue",
    color: "destructive" as const
}

export const BILL_STATUSES = [
    PAID,
    PENDING,
    OVERDUE
]