import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import larryNotification from "../../assets/larry-notification.png";
import { Facebook, Map, Phone, Smartphone } from 'lucide-react';



interface ServiceProps {
    title: string;
    description: string;
    icon: JSX.Element;
}



const serviceList: ServiceProps[] = [
    {
        title: "Landline - 0286725190",
        description:
        "",
        icon: <Phone className="w-6 h-6" color="#5ec26a" />,
    },
    {
        title: "Mobile Number - 09494084926",
        description:
        "",
        icon: <Smartphone className="w-6 h-6" color="#5ec26a" />,
    },
    {
        title: "Facebook Group",
        description:
        "https://www.facebook.com/groups/2078598922381311/",
        icon: <Facebook className="w-6 h-6" color="#5ec26a" />,
    },
    {
        title: "Office Address",
        description:
        "https://maps.app.goo.gl/uNNbiyhhtyiXm3J88",
        icon: <Map className="w-6 h-6" color="#5ec26a" />,
    },
    ];



export const Contacts = () => {

    return (

        <section id="contact" className="container py-24 sm:py-32">

            <div className="grid lg:grid-cols-[1fr,1fr] gap-8 place-items-center">

                <div>

                    <h2 className="text-3xl md:text-4xl font-bold">
                        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                            Contact {" "}
                        </span>
                        Us
                    </h2>

                    <p className="text-muted-foreground text-xl mt-4 mb-8 ">
                        Contact the Grand Cedar Homes management and we'll accommodate you as soon as we can.
                    </p>

                    <div className="flex flex-col gap-8">
                        
                        {serviceList.map(({ icon, title, description }: ServiceProps) => (
                        <Card key={title}>
                            <CardHeader className="space-y-1 flex md:flex-row justify-start items-center gap-4">

                                <div className="mt-1 mb-2 bg-primary/20 p-5 rounded-2xl">
                                    {icon}
                                </div>

                                <div>
                                    <CardTitle> {title} </CardTitle>
                                    <CardDescription className="text-md mt-2">
                                        <a className="hover:underline" href={description} target="_blank"> {description} </a>
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                        ))}

                    </div>
                </div>

                <img
                    src={larryNotification}
                    className="w-[90px] md:w-[180px] lg:w-[270px] object-contain"
                    alt="About services"
                />
                
            </div>

        </section>

    );
};