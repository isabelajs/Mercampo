import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom";
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
  
  const {user, isLoadingAuthentication, setUser, setLoadingUser} = props

  //TODO: IMPRIME LA SECUENCIA 
  // LA PRIMERA VEZ IMPRIME 'USER NULL' -> cuando la pagina carga
  // el usuario se loguea a si que  -> user = 'usuario logueado'
  // se imprime ese man no esta autenticado -> utilizo la funcion de signout directa de auth 
  // como se deslogueo vuelve a activarse la esta funcion pero imprime user = null

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged((user)=>{

      console.log('paso un cambio melo',user)

      //no puedo poner solo user.emailverified por que cuando es  null me tira error a si que primero evalua si existe
      //un usuario y seguido confirma si ese usuario tendria el email verificado  si no lo tiene verificado
      //lo deslogueo para que sea serio
      if(user && !user.emailVerified){
          auth.signOut()
          console.log('ese man no esta autenticado', auth.currentUser)
          return
        }
      
      //en todos los otros casos lo dejo como esta.
      setUser(user)
      setLoadingUser(false)
    })

    return () => unSub()
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
  
          <Route exact path="/register" component={Register} />

          <Switch>
            <LayoutLoged>

              <Route exact path="/" component={Home} />
              
              <PrivateRoute exact path='/profile/settings'>
                <ProfileSettings />
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products'>
                <ProfileProducts />
              </PrivateRoute>


              <Route exact path="/profile/products" component={ProfileProducts}/>
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
