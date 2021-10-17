import React from "react";


import AboutUsSection from "../componentes/Home/AboutUsSection";
import ImpactSection from "../componentes/Home/ImpactSection";
import HowItWorksSection from "../componentes/Home/HowItWorksSection"
import OurGoalSection from "../componentes/Home/OurGoalSection"
import NewsSection from '../componentes/Home/NewsSection'
import IntroSection from "../componentes/Home/IntroSection";

import '@styles/componentes/Home/Home.scss'

export default function Home() {

  return (
    <main className="home">
      <div className="home__backgroundBlock">
        <IntroSection/>
        <AboutUsSection/>
        <ImpactSection/>
        <HowItWorksSection/>
      </div>
      
      <OurGoalSection/>
      <NewsSection/>

    </main>
  );
}
