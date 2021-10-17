import React from 'react';
import '@styles/componentes/LayoutLoginMethod.scss'
import HomeImg from '@images/HomeImg.png'

function LayoutLoginMethod ({children}){
  return(
    <div className='l-signMethod'>
      {children}
      <div className="imagen">
        <img src={HomeImg} alt="" sizes="" srcset="" />
      </div>
    </div>
  )
}

export default LayoutLoginMethod