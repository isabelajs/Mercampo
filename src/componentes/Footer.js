import React from 'react';
import home from '../assets/static/home-icon.svg'
import profile from '../assets/static/profile-icon.svg'
import aboutUs from '../assets/static/aboutUs-icon.svg'
import '../assets/styles/componentes/Footer.scss';

function Footer(){
  return(
    <div className="footer">
      <div className="footer__container">
        <div className="footer__option">  
          <img className='footer__icon'src={home} alt="" />
          <div className="footer__title">INICIO</div>
        </div>
        <div className="footer__option">  
          <img className='footer__icon'src={profile} alt="" />
          <div className="footer__title">PERFIL</div>
        </div>
        <div className="footer__option">  
          <img className='footer__icon'src={aboutUs} alt="" />
          <div className="footer__title">ABOUT US</div>
        </div>
      </div>
      
    </div>
  )
}

export default Footer