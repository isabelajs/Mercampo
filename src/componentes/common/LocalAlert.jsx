/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
// import { useCallback } from 'react';

import '@styles/componentes/Alert.scss'


//closeAlert debe ser memorizado para poder eliminar correctamente la funcion
export default function LocalAlert ({alertStatus,closeAlert}) {

  const ref = useRef();

  useEffect(()=>{

    // let timer 

    if(ref.current){
      ref.current.addEventListener('animationend',closeAlert)
    }

    // if(alertStatus.isOpen){

    //   timer = setTimeout(() => {
    //     closeAlert()
    //   }, 4000);
    // }

    return () => {
      if(ref.current) ref.current.removeEventListener('animationend',closeAlert)
      // clearTimeout(timer)
    }

  },[alertStatus])


    let message = ' '

    switch (alertStatus.message){
      case ('auth/email-already-in-use'):
        message = 'El correo que intentas registrar, ya se encuentra en uso'
        break
      case ('auth/invalid-email'):
        message = 'El correo que intentas registrar no es válido'
        break
      case ('auth/wrong-password'):
        message = 'La contraseña es incorrecta'
        break
      case ('auth/user-not-found'):
        message = 'El usuario no se encuentra registrado'
        break
      case ('auth/too-many-requests'):
        message = 'A ocurrido un error porfavor intentelo mas tarde'
        break
      
      default:
        message = alertStatus.message
    }


    if(alertStatus.isOpen){
      return (
        <div ref={ref} className={`containerAlert ${alertStatus.error ? 'containerAlert--error' :'containerAlert--successful' }`}>
            <div>
              {
                alertStatus.error ? 
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 0C4.95 0 0 4.95 0 11C0 17.05 4.95 22 11 22C17.05 22 22 17.05 22 11C22 4.95 17.05 0 11 0ZM10.1357 4.71429H11.8643V13.3571H10.1357V4.71429V4.71429ZM11 18.0714C10.3714 18.0714 9.82143 17.5214 9.82143 16.8929C9.82143 16.2643 10.3714 15.7143 11 15.7143C11.6286 15.7143 12.1786 16.2643 12.1786 16.8929C12.1786 17.5214 11.6286 18.0714 11 18.0714Z" fill="#FE043C"/>
                </svg>
                :
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27006 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z" fill="#2EC4B6"/>
                </svg>
              }
              { message }
            </div>
          </div>
      )
    }
    else{
      return null
    }
}