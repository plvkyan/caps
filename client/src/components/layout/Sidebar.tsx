


// Imports

// Lucide Icons Import
import {
    Archive,
    CalendarFold,
    DollarSign,
    LayoutDashboard,
    Megaphone,
    Package2,
    Settings,
    Users,
    Warehouse,
} from "lucide-react";



// Utility Imports
// React Router Imports
import {
    Link,
    useMatch,
    useResolvedPath
} from "react-router-dom";



// Hook Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";





export default function Navbar() {



    const { user } = useAuthContext()





    return (



        <>

            <div className="hidden border-r bg-card md:block">

                <div className="flex flex-col h-full">

                    <div className="flex items-center border-b h-16 px-6">

                        <Link to="/home" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <img src="@/assets/grand-cedar-homes-new-logo.png" />
                            <span className="text-xl "> Grand Cedar </span>
                        </Link>

                    </div>




                    <nav className="grid items-start text-sm font-normal">



                        <section className="flex flex-col border-b pt-5 pb-4 px-3 gap-1">

                            <div className="text-sub/55 text-xs px-3 pb-1"> GENERAL </div>

                            <CustomLink
                                to="/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-card-foreground hover:bg-muted"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </CustomLink>

                        </section>



                        <section className="flex flex-col border-b pt-5 pb-4 px-3 gap-1">

                            <div className="text-sub/55 text-xs px-3 pb-1"> TRANSACTIONS </div>

                            <CustomLink
                                to="/bills"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-card-foreground"
                            >
                                <DollarSign className="h-4 w-4" />
                                Bills
                            </CustomLink>

                            <CustomLink
                                to="/reservations"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-card-foreground"
                            >
                                <CalendarFold className="h-4 w-4" />
                                Reservations
                            </CustomLink>

                        </section>



                        <section className="flex flex-col border-b pt-5 pb-4 px-3 gap-1">

                            <div className="text-sub/55 text-xs px-3 pb-1"> ASSOCIATION </div>

                            {
                                user.userPosition === "Admin" &&
                                (
                                    <CustomLink
                                        to="/amenities"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-card-foreground"
                                    >
                                        <Warehouse className="h-4 w-4" />
                                        Amenities
                                    </CustomLink>
                                )
                            }
                            
                            <CustomLink
                                to="/announcements"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-card-foreground"
                            >
                                <Megaphone className="h-4 w-4" />
                                Announcements
                            </CustomLink>

                            {
                                user.userPosition === "Admin" &&
                                (
                                    <CustomLink
                                        to="/users"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-card-foreground"
                                    >
                                        <Users className="h-4 w-4" />
                                        Users
                                    </CustomLink>
                                )
                            }

                        </section>



                        <section className="flex flex-col pt-5 pb-4 px-3 gap-1">


                            <div className="text-sub/55 text-xs px-3 pb-1"> SUPPORT </div>

                            {
                                user.userPosition === "Admin" &&
                                (
                                    <CustomLink
                                        to="/archives"
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-card-foreground"
                                    >
                                        <Archive className="h-4 w-4" />
                                        Archive
                                    </CustomLink>
                                )
                            }

                            <CustomLink
                                to="/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-card-foreground"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </CustomLink>

                        </section>

                    </nav>



                    <section className="flex sticky bottom-0 mt-auto flex-col border-t py-5 px-3 gap-1 items-center justify-center">

                        <div className="text-neutral-500 text-center text-xs"> @ 2024 Grand Cedar Homes Incorporated </div>

                    </section>

                </div>



            </div>



        </>
    )
}



function CustomLink({ to, children, ...props }) {

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <Link
            to={to}
            className={isActive ? "flex font-medium items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all" : "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-main hover:font-medium hover:bg-muted"}
            {...props}
        >
            {children}
        </Link>
    )
}