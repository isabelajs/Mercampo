import React from "react";
import Orbit from '@components/common/orbit'

//components
import {AboutUsSection, ImpactSection, HowItWorksSection, OurGoalSection, NewsSection, IntroSection} from '@components/Home'

//styles
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
      <Orbit>
        <h1>Text</h1>
      </Orbit>

    </main>
  );
}
