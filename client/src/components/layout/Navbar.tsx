// @ts-nocheck



// Imports

// shadcn Components Imports
// shadcn Alert Dialog Imports
import { 
    AlertDialog, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "@/components/ui/alert-dialog"

// shadcn Button Import
import { Button } from "@/components/ui/button";

// shadcn Drop Down Menu Imports
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuItem 
} from "@/components/ui/dropdown-menu";

// shadcn Input Import
import { Input } from "@/components/ui/input";

// shadcn Sheet Imports
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";



// Custom Component Imports
// Theme Toggle Import
import { ModeToggle } from "@/components/custom/mode-toggle";

// User Dropdown Import
import { UserDropdown } from "@/components/custom/UserDropDown";



// Lucide Icons Imports 
import { 
    Archive, 
    CalendarFold, 
    CircleUser, 
    DollarSign, 
    Home, 
    LayoutDashboard, 
    LogOut, 
    Megaphone, 
    Menu, 
    Search, 
    Settings, 
    Users, 
    Warehouse,
} from "lucide-react";



// Hook Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext"

// Logout Hook Import
import { useLogout } from "@/hooks/useLogout"



// Utility Imports
// React Router Imports
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

// React Imports
// React Context Import
import { useContext } from "react";

// React Import
import React from "react"





export default function Navbar() {



    // Hooks
    // Logout Hook
    const { logout } = useLogout()

    // Authentication Hook
    const { user } = useAuthContext()

    // States
    // Delete Dialog State
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

    // Functions
    // Handle Click Function
    const handleClick = () => {

        logout()

        window.location.reload();

    }


    
    return (



        < >



            <header className="flex h-14 items-center gap-4 border-b bg-card h-16 px-4 lg:px-6">


                {/* Mobile View  */}
                <Sheet>

                    <SheetTrigger asChild>

                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 bg-black-bg md:hidden"
                        >

                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>

                        </Button>

                    </SheetTrigger>

                    {/* Desktop View  */}
                    <SheetContent side="left" className="flex flex-col">

                        <div className="mb-3"> </div>

                        <nav className="grid gap-2 text-lg font-medium">

                            <Link
                                to="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <span className="sr-only"> Grand Cedar Homes </span>
                            </Link>

                            {user.userRole != "Unit Owner" &&
                                (
                                    <>
                                        <CustomLink
                                            to="/dashboard"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                        >
                                            <LayoutDashboard className="h-5 w-5" />
                                            Dashboard
                                        </CustomLink>

                                        <CustomLink
                                            to="/bills"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <DollarSign className="h-5 w-5" />
                                            Bills
                                        </CustomLink>

                                        <CustomLink
                                            to="/reservations"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <CalendarFold className="h-5 w-5" />
                                            Reservations
                                        </CustomLink>

                                        <CustomLink
                                            to="/amenities"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Warehouse className="h-5 w-5" />
                                            Amenities
                                        </CustomLink>

                                        <CustomLink
                                            to="/announcements"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Megaphone className="h-5 w-5" />
                                            Announcements
                                        </CustomLink>

                                        <CustomLink
                                            to="/users"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Users className="h-5 w-5" />
                                            Users
                                        </CustomLink>

                                        <CustomLink
                                            to="/archives"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Archive className="h-4 w-4"/>
                                            Archive
                                        </CustomLink>

                                        

                                    </>
                                )
                            }

                            {user.userRole == "Unit Owner" &&
                                (
                                    <>
                                        <CustomLink
                                            to="/dashboard"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                        >
                                            <LayoutDashboard className="h-5 w-5" />
                                            Dashboard
                                        </CustomLink>

                                        <CustomLink
                                            to="/bills"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <DollarSign className="h-5 w-5" />
                                            Bills
                                        </CustomLink>

                                        <CustomLink
                                            to="/reservations"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <CalendarFold className="h-5 w-5" />
                                            Reservations
                                        </CustomLink>

                                        <CustomLink
                                            to="/announcements"
                                            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                        >
                                            <Megaphone className="h-5 w-5" />
                                            Announcements
                                        </CustomLink>

                                    </>
                                )
                            }



                        </nav>

                    </SheetContent>

                </Sheet>



                <div className="w-full flex-1">

                </div>

                <ModeToggle />

                {user &&
                    (
                        <UserDropdown />
                    )
                }





            </header>



        </>

    )
}

function CustomLink({ to, children, ...props }) {

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Link
            to={to}
            className={isActive ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground" : "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"}
        >
            {children}
        </Link>
    )
}

function CustomHeader() {

    const { pathname } = useLocation();

    return (

        <div className="flex items-center">

            <h1 className="text-lg font-semibold md:text-1xl">
                {pathname === "/dashboard" ? "Admin Dashboard"
                    : pathname === "/admin/payments" ? "Payments"
                        : pathname === "/home" ? "Home"
                            : pathname === "/admin/settings" ? "Settings"
                                : pathname === "/reservations" ? "Reservations"
                                    : pathname === "/reservations/facilities" ? "Reservations"
                                        : pathname === "/admin/users" ? "Users"
                                            : pathname === "/announcements" ? "Announcements" :
                                                "Dashboard"}
            </h1>

        </div>
    )
}
