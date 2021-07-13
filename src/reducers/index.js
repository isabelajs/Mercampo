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
