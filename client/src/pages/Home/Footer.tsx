export const Footer = () => {

    const theme = localStorage.getItem("vite-ui-theme");

    return (

        <footer id="footer">
            
            <hr className="w-11/12 mx-auto" />

            <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">

                <div className="flex items-center justify-center col-span-full xl:col-span-2">

                    { theme && theme === "dark" && (
                        <a
                        rel="noreferrer noopener"
                        href="/"
                    >
                        <img 
                        alt="Grand Cedar Homes"
                        className="max-w-64"
                        src="https://res.cloudinary.com/dmodbgukj/image/upload/v1730798270/grand-cedar-homes-new-logo-dark-mode_sucwgk.png" 
                        />
                    </a>
                    )}

{ theme && theme === "light" && (
                        <a
                        rel="noreferrer noopener"
                        href="/"
                    >
                        <img 
                        alt="Grand Cedar Homes"
                        className="max-w-64"
                        src="https://res.cloudinary.com/dmodbgukj/image/upload/v1730798254/grand-cedar-homes-new-logo-light-mode_fgdxbd.png" 
                        />
                    </a>
                    )}
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