import { LogoIcon } from "./Icons";

export const Footer = () => {



    return (

        <footer id="footer">
            
            <hr className="w-11/12 mx-auto" />

            <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">

                <div className="col-span-full xl:col-span-2">
                    <a
                        rel="noreferrer noopener"
                        href="/"
                        className="font-bold text-xl flex"
                    >
                        <LogoIcon />
                        Grand Cedar Homes
                    </a>
                </div>

                <div className="flex flex-col gap-2">

                    <h3 className="font-bold text-lg"> About Us </h3>
                    <div>
                        <a
                        rel="noreferrer noopener"
                        href="#about"
                        className="opacity-60 hover:opacity-100"
                        >
                            About Us
                        </a>
                    </div>

                </div>

                <div className="flex flex-col gap-2">

                    <h3 className="font-bold text-lg"> The Community </h3>
                    <div>
                        <a
                        rel="noreferrer noopener"
                        href="#theCommunity"
                        className="opacity-60 hover:opacity-100"
                        >
                            The Community
                        </a>
                    </div>

                </div>

                <div className="flex flex-col gap-2">

                    <h3 className="font-bold text-lg"> Contact Us </h3>
                    <div>
                        <a
                        rel="noreferrer noopener"
                        href="#contact"
                        className="opacity-60 hover:opacity-100"
                        >
                            Contact Us
                        </a>
                    </div>

                </div>

                <div className="flex flex-col gap-2">

                    <h3 className="font-bold text-lg"> FAQ </h3>
                    <div>
                        <a
                        rel="noreferrer noopener"
                        href="#faq"
                        className="opacity-60 hover:opacity-100"
                        >
                            FAQ
                        </a>
                    </div>

                </div>

            </section>

            <section className="container pb-14 text-center">

                <h3>
                    &copy; 2024 Grand Cedar Homes by {" "}
                    <a
                        rel="noreferrer noopener"
                        target="_blank"
                        href="https://www.facebook.com/RlphndrwDrgl"
                        className="text-primary transition-all border-primary hover:border-b-2"
                    >
                        De Regla et al
                    </a>
                </h3>

            </section>

        </footer>
    
    );
};