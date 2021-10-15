import React from 'react';
import '../../../assets/styles/componentes/Home/HowItWorksSection/HowItWorksBlock.scss'

export default function HowItWorksBlock ({title,children,image,left}) {
    return (
      <div className={`howItWorksBlock ${ left ? "howItWorksBlock--left" : ''}`}>
        <div className="howItWorksBlock__info ">
          <h3 className='howItWorksBlock__title'>{title}</h3>
          <div className="howItWorksBlock__text">
            {children}
          </div>
        </div>
        <img className='howItWorksBlock__img' src={image} alt="" />
      </div>
)};

