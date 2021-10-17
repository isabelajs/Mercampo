import React, {cloneElement, useState} from 'react';

import '@styles/componentes/ModalMenu/SubMenu.scss'

export default function SubMenu ({icon,title,children, typeOptionsSubmenu = false, type}){
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

      <ul onClick={typeOptionsSubmenu  ? undefined : toggleOpenOptions } className={ `modalMenuSubMenu ${isOpenOptions ? 'show' : ''}`}>
        {
          React.Children.map(children,(child)=> cloneElement(child,{type}))
        }
      </ul>

    </li>
  )

}

//menu link true o false