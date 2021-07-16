import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({children, ...rest}) => {
  const { user } = {...rest}

  return(
    <Route
      {...rest}
      render= {(routerProps)=>( user ? React.cloneElement(children,routerProps) : <Redirect to='/login'/>)}

    />
  )
}

const mapStateToProps = state =>{
  return{
    user: state.user
  }
}


export default connect(mapStateToProps, null)(PrivateRoute)