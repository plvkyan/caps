"use client";



// Imports

// Lucide React Icons Imports
import {
    ArchiveX,
    CalendarRange,
    Share,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { toast } from "sonner";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";



// Custom Component Imports
// Custom Data Table Pagination Import
import { BottomDataTablePagination } from "@/components/custom/BottomDataTablePagination";

// Custom Data Table Faceted Filter
// import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";

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
// React Import
import {
    useState
} from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";
// import { unarchiveManyAmenities } from "@/data/amenity-api";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
// import { BILL_STATUSES } from "@/types/bill-type";
import { unarchiveMultipleBills } from "@/data/bills-api";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useAuthContext } from "@/hooks/useAuthContext";
import { DataTableFacetedFilter } from "@/components/custom/DataTableFacetedFilter";
import { BILL_STATUS_ADMIN_OPTIONS } from "@/data/bill-status-admin-options";
import { BILL_TYPE_OPTIONS } from "@/data/bill-type-options";
import { BILL_STATUS_UNIT_OWNER_OPTIONS } from "@/data/bill-status-unit-owner-options";



// Types






interface BillData {
    _id: string;
}

interface ArchiveBillTableProps<TData extends BillData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}



// const EQUIPMENT = {
//     id: 1,
//     value: "Equipment",
//     label: "Equipment",
// }

// const FACILITY = {
//     id: 2,
//     value: "Facility",
//     label: "Facility",
// }
// const AMENITY_DATA = [
//     EQUIPMENT,
//     FACILITY
// ];





export default function ArchiveBillTable<TData extends BillData, TValue>({
    columns,
    data,
}: ArchiveBillTableProps<TData, TValue>) {



    // Hooks
    const { user } = useAuthContext();

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

    const [loading, setLoading] = useState<boolean>(false);

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



    // Functions
    // Handle Archive Button Function
    const handleUnarchiveButton = async () => {
        try {
            setLoading(true)
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as BillData)._id);
            const response = await unarchiveMultipleBills(selectedRowIds);

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                sessionStorage.setItem("billUnarchiveSuccessful", "true");
                window.location.reload();
            } else {
                throw new Error("Error unarchiving bills");
            }
        } catch (error) {
            toast.error((error as Error).message, { closeButton: true });
        } finally {
            setLoading(false);
        }
    };

    // Redirect to Amenity Details Function
    const navToAmenityDetails = (id: String) => {
        const amenityDetailsPath = "/amenities/" + id;
        navigate(amenityDetailsPath);
    }



    return (

        <>

            <div className="flex items-center justify-between">

                <div className="flex flex-col">
                    <h1 className="font-medium"> Archived bills </h1>
                    <p className="text-sm text-muted-foreground"> Bills inaccessible from unit owners. </p>
                </div>

                <div className="flex gap-2">

                    <Button
                        variant="outline"
                    // onClick={() => setShowExportDialog(true)}
                    >
                        <Share className="h-7 w-7" />
                        Export
                    </Button>

                    <Button
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onClick={() => handleUnarchiveButton()}
                        variant="outline"
                    >
                        {loading ? <LoadingSpinner className="h-4 w-4" /> : <ArchiveX className="h-4 w-4" />}
                        Unarchive
                    </Button>

                </div>

            </div>

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
                                : "Due date range"}
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

                <DataTableFacetedFilter column={table.getColumn("billStatus")} title="Status" options={user.userRole === "Admin" && user.userPosition !== "Unit Owner" ? BILL_STATUS_ADMIN_OPTIONS : BILL_STATUS_UNIT_OWNER_OPTIONS} />
                <DataTableFacetedFilter column={table.getColumn("billType")} title="Type" options={BILL_TYPE_OPTIONS} />
                {/* <DataTableFacetedFilter column={table.getColumn("billStatus")} title="Type" options={BILL_STATUSES} /> */}

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

                                    if (header.id === "_id") {
                                        return;
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

                                        if (cell.column.id === "_id") {
                                            return;
                                        }

                                        if (cell.column.id === "select") {
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
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

        </>



    )

}




