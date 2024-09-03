import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards.tsx";



export const Hero = () => {

    return (

        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
                
            <div className="text-center lg:text-start space-y-6">

                <main className="text-5xl md:text-6xl font-bold">

                    <h1 className="inline">
                        <span className="inline bg-gradient-to-r from-[#b6f492]  to-[#338b93] text-transparent bg-clip-text">
                            Grand Cedar Homes
                        </span>{" "}
                        website
                    </h1>{" "}

                    for{" "}

                    <h2 className="inline">
                        <span className="inline">
                            unit owners
                        </span>{" "}
                    </h2>
                    
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Monitor your online transactions and keep up to date with GCHOAI announcements
                    at the palm of your hands.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">

                    <Button className="w-full md:w-1/3"> <a href="/login"> Log In </a> </Button>

                    <a
                        rel="noreferrer noopener"
                        href="#contact"
                        className={`w-full md:w-1/3 ${buttonVariants({
                        variant: "outline",
                        })}`}
                    >
                        Contact Us
                    </a>

                </div>

            </div>

            {/* Hero cards sections */}
            <div className="z-10">
                <HeroCards />
            </div>

            {/* Shadow effect */}
            <div className="shadow"> </div>
            <div className="shadow"> </div>
        </section>
        
    );
};