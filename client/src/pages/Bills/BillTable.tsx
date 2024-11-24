"use client";



// Imports

// Lucide React Icons Imports
import {
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

// import JSZip from "jszip";

import { saveAs } from "file-saver";

// React Import
import { useEffect, useState } from "react";

// React Router Navigate Hook Import
import { useNavigate } from "react-router-dom";

import { Workbook } from "exceljs";



// Types
import { DateRange } from "react-day-picker";
import { useAuthContext } from "@/hooks/useAuthContext";
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";
import { BillType } from "@/types/bill-type";





interface BillData {
    _id: string;
}

interface BillTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}





export default function BillTable<TData extends BillData, TValue>({
    columns,
    data,
}: BillTableProps<TData, TValue>) {



    // Hooks
    // useNavigate Hook
    const navigate = useNavigate();
    // useAuthContext Hook
    const { user } = useAuthContext();

    const PHPesos = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
    });


    // States
    // Column Visibility State
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    // Global Filter State
    const [globalFilter, setGlobalFilter] = useState<any>("");
    // Sorting State
    const [sorting, setSorting] = useState<SortingState>([]);
    // Selected Rows State
    const [rowSelection, setRowSelection] = useState({});
    // Loading State
    const [loading, setLoading] = useState(false);

    // Custom States
    // Date Range State
    const [date, setDate] = useState<DateRange | undefined>({ from: undefined, to: undefined })

    // Show export states
    const [showExportDialog, setShowExportDialog] = useState(false);
    const [includeBillBasicInfo, setIncludeBasicInfo] = useState(true);
    const [showBillOptions, setShowBillOptions] = useState(false);
    const [includePayorInfo, setIncludePayorInfo] = useState(true);
    const [showPayorOptions, setShowPayorOptions] = useState(false);
    const [includeBillPresetInfo, setIncludeBillPresetInfo] = useState(true);
    // const [showBillPresetOptions, setShowBillPresetOptions] = useState(false);

    const [exportDueDateRange, setExportDueDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportCreationDateRange, setExportCreationDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportBillPaidDateRange, setExportBillPaidDateRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });
    const [exportBillStatus, setBillExportStatus] = useState<String[]>(["Pending", "Paid", "Overdue"]);
    const [exportBillVisibility, setBillExportVisibility] = useState<String>("Unarchived");
    const [exportBillType, setBillExportType] = useState<String>("All");



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
    // Helper functions for export
    // const getWorkbookConfig = (user: any) => ({
    //     creator: user.userBlkLt,
    //     lastModifiedBy: user.userBlkLt,
    //     created: new Date(),
    //     modified: new Date(),
    // });

    // const getBillColumns = () => [
    //     { header: "Bill ID", key: "_id", width: 25 },
    //     { header: "Bill Title", key: "billTitle", width: 40 },
    //     { header: "Bill Type", key: "billType", width: 20 },
    //     { header: "Bill Due Date", key: "billDueDate", width: 20 },
    //     { header: "Bill Amount", key: "billAmount", width: 20 },
    //     { header: "Bill Recurring Date", key: "billRecurringDate", width: 20 },
    //     { header: "Bill Description", key: "billDescription", width: 70 },
    //     { header: "Bill Creator ID", key: "billCreatorId", width: 20 },
    //     { header: "Bill Creator", key: "billCreatorBlkLt", width: 20 },
    //     { header: "Bill Creator Position", key: "billCreatorPosition", width: 20 },
    //     { header: "Bill Visibility", key: "billVisibility", width: 20 },
    //     { header: "Created At", key: "createdAt", width: 20 },
    // ]

    // const filterBills = (bills: any[], exportOptions: any) => {

    //     return bills.filter(bill => {
            
    //     })
    // }

    // const handleExport = async (type: String) => {
    //     setLoading(true);

    //     try {
    //         if (!data) throw new Error('Bill data not available');
    //         if (!includeBillBasicInfo && !includePayorInfo && !includeBillPresetInfo) {
    //             throw new Error('Please select at least one information to include in the export');
    //         }

    //         const bills: BillType[] = data as any;
    //         const wb = new Workbook();
    //         Object.assign(wb, getWorkbookConfig(user));

    //         const exportOptions = {
    //             dueDateRange: exportDueDateRange,
    //             creationDateRange: exportCreationDateRange,
    //             paidDateRange: exportBillPaidDateRange,
    //             status: exportBillStatus,
    //             visibility: exportBillVisibility,
    //             type: exportBillType,
    //         }

    //         if (type === "excel") {
    //             await handleExcelExport(wb, bills, exportOptions);
    //         } else if (type === "csv") {
    //             // await handleCsvExport(wb, bills, exportOptions);
    //         }

    //     } catch (error) {
    //         toast.error(error instanceof Error ? error.message : 'Failed to export data');
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // const handleExcelExport = async (wb: Workbook, bills: BillType[], exportOptions: any) => {
    //     const ws = wb.addWorksheet("Bills - " + format(new Date(), "MMM d, yyyy"));
    //     ws.columns = getBillColumns();

    //     const filteredBills = filterBills(bills, exportOptions);

    //     filteredBills.forEach(bill => {
    //         ws.addRow({
    //             _id: bill._id,
    //             billTitle: bill.billTitle,
    //             billType: bill.billType,
    //             billDueDate: format(new Date(bill.billDueDate), "MMM d, yyyy"),
    //             billAmount: PHPesos.format(bill.billAmount),
    //             billRecurringDate: bill.billRecurringDate ? bill.billRecurringDate : "N/A",
    //             billDescription: bill.billDescription,
    //             billCreatorId: bill.billCreatorId,
    //             billCreatorBlkLt: bill.billCreatorBlkLt,
    //             billCreatorPosition: bill.billCreatorPosition,
    //             billVisibility: bill.billVisibility,
    //             createdAt: format(new Date(bill.createdAt), "MMM d, yyyy"),
    //         })
    //     });

    //     const buffer = await wb.xlsx.writeBuffer();
    //     saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Bills - " + format(new Date(), "MMM d, yyyy") + ".xlsx");
    // }

    // const addBillRow = (ws: any, bill: BillType) => {
    //     ws.addRow({
    //         _id: bill._id,
    //         billTitle: bill.billTitle,
    //         billType: bill.billType,
    //         billDueDate: format(new Date(bill.billDueDate), "MMM d, yyyy"),
    //         billAmount: PHPesos.format(bill.billAmount),
    //         billRecurringDate: bill.billRecurringDate ? bill.billRecurringDate : "N/A",
    //         billDescription: bill.billDescription,
    //         billCreatorId: bill.billCreatorId,
    //         billCreatorBlkLt: bill.billCreatorBlkLt,
    //         billCreatorPosition: bill.billCreatorPosition,
    //         billVisibility: bill.billVisibility,
    //         createdAt: format(new Date(bill.createdAt), "MMM d, yyyy"),
    //     })
    // }

    const handleExportz = async (type: String) => {
        setLoading(true);

        try {

            if (!data) throw new Error('Bill data not available');

            if (!includeBillBasicInfo && !includePayorInfo && !includeBillPresetInfo) {
                toast.error('Please select at least one information to include in the export');
            }

            const bills: BillType[] = data as any;

            const wb = new Workbook();

            wb.creator = user.userBlkLt;
            wb.lastModifiedBy = user.userBlkLt;
            wb.created = new Date();
            wb.modified = new Date();

            if (type ==="excel" && includeBillBasicInfo) {
                
                const ws = wb.addWorksheet("Bills - " + format(new Date(), "MMM d, yyyy"));

                // Filter bills based on export options
                // Then apply all other filters
                const filteredBills = bills.filter(bill => {
                    const billDueDate = new Date(bill.billDueDate);
                    const createdAt = new Date(bill.createdAt);

                    // Date range filters
                    const matchesReservationDate = !exportDueDateRange?.from || !exportDueDateRange?.to ||
                        (billDueDate >= exportDueDateRange.from && billDueDate <= exportDueDateRange.to);

                    const matchesCreatedDate = !exportCreationDateRange?.from || !exportCreationDateRange?.to ||
                        (createdAt >= exportCreationDateRange.from && createdAt <= exportCreationDateRange.to);

                    // Visibility filter
                    const matchesVisibility = exportBillVisibility === "All" ? true :
                        exportBillVisibility === "Unarchived" ? bill.billVisibility === "Unarchived" :
                            exportBillVisibility === "Archived" ? bill.billVisibility === "Archived" : false;

                    // Bill type filter
                    const matchesType = exportBillType === "All" ? true :
                        exportBillType === "One-time" ? bill.billType === "One-time" :
                            exportBillType === "Recurring" ? bill.billType === "Recurring" : false;

                    // Filter payors based on status and paid date
                    bill.billPayors = bill.billPayors.filter(payor => {
                        // Check if payor status matches selected statuses
                        const matchesStatus = exportBillStatus.includes(payor.billStatus);

                        // Check if paid date is within range (only for paid bills)
                        const payorPaidDate = payor.billPaidDate ? new Date(payor.billPaidDate) : null;
                        const matchesPaidDate = !exportBillPaidDateRange?.from || !exportBillPaidDateRange?.to ||
                            !payorPaidDate || // Include unpaid bills
                            (payorPaidDate >= exportBillPaidDateRange.from && payorPaidDate <= exportBillPaidDateRange.to);

                        return matchesStatus && matchesPaidDate;
                    });

                    // Only include bills that still have payors after filtering
                    return matchesReservationDate && matchesCreatedDate &&
                        matchesVisibility && matchesType && bill.billPayors.length > 0;
                });

                ws.columns = [
                    { header: "Bill ID", key: "_id", width: 25 },
                    { header: "Bill Title", key: "billTitle", width: 40 },
                    { header: "Bill Type", key: "billType", width: 20 },
                    { header: "Bill Due Date", key: "billDueDate", width: 20 },
                    { header: "Bill Amount", key: "billAmount", width: 20 },
                    { header: "Bill Recurring Date", key: "billRecurringDate", width: 20 },
                    { header: "Bill Description", key: "billDescription", width: 70 },
                    { header: "Bill Creator ID", key: "billCreatorId", width: 20 },
                    { header: "Bill Creator", key: "billCreatorBlkLt", width: 20 },
                    { header: "Bill Creator Position", key: "billCreatorPosition", width: 20 },
                    { header: "Bill Visibility", key: "billVisibility", width: 20 },
                    { header: "Created At", key: "createdAt", width: 20 },
                ];
    
                ws.getRow(1).eachCell(cell => {
                    cell.font = { bold: true };
                });
    
                // Add the filtered data
                filteredBills.forEach(bill => {
    
                    ws.addRow({
                        _id: bill._id,
                        billTitle: bill.billTitle,
                        billType: bill.billType,
                        billDueDate: format(new Date(bill.billDueDate), "MMM d, yyyy"),
                        billAmount: PHPesos.format(bill.billAmount),
                        billRecurringDate: bill.billRecurringDate ? bill.billRecurringDate : "N/A",
                        billDescription: bill.billDescription,
                        billCreatorId: bill.billCreatorId,
                        billCreatorBlkLt: bill.billCreatorBlkLt,
                        billCreatorPosition: bill.billCreatorPosition,
                        billVisibility: bill.billVisibility,
                        createdAt: format(new Date(bill.createdAt), "MMM d, yyyy"),
                    })
    
                });

            }







            

            if (type === "excel") {
                const buffer = await wb.xlsx.writeBuffer();
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Bills - " + format(new Date(), "MMM d, yyyy") + ".xlsx");
            }

            if (type === "csv") {
                const buffer = await wb.csv.writeBuffer();
                saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Bills - " + format(new Date(), "MMM d, yyyy") + ".csv");
            }



        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to export data');
        } finally {
            setLoading(false);
        }

    }




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

            <div className="flex flex-col">
                <h1 className="font-semibold text-2xl"> Bills </h1>
                <h3 className="font-light text-muted-foreground"> An overview of all bills and their key details. </h3>
            </div>

            <div className="flex justify-between">

                <div></div>


                {user && user.userRole === "Admin" && (
                    <div className="flex items-end gap-2">

                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowExportDialog(true)}
                        >
                            <Share className="h-7 w-7" />
                            Export
                        </Button>

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

            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>

                <DialogContent className="md:min-w-[70%] max-h-[80%] overflow-scroll">

                    <DialogHeader>
                        <DialogTitle> Export options </DialogTitle>
                        <DialogDescription>
                            Please select the information to include in the export. All are selected by default.
                        </DialogDescription>
                    </DialogHeader>



                    {/* <div
                        className="flex items-center justify-between w-full pl-5 pr-6 py-4 rounded-md bg-muted/40"
                    >
                        <Label className="text-white/90 text-sm"> Bill basic information </Label>
                    </div> */}

                    <Collapsible
                        className="relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        disabled={!includeBillBasicInfo}
                        onOpenChange={setShowBillOptions}
                        open={!includeBillBasicInfo ? false : showBillOptions}
                    >

                        <Checkbox
                            checked={includeBillBasicInfo}
                            onCheckedChange={(checked) => setIncludeBasicInfo(!!checked)}
                            className="absolute top-5 right-6 z-50"
                        />

                        <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                            + (!includeBillBasicInfo ? "text-muted-foreground/50" : "text-white/90")}
                        >

                            <Label className="text-sm cursor-pointer"> Bill basic information </Label>
                            <div className={"flex items-center justify-center h-6 w-6 rounded-md " + (includeBillBasicInfo ? "hover:bg-accent" : null)}>
                                {!showBillOptions || !includeBillBasicInfo ? <ChevronDown className="h-4 w-4" />
                                    : < ChevronUp className="h-4 w-4" />}
                            </div>

                        </CollapsibleTrigger>

                        <CollapsibleContent>

                            <div className="flex flex-wrap gap-y-6 gap-x-16 my-4">

                                {/* Export bill due date range */}
                                <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">

                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                        {/* Export bill due date range header */}
                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                            Included bill due dates
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
                                            Export bills due on these dates:
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
                                                    {exportDueDateRange?.from && exportDueDateRange?.to
                                                        ? `${format(exportDueDateRange.from, "MMM d, yyyy")} - ${format(exportDueDateRange.to, "MMM d, yyyy")}`
                                                        : "All due dates"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={exportDueDateRange?.from}
                                                    selected={exportDueDateRange}
                                                    onSelect={setExportDueDateRange}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    {/* Export bill creation date range */}
                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                        {/* Export bill creation date range header */}
                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                            Included bill creation dates
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
                                            Export bills created on these dates:
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

                                {/* Export reservation visibility */}
                                {user && user.userRole === "Admin" && user.userPosition !== "Unit Owner" && (

                                    <div className="flex-intial w-[200px] flex flex-col gap-1">

                                        {/* Export visibility header */}
                                        <Label className="text-sm text-muted-foreground"> Bill visibility </Label>

                                        {/* Export visibility input */}
                                        <Select
                                            defaultValue="Unarchived"
                                            onValueChange={(value) => setBillExportVisibility(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select visibility of exported bills" />
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

                                )}

                                <div className="flex-intial w-[200px] flex flex-col gap-1">

                                    {/* Export type header */}
                                    <Label className="text-sm text-muted-foreground"> Bill type </Label>

                                    {/* Export type input */}
                                    <Select
                                        defaultValue="All"
                                        onValueChange={(value) => setBillExportType(value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type of exported bills" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="All"> All </SelectItem>
                                                <SelectItem value="One-time"> One-time </SelectItem>
                                                <SelectItem value="Recurring"> Recurring </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>

                            </div>

                        </CollapsibleContent>

                    </Collapsible>

                    <Collapsible
                        className="relative w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:transition-all data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        disabled={!includePayorInfo}
                        onOpenChange={setShowPayorOptions}
                        open={!includePayorInfo ? false : showPayorOptions}
                    >

                        <Checkbox
                            checked={includePayorInfo}
                            onCheckedChange={(checked) => setIncludePayorInfo(!!checked)}
                            className="absolute top-5 right-6 z-50"
                        />

                        <CollapsibleTrigger className={"flex gap-2 items-center w-full "
                            + (!includePayorInfo ? "text-muted-foreground/50" : "text-white/90")}
                        >

                            <Label className="text-sm cursor-pointer"> Bill payors information </Label>
                            <div className={"flex items-center justify-center h-6 w-6 rounded-md " + (includePayorInfo ? "hover:bg-accent" : null)}>
                                {!showPayorOptions || !includePayorInfo ? <ChevronDown className="h-4 w-4" />
                                    : < ChevronUp className="h-4 w-4" />}
                            </div>

                        </CollapsibleTrigger>

                        <CollapsibleContent>

                            <div className="flex flex-wrap gap-y-6 gap-x-16 my-4">

                                {/* Export paid date range */}
                                <div className="flex flex-wrap gap-y-6 gap-x-16 w-full">
                                    <div className="flex-intial min-w-[250px] flex flex-col">

                                        {/* Export paid date range header */}
                                        <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                                            Included paid dates
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                            <Info className="w-4 h-4" />
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p> Include all dates by default. </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </Label>

                                        <p className="font-light text-sm text-muted-foreground pb-1.5">
                                            Export payors paid on these dates:
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
                                                    {exportBillPaidDateRange?.from && exportBillPaidDateRange?.to
                                                        ? `${format(exportBillPaidDateRange.from, "MMM d, yyyy")} - ${format(exportBillPaidDateRange.to, "MMM d, yyyy")}`
                                                        : "All paid dates"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-fit">
                                                <Calendar
                                                    initialFocus
                                                    mode="range"
                                                    defaultMonth={exportBillPaidDateRange?.from}
                                                    selected={exportBillPaidDateRange}
                                                    onSelect={setExportBillPaidDateRange}
                                                    numberOfMonths={2}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 pt-1 pb-4">

                                    <Label className="text-sm text-muted-foreground"> Payor Status </Label>

                                    <div className="flex flex-row flex-wrap gap-12">

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportBillStatus.length === 3}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setBillExportStatus([
                                                            'Pending',
                                                            'Paid',
                                                            'Overdue',
                                                        ]);
                                                    } else {
                                                        setBillExportStatus([]);
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> All </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportBillStatus.includes('Pending')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setBillExportStatus([...exportBillStatus, 'Pending']);
                                                    } else {
                                                        setBillExportStatus(exportBillStatus.filter(status => status !== 'Pending'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Pending </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportBillStatus.includes('Paid')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setBillExportStatus([...exportBillStatus, 'Paid']);
                                                    } else {
                                                        setBillExportStatus(exportBillStatus.filter(status => status !== 'Paid'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Paid </Label>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Checkbox
                                                checked={exportBillStatus.includes('Overdue')}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setBillExportStatus([...exportBillStatus, 'Overdue']);
                                                    } else {
                                                        setBillExportStatus(exportBillStatus.filter(status => status !== 'Overdue'));
                                                    }
                                                }}
                                            />
                                            <Label className="text-sm"> Overdue </Label>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </CollapsibleContent>

                    </Collapsible>

                    <div
                        className={"flex items-center justify-between w-full pl-5 pr-6 py-4 rounded-md bg-muted/40 cursor-pointer " + (!includeBillPresetInfo ? "text-muted-foreground/50" : "text-white/90")}
                        onClick={() => setIncludeBillPresetInfo(!includeBillPresetInfo)}
                    >
                        <Label className="text-sm"> Bill presets information </Label>
                        <Checkbox
                            checked={includeBillPresetInfo}
                            onCheckedChange={(checked) => setIncludeBillPresetInfo(!!checked)}
                        />
                    </div>

                    <DialogFooter>

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>

                                <Button
                                    disabled={loading || (!includeBillBasicInfo && !includePayorInfo && !includeBillPresetInfo)}
                                    size="sm"
                                >
                                    {loading ? <LoadingSpinner className="h-7 w-7" /> : <Download className="h-7 w-7" />}
                                    Download
                                    <ChevronDown className="h-7 w-7" />
                                </Button>

                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="center" className="mt-1">
                                <DropdownMenuItem
                                    onClick={() => handleExportz("excel")}
                                >
                                    .xslx
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() => handleExportz("csv")}
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




