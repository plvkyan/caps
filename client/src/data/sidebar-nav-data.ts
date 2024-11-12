


// Imports
// Lucide React Icons Imports
import {
    Archive,
    CalendarFold,
    LayoutDashboard,
    Megaphone,
    ReceiptText,
    Settings,
    Users,
    Warehouse,
} from "lucide-react";



export const DASHBOARD = {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: false,
}

export const ADMIN_BILLS = {
    title: "Bills",
    url: "/bills",
    icon: ReceiptText,
    isActive: false,
    items: [
        {
            title: "Create Bill",
            url: "/bills/create",
        },
        {
            title: "Create Bill Type",
            url: "/bills/preset-create",
        },
    ]
}

export const UNIT_OWNER_BILLS = {
    title: "Bills",
    url: "/bills",
    icon: ReceiptText,
    isActive: false,
}

export const RESERVATIONS = {
    title: "Reservations",
    url: "/reservations",
    icon: CalendarFold,
    isActive: false,
    items: [
        {
            title: "Create Reservation",
            url: "/reservations/create",
        },
    ]
}

export const AMENITIES = {
    title: "Amenities",
    url: "/amenities",
    icon: Warehouse,
    isActive: false,
    items: [
        {
            title: "Create Amenity",
            url: "/amenities/create",
        },
    ]
}

export const USERS = {
    title: "Users",
    url: "/users",
    icon: Users,
    isActive: false,
    items: [
        {
            title: "Create User",
            url: "/users/create",
        },
        {
            title: "Bulk Create User",
            url: "/users/bulk-create",
        },
    ]
}

export const ANNOUNCEMENTS = {
    title: "Announcements",
    url: "/announcements",
    icon: Megaphone,
}

export const SETTINGS = {
    title: "Settings",
    url: "/settings",
    icon: Settings,
}

export const ARCHIVES = {
    title: "Archives",
    url: "/archives",
    icon: Archive,
}




export const GENERAL_NAV_DATA = {
    label: "General",
    items: [
        DASHBOARD
    ],
}

export const ADMIN_TRANSACTION_NAV_DATA = {
    label: "Transactions",
    items: [
        ADMIN_BILLS,
        RESERVATIONS,
    ]
}

export const UNIT_OWNER_TRANSACTION_NAV_DATA = {
    label: "Transactions",
    items: [
        UNIT_OWNER_BILLS,
        RESERVATIONS,
    ]
}

export const UNIT_OWNER_ASSOCIATION_NAV_DATA = {
    label: "Association",
    items: [
        ANNOUNCEMENTS,
    ]
}

export const ASSOCIATION_NAV_DATA = {
    label: "Association",
    items: [
        AMENITIES,
        ANNOUNCEMENTS,
        USERS,
    ]
}

export const ADMIN_SUPPORT_NAV_DATA = {
    items: [
        ARCHIVES,
        SETTINGS,
    ]
}

export const UNIT_OWNER_SUPPORT_NAV_DATA = {
    items: [
        SETTINGS,
    ]
}

export const ADMIN_SIDEBAR_NAV_DATA = {
    GENERAL_NAV_DATA,
    ADMIN_TRANSACTION_NAV_DATA,
    ASSOCIATION_NAV_DATA,
    ADMIN_SUPPORT_NAV_DATA,
}

export const UNIT_OWNER_SIDEBAR_NAV_DATA = {
    GENERAL_NAV_DATA,
    UNIT_OWNER_TRANSACTION_NAV_DATA,
    UNIT_OWNER_ASSOCIATION_NAV_DATA,
    UNIT_OWNER_SUPPORT_NAV_DATA,
}