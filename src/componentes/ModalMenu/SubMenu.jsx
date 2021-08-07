import React, {useState} from 'react';

import '../../assets/styles/componentes/ModalMenu/SubMenu.scss'

export default function SubMenu ({icon,title,children, typeSubmenu = 'menuLink'}){
  const [isOpenOptions,setIsOpenOptions] = useState(false)

  const toggleOpenOptions = ()=>{
    setIsOpenOptions(!isOpenOptions)
  }

  return (
    <li className='modalMenuOption'>
      
      <div className='modalMenuOption__option' onClick={toggleOpenOptions} >
        {icon && <img className='modalMenuOption__optionIcon' src={icon} alt="" />}
        
        <div className='modalMenuOption__optionTitle'>{title}</div>
      </div>

      { typeSubmenu === 'menuLink'
        ?
        <ul onClick={toggleOpenOptions} className={ `modalMenuSubMenu ${isOpenOptions ? 'show' : ''}`}>
          {children}
        </ul>
        :
        <ul className={ `modalMenuSubMenu ${isOpenOptions ? 'show' : ''}`}>
          {children}
        </ul>
      }

      
    </li>
  )

}

//menu link true o false