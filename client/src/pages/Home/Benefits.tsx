import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Check } from "lucide-react";



enum PopularPlanType {
    NO = 0,
    YES = 1,
}

interface PricingProps {
    title: string;
    link: string;
    popular: PopularPlanType;
    price: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}



const pricingList: PricingProps[] = [
    {
        title: "Paper-based",
        link: "#contact",
        popular: 0,
        price: 0,
        description:
            "With traditional transactions with the HOA, you have to personally go to their office or have them come to you. More often than not, it's the former.",
        buttonText: "Contact Us",
        benefitList: [
            "Face-to-face transactions",
        ],
    },
    {
        title: "Online",
        link: "/login",
        popular: 1,
        price: 5,
        description:
            "By creating an account, most transactions can be done within the palm of your hands, without ever leaving the comfort of your home.",
        buttonText: "Login",
        benefitList: [
            "Convenient online transactions",
            "Transaction history",
            "Convenient online reservations",
            "Reservation history",
            "Announcements",
        ],
    },
];



export const Benefits = () => {
    return (

        <section
            id="pricing"
            className="container py-24 sm:py-32"
        >

            <h2 className="text-3xl md:text-4xl font-bold text-center">
                What are the
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                    Benefits{" "}
                </span>
                of creating an account?
            </h2>

            <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
                You have more control with minimal effort. Transactions don't have to be face-to-face.
            </h3>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">

                {pricingList.map((pricing: PricingProps) => (
                    <Card
                        key={pricing.title}
                        className={
                            pricing.popular === PopularPlanType.YES
                                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                                : ""
                        }
                    >
                        <CardHeader>

                            <CardTitle className="flex item-center justify-between">
                                {pricing.title}
                                {pricing.popular === PopularPlanType.YES ? (
                                    <Badge
                                        variant="secondary"
                                        className="text-sm text-primary"
                                    >
                                        More beneficial
                                    </Badge>
                                ) : null}
                            </CardTitle>

                            <div>
                            </div>

                            <CardDescription> {pricing.description} </CardDescription>

                        </CardHeader>

                        <CardContent>
                            <a href={pricing.link}><Button className="w-full">  {pricing.buttonText}  </Button></a>
                        </CardContent>

                        <hr className="w-4/5 m-auto mb-4" />

                        <CardFooter className="flex">

                            <div className="space-y-4">
                                {pricing.benefitList.map((benefit: string) => (
                                    <span
                                        key={benefit}
                                        className="flex"
                                    >
                                        <Check className="text-green-500" />{" "}
                                        <h3 className="ml-2"> {benefit} </h3>
                                    </span>
                                ))}
                            </div>

                        </CardFooter>

                    </Card>
                ))}

            </div>

        </section>

    );
};