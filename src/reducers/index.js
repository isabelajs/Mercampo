const reducer = (state, action)=>{
  switch(action.type){
    case 'MESSAGE_IN_MODAL':
      console.log(state,action)

      break

    default:
      return state
  }
}

export default reducer;