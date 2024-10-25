


// Imports

// Lucide Icon Imports
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";



// shadcn Component Imports
// shadcn AlertDialog Component Imports
import { 
  AlertDialog, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

// shadcn Badge Component Import
import { Badge } from "@/components/ui/badge";

// shadcn Button Component Import
import { Button } from "@/components/ui/button";

// shadcn Card Component Imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// shadcn Dialog Component Import
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger 
} from "@/components/ui/dialog";

// shadcn Dropdown Menu Component Imports
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// shadcn Input Component Import
import { Input } from "@/components/ui/input";

// shadcn Label Component Import
import { Label } from "@/components/ui/label";

// shadcn Select Component Imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// shadcn Table Component Imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// shadcn Tabs Component Imports
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
} from "@/components/ui/tabs";

// shadcnc Textarea Component Import
import { Textarea } from "@/components/ui/textarea";



// Custom Component Imports
// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Utility Imports
// Date format Import
import { format } from "date-fns"

// React Router Dom Imports
import { 
  useLocation, 
  useNavigate 
} from "react-router-dom";

// React useEffect and useState Imports
import { 
  useEffect, 
  useState 
} from "react";



// Data and Types Import
// Amenity Type Import
import { AmenityType } from "@/types/amenity-type";
// Reservation Type Import
import { ReservationType } from "@/types/reservation-type";





