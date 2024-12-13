"use client";



// Imports

// Lucide React Icons Imports
import {
    CalendarRange,
    X,
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";

// Custom Component Imports
// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";

// Custom Data Table Faceted Filter
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";

// Custom Data Table View Options
import { DataTableViewOptions } from "@/components/custom/DataTableViewOptions";



// Data table Imports
// Data table column definitions imports
import {
    ColumnDef,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";



// Utility Imports
// date-fns format Import
import { format } from "date-fns";



// React Import
import {
    useEffect,
    useState
} from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";



// Types






interface AmenityData {
    _id: string;
}

interface UserAmenityTableProps<TData extends AmenityData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



const EQUIPMENT = {
    id: 1,
    value: "Equipment",
    label: "Equipment",
}

const FACILITY = {
    id: 2,
    value: "Facility",
    label: "Facility",
}
const AMENITY_DATA = [
    EQUIPMENT,
    FACILITY
];





export default function UserAmenityTable<TData extends AmenityData, TValue>({
    columns,
    data,
}: UserAmenityTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();



    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});

    // Custom States
    // Date Range State
    const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined })



    // React Table
    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            globalFilter,
            sorting,
            rowSelection,
        },
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        globalFilterFn: 'includesString',
    });

    // Check filtered State
    const isFiltered = table.getState().columnFilters.length > 0;



    useEffect(() => {
        if (sessionStorage.getItem("amenityArchiveSuccessful")) {
            toast.success("Amenities archived successfully", { closeButton: true, duration: 10000 });
            sessionStorage.removeItem("amenityArchiveSuccessful");
        }
    }, []);

    // Update the table filter when date range changes
    useEffect(() => {

        if (date?.from && date?.to) {
            table.getColumn('createdAt')?.setFilterValue({
                from: date.from,
                to: date.to,
            });
        } else {
            table.getColumn('createdAt')?.setFilterValue(undefined);
        }

    }, [date, table]);


    // Functions
    // Redirect to Amenity Details Function
    const navToAmenityDetails = (id: String) => {
        const amenityDetailsPath = "/amenities/" + id;
        navigate(amenityDetailsPath);
    }





    return (

        <div className="flex flex-col gap-4">

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            className="font-normal"
                            id="date"
                            variant="outline"
                        >
                            <CalendarRange className="mr-2 h-4 w-4" />
                            {date?.from && date?.to && isFiltered
                                ? `${format(date.from, "MMM d, yyyy")} - ${format(date.to, "MMM d, yyyy")}`
                                : "Creation date range"}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-fit">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <DataTableViewOptions table={table} label="Toggle" />
                <DataTableFacetedFilter column={table.getColumn("amenityType")} title="Type" options={AMENITY_DATA} />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="items-center"
                    >
                        <X className="h-4 w-4" />
                        Reset Filters
                    </Button>
                )}

            </div>



            <div className="rounded-md border">

                <Table className="bg-card">

                    <TableHeader>

                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {

                                    if (header.id === "select") {
                                        return null;
                                    }
                                    
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}

                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {

                                        if (cell.column.id === "select") {
                                            return null;
                                        } else return (
                                            <TableCell
                                                className="cursor-pointer"
                                                key={cell.id}
                                                onClick={() => navToAmenityDetails(row.original._id)}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )

                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No amenities found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                </Table>

            </div>

            <BottomDataTablePagination table={table} />

        </ div>



    )

}




