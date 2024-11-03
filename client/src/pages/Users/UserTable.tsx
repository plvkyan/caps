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
import { useEffect, useState } from "react";
// React Router Imports
// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";



// Types
import { toast } from "sonner";
import { useAuthContext } from "@/hooks/useAuthContext";
import { getAllUsers } from "@/data/user-api";
import { STATUS_FILTER_OPTIONS } from "@/types/user-type";






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



    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});
    // Users State
    const [users, setUsers] = useState([]);



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



    // onClick Functions
    // Handle Archive Button Function
    // const handleArchiveButton = async () => {
    //     try {
    //         const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as any)._id);
    //         const response = await archiveManyReservations(selectedRowIds);

    //         if (response.ok) {
    //             sessionStorage.setItem("archiveSuccessful", "true");
    //             window.location.reload();
    //         } else {
    //             throw new Error("Error archiving reservations");
    //         }
    //     } catch (error) {
    //         toast.error((error as Error).message, { closeButton: true });
    //     }
    // };

    


    useEffect(() => {

        // const intervalId = setInterval(() => {
        //     console.log("Is some page rows selected:", table.getIsSomePageRowsSelected());
        //     console.log("Selected rows:", table.getSelectedRowModel().rows);
        // }, 1000000);

        // return () => clearInterval(intervalId);

    })

    useEffect(() => {

        if (sessionStorage.getItem("archiveSuccessful")) {
            toast.success("User archived successfully.", { closeButton: true });
            sessionStorage.removeItem("archiveSuccessful");
        }

        async function fetchUnarchivedUsers() {
            try {
                const fetchFunction = getAllUsers;
                const result = await fetchFunction();
                const data = await result.json();

                if (!ignore) {
                    if (result.ok) {
                        toast.success("All users fetched successfully.", { closeButton: true });
                        setUsers(data);
                    } else {
                        toast.error("Error fetching users.", { closeButton: true });
                    }
                }
            } catch (error) {
                if (!ignore) {
                    toast.error("Error fetching reservations.", { closeButton: true });
                }
            }
        }

        let ignore = false;
        fetchUnarchivedUsers();
        return () => {
            ignore = true;
        };
    }, [])

    const navToUserDetails = (id: String) => {
        navigate("/users/" + id);
    }

    // Redirect to Reservation Form Function
    const navToUserForm = () => {
        const userFormPath = "/users/create";
        navigate(userFormPath);
    }

    // Redirect to Reservation Form Function
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
                        // onClick={() => handleArchiveButton()}
                        size="sm"
                        variant="outline"
                    >
                        <Archive className="h-4 w-4" />
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




