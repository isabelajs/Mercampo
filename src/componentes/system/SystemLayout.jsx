import React from 'react';
import SystemLocation from './SystemLocation'
import '../../assets/styles/componentes/SystemLayout.scss'

const SystemLayout = ({children,links, type})=>{

  return (
    <div className='system'>
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