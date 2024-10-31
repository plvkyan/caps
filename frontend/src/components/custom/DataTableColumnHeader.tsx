


// Imports
// Lucide React Icons Imports
import {
    ArrowUpDown,
    ChevronsUpDown,
    EyeOff,
    MoveDown,
    MoveUp,
} from "lucide-react"
import { Column } from "@tanstack/react-table"



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button"
// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



// Utility Imports
// cn Import
import { cn } from "@/lib/utils"





interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
}




export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }





    return (

        <div className={cn("flex items-center space-x-2", className)}>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>

                    <Button
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        size="sm"
                        variant="ghost"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <MoveDown className="h-4 w-4" />
                        ) : column.getIsSorted() === "asc" ? (
                            <MoveUp className="h-4 w-4" />
                        ) : (
                            <ChevronsUpDown className="h-4 w-4" />
                        )}
                    </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">

                    <DropdownMenuItem onClick={() => column.toggleSorting(false)} className={""  + (column.getCanSort() ? "flex" : "hidden")}>
                        <MoveUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => column.toggleSorting(true)} className={""  + (column.getCanSort() ? "flex" : "hidden")}>
                        <MoveDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className={"" + (column.getCanHide() ? "block" : "hidden")}/>

                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)} className={""  + (column.getCanHide() ? "flex" : "hidden")}>
                        <EyeOff className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>

                </DropdownMenuContent>

            </DropdownMenu>

        </div>

    )
}
