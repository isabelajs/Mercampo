import React from 'react';
import '../../../assets/styles/componentes/Home/HowItWorksSection/HowItWorksSection.scss'
import producerImg from '../../../assets/static/Home/HowItWorksSection/agriculturalProducer.svg'
import userImg from '../../../assets/static/Home/HowItWorksSection/user.svg'

import HowItWorksBlock from './HowItWorksBlock';

export default function HowItWorksSection () {
    return (
    <section className='howItWorksSection'>
      <div className="howItWorksSection__content">
        <h2>¿Cómo funciona?</h2>
        <p>Brindamos una vitrina virtual donde los productores pueden exponer sus productos, de manera que atraigan a su posibles comprados</p>
      

        <HowItWorksBlock title='Productor Agricola' image={producerImg} left>
          <p>Cualquier productor puede vender en nuestra plataforma, con sólo seguir estos simples pasos: </p>
          <p>1. Seleccionar los mejores productos a vender.</p>
          <p>2. Registrase en nuestra plataforma,    ingresando datos de contacto y ubicación.</p>
          <p>3. Crear cada producto a vender detallando su cantidad, disponibilidad, ubicación y precio. </p>
          <p>Así su inscripción estará lista y los productos estará en nuestra vitrina virtual a la vista de posibles compradores.</p>
        </HowItWorksBlock>

        <HowItWorksBlock title='Usuarios' image={userImg}>
          <p>Los compradores  pueden ingresar  a buscar el producto de su elección directamente o como resutado de la clasificación de nuestros filtros. </p>
          <p>Una vez seleccionado el producto se encontrará información sobre su cantidad, disponibilidad y ubicación, además de los datos de contacto del vendedor.</p>
          <p>Así su inscripción estará lista y los productos estará en nuestra vitrina virtual a la vista de posibles compradores.</p>
        </HowItWorksBlock>
      </div>
    </section>
)};

