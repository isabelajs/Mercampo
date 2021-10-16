import React from 'react';

import {ReactComponent as  MainImage} from '../../../assets/static/Home/IntroSection/main.svg'

import '../../../assets/styles/componentes/Home/IntroSection/IntroSection.scss'

export default function IntroSection () {
    return (
      <section className='introSection section--gray'>
        <div className='introSection__info'>
          <h1 className='introSection__infoTitle'>Productos Campesinos <span> Frescos & asequibles </span></h1>
          <div className='introSection__infoText'>Apoya tu economía local descubriendo cientos de productos</div>
          <a href='#calendario' className='button button--second'>Nuestro Calendario</a >
        </div>
        <MainImage className='introSection__img'/>
      </section>
      
);
};