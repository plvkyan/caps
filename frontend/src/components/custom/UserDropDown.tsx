import {
    CircleUser,
    Home,
    LayoutDashboard,
    Settings
} from "lucide-react"



import { 
    AlertDialog, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle
} from "../ui/alert-dialog";

import { Button, buttonVariants } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu"

import { Link } from "react-router-dom"



// Hooks
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import React from "react";
import { Badge } from "../ui/badge";







export const UserDropdown = () => {

    const { logout } = useLogout()
    const { user } = useAuthContext()

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)


    const handleClick = () => {

        logout()

    }

    let badgeColor = "default" as any;
    let badgeMessage = "Outstanding";

    if (user.memberStatus === "Outstanding") {
        badgeColor = "default" as any;
        badgeMessage = "Outstanding";
    }

    if (user.memberStatus === "Delinquent") {
        badgeColor = "warning" as any;
        badgeMessage = "Delinquent";
    }

    if (user.stat === "Archived") {
        badgeColor = "outline" as any;
        badgeMessage = "Archived";
    }


    return (



        <>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>

                    <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                    </Button>

                </DropdownMenuTrigger>




                <DropdownMenuContent align="end">

                    <DropdownMenuLabel> {user.blkLt} </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-muted-foreground"> {user.role} </DropdownMenuLabel>


                   
                    
                    {user.memberStatus && (
                        <Badge variant={badgeColor}> {badgeMessage} </Badge>
                    )}
                
                    <DropdownMenuSeparator />

                    {user.role != "Unit Owner" &&
                        (
                            <>

                                <DropdownMenuItem>
                                    <Link to="/home" className="flex items-center">
                                        <Home className="h-6 w-6 pr-2" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/dashboard" className="flex items-center">
                                        <LayoutDashboard className="h-5 w-5 pr-2" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="">
                                    <Link to="/settings" className="flex items-center">
                                        <Settings className="h-6 w-6 pr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>

                            </>
                        )
                    }

                    {user.role == "Unit Owner" &&
                        (
                            <>

                                <DropdownMenuItem>
                                    <Link to="/home" className="flex items-center">
                                        <Home className="h-6 w-6 pr-2" />
                                        Home
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/dashboard" className="flex items-center">
                                        <LayoutDashboard className="h-5 w-5 pr-2" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="">
                                    <Link to="/settings" className="flex items-center">
                                        <Settings className="h-6 w-6 pr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>

                            </>
                        )
                    }

                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem
                        className="text-destructive"
                        onSelect={() => setShowDeleteDialog(true)}>
                        Logout
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                        <AlertDialogContent>

                            <AlertDialogHeader>

                                <AlertDialogTitle> Are you sure you want to logout? </AlertDialogTitle>

                                <AlertDialogDescription>
                                    Any action unfinished won't be saved.
                                </AlertDialogDescription>

                            </AlertDialogHeader>



                            <AlertDialogFooter>


                                <AlertDialogCancel> Cancel </AlertDialogCancel>
                                <Button
                                    variant={"destructive"}
                                    onClick={handleClick}
                                >
                                    Logout
                                </Button>

                            </AlertDialogFooter>

                        </AlertDialogContent>

                    </AlertDialog>

        </>



    )



}


