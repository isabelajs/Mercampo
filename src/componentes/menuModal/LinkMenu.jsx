import React from 'react';
import {Link} from 'react-router-dom'

import '../../assets/styles/componentes/MenuModal/LinkMenu.scss'

export default function LinkMenu ({callback, to,icon,title}) {
  return (
    <li className='modalMenuOption' onClick={callback}>
      <Link className="modalMenuOption__optionLink" to={to}  >
        <img className='modalMenuOption__optionIcon' src={icon} alt="" />
        <div className='modalMenuOption__optionTitle'>{title}</div>
      </Link>
    </li>
  );
};  