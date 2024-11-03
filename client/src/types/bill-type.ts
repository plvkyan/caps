
export type BillType = {
    _id: string,
    billName: string,
    billDescription: string,
    billQuantity: number,
    billCurrency: string,
    billAmount: number,
    billReceivers: {
        receiverBlkLt: string,
        billStatus: string,
        billDue: Date,
        receiverEmail: string,
    },
    billMadeby: string,
    billMadeDate: Date,
    stat: string,
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