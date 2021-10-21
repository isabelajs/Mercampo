import React from 'react';

//components
import CardTeam from '@components/Team/CardTeam';

//assets
import mainImg from '@images/Team/main.jpg'
import memberImg from '@images/Team/imgTeam_1.png'
import info01 from '@images/Team/info01.jpg'

import isaImg from '@images/Team/isa.jfif'
import juanImg from '@images/Team/juan.jfif'

//styles
import '@styles/componentes/Team/Team.scss'

const listTeam = [{
    image: juanImg,
    name: 'Juan Camilo Chaparro',
    profession: 'Frontend Developer',
    text: 'Ingeniero industrial enfocado en el desarrollo, diseño e implementacion de herramientas tecnologias para cualquier tipo de industria.',
    contact: 'https://github.com/JuanC-JC',
  },
  {
    image: isaImg,
    name: 'Isabela Jimenez Salazar',
    profession: 'Frontend Developer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna risus massa aliquam in enim suspendisse',
    contact: 'https://github.com/isabelajs',
  },
  {
    image: memberImg,
    name: 'Micaela Perrotta',
    profession: 'Graphic Designer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna risus massa aliquam in enim suspendisse',
    contact: '',
  },
]

export default function Team () {
    return (
    <div className='team'>

      <div className="team__imgContainer">
        <img src={mainImg} alt="imagen principal sobre nuestro equipo" />
        <h1>Team Mercampo</h1>
      </div>

      <h2>Nuestro Equipo</h2>

      <div className="team__cardsContainer">

        {
          listTeam.map(member => <CardTeam {...member}/>)
        }

      </div>


      <div className="team__info">
        <img src={info01} alt="Imagen de informacion acerca del equipo" />
        <div className="team__infoContainer">
          <h3>¿Quienes somos?</h3>
          <p> Somos un equipo multidisciplinar que transforma las oportunidades en estrategias de mejora, potencializando los resultados. </p>
          <p>Nuestro objetivo es brindar mayores oportunidades de visualización en el mercado digital a los pequeños productores y comercializadores.</p>
        </div>
      </div>

    </div>
);
};