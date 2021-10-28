import React, { forwardRef } from 'react';
import '@styles/componentes/Home/HowItWorksSection/HowItWorksBlock.scss'

function HowItWorksBlock({ title, children, image, left, className }, ref) {
  return (
    <div ref={ref} className={`howItWorksBlock ${className} ${left ? "howItWorksBlock--left" : ''}`}>
      <div className="howItWorksBlock__info ">
        <h3 className='howItWorksBlock__title'>{title}</h3>
        <div className="howItWorksBlock__text">
          {children}
        </div>
      </div>

      <embed className='howItWorksBlock__img' src={image} alt="" />
    </div>
  )
};

export default forwardRef(HowItWorksBlock)