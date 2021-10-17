import React from 'react';
import SystemLocation from './SystemLocation'
import '@styles/componentes/SystemLayout.scss'
import {Link} from 'react-router-dom'

const SystemLayout = (props)=>{
  
  const {children , links, type} = props

  return (

    <div className='system'>
      <div className="system__buttons">
        <Link to='/profile/settings'><div className={`system__button ${type === 'settings' ? 'selected': ''}`}>Mi perfil</div></Link>
        <Link to='/profile/products'><div className={`system__button ${type === 'settings' ? '' : 'selected'}`}>Mis Productos</div></Link>
      </div>

      <div className="l-system">
        <SystemLocation links={links} type={type} />
        <div className="system-view">
          {children}
        </div>
      </div>
    </div>
  )
}

export default SystemLayout
