import React from 'react';

import '../../assets/styles/componentes/Alert.scss'

function LocalAlert ({alertStatus}){

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


    return (
      <>
      {
        alertStatus.isOpen && 
          <div className={`containerAlert ${alertStatus.error ? 'containerAlert--error' :'containerAlert--successful' }`}>
            <div className="alert"> { message }  </div>
          </div>
      }
      </>
    )
}


export default LocalAlert
