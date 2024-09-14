


// Imports

// Lucide Icons Imports
import {
    CirclePlus,
    File,
    ListFilter,
    MoreHorizontal,
} from "lucide-react";



// shadcn Component Imports
// shadcn Badge Imports
import { Badge } from "@/components/ui/badge"

// shadcn Button Imports
import { Button } from "@/components/ui/button";

// shadcn Card Imports
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// shadcn Dropdown Imports
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// shadcn Skeleton Imports
import { Skeleton } from "@/components/ui/skeleton";

// shadcn Table Imports
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


// shadcn Tab Imports
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"



// Custom Component Imports
// Layout Wrapper Import
import LayoutWrapper from "@/components/layout/LayoutWrapper";





const AmenitiesList = () => {





    return (



        <LayoutWrapper>

            <div className="mr-auto grid w-full max-w-6xl gap-2">
                <h1 className="text-3xl font-semibold"> Amenities </h1>
            </div>

            <Tabs className="flex flex-col gap-2" defaultValue="all">

                <div className="flex items-center ">

                    <TabsList>
                        <TabsTrigger value="all"> All </TabsTrigger>
                        <TabsTrigger value="facility"> Facility </TabsTrigger>
                        <TabsTrigger value="equipment"> Equipment </TabsTrigger>
                    </TabsList>

                    <div className="ml-auto flex items-center gap-2">

                        <DropdownMenu>

                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 gap-1 text-sm"
                                >
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Wala pa hehe
                                </DropdownMenuCheckboxItem>

                            </DropdownMenuContent>

                        </DropdownMenu>



                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1 text-sm"
                        >
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Export</span>
                        </Button>

                    </div>

                </div>



                <TabsContent value="all">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <CardTitle> Amenities </CardTitle>
                                <CardDescription>
                                    List of all amenities  available for reservation.
                                </CardDescription>
                            </div>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Basketball Court Main Road </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 24 Lt 1 Cedar Drive
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Basketball Court Side </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 14 Lt 2 Greyoak
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Chairs </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    50 remaining
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Equipment
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Grand Cedar Pavillion </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 25 Lt 1 Cedar Drive
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Tables </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    3 remaining
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Equipment
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>



                <TabsContent value="facility">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <CardTitle> Facilities </CardTitle>
                                <CardDescription>
                                    List of all facilities  available for reservation.
                                </CardDescription>
                            </div>

                            <Button className="flex gap-2">
                                <CirclePlus className="h-5 w-5" />
                                Add Facility
                            </Button>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Basketball Court Main Road </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 24 Lt 1 Cedar Drive
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Basketball Court Side </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 14 Lt 2 Greyoak
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Grand Cedar Pavillion </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    Blk 25 Lt 1 Cedar Drive
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Facility
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>



                <TabsContent value="equipment">

                    <Card x-chunk="dashboard-05-chunk-3">

                        <CardHeader className="px-7 flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <CardTitle> Amenities </CardTitle>
                                <CardDescription>
                                    List of all amenities  available for reservation.
                                </CardDescription>
                            </div>

                            <Button className="flex gap-2">
                                <CirclePlus className="h-5 w-5" />
                                Add Equipment
                            </Button>

                        </CardHeader>



                        <CardContent>

                            <Table>

                                <TableHeader>

                                    <TableRow>

                                        <TableHead className="w-[10px]">
                                        </TableHead>

                                        <TableHead>
                                            Name
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Type
                                        </TableHead>

                                        <TableHead className="hidden sm:table-cell">
                                            Status
                                        </TableHead>

                                        <TableHead className="text-right">
                                        </TableHead>

                                    </TableRow>

                                </TableHeader>



                                <TableBody>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Chairs </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    50 remaining
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Equipment
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Tables </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    3 remaining
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Equipment
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                    <TableRow>

                                        <TableCell className="flex flex-row items-center gap-4">
                                            <Skeleton className="h-24 w-24 " />
                                        </TableCell>

                                        <TableCell>
                                            <div>
                                                <div className="font-medium"> Tent </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    1 remaining
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            Equipment
                                        </TableCell>

                                        <TableCell className="hidden sm:table-cell">
                                            <Badge className="text-xs" variant="secondary">
                                                Available
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="items-end">

                                            <DropdownMenu>

                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Archive</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>

                                            </DropdownMenu>

                                        </TableCell>

                                    </TableRow>



                                </TableBody>

                            </Table>

                        </CardContent>

                    </Card>

                </TabsContent>


            </Tabs>

        </ LayoutWrapper>



    )

};



export default AmenitiesList;