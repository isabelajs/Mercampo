import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import closeIcon from '@images/Icons/close.svg';
import profileIcon from '@images/Icons/profile.svg'
import productsIcon from '@images/Icons/products.svg'

import { signOut } from '@utils/auth';

import '@styles/componentes/DesktopMenu.scss'

export default function DesktopMenu(props) {

  const history = useHistory()

  const closeSession = () =>{
    history.push('/')
    signOut()
  }

  return (
    <div className='profileDesktopMenu profileDesktopMenu--open'>
      <Link to={'/profile/settings'} className="profileDesktopMenu__option">
        <img src={profileIcon} alt="" />
        <p> Configurar mi perfil</p>
      </Link>
      <Link to={'/profile/products'} className="profileDesktopMenu__option">
        <img src={productsIcon} alt="" />
        <p>Mis Productos</p>
      </Link>
      <div className="profileDesktopMenu__option" onClick={closeSession}>
        <img src={closeIcon} alt="" />
        <p>Cerrar sesión</p>
      </div>
    </div>
  );
};
