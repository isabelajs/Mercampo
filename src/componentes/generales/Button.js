import React from 'react';
import '../../assets/styles/componentes/generales/Button.scss'

const Button = (props)=>{
  // const [text, color] = props

  return(
    <div className={`Button ${ props.color }`}>
      <div className='Button__text'>
      {props.text}
      </div>
    </div>
  )
}

export default Button