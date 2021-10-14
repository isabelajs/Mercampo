import React from 'react';
import ImpactCard from './ImpactCard';
import '../../../assets/styles/componentes/Home/ImpactSection/ImpactSection.scss'

export default function ImpactSection () {
    return (
    <section className='impactSection'>
      <h2 className="green">Nuestro impacto</h2>
      <div className="impactCardsContainer">
        <ImpactCard counter={150} title='Productos' text='Agricolas'/>
        <ImpactCard counter={1500} title='Visitas' text='Diarias'/>
        <ImpactCard counter={35} title='Usuarios' text='Registrados'/>
      </div>
    </section>
);
};