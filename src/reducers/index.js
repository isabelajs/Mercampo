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
        statusAlert: {
          isOpen: false,
          error: null,
          message: null,
        }
      }
    
    case 'SET_USER':
      return{
        ...state,
        user: action.payload,
      }

    case 'SET_LOADING_USER':
      return{
        ...state,
        isLoadingAuthentication:action.payload
      }

    default:
      return state
  }
}

export default reducer;




