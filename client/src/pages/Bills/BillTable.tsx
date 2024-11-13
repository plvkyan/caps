"use client";



// Imports

// Lucide React Icons Imports
import {
    CalendarRange,
    CirclePlus,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
// date-fns format Function Import
import { format } from "date-fns";

// React Import
import { useEffect, useState } from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
import { toast } from "sonner";
import { DateRange } from "react-day-picker";
import { useAuthContext } from "@/hooks/useAuthContext";





interface BillData {
    _id: string;
}

interface BillTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

// interface GlobalFilter {
//     globalFilter: any;
// }





export default function BillTable<TData extends BillData, TValue>({
    columns,
    data,
}: BillTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();
    // useAuthContext Hook
    const { user } = useAuthContext();


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
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
    })


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



    // Effects
    useEffect(() => {

        if (sessionStorage.getItem("approveSuccessful")) {
            console.log(sessionStorage.getItem("approveSuccessful"));
            toast.success(sessionStorage.getItem("approveSuccesful"), { closeButton: true });
            sessionStorage.removeItem("approveSuccessful");
        }

        if (sessionStorage.getItem("rejectedSuccessful")) {
            toast.success("Reservation rejected successfully", { closeButton: true });
            sessionStorage.removeItem("rejectedSuccessful");
        }

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("Reservation archived successfully", { closeButton: true });
            sessionStorage.removeItem("archiveSuccessful");
        }

    }, []);

    useEffect(() => {


       
    }, [])

    // Update the table filter when date range changes
    useEffect(() => {

        if (date?.from && date?.to) {
            table.getColumn('billDueDate')?.setFilterValue({
                from: date.from,
                to: date.to,
            });
        } else {
            table.getColumn('billDueDate')?.setFilterValue(undefined);
        }
    }, [date, table]);



    // Functions
    // Redirect to Reservation Form Function
    const navToBillForm = () => {
        const billFormPath = "/bills/create";
        navigate(billFormPath);
    }

    const navToBillPresetForm = () => {
        const billPresetPath = "/bills/preset-create";
        navigate(billPresetPath);
    }



    const navToBillDetails = (id: String) => {
        navigate("/bills/" + id);
    }





    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl"> Bills   </h1>
                    <h3 className="font-light text-muted-foreground"> An overview of all bills and their key details. </h3>
                </div>

                    {user && user.userRole === "Admin" && (
                        <div className="flex items-end gap-2">
                         <Button className="" onClick={navToBillPresetForm} size="sm" variant="outline" >
                        <CirclePlus className="h-4 w-4" />
                        Create Bill Preset
                    </Button>

                    <Button className="" onClick={navToBillForm} size="sm" variant="default" >
                        <CirclePlus className="h-4 w-4" />
                        Create Bill
                    </Button>

                        
                        </ div>
                    )}

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                {/* Date Range Filter Button */}
                <div className="flex gap-2">

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
                                    : "Due Date Range"}
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

                    {/* <DataTableFacetedFilter column={table.getColumn("billType")} title="Status" options={RESERVATION_DATA} /> */}

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


            </div>



            <div className="rounded-md border">

                <Table className="bg-card">

                    <TableHeader>

                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {

                                    if (header.id === "_id") {
                                        return null;
                                    }

                                    if (header.id === "billStatus" && user.userRole === "Admin" && user.userPosition !== "Unit Owner") {
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
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => {

                                            if (cell.column.id === "_id") {
                                                return null;
                                            }

                                            if (cell.column.id === "select") {
                                                return (
                                                    <TableCell
                                                        key={cell.id}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                )
                                            }

                                            if (cell.column.id === "billStatus" && user.userRole === "Admin" && user.userPosition !== "Unit Owner") {
                                                return null;
                                            }

                                            return (
                                                <TableCell
                                                    className="cursor-pointer"
                                                    key={cell.id}
                                                    onClick={() => navToBillDetails(row.original._id)}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No bills found.
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




