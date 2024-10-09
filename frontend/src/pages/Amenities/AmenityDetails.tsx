


// Imports

// Lucide Icon Imports
import {
  ChevronLeft,
  PlusCircle,
  Upload,
} from "lucide-react";



// shadcn Component Imports
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

// shadcn Form Component Imports
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

// shadcn Skeleton Component Import
import { Skeleton } from "@/components/ui/skeleton";

// shadcn Table Component Imports
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

// shadcnc Textarea Component Import
import { Textarea } from "@/components/ui/textarea";

// shadcn Toaster Import
import { Toaster } from "@/components/ui/toaster";

// shadcn Toast Import
import { useToast } from "@/components/ui/use-toast"



// Custom Component Imports
// Layout Wrapper Component Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";



// Utility Imports
// Date format Import
import { format } from "date-fns"

// React Router Dom Imports
import { useLocation, useNavigate } from "react-router-dom";

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as zod from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";



// Data and Types Import
// Reservation Type Import
import { AmenityType } from "@/types/amenity-type";
import { ReservationType } from "@/types/reservation-type";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";




const AmenityDetails = () => {



  // React Router Dom Navigate
  const navigate = useNavigate();

  // React Router Dom Location
  const location = useLocation();



  // States
  // Amenity State
  const [amenity, setAmenity] = useState<AmenityType[]>([]);

  // Amenity List State
  const [amenityList, setAmenityList] = useState<[]>([]);

  // Reservations List State
  const [reservationsList, setReservationsList] = useState<[]>([]);



  // Functions
  // Function to navigate to the amenity list page
  const navToAmenityList = () => {
    const amenityListPath = '/amenities';
    navigate(amenityListPath);
  }



  // useEffects
  useEffect(() => {

    // Log to the console that the page has loaded
    console.log("Amenity Details Page Loaded");

    // Set the document title
    document.title = "Amenity | GCTMS";



    // Function to fetch reservations
    const fetchReservations = async () => {

      // Fetch reservations
      const reservationResponse = await fetch("http://localhost:4000/api/reservations");

      // Parse the response to JSON
      const reservationData = await reservationResponse.json();

      // If the response is successful, log to the console that fetching reservations list is successful
      if (reservationResponse.ok) {
        console.log("Fetching reservations list successful.");
        console.log(reservationData);
        setReservationsList(reservationData);
      } else if (!reservationResponse.ok) {
        console.log("Fetching reservations list failed.");
      };

    };

    // Function to fetch amenity
    const fetchAmenity = async () => {

      // Fetch amenity
      const amenityResponse = await fetch("http://localhost:4000/api/amenities/" + location.pathname.slice(location.pathname.lastIndexOf("/") + 1, location.pathname.length).replace(/%20/g, " "));

      // Parse the response to JSON
      const amenityData = await amenityResponse.json();

      // If the response is successful, log to the console that fetching amenity is successful  
      if (amenityResponse.ok) {
        console.log("Fetching amenity successful.");
        console.log(amenityData);
        setAmenity(amenityData);
      } else if (!amenityResponse.ok) {
        console.log("Fetching amenity failed.");
      }

    };



    // Call all API call functions
    // Fetch Reservations
    fetchReservations();
    // Fetch Amenity
    fetchAmenity();

  }, []);





  return (



    // Layout Wrapper Component
    <LayoutWrapper>



      {amenity[0] && (

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
              {amenity[0].amenityName}
            </h1>

            {amenity[0].stat === "Unarchived" &&
              (
                <Badge variant="secondary" className="ml-auto sm:ml-0">
                  Unarchived
                </Badge>
              )
            }

          </div>



          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">

            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">


              {/* Amenity Details Card */}
              <Card x-chunk="dashboard-07-chunk-0">

                {/* Form Title */}
                <CardHeader className="gap-1">

                  <div className="flex flex-row gap-4">
                    <CardTitle> {amenity[0].amenityName} Details </CardTitle>
                    <Badge variant="outline" className="ml-auto sm:ml-0">
                      {amenity[0].amenityType}
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
                      <Input className="w-full" value={amenity[0].amenityName} disabled />

                    </div>

                    <div className="grid gap-2">

                      <Label> Description </Label>
                      <CardDescription> A brief description of the amenity. </CardDescription>
                      <Textarea className="" value={amenity[0].amenityDescription} disabled />

                    </div>

                    {amenity[0].amenityType === "Facility" && (

                      <div className="grid gap-2">

                        <Label> Address </Label>
                        <CardDescription> Where the amenity is located. </CardDescription>
                        <Textarea className="" value={amenity[0].amenityAddress} disabled />

                      </div>

                    )
                    }

                    <div className="grid gap-2">

                      <Label> Reminder </Label>
                      <CardDescription> A reminder for the amenity. </CardDescription>
                      <Textarea className="" value={amenity[0].amenityReminder} disabled />

                    </div>

                  </div>

                </CardContent>

              </Card>



              {/* Amenity Reservations Card */}
              <Card>

                <CardHeader className="flex flex-col">

                  <CardTitle> {amenity[0].amenityName} Reservations </CardTitle>

                  <CardDescription>
                    The reservations made for the {amenity[0].amenityType}.
                  </CardDescription>

                </CardHeader>



                <CardContent>

                  <Tabs defaultValue="all">

                    <TabsList>

                      <TabsTrigger value="all"> All </TabsTrigger>
                      <TabsTrigger value="pending"> Pending </TabsTrigger>
                      <TabsTrigger value="accepted"> Accepted </TabsTrigger>
                      <TabsTrigger value="rejected"> Rejected </TabsTrigger>
                      <TabsTrigger value="completed"> Completed </TabsTrigger>

                    </TabsList>



                    <TabsContent value="all">

                      {reservationsList && reservationsList.map((reservation: ReservationType) => {

                        if (reservation.amenityName === amenity[0].amenityName) {

                          return (
                            <div> Tite </div>
                          )
                        }

                      })}

                    </TabsContent>





                  </Tabs>

                </CardContent>

              </Card>


            </div>





            {/* 2nd Column of Details*/}
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">



              {/* Images Card */}
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-1">



                {amenity[0] && (

                  <CardHeader>

                    <CardTitle> {amenity[0].amenityName} Images </CardTitle>
                    <CardDescription>
                      Attached images of the {amenity[0].amenityType}. You can upload up to 3 images.
                    </CardDescription>

                  </CardHeader>

                )
                }



                <CardContent>

                  <div className="grid gap-2">

                    <Skeleton
                      className="aspect-square w-full rounded-md object-cover h-[300] w-[300]"
                    />

                    <div className="grid grid-cols-3 gap-2">

                      <button>
                        <Skeleton
                          className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"
                        />
                      </button>

                      <button>
                        <Skeleton
                          className="aspect-square w-full rounded-md object-cover h-[84] w-[84]"
                        />
                      </button>

                      <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only"> Upload </span>
                      </button>

                    </div>

                  </div>

                </CardContent>



              </Card>



              {/* Visibility Status Card */}
              <Card x-chunk="dashboard-07-chunk-3">



                {amenity[0] && (

                  <CardHeader>

                    <CardTitle> {amenity[0].amenityName} Status </CardTitle>
                    <CardDescription>
                      The {amenity[0].amenityType}'s visibility to the unit owners.
                    </CardDescription>

                  </CardHeader>

                )
                }



                <CardContent>

                  <div className="grid gap-6">

                    <div className="grid gap-3">

                      {amenity[0] &&
                        (
                          <>
                            <Select defaultValue={amenity[0].stat} disabled>

                              <SelectTrigger id="stat" aria-label="Select status">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="Unarchived"> Unarchived </SelectItem>
                                <SelectItem value="Archived"> Archived </SelectItem>
                              </SelectContent>

                            </Select>

                            {amenity[0].stat === "Unarchived" &&
                              (
                                <CardDescription>
                                  Unarchived {amenity[0].amenityType} are shown to the unit owners.
                                </CardDescription>
                              )
                            }

                            {amenity[0].stat === "Archived" &&
                              (
                                <CardDescription>
                                  Archived {amenity[0].amenityType} are hidden from the unit owners.
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
                    {amenity[0].amenityName} Stock
                  </CardTitle>

                  <CardDescription>
                    The maximum amount per reservation and the total amount of {amenity[0].amenityType}.
                  </CardDescription>

                </CardHeader>



                <CardContent>

                  <Table>

                    <TableBody>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Current Stocks </span>
                          <Input id="amenityQuantity" type="number" value={amenity[0].amenityStock} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Maximum Stocks </span>
                          <Input id="amenityQuantity" type="number" value={amenity[0].amenityStockMax} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Minimum amount per reservation </span>
                          <Input id="amenityQuantity" type="number" value={amenity[0].amenityQuantityMin} disabled />
                        </TableCell>

                      </TableRow>

                      <TableRow>

                        <TableCell className="flex flex-col gap-2">
                          <span className="font-semibold"> Maximum amount per reservation </span>
                          <Input id="amenityQuantity" type="number" value={amenity[0].amenityQuantityMax} disabled />
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