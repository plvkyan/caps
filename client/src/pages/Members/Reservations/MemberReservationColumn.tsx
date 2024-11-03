"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "@/components/custom/table-header";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import React from "react";
import { useUsersContext } from "@/hooks/useUsersContext";
import UserEditForm from "@/pages/Admin/Users/AdminEditUser";
import { format } from "date-fns";
import { RESERVATION_STATUS } from "@/data/reservation-data";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export type User = {
    _id: string,
    blkLt: string,
    blkLtPosition: string,
    amenityAddress: string,
    amenityName: string,
    amenityType: string,
    reservationComment: string,
    reservationDate: Date,
    reservationQuantity: number,
    reservationStatus: string,
    reservationReason: string,
    interactedBy: string,
    interactionDate: Date,
    stat: string,
    createdAt: Date,
}




export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        )
    },
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reservation ID" />
        )
    },
    {
        accessorKey: "blkLt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Block and Lot" />
        )
    },
    {
        accessorKey: "amenityName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Amenity" />
        )
    },
    {
        accessorKey: "reservationDate",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reservation Date" />
        ), cell: ({ row }) => {

            const origDate = row.getValue("reservationDate") as any
            const formattedDate = format(origDate, "PPP")

            return <div className="font-regular"> {formattedDate} </div>
        }
    },
    {
        accessorKey: "reservationStatus",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const role = RESERVATION_STATUS.find(
                (role) => role.value === row.getValue("reservationStatus")
            )

            if (!role) {
                return null
            }

            return (
                <span>{role.label}</span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },

//     {
//         id: "actions",
//         cell: ({ row }) => {


//             const rowReservation = row.original
//             const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
//             const [showEditDialog, setShowEditDialog] = React.useState(false)
//             const { users, dispatch } = useUsersContext()





//             const deleteUser = async () => {

//                 const response = await fetch('http://localhost:4000/api/reservations/' + rowReservation._id, {
//                     method: 'DELETE'
//                 })

//                 const json = await response.json()

//                 console.log(json)

//                 if (response.ok) {
//                     dispatch({ type: 'DELETE_USER', payload: json })
//                     window.location.reload()
//                 }

//             }



//             // const setArchive = async () => {

//             //     let use = row.original;

//             //     use.stat = "Archived"

//             //     const response = await fetch('http://localhost:4000/api/reservations/' + use._id, {
//             //         method: 'PATCH',
//             //         headers: { 'Content-Type': 'application/json' },
//             //         body: JSON.stringify(use)
//             //     })

//             //     const json = await response.json()

//             //     if (response.ok) {

//             //         dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
//             //         window.location.reload()
//             //     }

//             // }



//             const setUnarchive = async () => {

//                 let use = row.original;

//                 use.stat = "Unarchived"

//                 const response = await fetch('http://localhost:4000/api/reservations/' + use._id, {
//                     method: 'PATCH',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(use)
//                 })

//                 const json = await response.json()

//                 if (response.ok) {

//                     dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
//                     window.location.assign("/admin/archives")
//                 }

//             }



//             return (

//                 <>

//                     <UserEditForm userAccount={rowReservation} showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} />

//                     <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

//                         <AlertDialogContent>

//                             <AlertDialogHeader>

//                                 <AlertDialogTitle> Are you sure you want to delete this user? </AlertDialogTitle>

//                                 <AlertDialogDescription>
//                                     This action cannot be undone. This user will no longer be accessible by anyone.
//                                 </AlertDialogDescription>

//                             </AlertDialogHeader>



//                             <AlertDialogFooter>


//                                 <AlertDialogCancel> Cancel </AlertDialogCancel>
//                                 <Button
//                                     variant={"destructive"}
//                                     onClick={deleteUser}
//                                 >
//                                     Delete
//                                 </Button>

//                             </AlertDialogFooter>

//                         </AlertDialogContent>

//                     </AlertDialog>
// {/* 
//                     <DropdownMenu>

//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="h-8 w-8 p-0">
//                                 <span className="sr-only">Open menu</span>
//                                 <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                         </DropdownMenuTrigger>



//                         <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem
//                                 onClick={() => navigator.clipboard.writeText(rowReservation._id)}
//                             >
//                                 Copy Reservation ID
//                             </DropdownMenuItem>

//                             {rowReservation.stat == "Unarchived" &&
//                                 (
//                                     <DropdownMenuItem  onSelect={() => setShowEditDialog(true)}> Edit Reservation </DropdownMenuItem>
//                                 )
//                             }
//                             {rowReservation.stat == "Unarchived" &&
//                                 (
//                                     <DropdownMenuItem onSelect={() => setArchive()}> Archive Reservation </DropdownMenuItem>
//                                 )
//                             }
//                             {rowReservation.stat == "Archived" &&
//                                 (
//                                     <DropdownMenuItem onSelect={() => setUnarchive()}> Unarchive Reservation </DropdownMenuItem>
//                                 )
//                             }
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-destructive" onSelect={() => setShowDeleteDialog(true)}> Delete Reservation </DropdownMenuItem>
//                         </DropdownMenuContent>

//                     </DropdownMenu>
// */}




//                 </>

//             )
//         },

//     },



]
