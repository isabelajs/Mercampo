import React from 'react';
import home from '../assets/static/home-icon.svg'
import profile from '../assets/static/profile-icon.svg'
import aboutUs from '../assets/static/aboutUs-icon.svg'
import '../assets/styles/componentes/MenuMobile.scss';

function MenuMobile(){
  return(
    <div className="menuMobile">
      <div className="menuMobile__container">
        <div className="menuMobile__option">  
          <img className='menuMobile__icon' src={home} alt="" />
          <div className="menuMobile__title">INICIO</div>
        </div>
        <div className="menuMobile__option">  
          <img className='menuMobile__icon' src={profile} alt="" />
          <div className="menuMobile__title">PERFIL</div>
        </div>
        <div className="menuMobile__option">  
          <img className='menuMobile__icon' src={aboutUs} alt="" />
          <div className="menuMobile__title">ABOUT US</div>
        </div>
      </div>
      
    </div>
  )
}

export default MenuMobile