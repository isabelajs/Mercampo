import React from 'react';
import {Link} from 'react-router-dom'

export default function MenuLink ({callback, to,icon,title}) {
  return (
    <li className='modalMenuOption' onClick={callback}>
      <Link className="modalMenuOption__optionLink" to={to}  >
        <img className='modalMenuOption__optionIcon' src={icon} alt="" />
        <div className='modalMenuOption__optionTitle'>{title}</div>
      </Link>
    </li>
  );
};  