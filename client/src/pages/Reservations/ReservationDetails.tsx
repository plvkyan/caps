


// Imports
// Lucide Icon Imports
import {
    Archive,
    ArchiveX,
    ChevronLeft,
    ChevronRight,
    CircleCheck,
    CircleX,
    CloudUpload,
    EllipsisVertical,
    ImageOff,
    Info,
    SendHorizontal,
    // Trash2,
    Upload,
    X
} from "lucide-react";

// shadcn Components Imports
// shadcnd Accordion Imports
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";

// shadcn AppSidebar Imports
import { AppSidebar } from "@/components/app-sidebar"

// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge";

// shadcn Breadcrumb Imports
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Components Import
import {
    Card,
    CardContent,
} from "@/components/ui/card";

// shadcn Dialog Imports
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";

// shadcn Dropdown Menu Component Imports
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// shadcn Form Component Imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

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

// shadcn Sonner Import
import { toast } from "sonner";

// shadcn Tooltip Component Import
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



// Custom Components Imports
// Loading Spinner Component Import
import { LoadingSpinner } from "@/components/custom/LoadingSpinner";

// Theme toggle component import
import { ThemeToggle } from "@/components/custom/ThemeToggle";



// Hooks Imports
// Authentication Hook Import
import { useAuthContext } from "@/hooks/useAuthContext";



// Utility Imports
// Date-fns Imports
import { format } from "date-fns";

// React Imports
import {
    useEffect,
    useState
} from "react"

// React Namespace Imports
import React from "react";

// React hook form imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as z from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";



// Types Imports
// Reservation Type Import
import { ReservationType } from "@/types/reservation-type"



// Data Imports
// Reservation API calls Imports
import {
    addCommentToReservation,
    archiveReservation,
    getEquipmentsAvailableStocks,
    getSingleReservation,
    setReservationApproved,
    setReservationCompleted,
    // setReservationForReturn,
    // setReservationOngoing,
    setReservationRejected,
    setReservationReturned,
    unarchiveReservation,
    updateReservationImages,
} from "@/data/reservation-api.ts";

// User API calls Imports
import { getSingleUser } from "@/data/user-api";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";



// Reservation Images Schema 
const reservationImagesSchema = z.object({
    reservationImages: z.any(),
});

// Reservation Comments Schema
const reservationCommentsSchema = z.object({
    commentContent: z.string(),
    commentAuthorId: z.string(),
    commentAuthor: z.string(),
    commentAuthorPosition: z.string(),
});





