"use client";



// Imports

// Lucide React Icons Imports
import {
    Archive,
    CalendarRange,
    ChevronDown,
    ChevronUp,
    CirclePlus,
    Download,
    Info,
    Share,
    X
} from "lucide-react";



// shadcn Components Imports
// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Calendar Component Import
import { Calendar } from "@/components/ui/calendar"

// shadcn Checkbox Component Import
import { Checkbox } from "@/components/ui/checkbox";

// shadcn Collapsible Component Imports
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn Popover Component Imports
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// shadcn Select Component Imports
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

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

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



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
// date-fns format Function Import
import { format } from "date-fns";

// File Saver Import
import { saveAs } from "file-saver";

// React Import
import { useState } from "react";
// React Router Imports
// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";

// ExcelJS Import
import { Workbook } from "exceljs";



// Types
import { bulkArchiveUsers } from "@/data/user-api";
import { STATUS_FILTER_OPTIONS, UserType } from "@/types/user-type";
import { useAuthContext } from "@/hooks/useAuthContext";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { DateRange } from "react-day-picker";
import { USER_POSITION_OPTIONS } from "@/data/user-position-options";






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

    // Export states
    const [showExportDialog, setShowExportDialog] = useState<boolean>(false);

    const [showUserOptions, setShowUserOptions] = useState<boolean>(true);

    const [exportCreationDateRange, setExportCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });

    const [exportStatus, setExportStatus] = useState<String>("All");

    const [exportVisibility, setExportVisibility] = useState<String>("Unarchived");

    const [exportRole, setExportRole] = useState<String>("All");

    const [exportPosition, setExportPosition] = useState<String[]>(["Unit Owner", "Admin", "Auditor", "Treasurer", "Secretary", "Vice President", "President"]);




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

    const getWorkbookConfig = (user: any) => ({
        creator: user.userBlkLt,
        lastModifiedBy: user.userBlkLt,
        created: new Date(),
        modified: new Date(),
    });

    const getUserColumns = () => [
        { header: "User ID", key: "_id", width: 25 },
        { header: "User Block and Lot", key: "userBlkLt", width: 20 },
        { header: "User Email", key: "userEmail", width: 20 },
        { header: "User Mobile No.", key: "userMobileNo", width: 20 },
        { header: "User Role", key: "userRole", width: 15 },
        { header: "User Position", key: "userPosition", width: 15 },
        { header: "User Status", key: "userStatus", width: 15 },
        { header: "Created At", key: "createdAt", width: 15 },
    ];

    const handleExport = async (type: "excel" | "csv") => {
        setLoading(true);

        try {
            if (!data) throw new Error('User data not available');

            const users = data as any;
            const wb = new Workbook();
            Object.assign(wb, getWorkbookConfig(user));

            const exportOptions = {
                creationDateRange: exportCreationDateRange,
                status: exportStatus,
                visibility: exportVisibility,
                role: exportRole,
                position: exportPosition,
            };

            if (type === "excel") {
                await handleExcelExport(wb, users, exportOptions);
            } else if (type === "csv") {
                await handleCsvExport(wb, users, exportOptions);
            }


        } catch (error) {
            console.log(error)
            toast.error(error instanceof Error ? error.message : 'Failed to export data');
        } finally {
            setLoading(false);
        }
    }
    
    const handleCsvExport = async (wb: Workbook, users: UserType[], exportOptions: any) => {
        const filteredUsers = filterUsers(users, exportOptions);

        const ws = wb.addWorksheet("Users - " + format(new Date(), "MMM d, yyyy"));
        ws.columns = getUserColumns();
        filteredUsers.forEach(user => addUserRow(ws, user));

        const buffer = await wb.csv.writeBuffer();
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Users - " + format(new Date(), "MMM d, yyyy") + ".csv");
    }

    const handleExcelExport = async (wb: Workbook, users: UserType[], exportOptions: any) => {

        const filteredUsers = filterUsers(users, exportOptions);

        const ws = wb.addWorksheet("Users - " + format(new Date(), "MMM d, yyyy"));
        ws.columns = getUserColumns();
        filteredUsers.forEach(user => addUserRow(ws, user));

        const buffer = await wb.xlsx.writeBuffer();
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Users - " + format(new Date(), "MMM d, yyyy") + ".xlsx");
    }

    const filterUsers = (users: UserType[], exportOptions: any) => {
        return users.filter(user => {
            const createdAt = new Date(user.createdAt);

            const matchesCreatedDate = !exportOptions.creationDateRange?.from || !exportOptions.creationDateRange?.to ||
                (createdAt >= exportOptions.creationDateRange.from && createdAt <= exportOptions.creationDateRange.to);

            const matchesStatus = exportOptions.status === "All" ? true :
                user.userStatus === exportOptions.status;

            const matchesVisibility = exportOptions.visibility === "All" ? true :
                user.userVisibility === exportOptions.visibility;

            const matchesRole = exportOptions.role === "All" ? true :
                user.userRole === exportOptions.role;

            const matchesPosition = exportOptions.position.includes(user.userPosition);

            return matchesCreatedDate && matchesStatus && matchesVisibility && matchesRole && matchesPosition;
        })
    }

    const addUserRow = (ws: any, user: UserType) => {
        ws.addRow({
            _id: user._id,
            userBlkLt: user.userBlkLt,
            userEmail: user.userEmail ? user.userEmail : "N/A",
            userMobileNo: user.userMobileNo ? user.userMobileNo : "N/A",
            userRole: user.userRole,
            userPosition: user.userPosition,
            userStatus: user.userStatus,
            createdAt: format(new Date(user.createdAt), "MMM d, yyyy"),
        });
    }

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

            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl"> Users </h1>
                <h3 className="font-light text-muted-foreground"> Display all users of the system. </h3>
            </div>

            <div className="flex justify-between">

                <div>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowExportDialog(true)}
                    >
                        <Share className="h-7 w-7" />
                        Export
                    </Button>
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
                        Bulk create users
                    </Button>

                    <Button
                        className=""
                        onClick={navToUserForm}
                        size="sm"
                        variant="default"
                    >
                        <CirclePlus className="h-4 w-4" />
                        Create user
                    </Button>

                </div>

            </div>

            <div className="flex gap-2">

                <Input
                    value={globalFilter}
                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />

                <DataTableViewOptions table={table} label="Toggle columns" />

                <DataTableFacetedFilter column={table.getColumn("userStatus")} title="Status" options={STATUS_FILTER_OPTIONS} />
                <DataTableFacetedFilter column={table.getColumn("userPosition")} title="Position" options={USER_POSITION_OPTIONS} />

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

            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>

                <DialogContent className="md:min-w-[70%] max-h-[80%] overflow-scroll">

                    <DialogHeader>
                        <DialogTitle> Export options </DialogTitle>
                        <DialogDescription>
                            Please select the information to include in the export. All are selected by default.
                        </DialogDescription>
                    </DialogHeader>

                    <Collapsible
                        className="relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        onOpenChange={setShowUserOptions}
                        open={showUserOptions}
                    >

                        <CollapsibleTrigger className="flex gap-2 items-center w-full text-white/90"
                        >
                            <Label className="text-sm cursor-pointer"> User information </Label>
                            <div className="flex items-center justify-center h-6 w-6 rounded-md">
                                {!showUserOptions ? <ChevronDown className="h-4 w-4" />
                                    : < ChevronUp className="h-4 w-4" />}
                            </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent>

                            <div className="flex flex-wrap gap-y-6 gap-x-16 my-4">

                                <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                    {/* Export user creation date range */}
                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                        {/* Export user creation date range header */}
                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                            Included user creation dates
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                            <Info className="w-4 h-4" />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p> All dates included by default. </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Label>

                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                            Export users created on these dates:
                                        </p>

                                        {/* Date Range Filter Button */}
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    className="justify-start font-normal"
                                                    id="date"
                                                    variant="outline"
                                                >
                                                    <CalendarRange className="mr-2 h-4 w-4 opacity-50" />
                                                    {exportCreationDateRange?.from && exportCreationDateRange?.to
                                                        ? `${format(exportCreationDateRange.from, "MMM d, yyyy")} - ${format(exportCreationDateRange.to, "MMM d, yyyy")}`
                                                        : "All creation dates"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={exportCreationDateRange?.from}
                                                    selected={exportCreationDateRange}
                                                    onSelect={setExportCreationDateRange}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                </div>

                                <div className="flex flex-col gap-4 pt-1 pb-4 w-full">
                                    <Label className="text-sm text-muted-foreground"> User positions </Label>
                                    <div className="flex flex-row flex-wrap gap-12">
                                        {[
                                            { label: 'All', value: 'All', positions: ['Unit Owner', 'Admin', 'Auditor', 'Treasurer', 'Secretary', 'Vice President', 'President'] },
                                            { label: 'Unit Owner', value: 'Unit Owner' },
                                            { label: 'Admin', value: 'Admin' },
                                            { label: 'Auditor', value: 'Auditor' },
                                            { label: 'Treasurer', value: 'Treasurer' },
                                            { label: 'Secretary', value: 'Secretary' },
                                            { label: 'Vice President', value: 'Vice President' },
                                            { label: 'President', value: 'President' },
                                        ].map(({ label, value, positions: statuses }) => (
                                            <div key={value} className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={value === 'All' ? exportPosition.length === 7 : exportPosition.includes(value)}
                                                    onCheckedChange={(checked) => {
                                                        if (value === 'All') {
                                                            setExportPosition(checked ? statuses ?? [] : []);
                                                        } else {
                                                            setExportPosition(checked ? [...exportPosition, value] : exportPosition.filter(status => status !== value));
                                                        }
                                                    }}
                                                />
                                                <Label className="text-sm"> {label} </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Export user visibility */}
                                <div className="flex-intial w-[200px] flex flex-col gap-1">

                                    {/* Export visibility header */}
                                    <Label className="text-sm text-muted-foreground"> User visibility </Label>

                                    {/* Export visibility input */}
                                    <Select
                                        defaultValue="Unarchived"
                                        onValueChange={(value) => setExportVisibility(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select visibility of exported users" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="All"> All </SelectItem>
                                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                                <SelectItem value="Archived"> Archived </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>

                                <div className="flex-intial w-[200px] flex flex-col gap-1">

                                    {/* Export status header */}
                                    <Label className="text-sm text-muted-foreground"> User status </Label>

                                    {/* Export status input */}
                                    <Select
                                        defaultValue="All"
                                        onValueChange={(value) => setExportStatus(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status of exported users" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="All"> All </SelectItem>
                                                <SelectItem value="Outstanding"> Outstanding </SelectItem>
                                                <SelectItem value="Delinquent"> Delinquent </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>

                                <div className="flex-intial w-[200px] flex flex-col gap-1">

                                    {/* Export role header */}
                                    <Label className="text-sm text-muted-foreground"> User role </Label>

                                    {/* Export role input */}
                                    <Select
                                        defaultValue="All"
                                        onValueChange={(value) => setExportRole(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role of exported users" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="All"> All </SelectItem>
                                                <SelectItem value="Admin"> Admin </SelectItem>
                                                <SelectItem value="Unit Owner"> Unit Owner </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>



                            </div>

                        </CollapsibleContent>

                    </Collapsible>

                    <DialogFooter>

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                                <Button
                                    disabled={loading}
                                    size="sm"
                                >
                                    {loading ? <LoadingSpinner className="h-7 w-7" /> : <Download className="h-7 w-7" />}
                                    Download
                                    <ChevronDown className="h-7 w-7" />
                                </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center" className="mt-1">
                                <DropdownMenuItem
                                    onClick={() => handleExport("excel")}
                                >
                                    .xslx
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleExport("csv")}
                                >
                                    .csv
                                </DropdownMenuItem>

                            </DropdownMenuContent>

                        </DropdownMenu>

                    </DialogFooter>

                </DialogContent>

            </Dialog>

        </>



    )

}




