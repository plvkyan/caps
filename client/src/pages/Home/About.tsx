import { Statistics } from "./Statistics";
import pilot from "../../assets/pilot.png";



export const About = () => {



  return (

    <section
        id="about"
        className="container py-24 sm:py-32"
    >

        <div className="bg-muted/50 border rounded-lg py-12">

            <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">

                <img
                    src={pilot}
                    alt=""
                    className="w-[300px] object-contain rounded-lg"
                />

                <div className="bg-green-0 flex flex-col justify-between">

                    <div className="pb-6">

                        <h2 className="text-3xl md:text-4xl font-bold">
                            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                            About{" "}
                            </span>
                            Grand Cedar Homes
                        </h2>

                        <p className="text-xl text-muted-foreground mt-4">
                            Grand Cedar Homes in Bignay, Valenzuela City, offers 
                            modern-style residences ideal for families. Residents 
                            enjoy amenities like basketball courts, playgrounds, 
                            and a pavilion. Conveniently located near malls and 
                            transportation hubs, this subdivision provides a blend 
                            of comfort and accessibility, with the flexibility for 
                            homeowners to personalize their units.
                        </p>

                    </div>

                    <Statistics />

                </div>

            </div>

        </div>

    </section>

  );
};