const AmenityDetails = () => {



  // React Router Dom Navigate
  const navigate = useNavigate();

  // React Router Dom Location
  const location = useLocation();



  // States
  // Amenity State
  const [amenity, setAmenity] = useState<AmenityType | any>();

  // Reservations List State
  const [reservationsList, setReservationsList] = useState<[]>([]);

  // Archived Reservations List State
  const [archivedReservationsList, setArchivedReservationsList] = useState<[]>([]);

  // All Reservations State
  const [allReservations, setAllReservations] = useState<[]>([]);

  // Delete Dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Rotating Index State for Images
  const [rotatingIndex, setRotatingIndex] = useState(0);

  // Paused State for Image Carousel
  const [currentIndex, setCurrentIndex] = useState(0);



  // Functions
  // Function to navigate to the amenity list page
  const navToAmenityList = () => {
    const amenityListPath = '/amenities';
    navigate(amenityListPath);
  }

  useEffect(() => {

    // const imageCheck = () => {

    //     if (rotatingIndex < 0) {
    //         setRotatingIndex(0);
    //     }

    //     if (rotatingIndex >= images.length) {
    //         setRotatingIndex(images.length - 1);
    //     }

    // }

    let intervalId = setInterval(() => {

      console.log(amenity.amenityImages)

      if (amenity.amenityImages.length <= 0 || amenity.amenityImages.length === 1) {
        setRotatingIndex(0);
      } else if (rotatingIndex === amenity.amenityImages.length - 1) {
        setRotatingIndex(0);
      } else if (rotatingIndex >= amenity.amenityImages.length) {
        setRotatingIndex(0);
      }
      else {
        setRotatingIndex(rotatingIndex + 1);
      }
    }, 3000)

    // Pause logic for the carousel
    // if (paused) {
    //   clearInterval(intervalId);
    // } else {
    //   return () => clearInterval(intervalId);
    // }

    return () => clearInterval(intervalId);

  });



  // useEffects
  useEffect(() => {

    // Log to the console that the page has loaded
    console.log("Amenity Details Page Loaded");

    // Set the document title
    document.title = "Amenity | GCTMS";

    // Function to fetch all reservations
    const fetchAllReservations = async () => {

      const reservationListDataResponse = await fetch("http://localhost:4000/api/reservations/all");

      // Parse the response to JSON
      const reservationListData = await reservationListDataResponse.json();

      // If the response is successful, log to the console that fetching reservations list is successful
      if (reservationListDataResponse.ok) {
        console.log("Fetching all reservations list successful.");
        setAllReservations(reservationListData);
      }

      if (!reservationListDataResponse.ok) {
        console.log("Fetching all reservations list failed.");
      }

    }

    // Function to fetch reservations
    const fetchUnarchivedReservations = async () => {

      // Fetch reservations
      const unarchivedReservationListDataResponse = await fetch("http://localhost:4000/api/reservations");

      // Parse the response to JSON
      const unarchivedReservationListData = await unarchivedReservationListDataResponse.json();

      // If the response is successful, log to the console that fetching reservations list is successful
      if (unarchivedReservationListDataResponse.ok) {
        console.log("Fetching unarchived reservations list successful.");
        setReservationsList(unarchivedReservationListData);
      } else if (!unarchivedReservationListDataResponse.ok) {
        console.log("Fetching unarchived reservations list failed.");
      };

    };

    // Function to fetch reservations
    const fetchArchivedReservations = async () => {

      // Fetch reservations
      const archivedReservationListDataResponse = await fetch("http://localhost:4000/api/reservations/archive/asd");

      // Parse the response to JSON
      const archivedReservationListData = await archivedReservationListDataResponse.json();

      // If the response is successful, log to the console that fetching reservations list is successful
      if (archivedReservationListDataResponse.ok) {
        console.log("Fetching archived reservations list successful.");
        setArchivedReservationsList(archivedReservationListData);
      } else if (!archivedReservationListDataResponse.ok) {
        console.log("Fetching archived reservations list failed.");
      };

    };

    // Function to fetch amenity
    const fetchAmenity = async () => {

      // Fetch amenity
      const amenityDataResponse = await fetch("http://localhost:4000/api/amenities/" + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length));

      // Parse the response to JSON
      const amenityData = await amenityDataResponse.json();

      // If the response is successful, log to the console that fetching amenity is successful  
      if (amenityDataResponse.ok) {
        console.log("Fetching amenity successful.");
        console.log(amenityData);
        setAmenity(amenityData);
      } else if (!amenityDataResponse.ok) {
        console.log("Fetching amenity failed.");
      }

    };



    // Call all API call functions
    // Fetch All Reservations
    fetchAllReservations();
    // Fetch ALl Unarchived Reservations
    fetchUnarchivedReservations();
    // Fetch All Archived Reservations
    fetchArchivedReservations();
    // Fetch Amenity
    fetchAmenity();


  }, []);



  // Functions
  // Function to redirect back to amenity list
  const reservationDetailsRoute = (reservationId) => {
    const reservationDetailsPath = '/reservations/details/' + reservationId;
    navigate(reservationDetailsPath);
  }

  // Function to archive amenity
  const setArchive = async () => {

    amenity.stat = "Archived";

    const archiveResponse = await fetch("http://localhost:4000/api/amenities/" + amenity.amenityName, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(amenity)
    });

    const archivedAmenityData = await archiveResponse.json();

    if (archiveResponse.ok) {
      console.log("Archiving amenity successful.");
      console.log(archivedAmenityData);
      setAmenity(archivedAmenityData);
      window.location.reload();
    } else if (!archiveResponse.ok) {
      console.log("Archiving amenity failed.");
    }

  }

  // Function to unarchive amenity
  const setUnarchive = async () => {

    amenity.stat = "Unarchived";

    const unarchiveResponse = await fetch("http://localhost:4000/api/amenities/" + amenity.amenityName, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(amenity)
    });

    const unarchivedAmenityData = await unarchiveResponse.json();

    if (unarchiveResponse.ok) {
      console.log("Unarchiving amenity successful.");
      console.log(unarchivedAmenityData);
      setAmenity(unarchivedAmenityData);
      window.location.reload();
    } else if (!unarchiveResponse.ok) {
      console.log("Unarchiving amenity failed.");
    }

  }

  const deleteAmenity = async () => {

    const deleteResponse = await fetch('http://localhost:4000/api/amenities/' + amenity.amenityName, {
      method: 'DELETE'
    })

    const deletedAmenity = await deleteResponse.json()

    console.log(deletedAmenity);

    if (deleteResponse.ok) {
      console.log("Deleting amenity successful.");
      window.location.assign("/amenities")
    } else if (!deleteResponse.ok) {
      console.log("Deleting amenity failed.");
    }

  }



  return (



    // Layout Wrapper Component
    <LayoutWrapper>

      {/* Delete dialog for deleting the reservation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>

        <AlertDialogContent>

          <AlertDialogHeader>

            {/* Deletion message */}
            <AlertDialogTitle> Are you sure you want to delete this amenity? </AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This amenity will permanently deleted and be no longer be accessible by anyone.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            {/* Delete dialog cancel button */}
            <AlertDialogCancel> Cancel </AlertDialogCancel>

            {/* Delete dialog delete button */}
            <Button variant={"destructive"} onClick={deleteAmenity}>
              Delete
            </Button>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>



      {amenity && (

        <>

          {/* Container for top row items */}
          <div className="flex items-center gap-4 mb-3">

            {/* Return to Amenity List button */}
            <Button
              className="h-7 w-7"
              onClick={navToAmenityList}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only"> Back </span>
            </Button>

            {/* Title */}
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              {amenity.amenityName}
            </h1>

            {amenity.stat === "Unarchived" &&
              (
                <Badge variant="secondary" className="ml-auto sm:ml-0">
                  Unarchived
                </Badge>
              )
            }

            <div className="hidden items-center gap-2 md:ml-auto md:flex">

              {/* Dropdown button for archiving and deleting */}
              <DropdownMenu>

                <DropdownMenuTrigger asChild>

                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only"> More </span>
                  </Button>

                </DropdownMenuTrigger>

                {/* Dropdown menu for archiving/unarchiving */}
                <DropdownMenuContent align="end">

                  {/* Archive button when unarchived */}
                  {
                    (amenity.stat == "Unarchived") &&
                    (
                      <DropdownMenuItem onClick={setArchive}> Archive </DropdownMenuItem>
                    )
                  }

                  {/* Unarchive button when archived */}
                  {
                    (amenity.stat == "Archived") &&
                    (
                      <DropdownMenuItem onClick={setUnarchive}> Unarchive </DropdownMenuItem>
                    )
                  }

                  {/* Edit button */}
                  <DropdownMenuItem onClick={() => { navigate("/amenities/edit/" + amenity._id) }}> Edit </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Delete button */}
                  <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-destructive"> Delete </DropdownMenuItem>

                </DropdownMenuContent>

              </DropdownMenu>

            </div>

          </div>



          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">


              {/* Amenity Details Card */}
              <Card x-chunk="dashboard-07-chunk-0">

                {/* Form Title */}
                <CardHeader className="gap-1">

                  <div className="flex flex-row gap-4">
                    <CardTitle> {amenity.amenityName} Details </CardTitle>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                      {amenity.amenityType}
                    </Badge>
                  </div>

                  <CardDescription>
                    To change any of the details, click edit and make the necessary changes. The changes you make will be viewed by all users and will affect future reservations.
                  </CardDescription>

                </CardHeader>



                <CardContent>

                  <div className="grid gap-6">

                    <div className="grid gap-2">

                      <Label> Name </Label>
                      <CardDescription> The name of the amenity, preferably in plural form. </CardDescription>
                      <Input className="w-full" value={amenity.amenityName} disabled />

                    </div>

                    <div className="grid gap-2">

                      <Label> Description </Label>
                      <CardDescription> A brief description of the amenity. </CardDescription>
                      <Textarea className="" value={amenity.amenityDescription} disabled />

                    </div>

                    {amenity.amenityType === "Facility" && (

                      <div className="grid gap-2">

                        <Label> Address </Label>
                        <CardDescription> Where the amenity is located. </CardDescription>
                        <Textarea className="" value={amenity.amenityAddress} disabled />

                      </div>

                    )
                    }

                    <div className="grid gap-2">

                      <Label> Reminder </Label>
                      <CardDescription> A reminder for the amenity. </CardDescription>
                      <Textarea className="" value={amenity.amenityReminder} disabled />

                    </div>

                  </div>

                </CardContent>

              </Card>



              {/* Amenity Reservations Card */}
              <Card>

                <CardHeader className="flex flex-col">

                  <CardTitle> {amenity.amenityName} Reservations </CardTitle>

                  <CardDescription>
                    The reservations made for the {amenity.amenityType}.
                  </CardDescription>

                </CardHeader>



                <CardContent>

                  <Tabs defaultValue="all">

                    <TabsList>

                      <TabsTrigger value="all"> All </TabsTrigger>
                      <TabsTrigger value="pending"> Pending </TabsTrigger>
                      <TabsTrigger value="accepted"> Accepted </TabsTrigger>
                      <TabsTrigger value="rejected"> Rejected </TabsTrigger>
                      <TabsTrigger value="archived"> Archived </TabsTrigger>
                      <TabsTrigger value="completed"> Completed </TabsTrigger>
                      <TabsTrigger value="expired"> Expired </TabsTrigger>

                    </TabsList>



                    <TabsContent value="all">



                      <Table>

                        <TableHeader>

                          <TableRow className="">

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead className="text-center"> Quantity </TableHead>
                            <TableHead className="text-center"> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {/* {allReservations && allReservations.map((reservation: ReservationType) => {

                          if (reservation.amenityName === amenity.amenityName) {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(reservation._id) }}>

                                  <TableCell>
                                    {format(new Date(reservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.blkLt}
                                  </TableCell>

                                  <TableCell className="text-center">
                                    {reservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell className="text-center">

                                    {reservation.reservationStatus === "Pending" &&
                                      (
                                        <Badge variant="warning">
                                          Pending
                                        </Badge>
                                      )
                                    }

                                    {reservation.reservationStatus === "Approved" &&
                                      (
                                        <Badge variant="default">
                                          Approved
                                        </Badge>
                                      )
                                    }

                                    {reservation.reservationStatus === "Rejected" &&
                                      (
                                        <Badge variant="destructive">
                                          Rejected
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })} */}

                      </Table>



                    </TabsContent>



                    <TabsContent value="pending">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {/* {reservationsList && reservationsList.map((reservation: ReservationType) => {

                          if (reservation.amenityName === amenity.amenityName && reservation.reservationStatus === "Pending") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(reservation._id) }}>

                                  <TableCell>
                                    {format(new Date(reservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {reservation.reservationStatus === "Pending" &&
                                      (
                                        <Badge variant="warning">
                                          Pending
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })} */}

                      </Table>



                    </TabsContent>



                    <TabsContent value="accepted">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {/* {reservationsList && reservationsList.map((reservation: ReservationType) => {

                          if (reservation.amenityName === amenity.amenityName && reservation.reservationStatus === "Approved") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(reservation._id) }}>

                                  <TableCell>
                                    {format(new Date(reservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {reservation.reservationStatus === "Approved" &&
                                      (
                                        <Badge variant="default">
                                          Approved
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })} */}

                      </Table>



                    </TabsContent>



                    <TabsContent value="rejected">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {reservationsList && reservationsList.map((reservation: ReservationType) => {

                          if (reservation.amenityName === amenity.amenityName && reservation.reservationStatus === "Rejected") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(reservation._id) }}>

                                  <TableCell>
                                    {format(new Date(reservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {reservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {reservation.reservationStatus === "Rejected" &&
                                      (
                                        <Badge variant="destructive">
                                          Rejected
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })}

                      </Table>



                    </TabsContent>



                    <TabsContent value="archived">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {archivedReservationsList && archivedReservationsList.map((archivedReservation: ReservationType) => {

                          if (archivedReservation.amenityName === amenity.amenityName && archivedReservation.stat === "Archived") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(archivedReservation._id) }}>

                                  <TableCell>
                                    {format(new Date(archivedReservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {archivedReservation.reservationStatus === "Archived" &&
                                      (
                                        <Badge variant="default">
                                          Completed
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })}

                      </Table>



                    </TabsContent>



                    <TabsContent value="completed">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {archivedReservationsList && archivedReservationsList.map((archivedReservation: ReservationType) => {

                          if (archivedReservation.amenityName === amenity.amenityName && archivedReservation.reservationStatus === "Completed") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(archivedReservation._id) }}>

                                  <TableCell>
                                    {format(new Date(archivedReservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {archivedReservation.reservationStatus === "Completed" &&
                                      (
                                        <Badge variant="default">
                                          Completed
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })}

                      </Table>



                    </TabsContent>



                    <TabsContent value="expired">



                      <Table>

                        <TableHeader>

                          <TableRow>

                            <TableHead> Reservation Date </TableHead>
                            <TableHead> Block and Lot </TableHead>
                            <TableHead> Quantity </TableHead>
                            <TableHead> Status </TableHead>

                          </TableRow>

                        </TableHeader>

                        {archivedReservationsList && archivedReservationsList.map((archivedReservation: ReservationType) => {

                          if (archivedReservation.amenityName === amenity.amenityName && archivedReservation.reservationStatus === "Expired") {

                            return (

                              <TableBody>

                                <TableRow onClick={() => { reservationDetailsRoute(archivedReservation._id) }}>

                                  <TableCell>
                                    {format(new Date(archivedReservation.reservationDate), "dd MMM yyyy")}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.blkLt}
                                  </TableCell>

                                  <TableCell>
                                    {archivedReservation.reservationQuantity}
                                  </TableCell>

                                  <TableCell>

                                    {archivedReservation.reservationStatus === "Expired" &&
                                      (
                                        <Badge variant="default">
                                          Expired
                                        </Badge>
                                      )
                                    }

                                  </TableCell>

                                </TableRow>


                              </TableBody>



                            )
                          }

                        })}

                      </Table>



                    </TabsContent>






                  </Tabs>

                </CardContent>

              </Card>


            </div>





            {/* 2nd Column of Details*/}
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">



              {/* Images Card */}
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-1">



                {amenity && (

                  <CardHeader>

                    <CardTitle> {amenity.amenityName} Images </CardTitle>
                    <CardDescription>
                      Attached images of {amenity.amenityName}. You can upload up to 3 images.
                    </CardDescription>

                  </CardHeader>

                )
                }



                <CardContent>

                  <div className="grid gap-2">

                    {amenity && amenity.amenityImages.length! > 0 && (
                      <Dialog>
                        <DialogTrigger onClick={ () => setCurrentIndex(rotatingIndex) }>
                          <img
                            src={amenity.amenityImages[rotatingIndex].url} className="aspect-video w-full rounded-md object-cover"
                          />
                        </DialogTrigger>

                        <DialogContent className="p-0 max-w-[80%] min-h-[80%] items-center justify-center">

                          <Button
                            className="absolute top-50 left-5 w-8 h-8 !shadow-2xl"
                            type="button"
                            onClick={() => {
                              if (currentIndex === 0) {
                                setCurrentIndex(amenity.amenityImages.length - 1)
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
                            type="button"
                            onClick={() => {
                              if (currentIndex === amenity.amenityImages.length - 1) {
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
                            src={amenity.amenityImages[currentIndex].url} className="aspect-video rounded-md object-contain"
                          />
                        </DialogContent>

                      </ Dialog>
                    )}

                    <div className="grid grid-cols-3 gap-2">

                      {amenity && amenity.amenityImages.length! > 0 && amenity.amenityImages.map((image, index) => (
                        <div className="group relative">
                          <img
                            src={image.url} className="cursor-pointer aspect-video w-full rounded-md object-cover h-[84] w-[84]" onClick={() => setRotatingIndex(index)}
                          />
                        </div>
                      )
                      )}

                    </div>

                  </div>

                </CardContent>



              </Card>



              {/* Visibility Status Card */}
              <Card x-chunk="dashboard-07-chunk-3">



                {amenity && (

                  <CardHeader>

                    <CardTitle> {amenity.amenityName} Status </CardTitle>
                    <CardDescription>
                      The {amenity.amenityType}'s visibility to the unit owners.
                    </CardDescription>

                  </CardHeader>

                )
                }



                <CardContent>

                  <div className="grid gap-6">

                    <div className="grid gap-3">

                      {amenity &&
                        (
                          <>
                            <Select defaultValue={amenity.stat} disabled>

                              <SelectTrigger id="stat" aria-label="Select status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                <SelectItem value="Archived"> Archived </SelectItem>
                              </SelectContent>

                            </Select>

                            {amenity.stat === "Unarchived" &&
                              (
                                <CardDescription>
                                  Unarchived {amenity.amenityType} are shown to the unit owners.
                                </CardDescription>
                              )
                            }

                            {amenity.stat === "Archived" &&
                              (
                                <CardDescription>
                                  Archived {amenity.amenityType} are hidden from the unit owners.
                                </CardDescription>
                              )
                            }
                          </>
                        )
                      }

                    </div>

                  </div>

                </CardContent>



              </Card>



              {/* Stock Card */}
              <Card>



                <CardHeader className="pb-4">

                  <CardTitle>
                    {amenity.amenityName} Stock
                  </CardTitle>

                  <CardDescription>
                    The maximum amount per reservation and the total amount of {amenity.amenityType}.
                  </CardDescription>

                </CardHeader>



                <CardContent>

                  <Table>

                    <TableBody>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Current Stocks </span>
                          <Input id="amenityQuantity" type="number" value={amenity.amenityStock} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Maximum Stocks </span>
                          <Input id="amenityQuantity" type="number" value={amenity.amenityStockMax} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Minimum amount per reservation </span>
                          <Input id="amenityQuantity" type="number" value={amenity.amenityQuantityMin} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Maximum amount per reservation </span>
                          <Input id="amenityQuantity" type="number" value={amenity.amenityQuantityMax} disabled />
                        </TableCell>

                      </TableRow>

                    </TableBody>

                  </Table>

                </CardContent>



              </Card>



            </div>



          </div>

        </>
      )
      }

    </LayoutWrapper >


  );
}

export default AmenityDetails;