export default function ReservationDetails() {


    // Contexts
    // Authentication Context
    const { user } = useAuthContext();

    const navigate = useNavigate();


    // Forms
    // Reservation Images Form
    const reservationImagesForm = useForm<z.infer<typeof reservationImagesSchema>>({
        resolver: zodResolver(reservationImagesSchema),
    });

    // Reservation Comments Form
    const reservationCommentsForm = useForm<z.infer<typeof reservationCommentsSchema>>({
        resolver: zodResolver(reservationCommentsSchema),
        defaultValues: {
            commentContent: "",
            commentAuthorId: user._id,
            commentAuthor: user.userBlkLt,
            commentAuthorPosition: user.userPosition,
        }
    });



    // States
    // Available stocks state
    const [availableStocks, setAvailableStocks] = useState<any>();
    // Current image index for image preview
    const [currentIndex, setCurrentIndex] = useState(0);
    // Images state
    const [images, setImages] = useState<any>([]);
    // Loading state
    const [loading, setLoading] = useState<boolean>(false);
    // Reservation state
    const [reservation, setReservation] = useState<ReservationType>();
    // Reservee state
    const [reservee, setReservee] = useState<any>();
    // Rotating index for image preview state
    const [rotatingIndex, setRotatingIndex] = useState(0);



    // Use Effects
    // Page title effect
    useEffect(() => {
        document.title = "Reservation Details | GCTMS";
        // Set page title effect
    }, []);

    // Fetch reservation details
    useEffect(() => {

        if (sessionStorage.getItem("commentAdded")) {
            toast.success("Comment added successfully.");
            sessionStorage.removeItem("commentAdded");
        }

        if (sessionStorage.getItem("reservationApproved")) {
            toast.success("Reservation approved successfully.");
            sessionStorage.removeItem("reservationApproved");
        }

        if (sessionStorage.getItem("reservationRejected")) {
            toast.success("Reservation rejected successfully.");
            sessionStorage.removeItem("reservationRejected");
        }

        if (sessionStorage.getItem("reservationOngoing")) {
            toast.success("Reservation set to ongoing successfully.");
            sessionStorage.removeItem("reservationOngoing");
        }

        if (sessionStorage.getItem("reservationForReturn")) {
            toast.success("Reservation set for return successfully.");
            sessionStorage.removeItem("reservationForReturn");
        }

        if (sessionStorage.getItem("reservationReturned")) {
            toast.success("Reservation returned successfully.");
            sessionStorage.removeItem("reservationReturned");
        }

        if (sessionStorage.getItem("reservationCompleted")) {
            toast.success("Reservation completed successfully.");
            sessionStorage.removeItem("reservationCompleted");
        }

        if (sessionStorage.getItem("reservationImagesUploaded")) {
            toast.success("Reservation images uploaded successfully.");
            sessionStorage.removeItem("reservationImagesUploaded");
        }

        const fetchReservation = async () => {
            try {
                const id = new URL(window.location.href).pathname.split('/').pop();
                if (!id) throw new Error("Invalid reservation ID.");

                const response = await getSingleReservation(id);
                if (response.ok) {
                    const data = await response.json();
                    setReservation(data);
                    setImages(data.reservationImages || []);
                    console.log(data);
                    // toast.success("Reservation details fetched successfully.");
                } else {
                    // toast.error("Failed to fetch reservation details.");
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
                // toast.error("An error occurred while fetching reservation details.");
            }
        };


        fetchReservation();
        console.log(reservee);

    }, []);

    // Fetch reservee details and available stocks based on reservation details
    useEffect(() => {
        const fetchReservee = async () => {
            if (!reservation?.reserveeId) return;

            try {
                const response = await getSingleUser(reservation.reserveeId);
                const data = await response.json();

                console.log(data);
                if (!response.ok) {
                    throw new Error('Failed to fetch reservee details');
                }

                setReservee(data);
                // toast.success("Reservee details fetched successfully");
            } catch (error) {
                console.error("Error fetching reservee:", error);
                toast.error("Failed to fetch reservee details");
            }
        };

        const fetchAvailableStocks = async () => {
            if (!reservation?.reservationAmenities) return;

            const amenityIds = reservation.reservationAmenities.map(amenity => amenity._id);

            try {
                const response = await getEquipmentsAvailableStocks(amenityIds, reservation.reservationDate);
                if (!response.ok) {
                    throw new Error('Failed to fetch available stocks');
                }

                const data = await response.json();
                setAvailableStocks(data);
                // toast.success("Available stocks fetched successfully");
            } catch (error) {
                console.error("Error fetching available stocks:", error);
                toast.error("Failed to fetch available stocks");
            }
        }

        fetchReservee();
        fetchAvailableStocks();

    }, [reservation]);



    // Functions
    // Handle images submit function
    const handleImagesSubmit = async (values: z.infer<typeof reservationImagesSchema>) => {
        try {
            setLoading(true);

            if (images[0] === null || images[0] === undefined) {
                setImages([]);
            }

            // Set the images state value to the images array
            values.reservationImages = images;

            // Post the data to the server
            const response = await updateReservationImages(reservation?._id, images);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error creating new equipment reservation.');
            }

            // Clear the form and reset states
            sessionStorage.setItem("reservationImagesUploaded", "true");
            reservationImagesForm.reset();
            setImages([]);
            window.location.reload();
        } catch (error: any) {
            toast.error("Error creating new equipment amenity.", {
                description: error.message,
                closeButton: true,
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle comments submit function
    const handleCommentsSubmit = async (values: z.infer<typeof reservationCommentsSchema>) => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await addCommentToReservation(reservation._id, values);
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("commentAdded", "true");
                reservationCommentsForm.reset();
                window.location.reload();
            } else {
                throw data;
            }
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to add comment.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    };


    // Handle images function
    const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {

        // Convert the Filelist to an array of files
        const imageFiles = Array.from(e.target.files || []);

        console.log(imageFiles)

        // Check if the total number of images exceeds the limit
        if (images.length + imageFiles.length > 6) {
            return toast.error("The total number of images cannot exceed 6.");
        }

        // Convert each file to base64 and add to the images state
        imageFiles.forEach(file => {
            setFileToBase(file)
        });
    }


    // Handle image file conversion to base64
    const setFileToBase = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImages((prevImages) => [...prevImages, reader.result]);
        }
    }

    // Handle removing images function
    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => {
            const updatedImages = prevImages.filter((_, i) => i !== index);
            if (rotatingIndex >= updatedImages.length) {
                setRotatingIndex(Math.max(0, updatedImages.length = 1));
            }
            return updatedImages;
        })
    };

    const handleApproveReservation = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await setReservationApproved(
                reservation._id,
                user._id,
                user.userBlkLt,
                user.userPosition
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;

            }


            sessionStorage.setItem("reservationApproved", "true");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to approve reservation.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    };

    const handleRejectReservation = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await setReservationRejected(
                reservation._id,
                user.id,
                user.userBlkLt,
                user.userPosition
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("reservationRejected", "true");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to reject reservation.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    };

    // const handleSetReservationOngoing = async () => {
    //     if (!reservation?._id) {
    //         toast.error("Reservation ID not found");
    //         return;
    //     }

    //     try {
    //         const response = await setReservationOngoing(
    //             reservation._id,
    //             user.id,
    //             user.userBlkLt,
    //             user.userPosition
    //         );

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw data;
    //         }

    //         sessionStorage.setItem("reservationOngoing", "true");
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error);
    //         toast.error((error as { error?: string }).error || "Failed to set reservation status to ongoing.", {
    //             closeButton: true,
    //             description: (error as { description?: string }).description || null,
    //         });
    //     }
    // };

    // const handleSetReservationForReturn = async () => {
    //     if (!reservation?._id) {
    //         toast.error("Reservation ID not found");
    //         return;
    //     }

    //     try {
    //         const response = await setReservationForReturn(
    //             reservation._id,
    //             user.id,
    //             user.userBlkLt,
    //             user.userPosition
    //         );

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw data;
    //         }

    //         sessionStorage.setItem("reservationForReturn", "true");
    //         window.location.reload();
    //     } catch (error) {
    //         console.log(error);
    //         toast.error((error as { error?: string }).error || "Failed to set reservation status to for return.", {
    //             closeButton: true,
    //             description: (error as { description?: string }).description || null,
    //         });
    //     }
    // };

    const handleSetReservationReturned = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await setReservationReturned(
                reservation._id,
                user._id,
                user.userBlkLt,
                user.userPosition
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("reservationReturned", "true");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to set reservation status to returned.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    };

    const handleSetReservationCompleted = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await setReservationCompleted(
                reservation._id,
                user.id,
                user.userBlkLt,
                user.userPosition
            );

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("reservationCompleted", "true");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to set reservation status to completed.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    };

    const handleArchive = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await archiveReservation(reservation._id,);

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("archiveSuccessful", "true");
            navigate("/reservations");
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to archive reservation.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    }

    const handleUnarchive = async () => {
        if (!reservation?._id) {
            toast.error("Reservation ID not found");
            return;
        }

        try {
            const response = await unarchiveReservation(reservation._id,);

            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            sessionStorage.setItem("unarchiveSuccessful", "true");
            navigate("/reservations");
        } catch (error) {
            console.log(error);
            toast.error((error as { error?: string }).error || "Failed to unarchive reservation.", {
                closeButton: true,
                description: (error as { description?: string }).description || null,
            });
        }
    }

    // const handleDelete = async () => {
    //     if (!reservation?._id) {
    //         toast.error("Reservation ID not found");
    //         return;
    //     }

    //     try {
    //         const response = await deleteReservation(reservation._id,);

    //         const data = await response.json();

    //         if (!response.ok) {
    //             throw data;
    //         }

    //         sessionStorage.setItem("deleteSuccessful", "true");
    //         navigate("/reservations");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error((error as { error?: string }).error || "Failed to delete reservation.", {
    //             closeButton: true,
    //             description: (error as { description?: string }).description || null,
    //         });
    //     }
    // }


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
Reservation Details
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


                {(reservation && user) ?
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
                            <div className="flex gap-2">

                                {user.userRole === "Admin" && reservation && reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Pending" && (
                                    <>
                                        <Button
                                            onClick={handleRejectReservation}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <CircleX className="h-4 w-4 text-destructive" />
                                            Reject
                                        </Button>
                                        <Button
                                            className="text-primary-foreground"
                                            onClick={handleApproveReservation}
                                            size="sm"
                                            variant="default"
                                        >
                                            <CircleCheck className="h-4 w-4" />
                                            Approve
                                        </Button>
                                    </>
                                )}
                                {/* <Button
                                onClick={handleSetReservationOngoing}
                                size="sm"
                                variant="outline"
                            >
                                <Ellipsis className="h-4 w-4 text-warning" />
                                Ongoing
                            </Button> */}
                                {/* <Button
                                onClick={handleSetReservationForReturn}
                                size="sm"
                                variant="outline"
                            >
                                <Ellipsis className="h-4 w-4 text-warning" />
                                For return
                            </Button> */}

                                {user.userRole === "Admin" && reservation
                                    && reservation.reservationType === "Equipment" && reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "For Return"
                                    && (
                                        <Button
                                            onClick={handleSetReservationReturned}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <CircleCheck className="h-4 w-4 text-primary" />
                                            Returned
                                        </Button>
                                    )}

                                {user.userRole === "Admin" && reservation &&
                                    (reservation.reservationType === "Equipment" && reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Returned")
                                    && (
                                        <Button
                                            onClick={handleSetReservationCompleted}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <CircleCheck className="h-4 w-4 text-primary" />
                                            Completed
                                        </Button>
                                    )}

                                {user.userRole === "Admin" && reservation &&
                                    (reservation.reservationType === "Facility" && reservation.reservationStatus[reservation.reservationStatus.length - 1].status === "Ongoing")
                                    && (
                                        <Button
                                            onClick={handleSetReservationCompleted}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <CircleCheck className="h-4 w-4 text-primary" />
                                            Completed
                                        </Button>
                                    )}

                                {user.userRole === "Admin" && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>

                                            <Button
                                                className="ml-auto h-7 w-7"
                                                size="icon"
                                                variant="outline"
                                            >
                                                <EllipsisVertical className="h-4 w-4" />
                                            </Button>

                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="mt-1">
                                            <DropdownMenuGroup>
                                                {user.userRole === "Admin" && reservation && reservation.reservationVisibility === "Unarchived" && (
                                                    <DropdownMenuItem onClick={handleArchive}>
                                                        <Archive className="h-4 w-4" />
                                                        Archive
                                                    </DropdownMenuItem>
                                                )}

                                                {user.userRole === "Admin" && reservation && reservation.reservationVisibility === "Archived" && (
                                                    <DropdownMenuItem onClick={handleUnarchive}>
                                                        <ArchiveX className="h-4 w-4" />
                                                        Unarchive
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuGroup>

                                            {/* <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive focus:text-red-500" onClick={handleDelete}>
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}

                            </div>


                        </div>



                        {/* Stepper component */}
                        <div className="flex items-center mt-4 mb-2">
                            {[
                                { step: "Pending", index: 0 },
                                {
                                    step: reservation?.reservationStatus?.find(s =>
                                        ["Approved", "Rejected", "Cancelled", "Void"].includes(s.status))?.status || "Awaiting Decision",
                                    index: 1
                                },
                                { step: "Ongoing", index: 2 },
                                ...(reservation?.reservationType === "Equipment" || reservation?.reservationType === "Equipment and Facility" ? [
                                    { step: "For Return", index: 3 },
                                    { step: "Returned", index: 4 }
                                ] : []),
                                { step: "Completed", index: reservation?.reservationType === "Equipment" || reservation?.reservationType === "Equipment and Facility" ? 5 : 3 }
                            ].map((item, idx) => {
                                const currentStatus = reservation?.reservationStatus?.[reservation.reservationStatus.length - 1]?.status;
                                const currentStepIndex = [
                                    "Pending",
                                    "Approved", "Rejected", "Cancelled", "Void",
                                    "Ongoing",
                                    "For Return",
                                    "Returned",
                                    "Completed"
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
                                    "For Return",
                                    "Returned",
                                    "Completed"
                                ].indexOf(item.step);

                                const color = getStatusColor(stepIndex - 1);

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
                                                                "Pp"
                                                            )}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {reservation.reservationStatus.find(s =>
                                                                s.status === item.step)?.statusAuthor},
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {reservation.reservationStatus.find(s =>
                                                                s.status === item.step)?.statusAuthorPosition}
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

                        <div className="flex text-sm bg-gray-700/20 border border-gray-700 text-gray-400 items-center gap-3 rounded-md px-4 py-3.5">
                            <Info className="w-5 h-5" />
                            Please note that having a good track record for both bill payments and reservations will increase your chances of approval.
                        </div>



                        <div className="grid gap-6 md:grid-cols-[1fr_250px] lg:grid-cols-3">

                            <div className="grid auto-rows-max items-start gap-6 lg:col-span-2">



                                <Card>

                                    <CardContent className="flex flex-col gap-2 px-6 py-5">

                                        {/* Header */}
                                        <div>
                                            <Label className="text-lg font-semibold"> Reservation Details </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {user.userRole != "Admin" ? "Check the status of your reservation and any updates related to your request." : "Verify all reservation information before confirming or rejecting the reservation."}
                                            </p>
                                        </div>

                                        {/* Reservee details */}
                                        <div className="flex flex-col p-4 my-3 text-base rounded-md bg-muted/50">
                                            <Label className="text-sm text-muted-foreground font-normal">
                                                Reserved by
                                            </Label>
                                            <div className="flex items-start justify-between">
                                                <span className="flex gap-2 items-center text-sm font-medium">
                                                    {reservation?.reserveeBlkLt}
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <div className="rounded-full w-fit h-fit cursor-pointer text-gray-200/30">
                                                                    <Info className="w-4 h-4" />
                                                                </div>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p> This user is {reservee?.memberStatus}. The color of the badge to the right also represents their status. </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </span>
                                                <Badge> {reservation?.reserveePosition} </Badge>
                                            </div>

                                            <span className="text-sm text-muted-foreground"> {reservation ? format(reservation.createdAt, "PPp") : ""} </span>
                                        </div>

                                        {/* Reservation amenity list */}
                                        <div>
                                            <Label className="text-base"> Reservation amenities </Label>
                                            <p className="text-sm text-muted-foreground">
                                                {user.userRole != "Admin" ? "Review your selections and your reserved amenities' details. Don't forget to read the reminders! " : "Confirm details and availability for each amenity listed below."}
                                            </p>
                                        </div>

                                        <Accordion type="multiple">

                                            {reservation?.reservationAmenities?.map((amenity, index) => (

                                                <AccordionItem value={index.toString()} key={index} className="border-b">

                                                    <div className="flex items-start gap-4 px-4 py-6">

                                                        {/* Image Preview Section */}
                                                        <div className="flex-shrink-0">

                                                            {amenity.amenityImages.length > 0 && amenity.amenityImages[0] != null ? (

                                                                <Dialog onOpenChange={(isOpen) => !isOpen && setCurrentIndex(0)}>

                                                                    <DialogTrigger asChild>
                                                                        <img
                                                                            src={amenity.amenityImages[0].url}
                                                                            alt={amenity.amenityName}
                                                                            className="w-24 h-24 rounded-md object-cover cursor-pointer"
                                                                        />
                                                                    </DialogTrigger>

                                                                    <DialogContent className="p-0 max-w-[80%] min-h-[80%] flex items-center justify-center">

                                                                        {amenity.amenityImages.length > 1 && (
                                                                            <>
                                                                                <Button
                                                                                    className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 shadow-lg"
                                                                                    onClick={() => setCurrentIndex(prev => prev === 0 ? amenity.amenityImages.length - 1 : prev - 1)}
                                                                                    size="icon"
                                                                                    variant="outline"
                                                                                >
                                                                                    <ChevronLeft className="h-4 w-4" />
                                                                                </Button>
                                                                                <Button
                                                                                    className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 shadow-lg"
                                                                                    onClick={() => setCurrentIndex(prev => prev === amenity.amenityImages.length - 1 ? 0 : prev + 1)}
                                                                                    size="icon"
                                                                                    variant="outline"
                                                                                >
                                                                                    <ChevronRight className="h-4 w-4" />
                                                                                </Button>
                                                                            </>
                                                                        )}

                                                                        <img
                                                                            src={amenity.amenityImages[currentIndex]?.url}
                                                                            alt={`${amenity.amenityName} preview`}
                                                                            className="aspect-video rounded-md object-contain"
                                                                        />

                                                                    </DialogContent>
                                                                </Dialog>
                                                            ) : (
                                                                <div className="w-24 h-24 rounded-md bg-muted flex items-center justify-center">
                                                                    <ImageOff className="w-5 h-5 text-muted-foreground" />
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Content Section */}
                                                        <div className="flex-grow overflow-hidden">
                                                            <AccordionTrigger className="py-0 hover:no-underline">
                                                                <div className="flex flex-col justify-between h-24">
                                                                    <Badge variant="secondary" className="w-fit text-sm font-medium">{amenity.amenityType}</Badge>
                                                                    <div className="flex flex-col items-start mr-10">
                                                                        <span className="font-medium text-sm font-medium">{amenity.amenityName}</span>
                                                                        <div className="grid grid-cols-2">
                                                                            <span className={"text-sm text-muted-foreground font-normal text-start overflow-hidden " + (amenity.amenityType === "Facility" ? "col-span-2" : "")}>
                                                                                {amenity.amenityType === "Equipment"
                                                                                    ? `Quantity: ${amenity.amenityQuantity}`
                                                                                    : `${amenity.amenityAddress}`
                                                                                }
                                                                            </span>
                                                                            {reservation?.reservationStatus[reservation?.reservationStatus.length - 1].status === "Pending" && amenity.amenityType === "Equipment" && (
                                                                                <span className="text-sm text-muted-foreground font-normal">
                                                                                    Quantity after approval: {availableStocks?.[index].amenityId === amenity._id ? (availableStocks?.[index].availableStock - amenity.amenityQuantity) : "Not available"}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="flex pb-1.5 items-start">
                                                                {/* Add your accordion content here */}
                                                                <div className="w-full grid grid-cols-3 gap-5 mt-6">
                                                                    <Label className="text-muted-foreground"> Amenity Description </Label>
                                                                    <p className="col-span-2 text-sm">
                                                                        {amenity.amenityDescription}
                                                                    </p>
                                                                    <Label className="text-muted-foreground"> Amenity Reminder </Label>
                                                                    <p className="col-span-2 text-sm">
                                                                        {amenity.amenityReminder}
                                                                    </p>
                                                                </div>
                                                            </AccordionContent>
                                                        </div>
                                                    </div>
                                                </AccordionItem>
                                            ))}

                                        </Accordion>

                                        <div className="my-4">
                                            <Label className="text-base"> Other information </Label>
                                            <p className="text-sm text-muted-foreground">  Confirm reservation details and availability for each item listed below. </p>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-medium text-muted-foreground"> Reservation Date </Label>
                                                <p className="text-sm"> {reservation?.reservationDate ? format(reservation.reservationDate, "PPP") : "No date available"} </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label className="font-medium text-muted-foreground"> Reservee Email </Label>
                                                <p className="text-sm"> {reservation?.reserveeEmail ? reservation.reserveeEmail : "No email provided."} </p>
                                            </div>
                                        </div>


                                        <div className="my-4">
                                            <Label className="font-medium text-muted-foreground"> Reservation Reason </Label>
                                            <p> {reservation?.reservationReason ? reservation.reservationReason : "No reservation reason found."} </p>
                                        </div>

                                    </CardContent>

                                </Card>

                            </div>

                            <div className="grid auto-rows-max items-start gap-6">

                                <Card className="flex flex-col gap-2 overflow-hidden">

                                    <CardContent className="px-6 py-5">

                                        <Form {...reservationImagesForm}>
                                            <form onSubmit={reservationImagesForm.handleSubmit(handleImagesSubmit)}>

                                                <div className="flex flex-row">

                                                    <div className="flex flex-col">
                                                        <Label className="text-lg font-semibold"> Reservation Images </Label>
                                                        {user.userRole != "Admin" ? (
                                                            <p className="text-sm text-muted-foreground">  Upload up to 6 images of the amenity to document their condition before and after use. </p>
                                                        ) : (
                                                            <p className="text-sm text-muted-foreground">  Uploaded images provide documentation of the amenity's condition. Review each image for clear evidence of amenity use and any notable details. </p>
                                                        )}
                                                    </div>

                                                    <Button
                                                        size="sm"
                                                        type="submit"
                                                        variant="outline"
                                                    >
                                                        {loading ? <LoadingSpinner className="h-4 w-4" /> : <CloudUpload className="h-4 w-4" />}

                                                    </Button>

                                                </div>


                                                <div className="grid gap-2 pt-4">

                                                    {images && images[0] && images[0] != null && (

                                                        <Dialog>
                                                            <DialogTrigger onClick={() => setRotatingIndex(rotatingIndex)}>
                                                                <img
                                                                    src={images[rotatingIndex].url ? images[rotatingIndex].url : images[rotatingIndex]} className="aspect-video w-full rounded-md object-cover cursor-pointer"
                                                                />
                                                            </DialogTrigger>

                                                            <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">

                                                                <Button
                                                                    className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                                                                    disabled={images.length === 1}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === 0) {
                                                                            setCurrentIndex(images.length - 1)
                                                                        } else {
                                                                            setCurrentIndex(currentIndex - 1)
                                                                        }
                                                                    }}
                                                                    size="icon"
                                                                    variant="outline"
                                                                >
                                                                    <ChevronLeft className="h-4 w-4" />
                                                                </Button>

                                                                <Button
                                                                    className="absolute top-50 right-5 w-8 h-8 !shadow-2xl"
                                                                    disabled={images.length === 1}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (currentIndex === images.length - 1) {
                                                                            setCurrentIndex(0)
                                                                        } else {
                                                                            setCurrentIndex(currentIndex + 1)
                                                                        }
                                                                    }}
                                                                    size="icon"
                                                                    variant="outline"
                                                                >
                                                                    <ChevronRight className="h-4 w-4" />
                                                                </Button>

                                                                <img
                                                                    src={images[currentIndex].url ? images[currentIndex].url : images[currentIndex]} className="aspect-video rounded-md object-contain"
                                                                />

                                                            </DialogContent>

                                                        </ Dialog>

                                                    )}

                                                    <div className="grid grid-cols-3 gap-2">
                                                        {images && user._id === reservation?.reserveeId && images.map((index: number) => (
                                                            <div className="group relative">
                                                                <Button
                                                                    className="h-5 w-5 rounded-full absolute -top-2 -right-2 flex z-50"
                                                                    onClick={() => { handleRemoveImage(index) }}
                                                                    size="icon"
                                                                    type="button"
                                                                    variant="destructive"
                                                                >
                                                                    <X className="h-3 w-3" />
                                                                </Button>
                                                                <img
                                                                    className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]"
                                                                    onClick={() => setRotatingIndex(index)}
                                                                    src={images[index]?.url ? images[index].url : images[index]}
                                                                />
                                                            </div>
                                                        ))}

                                                    </div>

                                                    {images?.length !== 6 && images?.length! <= 6 && user.userRole != "Admin" && (
                                                        <button type="button" className="relative flex flex-col gap-2 aspect-video items-center justify-center rounded-md border border-dashed cursor-pointer">
                                                            <Upload className="h-6 w-6 text-muted-foreground" />
                                                            <div className="flex flex-col px-6">
                                                                <span className="text-muted-foreground text-base font-medium">
                                                                    {reservation?.reservationStatus[reservation.reservationStatus.length - 1].status !== "Ongoing" &&
                                                                        reservation?.reservationStatus[reservation.reservationStatus.length - 1].status !== "For return" ?
                                                                        "Input disabled until approved" : "Click here to upload images "}
                                                                </span>
                                                                <span className="text-muted-foreground text-xs font-normal">
                                                                    {reservation?.reservationStatus[reservation.reservationStatus.length - 1].status !== "Ongoing" &&
                                                                        reservation?.reservationStatus[reservation.reservationStatus.length - 1].status !== "For return" ?
                                                                        "File input will be available once the reservation is in effect and happening." : "The total file size should not exceed 30 MB."}

                                                                </span>
                                                            </div>
                                                            <span className="sr-only"> Upload </span>
                                                            <FormField
                                                                control={reservationImagesForm.control}
                                                                name="reservationImages"
                                                                render={({ field: { value, onChange, ...fieldProps } }) => {
                                                                    return (
                                                                        <FormItem>
                                                                            <FormLabel className="hidden"> Amenity Image </FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    accept="image/jpeg, image/png, image/jpg"
                                                                                    className="block absolute w-full h-full left-0 top-0 right-0 bottom-0 opacity-0 z-50 disabled:opacity-0 !mt-0 cursor-pointer"
                                                                                    disabled={images.length >= 6 || (reservation?.reservationStatus[reservation.reservationStatus.length - 1].status != "Ongoing" && reservation?.reservationStatus[reservation.reservationStatus.length - 1].status != "For return")}
                                                                                    id="amenityImages"
                                                                                    multiple
                                                                                    onChange={handleImages}
                                                                                    title="Drag and drop an image file or click here to upload."
                                                                                    type="file"
                                                                                    {...fieldProps}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        </button>
                                                    )}

                                                </div>

                                            </form>
                                        </Form>

                                    </CardContent>

                                </Card>

                                <Card>

                                    <CardContent className="px-6 py-5">

                                        <Label className="text-lg font-semibold"> Reservation Comments </Label>
                                        <p className="text-sm text-muted-foreground"> Add notes or special instructions related to your reservation. </p>

                                        <div className="flex flex-col my-4 gap-1">

                                            <div className="relative w-full">

                                                <div className="absolute right-3 top-1 w-7 h-7 bg-background" />

                                                <Form {...reservationCommentsForm}>
                                                    <form onSubmit={reservationCommentsForm.handleSubmit(handleCommentsSubmit)}>
                                                        <FormField
                                                            control={reservationCommentsForm.control}
                                                            name="commentContent"
                                                            render={({ field: { value, onChange, ...fieldProps } }) => {
                                                                return (
                                                                    <FormItem>
                                                                        <FormLabel className="sr-only"> Add a comment </FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                className="w-full"
                                                                                onChange={onChange}
                                                                                placeholder="Add a comment..."
                                                                                type="text"
                                                                                {...fieldProps}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                        <Button
                                                            className="absolute w-10 h-9 top-0.5 right-0.5 bg-background hover:bg-background"
                                                            type="submit"
                                                        >
                                                            <SendHorizontal className="absolute text-muted-foreground w-4 h-4 right-3 top-3" />
                                                        </Button>
                                                    </form>
                                                </Form>



                                            </div>

                                        </div>

                                        <div className="grid gap-4">

                                            {reservation?.reservationComments?.map((comment, index) => (
                                                <div key={index} className="p-4 rounded-md bg-muted/50">
                                                    <div className="flex flex-col gap-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-sm">{comment.commentAuthor}</span>
                                                            <span
                                                                className={"text-xs text-muted-foreground " + (comment.commentAuthorPosition === "Outstanding" ? "text-primary" : comment.commentAuthorPosition === "Delinquent" ? "text-warning" : "text-muted-foreground")}>
                                                                {comment.commentAuthorPosition}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-sm"> {comment.commentContent} </span>
                                                            <span className="text-xs text-muted-foreground"> {format(comment.commentDate, "PPPp")} </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>

                                        {/* 
                                    <div className="p-4 rounded-md bg-muted/50">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">{user.userBlkLt}</span>
                                                <span
                                                    className={"text-xs text-muted-foreground " + (user.memberStatus === "Outstanding" ? "text-primary" : user.memberstatus === "Delinquent" ? "text-warning" : "text-muted-foreground")}>
                                                    {user.userPosition}
                                                </span>

                                            </div>
                                            <span className="text-sm">This is a sample comment to show how the comment UI would look like.</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                                            {format(new Date(), "PPPp")}
                                        </span>
                                    </div> 
                                    */}

                                    </CardContent>

                                </Card>

                            </div>
                        </div>

                    </main >
                    : (
                        <div className="flex w-full h-full gap-2 items-center justify-center opacity-90">
                            <LoadingSpinner className="h-6 w-6" />
                            <span className="text-sm"> Loading </span>
                        </div>
                    )}

            </SidebarInset >

        </SidebarProvider >
    )
}