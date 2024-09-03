// @ts-nocheck

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Archive, Menu, Home, DollarSign, CalendarFold, Megaphone, Users, CircleUser, Search, Settings, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useMatch, useResolvedPath } from "react-router-dom";

import { useContext } from "react";
import { ModeToggle } from "@/components/custom/mode-toggle";
import React from "react"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

import { useLogout } from "@/hooks/useLogout"
import { useAuthContext } from "@/hooks/useAuthContext"
import { UserDropdown } from "@/components/custom/UserDropDown";






export default function Navbar() {

    const { logout } = useLogout()

    const { user } = useAuthContext()

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

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

                    <div className="relative ml-auto md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[400px]"
                        />
                    </div>

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

                            {user.role != "Unit Owner" &&
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

                            {user.role == "Unit Owner" &&
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
