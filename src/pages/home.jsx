import React, { useState, useEffect } from "react";
import Header from "../components/header";
import bgHome from "../assets/image/bg_home_1.jpg";
import mobileViewBg from "../assets/image/bg_home_mobile.jpg";

// Importing sections
import Main from "../components/home/main";
import SectionMap from "../components/home/sectionmap";
import SectionAIScanner from "../components/home/AIScannerSection";
import DiscoverSection from "../components/home/discoverSection";
import MarketSection from "../components/home/marketSection";
import ContactUs from "../components/home/contactUs";

import Assitant from "./Assistant";

function Home() {
  const [bgImage, setBgImage] = useState(bgHome);

  useEffect(() => {
    const updateBg = () => {
      if (window.innerWidth < 768) {
        setBgImage(mobileViewBg);
      } else {
        setBgImage(bgHome);
      }
    };
    updateBg();
    window.addEventListener("resize", updateBg);
    return () => window.removeEventListener("resize", updateBg);
  }, []);

  return (
    <div className="w-full">
      <Header />
      <Main bgImage={bgImage} />
      <SectionMap bgImage={bgImage}/>
      <SectionAIScanner bgImage={bgImage}/>
      <Assitant bgImage={bgImage}/>
      <DiscoverSection bgImage={bgImage}/>
      <MarketSection bgImage={bgImage}/>
      <ContactUs bgImage={bgImage}/>
    </div>
  );
}

export default Home;
