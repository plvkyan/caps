import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";

import { Check, Ellipsis, Facebook } from "lucide-react";
import { LightBulbIcon } from "./Icons.tsx";



export const HeroCards = () => {



    return (

        <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
            {/* Testimonial */}

            <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">

                <CardHeader className="flex flex-row items-center gap-4 pb-2">

                    <Avatar>
                        <AvatarImage
                        alt=""

                        />
                        <AvatarFallback> KL </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col flex-1">
                        <CardTitle className="text-lg"> Kyan Lumanog </CardTitle>
                        <CardDescription> 2:42 AM </CardDescription>
                    </div>

                    <div className=""> <Ellipsis /> </div>

                </CardHeader>

                <CardContent> Read the latest announcements! </CardContent>

            </Card>

            {/* Team */}
            <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">

                <CardHeader className="mt-8 flex justify-center items-center pb-2">

                    <Avatar className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"> 
                        <AvatarFallback> BN </AvatarFallback>

                    </Avatar>

                    <CardTitle className="text-center"> Beth Nocedal </CardTitle>
                    <CardDescription className="font-normal text-primary">
                        Vice President
                    </CardDescription>

                </CardHeader>

                <CardContent className="text-center pb-4">
                    <p>
                        Join our Facebook community where we handle most HOA-related 
                        discussions.
                    </p>
                </CardContent>

                <CardFooter className="pb-4">
                        
                    <div>

                        <a
                            rel="noreferrer noopener"
                            href="https://www.facebook.com/groups/153220550319813/"
                            target="_blank"
                            className={buttonVariants({
                                variant: "ghost",
                                size: "sm",
                        })}
                        >
                            <span className="sr-only"> Linkedin icon </span>
                            <Facebook size="24" />
                        </a>

                    </div>

                </CardFooter>

            </Card>

            {/* Pricing */}
            <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">

                <CardHeader>

                    <CardTitle className="flex item-center justify-between">

                        Keep Track of your Dues

                    </CardTitle>

                    <div>
                        <span className="text-3xl font-bold"> ₱200.00 </span>
                        <span className="text-muted-foreground"> / month </span>
                    </div>

                    <CardDescription>
                        Pay your monthly dues without leaving the comfort of your home.
                    </CardDescription>

                </CardHeader>

                <CardContent>
                    <Button className="w-full"> Log In Now </Button>
                </CardContent>

                <hr className="w-4/5 m-auto mb-4" />

                <CardFooter className="flex">

                    <div className="space-y-4">
                        {["Online payment", "Online reservations", "Online announcements", "Transaction history"].map(
                        (benefit: string) => (
                            <span
                                key={benefit}
                                className="flex"
                            >
                                <Check className="text-green-500" />{" "}
                                <h3 className="ml-2"> {benefit} </h3>
                            </span>
                        )
                        )}
                    </div>

                </CardFooter>

            </Card>

            {/* Service */}
            <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">

                <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">

                    <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
                        <LightBulbIcon />
                    </div>

                    <div>

                        <CardTitle> Light & dark mode </CardTitle>
                        <CardDescription className="text-md mt-2">
                            Sleek and modern user interface.
                        </CardDescription>

                    </div>

                </CardHeader>

            </Card>
        </div>

    );
};