import React from 'react';
import NewsCard from './NewsCard';
import image01 from '../../../assets/static/Home/NewsSection/image01.png'
import image02 from '../../../assets/static/Home/NewsSection/image02.png'

import '../../../assets/styles/componentes/Home/NewsSection/NewsSection.scss'

const news = [
    {
        title: 'Feria de emprendimiento de la mujer',
        content: '¡Celebramos el emprendimiento de la mujer llanera!Acompáñenos este domingo 29 de agosto en el parque principal, un gran espacio para compartir y apoyar o al espacio que le permitirá a las mujeres mostrar sus negocios, su capacidad de generar empleo y su contribución a la reactivación de la economía local.',
        image: image01,
        date: 'Agosto 29, 2021',
    },
    {
        title: 'Feria de emprendimiento de la mujer',
        content: 'Habrá variedad de productos de nuestro campo, comidas típicas, presentaciones artísticas y culturales, sorteos y premios para nuestros CAMPESINOS en homenaje a su labor. Apoyemos nuestros campesinos, compremos sus productos.',
        image: image02,
        date: 'Junio 13, 2021',
    },
]

export default function NewsSection () {
    return (
    <section id='calendario' className='newsSection section--separation'>
        <h2 >Calendario</h2>

        <div className="newsSection__cardsContainer">
            {
                news.length  > 0 && news.map((element,index) => <NewsCard key={`card_${index}`} title={element.title} content={element.content} image={element.image} date={element.date}/>)
            }
        </div>
    </section>
)};