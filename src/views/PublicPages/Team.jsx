import React from 'react';

//components
import CardTeam from '@components/Team/CardTeam';

//assets
import mainImg from '@images/Team/main.jpg'
import memberImg from '@images/Team/imgTeam_1.png'
import info01 from '@images/Team/info01.jpg'

//styles
import '@styles/componentes/Team/Team.scss'

const listTeam = [{
    image: memberImg,
    name: 'Juan Camilo Chaparro',
    profession: 'Industrial Enginner',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna risus massa aliquam in enim suspendisse',
    contact: 'https://github.com/JuanC-JC',
  },
  {
    image: memberImg,
    name: 'Isabela Jimenez Salazar',
    profession: 'Industrial Enginner',
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
          <h3>Lorem Ipsum</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Interdum nisl diam urna ipsum turpis nisl mi enim. Lorem </p>
          <p>congue erat adipiscing mauris sed blandit porttitor adipiscing. Eu euismod adipiscing interdum pharetra malesuada etiam.</p>
        </div>
      </div>

    </div>
);
};