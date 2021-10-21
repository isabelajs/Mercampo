import React from 'react';
import {Link, useHistory } from 'react-router-dom';

//images
// import homeIcon from '@images/home-icon.svg'
import homeIcon from '@images/Icons/home.svg'
import profileIcon from '@images/Icons/profile.svg'
import productsIcon from '@images/Icons/products.svg'
import aboutUsIcon from '@images/Icons/aboutUs.svg'

//componentes 
import ModalMenu from './ModalMenu';
import MenuLink  from './MenuLink'
import SubMenu from './SubMenu'

import { signOut } from '@utils/auth'

import '@styles/componentes/ModalMenu/MainMenu.scss'


const MainMenu = ({isOpenMenu,toggleMenu, userName, userImg})=>{
  const history = useHistory()

  const closeSession = () =>{
    history.push('/')
    toggleMenu()
    signOut()
  }

  return(
    <ModalMenu isOpen={isOpenMenu} toggleMenu={toggleMenu}>
      <div className="menuMain__user">
          {
            userImg ? 
              <img alt='userImg' src={userImg}></img>
            :
              <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M48.125 26.25C48.125 29.731 46.7422 33.0694 44.2808 35.5308C41.8194 37.9922 38.481 39.375 35 39.375C31.519 39.375 28.1806 37.9922 25.7192 35.5308C23.2578 33.0694 21.875 29.731 21.875 26.25C21.875 22.769 23.2578 19.4306 25.7192 16.9692C28.1806 14.5078 31.519 13.125 35 13.125C38.481 13.125 41.8194 14.5078 44.2808 16.9692C46.7422 19.4306 48.125 22.769 48.125 26.25V26.25Z" fill="#B8B5B5"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M0 35C0 25.7174 3.68749 16.815 10.2513 10.2513C16.815 3.68749 25.7174 0 35 0C44.2826 0 53.185 3.68749 59.7487 10.2513C66.3125 16.815 70 25.7174 70 35C70 44.2826 66.3125 53.185 59.7487 59.7487C53.185 66.3125 44.2826 70 35 70C25.7174 70 16.815 66.3125 10.2513 59.7487C3.68749 53.185 0 44.2826 0 35V35ZM35 4.375C29.2328 4.37531 23.5829 6.00409 18.7005 9.07387C13.8182 12.1437 9.90186 16.5297 7.40234 21.7271C4.90282 26.9245 3.92169 32.7221 4.57187 38.4526C5.22205 44.183 7.47711 49.6134 11.0775 54.1187C14.1838 49.1137 21.0219 43.75 35 43.75C48.9781 43.75 55.8119 49.1094 58.9225 54.1187C62.5229 49.6134 64.778 44.183 65.4281 38.4526C66.0783 32.7221 65.0972 26.9245 62.5977 21.7271C60.0981 16.5297 56.1818 12.1437 51.2995 9.07387C46.4171 6.00409 40.7672 4.37531 35 4.375V4.375Z" fill="#B8B5B5"/>
              </svg>
          }

          <p className='menuMain__userName'>{userName ? userName : 'username'}</p>
        </div>

      <ul>
        <SubMenu icon={profileIcon} title={'Perfil'} >
          <MenuLink callback={toggleMenu} to={'/profile/settings'} icon={homeIcon} title={'Configuración de perfil'}/>
          <MenuLink callback={toggleMenu} to={'/profile/products'} icon={homeIcon} title={'Mis productos'}/>
        </SubMenu>

        <MenuLink callback={toggleMenu} to={'/'} icon={homeIcon} title={'Home'}/>
        <MenuLink callback={toggleMenu} to={'/products'} icon={productsIcon} title={'Products'}/>
        <MenuLink callback={toggleMenu} to={'/contact'} icon={aboutUsIcon} title={'About us'}/>
      </ul>
      
      {
      userName ? 
        <div onClick={closeSession} className='menuMain__login' >Log out</div>
      :
        <Link className='menuMain__login' to='/login'>Log In</Link>
      }
  
    </ModalMenu>
  )
}







export default MainMenu