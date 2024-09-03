import { Button } from "@/components/ui/button";



export const CTA = () => {



  return (

    <section
        id="cta"
        className="bg-muted/50 py-16 my-24 sm:my-32"
    >

        <div className="container lg:grid lg:grid-cols-2 place-items-center">
            
            <div className="lg:col-start-1">

                <h2 className="text-3xl md:text-4xl font-bold ">
                    Already have an
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    {" "}
                        account?{" "}
                    </span>
                </h2>
                <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
                    Login now or contact the management and have an account created!
                </p>

            </div>

            <div className="space-y-4 lg:col-start-2">

                <Button className="w-full md:mr-4 md:w-auto"> <a href="/login"> Login </a> </Button>
                <Button
                    variant="outline"
                    className="w-full md:w-auto"
                >
                    <a href="#contact"> Contact Us </a>
                </Button>

            </div>

        </div>

    </section>

  );
};