


// Imports

// shadcn Component Imports



// Custom Component Imports
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";



const AmenityForm = () => {





    return (



        <LayoutWrapper>

            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    New Equipment
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Button size="sm" className="flex gap-1"> 
                        <PlusCircle className="w-4 h-4" />
                        Add Equipment </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                        <CardHeader>
                            <CardTitle> Equipment Details</CardTitle>
                            <CardDescription>
                                Enter the appropriate details for the new equipment.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        className="w-full"
                                        defaultValue="CODING IS FUN TEMPORARY LANG HEHE"
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                        className="min-h-32"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card x-chunk="dashboard-07-chunk-1">
                        <CardHeader>
                            <CardTitle> Equipment Stock </CardTitle>
                            <CardDescription>
                                Enter the maximum amount per reservation and the total amount of the equipment.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>

                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Maximum amount per reservation
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                defaultValue="100"
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Maximum stocks
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                id="stock-2"
                                                type="number"
                                                defaultValue="143"
                                            />
                                        </TableCell>
                                    </TableRow>
                                   
                                </TableBody>
                            </Table>
                        </CardContent>
                        {/* <CardFooter className="justify-center border-t p-4">
                            <Button size="sm" variant="ghost" className="gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                Add Variant
                            </Button>
                        </CardFooter> */}
                    </Card>

                </div>





                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-3">
                        <CardHeader>
                            <CardTitle> Equipment Status </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="status">Status</Label>
                                    <Select>
                                        <SelectTrigger id="status" aria-label="Select status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unarchived">Unarchived</SelectItem>
                                            <SelectItem value="archived">Archived</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                    >
                        <CardHeader>
                            <CardTitle> Equipment Images</CardTitle>
                            <CardDescription>
                                Attach images of the new equipment. You can upload up to 3 images.
                            </CardDescription>
                        </CardHeader>
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
                                        <span className="sr-only">Upload</span>
                                    </button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <Card x-chunk="dashboard-07-chunk-5">
                        <CardHeader>
                            <CardTitle>Archive Product</CardTitle>
                            <CardDescription>
                                Lipsum dolor sit amet, consectetur adipiscing elit.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div></div>
                            <Button size="sm" variant="secondary">
                                Archive Product
                            </Button>
                        </CardContent>
                    </Card> */}
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                    Discard
                </Button>
                <Button size="sm">Save Product</Button>
            </div>


        </LayoutWrapper >



    )
}



export default AmenityForm;