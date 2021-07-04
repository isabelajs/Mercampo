import React from 'react';
import logo from '../assets/static/logo.png'
import '../assets/styles/componentes/Header.scss';

function Header (){
  return(
    <header className='Header'>
      <img className='Header__logo'src={logo} alt="" />
    </header>
  )
}

export default Header