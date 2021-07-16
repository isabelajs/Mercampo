import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { setUser,setLoadingUser } from '../../actions'

//componentes de react
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import LayoutLoged from "../../componentes/Layouts/LayoutLoged";
import ProfileSettings from "../../views/ProfileSettings";
import ProfileProducts from '../../views/ProfileProducts'
import ProfileNewProduct from "../../views/NewProduct";
import PrivateRoute from "./PrivateRoute";

//estilos
import "../../assets/styles/App.scss";


//funciones de auth
import { auth } from '../../firebase.config'
import useAuth from "../../utils/Hooks/useAuth";


//TODO: crear componente PrivateRoute para aplicarlo solo a quellos que lo necesiten
//para hacer esto debo mover el user desde el hook hacia el redux
const App = (props)=> {
  
  // const {user, isLoadingAuthentication, setUser, setLoadingUser} = props

  const {user, isLoadingAuthentication} = useAuth()


  // useEffect(()=>{
  //   auth.onAuthStateChanged((user)=>{
  //     setUser(user)
  //     setLoadingUser(false)
  //   })
  // },[])
  
  

  if(isLoadingAuthentication){
    return <div>...Loading</div>
  }
  else{

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            {user  && <Redirect to='/profile/settings'/>}
            {!user  && <Login/>}
          </Route>
  
          <Route exact path="/register" component={Register} />

          <Switch>
            <LayoutLoged>

              <Route exact path="/" component={Home} />


              <Route exact path='/profile/settings' component={ProfileSettings}/>

              {/* <PrivateRoute exact path='/profile/settings'>
                <ProfileSettings />
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products'>
                <ProfileProducts />
              </PrivateRoute> */}


              {/* <Route exact path="/profile/products/new">
                {
                  user ? <ProfileNewProduct/> : <Redirect to='/login'/>
                }
              </Route> */}
  

              {/* <Route exact path="/profile/products" component={ProfileProducts}/> */}
              <Route exact path="/profile/products/new" component={ProfileNewProduct} />
              <Route exact path="/profile/products/edit/:product" />
            </LayoutLoged>
          </Switch>
        </Switch>
          
      </BrowserRouter>
    
    );
  }
  }



const mapStateToProps = (state) =>{
  return {
    user: state.user,
    isLoadingAuthentication: state.isLoadingAuthentication
  }
}


const mapDispatchToProps = {
  setUser,
  setLoadingUser
}

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App
