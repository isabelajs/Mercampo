import React from 'react';

import '@styles/componentes/Team/CardTeam.scss'

export default function CardTeam ({image,name,profession,text,contact}) {

    return (
      <div className="cardTeam">
      
      <a href={contact || '/'} rel='noreferrer' target='_blank'>
        <div className="cardTeam__imgContainer">
          <img src={image} alt="" />
          <div className="cardTeam__title">
            {name}
          </div>
        </div>
      </a>

      <p className="cardTeam__text">
        {profession}
        <br />
        {text}
      </p>
    </div>
);
};