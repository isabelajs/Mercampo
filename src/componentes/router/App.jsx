import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { setUser,setLoadingUser } from '../../actions'

//componentes de react
import Home from "../../views/Home";
import Login from "../../views/Login";
import Products from '../../views/Products'
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

const App = (props)=> {
  
  const {user, isLoadingAuthentication, setUser, setLoadingUser} = props

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged((user)=>{

      //no puedo poner solo user.emailverified por que cuando es  null me tira error a si que primero evalua si existe
      //un usuario y seguido confirma si ese usuario tendria el email verificado  si no lo tiene verificado
      //lo deslogueo para que sea serio
      if(user && !user.emailVerified){
          auth.signOut()
          console.log('ese man no esta autenticado', auth.currentUser)
          return
      }
      
      console.log('revisando estado', user)
      //en todos los otros casos lo dejo como esta.
      setUser(user)
      setLoadingUser(false)
    })

    return () => unSub()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

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
  
          <Route exact path="/register">
            {  user && <Redirect to='profile/settings'/> }
            {  !user && <Register/> }
          </Route>

          <Switch>
            <LayoutLoged>

              <Route exact path="/" component={Home} />

              <Route exact path='/products' component={Products} />
              
              <PrivateRoute exact path='/profile/settings'>
                <ProfileSettings />
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products'>
                <ProfileProducts />
              </PrivateRoute>


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

export default connect(mapStateToProps, mapDispatchToProps)(App);
