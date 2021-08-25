import React from 'react';
import '../../assets/styles/componentes/LayoutLoginMethod.scss'
import HomeImg from '../../assets/static/HomeImg.png'

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