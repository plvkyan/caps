


// shadcn Component Imports

// shadcn Dropdown Menu Imports
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



// Other Component Imports

// tanstack React Table Import
import {
    Row
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";





interface DataTableRowActionsProps<TData> {

    row: Row<TData>
    onArchive: (value: TData) => void;
    onEdit: (value: TData) => void;
    onDelete: (value: TData) => void;

}





const DataTableRowActions = <TData,> ( { row, onArchive, onEdit, onDelete }: DataTableRowActionsProps <TData>)  => {

    const payment = row.original


    return (



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

            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)} > Copy payment ID </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}> Edit Payment </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(row.original)}> Archive Payment </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(row.original)}> Archive Payment </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive"> Delete Payment </DropdownMenuItem>



        </DropdownMenuContent>

    </DropdownMenu>



    )

}

export default DataTableRowActions