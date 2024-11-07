import { About } from "./About.tsx";
import { CTA } from "./CTA.tsx";
import { FAQ } from "./FAQ.tsx";
import { Footer } from "./Footer.tsx";
import { Hero } from "./Hero.tsx";
import { TheCommunity } from "./TheCommunity.tsx";
import { Navbar } from "./Navbar.tsx";
import { Benefits } from "./Benefits.tsx";
import { ScrollToTop } from "./ScrollToTop.tsx";
import { Contacts } from "./Contacts.tsx";
import { Sponsors } from "./Sponsors.tsx";
import { Team } from "./Team.tsx";
import "../../index.css";
import { useEffect } from "react";



function Home() {

  

  useEffect(() => {
    document.title = "Home | Grand Cedar Homes"
  }, []);



  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <TheCommunity />
      {/* <Features /> */}
      <Contacts />
      <CTA />
      {/* <Testimonials /> */}
      <Team />
      <Benefits />
      {/* <Newsletter /> */}
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default Home;