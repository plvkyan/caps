"use client"



// Imports
// Lucide React Icons Imports
import {
    Eye
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button"

// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



// Data table Imports
import { Table } from "@tanstack/react-table"





interface DataTableViewOptionsProps<TData> {
    table: Table<TData>,
    label: string
}





export function DataTableViewOptions<TData>({
    table,
    label,
}: DataTableViewOptionsProps<TData>) {





    return (

        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button
                    variant="outline"
                    className="hidden lg:flex"
                >
                    <Eye className="h-4 w-4" />
                    { label }
                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="">

                <DropdownMenuLabel> Toggle columns </DropdownMenuLabel>

                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter(
                        (column) =>
                            typeof column.accessorFn !== "undefined" && column.getCanHide()
                    )
                    .map((column) => {

                        if (column.id === "_id") {
                            return null;
                        }

                        if (column.id === "reserveeBlkLt") {
                            return (
                                <DropdownMenuCheckboxItem
                                key={column.id}
                                className="truncate capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                Block and Lot
                            </DropdownMenuCheckboxItem>
                            )
                        }

                        if (column.id === "amenityName") {
                            return (
                                <DropdownMenuCheckboxItem
                                key={column.id}
                                className="truncate capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                Amenity
                            </DropdownMenuCheckboxItem>
                            )
                        }
                
                        if (column.id === "reservationStatus") {
                            return (
                                <DropdownMenuCheckboxItem
                                key={column.id}
                                className="truncate capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                Reservation Status
                            </DropdownMenuCheckboxItem>
                            )
                        }

                        if (column.id === "reservationDate") {
                            return (
                                <DropdownMenuCheckboxItem
                                key={column.id}
                                className="truncate capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                <span className="truncate"> Reservation Date </span>
                            </DropdownMenuCheckboxItem>
                            )
                        }

                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="truncate capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {
                                column.id === "reservationType" ? "Reservation Type" : 
                                column.id === "amenityType" ? "Amenity Type" :
                                column.id === "amenityVisibility" ? "Amenity Visibility" :
                                column.id === "userBlkLt" ? "Block and Lot" :
                                column.id === "userStatus" ? "Membership Status" :
                                column.id === "userRole" ? "Role" :
                                column.id === "userPosition" ? "Position" :
                                column.id === "createdAt" ? "Created At" :
                                column.id === "billTitle" ? "Bill Title" :
                                column.id === "billType" ? "Bill Type" :
                                column.id === "billStatus" ? "Bill Status" :
                                column.id === "billAmount" ? "Bill Amount" :
                                column.id === "billDueDate" ? "Bill Due Date" :
                                column.id
                                }
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>

        </DropdownMenu>
        
    )

}