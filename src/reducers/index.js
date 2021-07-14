import { connect } from "react-redux";

const reducer = (state, action)=>{
  switch(action.type){
    case 'MESSAGE_IN_MODAL':
      return {
        ...state,
        statusModal : action.payload
      }

    default:
      return state
  }
}

export default reducer;




// //  CASE 'OPEN_ALERT'
// return {
//   ...state,
//   statusModal: {
//     isOpen: true,
//     error: payload.error,
//     message: payload.type
//   }
// }

// // case 'CLOSE_ALERT'
//   return{
//     ...state,
//     statusModal: {
//       error: null,
//       isOpen: false,
//       message: null,
//     }
//   }


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

