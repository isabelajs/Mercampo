import React from 'react';
import { connect } from 'react-redux';

import '../../assets/styles/componentes/Alert.scss'

//input the password is wrond

function Alert (props){
  const {statusAlert} = props
    let message = ' '
    switch (statusAlert.message){
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
    
      default:
        message = statusAlert.message
    }



    return (
      <>
      {
        statusAlert.isOpen && 
          <div className={`containerAlert ${statusAlert.error ? 'containerAlert--error' :'containerAlert--successful' }`}>
            <div className="alert"> { message }  </div>
          </div>
      }
      </>
    )
}

const mapStateToProps = state => {
  return{
    statusAlert : state.statusAlert
  }
}

export default connect (mapStateToProps,null)(Alert)


