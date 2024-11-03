


// Imports
// Lucide Icons Imports
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";



// shadcn Component Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button"
// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



// Data table Imports
import { Table } from "@tanstack/react-table";




interface TopDataTablePaginationProps<TData> {
    table: Table<TData>
}





export function TopDataTablePagination<TData>({
    table
}: TopDataTablePaginationProps<TData>) {





    return (

        <div className="flex items-center justify-between px-2">

            <div className="flex items-center space-x-6 lg:space-x-8">

                <div className="flex items-center space-x-2">

                    <p className="text-sm font-medium">
                        Rows per page
                    </p>

                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value) => {
                            table.setPageSize(Number(value))
                        }}
                    >

                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={table.getState().pagination.pageSize} />
                        </SelectTrigger>

                        <SelectContent side="top">
                            {[10, 25, 50, 100].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>

                    </Select>

                </div>

                <div className="flex items-center space-x-2">

                    <Button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.setPageIndex(0)}
                        variant="outline"
                    >
                        <span className="sr-only"> Go to first page </span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        className="h-8 w-8 p-0"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                        variant="outline"
                    >
                        <span className="sr-only"> Go to previous page </span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of {" "}
                        {table.getPageCount()}
                    </div>

                    <Button
                        className="h-8 w-8 p-0"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                        variant="outline"
                    >
                        <span className="sr-only"> Go to next page </span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        variant="outline"
                    >
                        <span className="sr-only"> Go to last page </span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>

                </div>

            </div>

        </div >

    )
}