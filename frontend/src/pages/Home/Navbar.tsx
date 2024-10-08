import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button, buttonVariants } from "@/components/ui/button";
import { LogoIcon } from "./Icons";
import { CircleUser, Home, LayoutDashboard, Menu, Settings } from "lucide-react";
import { ModeToggle } from "../../components/custom/mode-toggle";


import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { UserDropdown } from "@/components/custom/UserDropDown";
import { useState } from "react";

import { useAuthContext } from "@/hooks/useAuthContext";




interface RouteProps {
    href: string;
    label: string;
}



const routeList: RouteProps[] = [
    {
        href: "#about",
        label: "About Us",
    },
    {
        href: "#theCommunity",
        label: "The Community",
    },
    {
        href: "#contact",
        label: "Contact Us",
    },
    {
        href: "#faq",
        label: "FAQ",
    },
];



export const Navbar = () => {



    const { user } = useAuthContext()

    const [isOpen, setIsOpen] = useState<boolean>(false);



    return (

        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">

            <NavigationMenu className="mx-auto">

                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">

                    <NavigationMenuItem className="font-bold flex">
                        <a
                            rel="noreferrer noopener"
                            href="/home"
                            className="ml-2 font-bold text-xl flex"
                        >
                            <LogoIcon />
                            Grand Cedar Homes
                        </a>
                    </NavigationMenuItem>

                    {/* mobile */}
                    <span className="flex md:hidden">

                        <ModeToggle />

                        <Sheet
                            open={isOpen}
                            onOpenChange={setIsOpen}
                        >

                            <SheetTrigger className="px-2">
                                <Menu
                                    className="flex md:hidden h-5 w-5"
                                    onClick={() => setIsOpen(true)}
                                >
                                    <span className="sr-only"> Menu Icon </span>
                                </Menu>
                            </SheetTrigger>

                            <SheetContent side={"left"}>

                                <SheetHeader className="items-start">
                                    <SheetTitle className="font-bold text-xl">
                                        Shadcn/React
                                    </SheetTitle>
                                </SheetHeader>

                                <nav className="flex flex-col justify-start items-start gap-2 mt-4">
                                    {routeList.map(({ href, label }: RouteProps) => (
                                        <a
                                            rel="noreferrer noopener"
                                            key={label}
                                            href={href}
                                            onClick={() => setIsOpen(false)}
                                            className={buttonVariants({ variant: "ghost" })}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                    <a
                                        href="/login"
                                        className={`w-[110px] border ${buttonVariants({
                                            variant: "default",
                                        })}`}
                                    >
                                        Login
                                    </a>
                                </nav>

                            </SheetContent>

                        </Sheet>

                    </span>

                    {/* desktop */}
                    <nav className="hidden md:flex gap-2">
                        {routeList.map((route: RouteProps, i) => (
                            <a
                                rel="noreferrer noopener"
                                href={route.href}
                                key={i}
                                className={`text-[17px] ${buttonVariants({
                                    variant: "ghost",
                                })}`}
                            >
                                {route.label}
                            </a>
                        ))}
                    </nav>



                    <div className="flex gap-5">

                        <ModeToggle />

                        {user &&
                            (

                                <UserDropdown />
                            )
                        }

                    </div>



                    {!user &&
                        (
                            <div className="hidden md:flex gap-2">
                                <a
                                    href="/login"
                                    className={`border ${buttonVariants({ variant: "default" })}`}
                                >
                                    Login
                                </a>
                            </div>
                        )
                    }



                </NavigationMenuList>

            </NavigationMenu>

        </header>

    );
};