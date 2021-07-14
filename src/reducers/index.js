const reducer = (state, action)=>{
  switch(action.type){
    case 'OPEN_ALERT':
      return {
        ...state,
        statusAlert :{
          isOpen: true,
          error: action.payload.error,
          message: action.payload.message
        }
      }
  
    case 'CLOSE_ALERT':
      return {
        ...state,
        statusModal: {
          isOpen: false,
          error: null,
          message: null,
        }
      }

    default:
      return state
  }
}

export default reducer;




