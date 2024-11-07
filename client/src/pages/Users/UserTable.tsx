"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CirclePlus,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
// shadcn Input Component Import
import { Input } from "@/components/ui/input";
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
// React Import
import { useState } from "react";
// React Router Imports
// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
import { toast } from "sonner";
import { bulkArchiveUsers } from "@/data/user-api";
import { STATUS_FILTER_OPTIONS } from "@/types/user-type";
import { useAuthContext } from "@/hooks/useAuthContext";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";






interface UserTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export default function UserTable<TData, TValue>({
    columns,
    data,
}: UserTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();
    // useAuthContext hook for user account
    const { user } = useAuthContext();



    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});



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
    // Archive selected users function
    const handleArchiveButton = async () => {
        if (!user?._id) {
            toast.error("You must be logged in to archive users", { closeButton: true });
            return;
        }
        
        setLoading(true);
        
        try {
            const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as any)._id);
            const response = await bulkArchiveUsers(user._id, selectedRowIds);
            const data = await response.json();

            if (!response.ok) {
                const errorMessages: Record<number, string> = {
                    400: data.error === 'Some users are already archived' 
                        ? "Some selected users are already archived"
                        : data.error === 'Invalid or empty user IDs array'
                        ? "Invalid selection of users"
                        : data.error,
                    404: "No users were archived",
                    500: "Server error occurred while archiving users"
                };

                throw new Error(errorMessages[response.status] || "Error archiving users");
            }

            sessionStorage.setItem("archiveSuccessful", data.message);
            window.location.reload();
            
        } catch (error) {
            toast.error((error as Error).message, { closeButton: true });
        } finally {
            setLoading(false);
        }
    };

    // Navigate functions
    // Navigate to a user's details page
    const navToUserDetails = (id: String) => {
        navigate("/users/" + id);
    }

    // Navigate to new user form page
    const navToUserForm = () => {
        const userFormPath = "/users/create";
        navigate(userFormPath);
    }

    // Navigate to new bulk users page
    const navToBulkUser = () => {
        const bulkUserFormPath = "/users/bulk-create";
        navigate(bulkUserFormPath);
    }



    return (

        <>

            <div className="flex justify-between">

                <div className="flex flex-col">
                    <h1 className="font-semibold text-2xl"> Users </h1>
                    <h3 className="font-light text-muted-foreground"> Display all users of the system. </h3>
                </div>

                <div className="flex items-end gap-2">

                    <Button
                        disabled={!table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
                        onClick={() => handleArchiveButton()}
                        size="sm"
                        variant="outline"
                    >
                    {loading ? <LoadingSpinner className="h-4 w-4" /> : <Archive className="h-4 w-4" />}
                        Archive
                    </Button>

                    <Button
                        className=""
                        onClick={navToBulkUser}
                        size="sm"
                        variant="outline"
                    >
                        <CirclePlus className="h-4 w-4" />
                        Bulk Create Users
                    </Button>

                    <Button
                        className=""
                        onClick={navToUserForm}
                        size="sm"
                        variant="default"
                    >
                        <CirclePlus className="h-4 w-4" />
                        Create User
                    </Button>

                </div>

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                <DataTableViewOptions table={table} label="Toggle Columns" />

                <DataTableFacetedFilter column={table.getColumn("userStatus")} title="Filter" options={STATUS_FILTER_OPTIONS} />

                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="items-center"
                    >
                        <X className="h-4 w-4" />
                        Reset
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
                                            } else return (
                                                <TableCell
                                                    className="cursor-pointer"
                                                    key={cell.id}
                                                    onClick={() => navToUserDetails((row.original as any)._id)}
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
                                    No users found.
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




