


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
    items: [
        {
            title: "Exports",
            url: "#",
        },
    ]
}

export const BILLS = {
    title: "Bills",
    url: "/bills",
    icon: ReceiptText,
    isActive: false,
    items: [
        {
            title: "Create Bill",
            url: "/bills/form",
        },
        {
            title: "Create Bill Type",
            url: "#",
        },
        {
            title: "Export Bills",
            url: "#",
        },
    ]
}

export const RESERVATIONS = {
    title: "Reservations",
    url: "/reservations",
    icon: CalendarFold,
    isActive: false,
    items: [
        {
            title: "Create Reservation",
            url: "/reservations/form",
        },
        {
            title: "Export Reservations",
            url: "#",
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
            url: "#",
        },
        {
            title: "Export Amenities",
            url: "#",
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
            url: "#",
        },
        {
            title: "Export Users",
            url: "#",
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

export const TRANSACTION_NAV_DATA = {
    label: "Transactions",
    items: [
        BILLS,
        RESERVATIONS,
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

export const SUPPORT_NAV_DATA = {
    items: [
        ARCHIVES,
        SETTINGS,
    ]
}

export const ADMIN_SIDEBAR_NAV_DATA = {
    GENERAL_NAV_DATA,
    TRANSACTION_NAV_DATA,
    ASSOCIATION_NAV_DATA,
    SUPPORT_NAV_DATA,
}