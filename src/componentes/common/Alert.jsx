import React from 'react';
import { connect } from 'react-redux';

import '../../assets/styles/componentes/Alert.scss'

function Alert (props){
  const {statusAlert} = props


    return (
      <>
      {
        statusAlert.isOpen && 
          <div className="containerAlert">
            <div className="alert"> { statusAlert.message } </div>
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
