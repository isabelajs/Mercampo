import React, { useRef } from 'react';
import producerImg from '@images/Home/HowItWorksSection/producerMain.svg'
import userImg from '@images/Home/HowItWorksSection/userMain.svg'

import HowItWorksBlock from './HowItWorksBlock';

import { useScrollReveal } from '@hooks'
import '@styles/componentes/Home/HowItWorksSection/HowItWorksSection.scss'


export default function HowItWorksSection() {

  const sectionRef = useRef(null)
  const sectionRefTwo = useRef(null)

  useScrollReveal([sectionRef, sectionRefTwo])

  return (
    <section className='howItWorksSection section--gray section--separation'>
      <div className="howItWorksSection__content">
        <h2>¿Cómo funciona?</h2>
        {/* <p>Brindamos una vitrina virtual donde los productores pueden exponer sus productos, de manera que atraigan a su posibles comprados</p> */}


        <HowItWorksBlock ref={sectionRef} className='fade-in' title='Productor Agricola' image={producerImg} left>
          <p>Cualquier productor puede vender en nuestra plataforma, con sólo seguir estos simples pasos: </p>
          <p> <span>1.</span>  Selecciona los productos que deseas  vender.</p>
          <p> <span>2.</span> Registrate en nuestra plataforma, ingresando tus datos de contacto y ubicación.</p>
          <p> <span>3.</span> Ingresa cada producto que deseas vender detallando su cantidad, disponibilidad, ubicación y precio.  </p>
          <p>Una vez terminado el proceso, tus productos estarán listos, para ser vistos en la web. </p>
        </HowItWorksBlock>

        <HowItWorksBlock ref={sectionRefTwo} className='fade-in fade-in--right' title='Usuarios' image={userImg}>
          <p>Los usuarios al ingresar a nuestra plataforma podrán encontrar los productos de su elección haciendo uso de nuestros filtros o por medio del buscador. </p>
          <p>Una vez identificado el producto que desean adquirir, podrán seleccionarlo, de manera que puedan ver más  información sobre su cantidad, disponibilidad y ubicación, además de los datos de contacto del vendedor.</p>
        </HowItWorksBlock>
      </div>
    </section>
  )
};

