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

import { UserType } from "@/types/user-type";
import { DataTableColumnHeader } from "@/components/custom/table-header";
import { USER_POSITION } from "@/data/user-data";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import React from "react";
import { useUsersContext } from "@/hooks/useUsersContext";
import UserEditForm from "./AdminEditUser";
import { useAuthContext } from "@/hooks/useAuthContext";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.



export type User = {
    _id: string,
    blkLt: string,
    password: string,
    position: string,
    role: string,
    stat: string,
}



const actions = () => {



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
            <DataTableColumnHeader column={column} title="UID" />
        )
    },
    {
        accessorKey: "blkLt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Block and Lot" />
        )
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        )
    },
    {
        accessorKey: "role",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Position" />
        ),
        cell: ({ row }) => {
            const role = USER_POSITION.find(
                (role) => role.value === row.getValue("role")
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
    {
        id: "actions",
        cell: ({ row }) => {


            const rowUser = row.original
            const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
            const [showEditDialog, setShowEditDialog] = React.useState(false)
            const { users, dispatch } = useUsersContext()
            const { user } = useAuthContext()





            const deleteUser = async () => {

                const response = await fetch('http://localhost:4000/api/users/' + rowUser._id, {
                    method: 'DELETE'
                })

                const json = await response.json()

                console.log(json)

                if (response.ok) {
                    dispatch({ type: 'DELETE_USER', payload: json })
                    window.location.reload()
                }

            }



            const setArchive = async () => {

                let use = row.original;

                use.stat = "Archived"

                const response = await fetch('http://localhost:4000/api/users/' + use._id, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(use)
                })

                const json = await response.json()

                if (response.ok) {

                    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
                    window.location.reload()
                }

            }



            const setUnarchive = async () => {

                let use = row.original;

                use.stat = "Unarchived"

                const response = await fetch('http://localhost:4000/api/users/' + use._id, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(use)
                })

                const json = await response.json()

                if (response.ok) {

                    dispatch({ type: "UPDATE_ANNOUNCEMENT", payload: json })
                    window.location.reload()
                }

            }



            return (

                <>

                    <UserEditForm userAccount={rowUser} showEditDialog={showEditDialog} setShowEditDialog={setShowEditDialog} />

                    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

                        <AlertDialogContent>

                            <AlertDialogHeader>

                                <AlertDialogTitle> Are you sure you want to delete this user? </AlertDialogTitle>

                                <AlertDialogDescription>
                                    This action cannot be undone. This user will no longer be accessible by anyone.
                                </AlertDialogDescription>

                            </AlertDialogHeader>



                            <AlertDialogFooter>


                                <AlertDialogCancel> Cancel </AlertDialogCancel>
                                <Button
                                    variant={"destructive"}
                                    onClick={deleteUser}
                                >
                                    Delete
                                </Button>

                            </AlertDialogFooter>

                        </AlertDialogContent>

                    </AlertDialog>

                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>



                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(rowUser._id)}
                            >
                                Copy User ID
                            </DropdownMenuItem>



                            {user.userRole == "President" &&
                                (
                                    <>

                                        {rowUser.stat == "Unarchived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setShowEditDialog(true)}> Edit User </DropdownMenuItem>
                                            )
                                        }

                                        {rowUser.stat == "Unarchived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setArchive()}> Archive User </DropdownMenuItem>
                                            )
                                        }

                                        {rowUser.stat == "Archived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setUnarchive()}> Unarchive User </DropdownMenuItem>
                                            )
                                        }

                                        <DropdownMenuSeparator />

                                        <DropdownMenuItem className="text-destructive" onSelect={() => setShowDeleteDialog(true)}> Delete User </DropdownMenuItem>
                                    </>
                                )
                            }

                            {user.userRole != "President" && (rowuser.userRole == "Unit Owner" && user.userRole == "Admin") &&
                                (
                                    <>
                                    
                                        {rowUser.stat == "Unarchived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setShowEditDialog(true)}> Edit User </DropdownMenuItem>
                                            )
                                        }

                                        {rowUser.stat == "Unarchived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setArchive()}> Archive User </DropdownMenuItem>
                                            )
                                        }

                                        {rowUser.stat == "Archived" &&
                                            (
                                                <DropdownMenuItem onSelect={() => setUnarchive()}> Unarchive User </DropdownMenuItem>
                                            )
                                        }
                                        
                                    </>
                                )
                            }

                        </DropdownMenuContent>

                    </DropdownMenu>

                </>

            )
        },

    },



]
