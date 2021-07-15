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
      case ('Nombre invalido'):
        message = 'Por favor escribe un nombre válido'
        break
      default:
        console.log(statusAlert.message)
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

// const alert ()=>{
  
//   //state.message = ''

//   //statusModal.error -> true

//     //evaluamos el message -> swtich
//       //case 'auth/email-wrong
//         //state.message = 'El email esta mal escrito porfavor confirmelo'
//         //break
//       //case 'auth/email-wrong
//         //state.message = 'El email esta mal escrito porfavor confirmelo'
//         //break
//       //default
//         //stage.message = message


        
//     //statusModal.error -> false
//       //state.message = statusModal.message
        
//     //return( statusModal.error ? <color rojo y message> : <color verde y message>


// }
