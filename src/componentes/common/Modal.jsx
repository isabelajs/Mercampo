import React from 'react';
import { useEffect } from 'react';

import '../../assets/styles/generales/Modal.scss'

export default function Modal(props) {

  useEffect(()=>{
    if(props.isOpen){
      document.body.style.overflow = 'hidden'
    }

    return () => document.body.style.overflow = null

  },[props.isOpen])
  

  if(!props.isOpen) return null

  return (
    <div className='modal'>
      <div className="modal__container">
          <button onClick={props.closeCallback} className='modal__close'>x</button>
          {props.children}
      </div>
    </div>
  );
};
