import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons.tsx";



interface FeatureProps {
    icon: JSX.Element;
    title: string;
    description: string;
}



    const features: FeatureProps[] = [
    {
        icon: <MedalIcon />,
        title: "Management",
        description:
        "The management of Grand Cedar Homes handles dozens of concerns a day. Your interests are prioritized and will be met.",
    },
    {
        icon: <MapIcon />,
        title: "Geography",
        description:
        "Its geographical location makes it less prone to natural disasters, especially typhoons and floods.",
    },
    {
        icon: <PlaneIcon />,
        title: "Location",
        description:
        "It's near significant landmarks of Bignay like malls, markets, healthcare facilities, and other services.",
    },
    {
        icon: <GiftIcon />,
        title: "Local Market",
        description:
        "Products and services within the community itself is abundant, with door-to-door services. Leaving your home is optional.",
    },
];



export const TheCommunity = () => {



    return (

        <section
            id="theCommunity"
            className="container text-center py-24 sm:py-32"
        >

            <h2 className="text-3xl md:text-4xl font-bold ">
                The{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Community{" "}
                </span>
            </h2>

            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                What makes Grand Cedar Homes special from the others?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                {features.map(({ icon, title, description }: FeatureProps) => (
                <Card
                    key={title}
                    className="bg-muted/50 pb-3"
                >
                    <CardHeader>
                        <CardTitle className="grid gap-4 place-items-center">
                            {icon}
                            {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent> {description} </CardContent>
                </Card>
                ))}

            </div>

        </section>

    );
};