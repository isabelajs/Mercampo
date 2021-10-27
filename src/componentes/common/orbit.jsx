import React from 'react';

import '@styles/generales/Orbit.scss';

export default function Orbit({children}){

  const random = 1 + Math.floor(Math.random() * (5 - 1 + 1 ))

  return(

    <div class="wrapper">
        {children}
      {
          [...Array(12).keys()].map((n,i)=> <div className={`orbit orbit-${random}-${i+1}`}></div>)
      }
      </div>
  )
}
