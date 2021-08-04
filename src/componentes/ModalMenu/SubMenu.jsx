import React, {useState} from 'react';


import '../../assets/styles/componentes/ModalMenu/SubMenu.scss'

export default function SubMenu ({icon,title,children}){
  const [isOpenOptions,setIsOpenOptions] = useState(false)

  const toggleOpenOptions = ()=>{
    setIsOpenOptions(!isOpenOptions)
  }

  return (
    <li className='modalMenuOption' onClick={toggleOpenOptions}>
      
      <div className='modalMenuOption__option' >
        {icon && <img className='modalMenuOption__optionIcon' src={icon} alt="" />}
        
        <div className='modalMenuOption__optionTitle'>{title}</div>
      </div>

      <ul className={ `modalMenuSubMenu ${isOpenOptions ? 'show' : ''}`}>
        {children}
      </ul>
      
    </li>
  )

}

