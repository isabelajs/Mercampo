import React from "react";
import homeImg from '../assets/static/hero-1.jpg'
import '../assets/styles/Home.scss'

import imgQuienesSomosVertical from '../assets/static/imgHome-quienesSomos-vertical.png';
import imgQuienesSomosHorizontal from '../assets/static/imgHome-quienesSomos-horizontal.png';

export default function Home(props) {

  return (

    <main className="home">
      <div className='home-infoContainer'>
        <div className='home__info'>
          <h2 className='home__infoTitle'>Productos Campesinos <span> Frescos & asequibles </span></h2>
          <p className='home__infoText'>Apoya tu economía local descubriendo cientos de productos</p>
          <button className='button button--main'>Nuestro Calendario</button>
        </div>
        <img loading='lazy' src={homeImg} alt="" />
      </div>


      <section className="quienesSomos">

        <div className='quienesSomos__info'>
          <h2>¿Quiénes somos?</h2>
          <p>Somos una plataforma digital que permite crear una relación directa entre productores agricolas con sus clientes potenciales, evitando intermediariarios en el proceso.</p>
        </div>

        <div className="quienesSomos__containerAyudas">
          <div className="quienesSomos__ayuda">
            <img src="" alt="" />
            <p>Agronomia Sostenible</p>
          </div>
          <div className="quienesSomos__ayuda">
            <img src="" alt="" />
            <p>Apoyo a la comunidad</p>
          </div>
          <div className="quienesSomos__ayuda">
            <img src="" alt="" />
            <p>Negocios Verdes</p>
          </div>
          <div className="quienesSomos__ayuda">
            <img src="" alt="" />
            <p>Emprendimiento</p>
          </div>
        </div>

        <div className="quienesSomos__containerImgs">
          <img src={imgQuienesSomosHorizontal} alt="" className="quienesSomos__imgHorizontal" />
          <img src={imgQuienesSomosVertical} alt="" className="quienesSomos__imgVertical" />
        </div>

      </section>

    </main>
  );
}
