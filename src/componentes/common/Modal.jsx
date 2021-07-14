import React, { useEffect } from 'react';
import '../../assets/styles/componentes/Modal.scss'

function Modal (props){

  const {status,handleClose} = props


  const prueba = ()=>{
      handleClose()
  }

  useEffect(()=>{
    document.addEventListener('click',prueba)
    return (
      ()=>{
        document.removeEventListener('click',prueba)
      }
    )
  },[])

    return (
      <div className="Modal" >
        <div className="Modal__container">
          <button onClick={handleClose} className='Modal__button--close'> x</button>
          <div className="Modal__text">{status.message}</div>
        </div>
      </div>
    )
  
}

export default Modal