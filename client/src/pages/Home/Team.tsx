
import {
    Card,
    // CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getAllOfficers } from "@/data/user-api";
import { UserType } from "@/types/user-type";
import { useEffect, useState } from "react";





export const Team = () => {

    // const [editMode, setEditMode] = useState(false);
    const [officers, setOfficers] = useState<UserType[]>([]);

    useEffect(() => {

        const fetchOfficers = async () => {
            try {
                const response = await getAllOfficers();
                const data = await response.json();

                setOfficers(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchOfficers();

    }, []);

    return (

        <section
            id="team"
            className="container py-24 sm:py-32"
        >

            <h2 className="text-3xl md:text-4xl font-bold">
                Our
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "} Homeowners Association {" "}
                </span>
                Officers
            </h2>

            <p className="mt-4 mb-10 text-xl text-muted-foreground">
                These are the names of our current Grand Cedar Homes officers.
            </p>

            <div className="flex flex-wrap gap-8 gap-y-10">
                {officers && [...officers].sort((a, b) => {
                    const positions = ["President", "Vice President", "Secretary", "Treasurer", "Auditor"];
                    return positions.indexOf(a.userPosition) - positions.indexOf(b.userPosition);
                }).map((officer) => (
                    <Card
                        key={officer._id}
                        className="w-[calc(33.333%-1.333rem)] min-w-[250px] flex-grow bg-muted/50 relative flex flex-col justify-center items-center py-4"
                    >
                        <CardHeader className="flex justify-center items-center pb-2">
                            <CardTitle className="text-center">{officer.userBlkLt}</CardTitle>
                            <CardDescription className="text-primary">
                                {officer.userPosition}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>

        </section>

    );
};