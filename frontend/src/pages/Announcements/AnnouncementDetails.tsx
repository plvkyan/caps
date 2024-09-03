


// Lucide React Icons Imports
import {
    MoreHorizontal
} from "lucide-react"



// shadcn Components Imports
// shadcn Alert Dialog Component Import
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge"

// shadcn Card Component Import
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card"

// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Dropdown Menu Component Import
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"



// Hooks Imports
// Announcement Hook Import
import { useAnnouncementsContext } from "@/hooks/useAnnouncementsContext"

// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext"



// Utility Imports
// date fns
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

// React Import
import React from "react"



// Custom Components Imports
// Announcement Edit Form Component Import
import AnnouncementEditForm from "@/pages/Admin/Announcements/AdminEditAnnouncement.tsx"





const AnnouncementDetails = ({ announcement }) => {



    // Hooks
    // Authentication Context
    const { user } = useAuthContext()

    // Announcements Context
    const { dispatch } = useAnnouncementsContext()



    // Use States
    // Delete Dialog States
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

    // Edit Dialog States
    const [showEditDialog, setShowEditDialog] = React.useState(false)



    // Functions
    // Archive Announcement Function
    const setArchive = async () => {

        let ann = announcement;

        ann.stat = "Archived"

        const response = await fetch('http://localhost:4000/api/announcements/' + announcement._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ann)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
            window.location.reload()
        }

    }

    // Delete Announcement Function
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

    // Unarchive Announcement Function
    const setUnarchive = async () => {

        let ann = announcement;

        ann.stat = "Unarchived"

        const response = await fetch('http://localhost:4000/api/announcements/' + announcement._id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ann)
        })

        const json = await response.json()

        if (response.ok) {

            dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
            window.location.reload()

        }

    }





    return (



        <Card>

            <CardHeader className="flex flex-row items-center gap-4">

                {/* <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt=""
                        />
                    </Avatar> */}

                <div className="flex flex-col flex-1">

                    <CardTitle className="text-lg"> {announcement.blkLt} {"(" + announcement.blkLtPosition + ")"} </CardTitle>
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
                                onClick={() => navigator.clipboard.writeText(announcement._id)}
                            >
                                Copy Announcement ID
                            </DropdownMenuItem>

                            {/* 
                            {user.blkLt == announcement.blkLt &&
                                (
                                    <DropdownMenuItem onSelect={() => setShowEditDialog(true)}> Edit Announcement </DropdownMenuItem>
                                )
                            } */
                            }



                            {
                                (announcement.stat == "Unarchived" && user.position === "Admin") &&
                                (
                                    <DropdownMenuItem onSelect={() => setArchive()}> Archive Announcement </DropdownMenuItem>
                                )
                            }

                            {
                                (announcement.stat == "Archived" && user.position === "Admin") &&
                                (
                                    <DropdownMenuItem onSelect={() => setUnarchive()}> Unarchive Announcement </DropdownMenuItem>
                                )
                            }



                            {
                                user.role == "President" &&
                                (
                                    <>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-destructive"
                                            onSelect={() => setShowDeleteDialog(true)}
                                        >
                                            Delete Announcement
                                        </DropdownMenuItem>
                                    </>
                                )
                            }

                        </DropdownMenuContent>

                    </DropdownMenu>


                    {/* 
                    {
                        user.position === "Admin" &&
                        (
                            <AnnouncementEditForm announcement={announcement} showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} />
                        )
                    } */
                    }



                    
                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                        <AlertDialogContent>

                            <AlertDialogHeader>

                                <AlertDialogTitle> Are you sure you want to delete this announcement? </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This action cannot be undone. This announcement will no longer be accessible by anyone.
                                </AlertDialogDescription>

                            </AlertDialogHeader>



                            <AlertDialogFooter>


                                <AlertDialogCancel> Cancel </AlertDialogCancel>
                                <Button
                                    variant={"destructive"}
                                    onClick={deleteAnnouncement}
                                >
                                    Delete
                                </Button>

                            </AlertDialogFooter>

                        </AlertDialogContent>

                    </AlertDialog>



                </div>

            </CardHeader>



            <CardContent key={announcement._id}> {announcement.content} </CardContent>



        </Card>



    )
}





export default AnnouncementDetails