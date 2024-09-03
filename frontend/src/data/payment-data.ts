import { PaymentType } from "@/types/payment-type";


export const ARCHIVED = {
    id: 1, 
    value: "archived",
    label: "Archived",
    color: "outline" as const
}

export const PAID = {
    id: 2, 
    value: "paid",
    label: "Paid",
    color: "default" as const
}

export const PENDING = {
    id: 3, 
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

export const PAYMENT_STATUSES = [
    ARCHIVED,
    PAID,
    PENDING,
    OVERDUE
]

const paymentData: PaymentType[] = [
    {
        id: "21-0840",
        amount: 2000,
        statusObj: PAID,
        status: PAID.value,
        color: PAID.color,
        address: "Blk 24 Lt 1"
    },
    {
        id: "21-0842",
        amount: 904,
        statusObj: PENDING,
        status: PENDING.value,
        color: PENDING.color,
        address: "Blk 69 Lt 42"
    },
    {
        id: "21-1221",
        amount: 100,
        statusObj: OVERDUE,
        status: OVERDUE.value,
        color: OVERDUE.color,
        address: "Blk 3 Lt 9"
    },
    {
        id: "21-2349",
        amount: 200,
        statusObj: PENDING,
        status: PENDING.value,
        color: PENDING.color,
        address: "Blk 4 Lt 2"
    },
    {
        id: "21-0248",
        amount: 1199,
        statusObj: PAID,
        status: PAID.value,
        color: PAID.color,
        address: "Blk 3 Lt 7"
    },
    {
        id: "21-0840",
        amount: 10000,
        statusObj: PAID,
        status: PAID.value,
        color: PAID.color,
        address: "Blk 6 Lt 1"
    },
    {
        id: "21-0840",
        amount: 1000,
        statusObj: PAID,
        status: PAID.value,
        color: PAID.color,
        address: "Blk 16 Lt 12"
    },
    {
        id: "21-0840",
        amount: 250,
        statusObj: PAID,
        status: PAID.value,
        color: PAID.color,
        address: "Blk 14 Lt 18"
    },
    {
        id: "21-0840",
        amount: 250,
        statusObj: PENDING,
        status: PENDING.value,
        color: PENDING.color,
        address: "Blk 48 Lt 72"
    },
    {
        id: "21-0840",
        amount: 250,
        statusObj: PENDING,
        status: PENDING.value,
        color: PENDING.color,
        address: "Blk 24 Lt 9"
    },
    {
        id: "21-0840",
        amount: 4200,
        statusObj: OVERDUE,
        status: OVERDUE.value,
        color: OVERDUE.color,
        address: "Blk 16 Lt 16"
    },
    {
        id: "21-0840",
        amount: 20000,
        statusObj: OVERDUE,
        status: OVERDUE.value,
        color: OVERDUE.color,
        address: "Blk 100 Lt 100"
    },
]

export default paymentData;