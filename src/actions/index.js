export const openAlert = payload =>({
  type:'OPEN_ALERT',
  payload
})

export const closeAlert = payload =>({
  type:'CLOSE_ALERT',
  payload
})

export const setUser = payload =>({
  type: 'SET_USER',
  payload
})

export const setLoadingUser = payload => ({
  type: 'SET_LOADING_USER',
  payload
})