import React from "react";
import homeImg from '../assets/static/hero-1.jpg'
import '../assets/styles/componentes/Home/Home.scss'

import AboutUsSection from "../componentes/Home/AboutUsSection";
import ImpactSection from "../componentes/Home/ImpactSection/ImpactSection";

export default function Home(props) {

  return (
    <main className="home">
      <div className='home-infoContainer'>
        <div className='home__info'>
          <h1 className='home__infoTitle'>Productos Campesinos <span> Frescos & asequibles </span></h1>
          <p className='home__infoText'>Apoya tu economía local descubriendo cientos de productos</p>
          <button className='button button--main'>Nuestro Calendario</button>
        </div>
        <img loading='lazy' src={homeImg} alt="" />
      </div>
      

      <AboutUsSection/>
      <ImpactSection/>

    </main>
  );
}
