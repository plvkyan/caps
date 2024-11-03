


import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"


import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"


import {
    MoreHorizontal
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"





// Utility
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext"
import { toast } from "sonner"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import React from "react"

// Date fns
import { formatDistanceToNow } from "node_modules/date-fns/formatDistanceToNow"
import { useAuthContext } from "@/hooks/useAuthContext"





const Announcement = ({ announcement }) => {

    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
    const [showEditDialog, setShowEditDialog] = React.useState(false)
    const { announcements, dispatch } = useAnnouncementsContext()

    const handleSelect = (e) => {

        setShowEditDialog(true)
        
    } 

    const deleteAnnouncement = async () => {

        const response = await fetch('http://localhost:4000/api/announcements/' + announcement._id, {
            method: 'DELETE'
        })

        const json = await response.json()

        console.log(json)

        if (response.ok) {
            dispatch({ type: 'DELETE_ANNOUNCEMENT', payload: json })
        }

    }



    return (

        <>

            <Card>

                <CardHeader className="flex flex-row items-center gap-4">

                    {/* <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt=""
                        />
                    </Avatar> */}

                    <div className="flex flex-col flex-1">

                        <CardTitle className="text-lg"> {announcement.blkLt} </CardTitle>
                        <CardDescription> {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })} </CardDescription>

                        <div className="flex gap-2 mt-2">

                            {announcement && announcement.badges.map((item, index) => (
                                <Badge key={index}> {item.label} </Badge>
                            ))}
                            
                        </div>

                    </div>

                    <div className="">

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>



                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick= { () => navigator.clipboard.writeText(announcement._id) }
                                >
                                    Copy Announcement ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />

                            </DropdownMenuContent>

                        </DropdownMenu>

                    </div>

                </CardHeader>

                <CardContent key={announcement._id}> {announcement.content} </CardContent>


            </Card>

        </>

    )
}


export default Announcement