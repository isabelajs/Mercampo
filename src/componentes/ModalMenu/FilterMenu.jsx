import React from 'react';

//componentes 
import ModalMenu from './ModalMenu';
import MenuLink  from './MenuLink'
import SubMenu from './SubMenu'

import { signOut } from '../../utils/auth'

import '../../assets/styles/componentes/ModalMenu/MainMenu.scss'

const MainMenu = ({isOpenMenu,toggleMenu, userName, userImg})=>{

  return(
    <ModalMenu isOpen={isOpenMenu} toggleMenu={toggleMenu}>

      
    </ModalMenu>
  )
}




export default MainMenu