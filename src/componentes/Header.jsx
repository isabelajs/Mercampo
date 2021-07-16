import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/static/logo.png'
import '../assets/styles/componentes/Header.scss';

function Header (){

  const history = useHistory()

  const handleClick = ()=>{
    history.push('/')
  }

  return(
    <header className='Header'>
      <img style={{cursor:'pointer'}} onClick={handleClick} className='Header__logo'src={logo} alt="" />
    </header>
  )
}

export default Header