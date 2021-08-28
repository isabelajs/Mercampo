import React from "react";
import homeImg from '../assets/static/hero-1.jpg'
import '../assets/styles/Home.scss'

export default function Home(props) {

  return (
    <div className='home-container'>
      <div className='home__info'>
        <h2 className='home__infoTitle'>Productos Campesinos <span> Frescos & asequibles </span></h2>
        <p className='home__infoText'>Apoya tu economía local descubriendo cientos de productos</p>
        <button className='button button--main'>Nuestro Calendario</button>
      </div>
      <img loading='lazy' src={homeImg} alt="" />
    </div>
  );
}
