import React, {useState} from 'react';

import '../../assets/styles/componentes/MenuModal/subMenu.scss'

export default function SubMenu ({icon,title,children}){
  const [isOpenOptions,setIsOpenOptions] = useState(false)

  const toggleOpenOptions = ()=>{
    setIsOpenOptions(!isOpenOptions)
  }

  return (
    <li className='modalMenuOption' onClick={toggleOpenOptions}>
      
      <div className='modalMenuOption__option' >
        <img className='modalMenuOption__optionIcon' src={icon} alt="" />
        <div className='modalMenuOption__optionTitle'>{title}</div>
      </div>

      <ul className={ `modalMenuSubMenu ${isOpenOptions ? 'show' : ''}`}>
        {children}
      </ul>
      
    </li>
  )

}

