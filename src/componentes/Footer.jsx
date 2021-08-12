import React from 'react';
import { Link } from 'react-router-dom';
import Facebook from '../assets/static/Facebook.svg'
import Twitter from '../assets/static/Twitter.svg'
import Instagram from '../assets/static/Instagram.svg'
import Logo from '../assets/static/logo.png'

import '../assets/styles/componentes/Footer.scss'

export default function Footer() {
  return (
    <footer className='footer'>

      <div className="top">

        <img className='footer__mainLogo' src={Logo} alt="" />
        <nav>
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
        </nav>

        <div className="footer__socialMedia">
          <img src={Facebook} alt="" />
          <img src={Instagram} alt="" />
          <img src={Twitter} alt="" />
          <img src={Facebook} alt="" />
        </div>
      </div>

      <div className="copyright">
        © Develop by JuanCJC & IsabelaJS - All Rights Reserved
      </div>
    </footer>
  );
};
