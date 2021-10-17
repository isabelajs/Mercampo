import React from 'react';
import { Link } from 'react-router-dom';

import '@styles/componentes/Team/CardTeam.scss'

export default function CardTeam ({image,name,profession,text,contact}) {

    return (
      <div className="cardTeam">
      
      <Link to={contact || '/'} target='_blank'>
        <div className="cardTeam__imgContainer">
          <img src={image} alt="" />
          <div className="cardTeam__title">
            {name}
          </div>
        </div>
      </Link>

      <p className="cardTeam__text">
        {profession}
        <br />
        {text}
      </p>
    </div>
);
};