import React from 'react';
import home from '../assets/static/home-icon.svg'
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

import '../assets/styles/componentes/MenuMobile.scss';

function MenuMobile(props){

  const history = useHistory()

  const {isOpenMenuMobile,toggleMenuMobile} = props

  const [isOpenProfileMenu,setIsOpenProfileMenu] = useState(false)

  const toggleProfileMenu = (e) =>{
    setIsOpenProfileMenu(!isOpenProfileMenu)
  }

  const closeSession = () =>{
    history.push('/')
    toggleMenuMobile()
  }

  return(

  <div className={`menuMobile ${isOpenMenuMobile && 'menuMobile--open'}`}>

    <svg onClick={toggleMenuMobile} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.76 0C15.417 0 20 4.477 20 10C20 15.523 15.416 20 9.76 20C6.569 20 3.618 18.563 1.69 16.154C1.63595 16.0867 1.59598 16.0093 1.57246 15.9262C1.54894 15.8432 1.54234 15.7563 1.55307 15.6706C1.5638 15.585 1.59163 15.5024 1.6349 15.4277C1.67818 15.3531 1.73603 15.2879 1.805 15.236C1.94565 15.129 2.12243 15.0809 2.2979 15.102C2.47336 15.1231 2.63372 15.2117 2.745 15.349C4.423 17.444 6.985 18.692 9.761 18.692C14.676 18.692 18.661 14.8 18.661 10C18.661 5.2 14.676 1.308 9.761 1.308C8.43481 1.3029 7.12402 1.59223 5.92319 2.15512C4.72237 2.718 3.66146 3.54041 2.817 4.563C2.70396 4.69904 2.54236 4.78569 2.36648 4.80454C2.19061 4.8234 2.01431 4.77299 1.875 4.664C1.80663 4.61123 1.74956 4.54524 1.70721 4.46997C1.66486 4.39469 1.63808 4.31167 1.62847 4.22583C1.61886 4.14 1.62662 4.05311 1.65127 3.97033C1.67593 3.88756 1.71699 3.81059 1.772 3.744C3.703 1.394 6.615 0 9.761 0H9.76ZM10.305 6.862L13.012 9.569C13.274 9.831 13.279 10.249 13.023 10.505L10.38 13.15C10.3178 13.2109 10.2442 13.2589 10.1634 13.2913C10.0826 13.3237 9.99625 13.3398 9.90922 13.3388C9.82219 13.3378 9.73621 13.3196 9.65621 13.2853C9.57621 13.251 9.50376 13.2013 9.443 13.139C9.38075 13.0782 9.3311 13.0057 9.2969 12.9256C9.2627 12.8456 9.24462 12.7596 9.24369 12.6726C9.24276 12.5855 9.25901 12.4992 9.29149 12.4184C9.32397 12.3377 9.37206 12.2641 9.433 12.202L10.98 10.654L0.67 10.655C0.58298 10.6561 0.496606 10.6399 0.415819 10.6076C0.335032 10.5752 0.261417 10.5273 0.199188 10.4664C0.136958 10.4056 0.0873344 10.3331 0.0531556 10.253C0.0189768 10.173 0.000913806 10.087 0 10C0 9.639 0.3 9.346 0.67 9.346H10.938L9.38 7.787C9.31775 7.72617 9.2681 7.65367 9.2339 7.57363C9.1997 7.4936 9.18162 7.4076 9.18069 7.32057C9.17976 7.23354 9.19601 7.14718 9.22849 7.06644C9.26097 6.98569 9.30906 6.91214 9.37 6.85C9.49555 6.72767 9.66449 6.66013 9.83977 6.66219C10.0151 6.66425 10.1824 6.73575 10.305 6.861V6.862Z" fill="#B8B5B5"/>
    </svg>


    <ul>
      <li onClick={toggleProfileMenu}>
        <div className='menuMobile__option' >
          <img className='menuMobile__optionIcon' src={} alt="" />
          <div className='menuMobile__optionTitle'>Perfil</div>
        </div>

        <ul className={isOpenProfileMenu ? 'show' : ''}>
          <li>
            <Link className="menuMobile__option" onClick={toggleMenuMobile} to='/profile/settings'>
              <img className='menuMobile__optionIcon' src={home} alt="" />
              <div className='menuMobile__optionTitle'>Settings</div>
            </Link>
          </li>

          <li>
            <Link className="menuMobile__option" onClick={toggleMenuMobile} to='/profile/products' >
              <img className='menuMobile__optionIcon' src={home} alt="" />
              <div className='menuMobile__optionTitle'> My Products </div>
            </Link>
          </li>
        </ul>
      </li>

      <li onClick={toggleMenuMobile}>
        <Link className="menuMobile__option" to='/'  >
          <img className='menuMobile__optionIcon' src={home} alt="" />
          <div className='menuMobile__optionTitle'>Home</div>
        </Link>
      </li>

      <li onClick={toggleMenuMobile}>
        <Link className="menuMobile__option" to='/products'>
          <img className='menuMobile__optionIcon' src="" alt="" />
          <div className='menuMobile__optionTitle' >Productos</div>
        </Link>
      </li>

      <li onClick={toggleMenuMobile}>
        <Link className="menuMobile__option" to='/contact' >
          <img className='menuMobile__optionIcon' src={aboutUs} alt="" />
          <div className='menuMobile__optionTitle' >About Us</div>
        </Link>
      </li>
    </ul>

    
    <span onScroll={toggleMenuMobile} onClick={toggleMenuMobile}></span>

  </div>
  )
}

export default MenuMobile