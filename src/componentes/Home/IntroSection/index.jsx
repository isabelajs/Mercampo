import React from 'react';

import {ReactComponent as  MainImage} from '@images/Home/IntroSection/mainHero.svg'

import '@styles/componentes/Home/IntroSection/IntroSection.scss'

export default function IntroSection () {
    return (
      <section className='introSection section--gray'>
        <div className='introSection__info'>
          <h1 className='introSection__infoTitle'>Productos Campesinos <span> De la región </span></h1>
          <h2 className='introSection__infoText'>Compra Fresco y Facil !!</h2>
          <a href='#calendario' className='button button--second'>Nuestro Calendario</a >
        </div>
        <MainImage className='introSection__img' alt='Imagen principal' title='Imagen Principal'/>
      </section>
      
);
};