import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@images/logo.png'

import {ReactComponent as TwitterIcon} from '@images/Icons/Twitter.svg'
import {ReactComponent as InstagramIcon} from '@images/Icons/Instagram.svg'
import {ReactComponent as FacebookIcon} from '@images/Icons/Facebook.svg'

import '@styles/componentes/Footer.scss'

export default function Footer() {
  return (
    <footer className='footer'>

      <div className="top">

       <Link to='/'> <img className='footer__mainLogo' src={Logo} alt="" /></Link>
        {/* <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/products'>Products</Link>
            </li>
            <li>
              <Link to='/contact'>About Us</Link>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </nav> */}

        <div className="footer__socialMedia">
          <Link to='/'> <FacebookIcon/> </Link>
          <Link to='/'><InstagramIcon/></Link>
          <Link to='/'><TwitterIcon/></Link>
        </div>
      </div>

      <div className="copyright">
        © Develop by JuanCJC & IsaJS - All Rights Reserved
      </div>
    </footer>
  );
};
