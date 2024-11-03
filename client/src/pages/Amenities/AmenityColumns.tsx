"use client";



// Imports
// Lucide React Icons Imports



// shadcn Components Imports
// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge";
// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";
// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";


// Custom Components Imports
// Custom Data Table Column Header Import
import { DataTableColumnHeader } from "@/components/custom/DataTableColumnHeader";

// Data table imports
// Data table column definitions imports
import { ColumnDef } from "@tanstack/react-table";



// This type is used to define the shape of our data. 
// You can use a Zod schema here if you want.
// Type definitions are a great way to ensure that your data is always in the shape you expect.
// This can help prevent bugs and make your code easier to understand.
// Type Imports
import { AmenityType } from "@/types/amenity-type";



// Utility imports
// date-fns format function Import
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";





export const AmenityTableColumns: ColumnDef<AmenityType>[] = [
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
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "amenityName",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Name" className="justify-center mr-24" />
            )
        },
        cell: ({ row }) => {

            // States
            // State for rotating index of images for image preview
            const [rotatingIndex, setRotatingIndex] = useState(0);
            // State for current index of images for image preview
            const [currentIndex, setCurrentIndex] = useState(0);

            return (
                <div className="flex items-center gap-4">
                    {row.original.amenityImages.length > 0 ? (
                        <Dialog>
                            <DialogTrigger onClick={() => setRotatingIndex(rotatingIndex)}>
                                <img
                                    src={row.original.amenityImages[0].url}
                                    alt="Amenity"
                                    className="min-w-36 min-h-24 max-w-52 rounded-md object-cover"
                                />
                            </DialogTrigger>

                            <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">

                                <Button
                                    className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                    disabled={row.original.amenityImages.length === 1}
                                    type="button"
                                    onClick={() => {
                                        if (currentIndex === 0) {
                                            setCurrentIndex(row.original.amenityImages.length - 1)
                                        } else {
                                            setCurrentIndex(currentIndex - 1)
                                        }
                                    }}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <Button
                                    className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                    disabled={row.original.amenityImages.length === 1}
                                    type="button"
                                    onClick={() => {
                                        if (currentIndex === row.original.amenityImages.length - 1) {
                                            setCurrentIndex(0)
                                        } else {
                                            setCurrentIndex(currentIndex + 1)
                                        }
                                    }}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>

                                <img
                                    src={row.original.amenityImages[currentIndex].url} className="aspect-video rounded-md object-contain"
                                />

                            </DialogContent>

                        </ Dialog>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 w-52 min-w-36 min-h-24 max-w-52 text-muted-foreground rounded-md">
                            <ImageOff className="w-5 h-5" />
                            <span>No images</span>
                        </div>
                    )}
                    <div className="overflow-hidden">
                        <label className="line-clamp-1">{row.original.amenityName}</label>
                        <p className="line-clamp-2 text-muted-foreground"> {row.original.amenityDescription} </p>
                    </div>
                </div>
            )
        },
        enableHiding: false,
    },
    {
        accessorKey: "amenityType",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Type" />
            )
        },
        cell: ({ row }) => {
            return (
                <span>
                    {row.original.amenityType}
                </span>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "amenityVisibility",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Visibility" />
            )
        },
        cell: ({ row }) => {

            return (
                <div className="font-regular"> {row.original.amenityVisibility} </div>
            )
        }
    },
]