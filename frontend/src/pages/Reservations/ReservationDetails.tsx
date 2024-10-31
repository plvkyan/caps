


// Imports
// shadcn Components Imports
// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"
// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// shadcn Button Component Import
import { Button } from "@/components/ui/button";
// shadcn NavUser Imports
import { NavUser } from "@/components/nav-user"
// shadcn Separator Imports
import { Separator } from "@/components/ui/separator"
// shadcn Sidebar Imports
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"



// Custom Components Imports
// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Data table imports
// Data table column definitions imports
import { ReservationTableColumns } from "@/pages/Reservations/ReservationColumns";
// Data table component import
import ReservationTable from "@/pages/Reservations/ReservationTable";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// React Imports
import {
    useEffect,
    useState
} from "react"



// Types Imports
// Reservation Type Import
import { ReservationType } from "@/types/reservation-type"



// Data Imports
// All unarchived reservation data Import
import { getSingleReservation, getUnarchivedReservations } from "@/data/reservation-api.ts";
// All user unarchived reservation data Import
import { getUserUnarchivedReservations } from "@/data/reservation-api.ts";
import { useReservationsContext } from "@/hooks/useReservationsContext"
import { Archive, ChevronLeft, CircleCheck, CirclePlus, CircleX } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { format } from "date-fns";





export default function ReservationDetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();



    // States
    // Loading state
    const [loading, setLoading] = useState<boolean>(true);
    // Reservation state
    const [reservation, setReservation] = useState<ReservationType>();
    // Step state
    const [step, setStep] = useState<number>(1);


    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Reservation Details | GCTMS";
        // Set page title effect
    }, []);

    // Fetch reservation details
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const id = new URL(window.location.href).pathname.split('/').pop();
                if (!id) throw new Error("Invalid reservation ID.");

                const response = await getSingleReservation(id);
                if (response.ok) {
                    const data = await response.json();
                    setReservation(data);
                    toast.success("Reservation details fetched successfully.");
                } else {
                    toast.error("Failed to fetch reservation details.");
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
                toast.error("An error occurred while fetching reservation details.");
            }
        };

        fetchReservation();

    }, []);







    return (

        // The sidebar provider - no changes here
        <SidebarProvider>

            {/* The sidebar itself and its contents - there are changes here */}
            <AppSidebar />

            {/* The inset effect - no changes here */}
            <SidebarInset>

                {/* The header provided along with the sidebar */}
                <header className="flex h-16 shrink-0 p-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">

                    {/* Container within the header to organize items */}
                    <div className="w-full flex items-center justify-between gap-2">

                        {/* Container for breadcrumbs and sidebar trigger */}
                        <div className="flex items-center gap-2 p-4">

                            <SidebarTrigger className="" />

                            <Separator orientation="vertical" className="mr-2 h-4" />

                            {/* Page breadcrumbs */}
                            <Breadcrumb>

                                <BreadcrumbList>

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/reservations">
                                            Reservations
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <BreadcrumbSeparator className="hidden md:block" />

                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbPage>
                                            {reservation ? reservation._id : "Reservation Details"}
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>

                                </BreadcrumbList>

                            </Breadcrumb>

                        </div>

                        {/* Account navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            <ThemeToggle />
                            <NavUser />
                        </div>

                    </div>

                </header>



                <main className="flex flex-col gap-4 p-8 pt-4">



                    {/* Page header */}
                    <div className="flex flex-row items-center justify-between gap-4">
                        <div className="flex flex-row items-center gap-4">
                            {/* Return to Amenity List button */}
                            <Button
                                className="h-7 w-7"
                                onClick={() => history.back()}
                                size="icon"
                                title="Back Button"
                                type="button"
                                variant="outline"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only"> Back </span>
                            </Button>

                            {/* Container for the header */}
                            <div className="flex flex-col">
                                {/* Page header */}
                                <h1 className="font-semibold text-2xl"> {reservation ? "Reservation ID: " + reservation._id : "Reservation Details"} </h1>
                                {/* Page header description */}
                                <h3 className="font-normal text-muted-foreground">  </h3>
                                {/* Submit button */}
                            </div>
                        </div>
                    </div>



                    {/* Stepper component */}
                    <div className="flex items-center my-2">
                        {[
                            { step: "Pending", index: 0 },
                            {
                                step: reservation?.reservationStatus?.find(s =>
                                    ["Approved", "Rejected", "Cancelled", "Void"].includes(s.status))?.status || "Awaiting Decision",
                                index: 1
                            },
                            { step: "Ongoing", index: 2 },
                            { step: "Completed", index: 3 },
                            ...(reservation?.reservationType === "Equipment" || reservation?.reservationType === "Equipment and Facility" ? [
                                { step: "For Return", index: 4 },
                                { step: "Returned", index: 5 }
                            ] : [])
                        ].map((item, idx) => {
                            const currentStatus = reservation?.reservationStatus?.[reservation.reservationStatus.length - 1]?.status;
                            const currentStepIndex = [
                                "Pending",
                                "Approved", "Rejected", "Cancelled", "Void",
                                "Ongoing",
                                "Completed",
                                "For Return",
                                "Returned"
                            ].indexOf(currentStatus || "");

                            const getStatusColor = (index: number) => {
                                if (index > currentStepIndex) return "bg-muted-foreground text-muted";
                                if (["Rejected", "Cancelled", "Void"].includes(currentStatus || "")) return "bg-destructive";
                                if (currentStatus === "Pending" || currentStatus === "Ongoing" || currentStatus === "For Return") return "bg-warning text-warning-foreground";
                                return "bg-primary text-primary-foreground";
                            };

                            const stepIndex = [
                                "Pending",
                                "Approved", "Rejected", "Cancelled", "Void", "Awaiting Decision",
                                "Ongoing",
                                "Completed",
                                "For Return",
                                "Returned"
                            ].indexOf(item.step);

                            const color = getStatusColor(stepIndex);

                            return (
                                <React.Fragment key={idx}>
                                    <div className="flex flex-col items-center flex-1">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                                                ${color}`}>
                                            {item.index + 1}
                                        </div>
                                        <div className="mt-2 text-sm text-center flex flex-col items-center">
                                            <span className="">{item.step}</span>
                                            {reservation?.reservationStatus?.find(s => s.status === item.step) && (
                                                <>
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(
                                                            new Date(reservation.reservationStatus.find(s =>
                                                                s.status === item.step)?.statusDate || ""),
                                                            "PPp"
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {reservation.reservationStatus.find(s =>
                                                            s.status === item.step)?.statusAuthor}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {idx < (reservation?.reservationType === "Equipment" || reservation?.reservationType === "Equipment and Facility" ? 5 : 3) && (
                                        <div className={`flex-1 h-1 rounded-full ${color}`}></div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>





                    <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">
                        <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">
                            <Card>
                                <CardContent>

                                </CardContent>
                            </Card>
                        </div>
                        
                        <div className="grid auto-rows-max items-start gap-6 lg:gap-8">
                            <Card>
                                <CardContent>
                                    
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </main>

            </SidebarInset>

        </SidebarProvider >
    )
}