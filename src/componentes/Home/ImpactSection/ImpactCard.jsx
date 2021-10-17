import React from 'react';
import '@styles/componentes/Home/ImpactSection/ImpactCard.scss'

export default function ImpactCard ({counter,title,text}) {
    return (
    <div className="impactCard">
        <div className="impactCard__counter">{counter}</div>
        <div className="impactCard__info">
          <div className="impactCard__title">{title}</div>
          <div className="impactCard__text">{text}</div>
        </div>
      </div>
)};