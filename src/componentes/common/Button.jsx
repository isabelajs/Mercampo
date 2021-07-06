import React from 'react';
import '../../assets/styles/generales/Button.scss'

const Button = (props)=>{

  return(
    <div className={`Button ${ props.color }`}>
      <div className='Button__text'>
      {props.text}
      </div>
    </div>
  )
}

export default Button