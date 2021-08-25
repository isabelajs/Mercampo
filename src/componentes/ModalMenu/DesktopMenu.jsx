import React from 'react';
import closeIcon from '../../assets/static/closeIcon.svg';
import profileIcon from '../../assets/static/profileIcon.svg'
import productsIcon from '../../assets/static/productsIcon.svg'
import '../../assets/styles/componentes/DesktopMenu.scss'
import { Link, useHistory } from 'react-router-dom';
import { signOut } from '../../utils/auth';

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
