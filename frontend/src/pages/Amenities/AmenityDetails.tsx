


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
import { useNavigate } from "react-router-dom";

// React Hook Form Imports
import { useForm } from "react-hook-form";

// Zod Imports
import * as zod from "zod";

// Zod Resolver Import
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";





const AmenityDetails = () => {



  // React Router Dom Navigate
  const navigate = useNavigate();

  // Functions
  // Function to navigate to the equipment form page
  const returnRoute = () => {

    const path = '/amenities';
    navigate(path);

  }





  return (

    <LayoutWrapper>

      {/* Container for top row items */}
      <div className="flex items-center gap-4 mb-3">



        {/* Return to Amenity List button */}
        <Button
          variant="outline" size="icon"
          className="h-7 w-7"
          onClick={returnRoute}
        >

          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only"> Back </span>

        </Button>

        {/* Title */}
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          New Equipment
        </h1>

        {/* Add Equipment Button */}
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button size="sm" className="flex gap-1" type="submit">
            <PlusCircle className="w-4 h-4" />
            Add Equipment </Button>
        </div>

      </div>

    </LayoutWrapper>


  );
}

export default AmenityDetails;