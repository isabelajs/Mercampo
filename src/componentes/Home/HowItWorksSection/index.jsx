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
          <p> <span>1.</span>  Seleccionar los mejores productos a vender.</p>
          <p> <span>2.</span> Registrase en nuestra plataforma,    ingresando datos de contacto y ubicación.</p>
          <p> <span>3.</span> Crear cada producto a vender detallando su cantidad, disponibilidad, ubicación y precio. </p>
          <p>Así su inscripción estará lista y los productos estará en nuestra vitrina virtual a la vista de posibles compradores.</p>
        </HowItWorksBlock>

        <HowItWorksBlock ref={sectionRefTwo} className='fade-in fade-in--right' title='Usuarios' image={userImg}>
          <p>Los compradores  pueden ingresar  a buscar el producto de su elección directamente o como resutado de la clasificación de nuestros filtros. </p>
          <p>Una vez seleccionado el producto se encontrará información sobre su cantidad, disponibilidad y ubicación, además de los datos de contacto del vendedor.</p>
          <p>Así su inscripción estará lista y los productos estará en nuestra vitrina virtual a la vista de posibles compradores.</p>
        </HowItWorksBlock>
      </div>
    </section>
  )
};

