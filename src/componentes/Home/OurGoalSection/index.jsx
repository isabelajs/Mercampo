import React from 'react';
import image01 from '../../../assets/static/Home/OurGoalSection/image01.png'
import image02 from '../../../assets/static/Home/OurGoalSection/image02.png'

import '../../../assets/styles/componentes/Home/OurGoalSection/OurGoalSection.scss'

export default function OurGoalSection () {
    return (
    <section className='ourGoalSection'>

      <h2 className='green'>Nuestra Meta</h2>

      <div className="ourGoalSection__imgsContainer">
        <img src={image02} alt="imagen acerca de nuestra meta" />
        <img src={image01} alt="imagen acerca de nuestra meta" />
      </div>

      <div className="ourGoalSection__info">
        <p className='ourGoalSection__text'>
          Crear una plataforma en línea, con la 
          participación de aliados estrategicos, donde los
          diferentes productos agricolas de distintas partes
          del país sean expuestos en una vitrina virtual, de 
          manera que  los  productos sean más visibles, 
          y la comunicación (entre vendedor--comprador)
          sea directa, haciendo que  el proceso de venta sea
          más rapido.
        </p>

        <button className="button button--second">Ver mas</button>
      </div>

    </section>
);
};