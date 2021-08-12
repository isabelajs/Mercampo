import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//redux
import { connect } from "react-redux";
import { setUser,setLoadingUser } from '../../actions'

//componentes de react
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import PasswordRecovery from "../../views/PasswordRecovery";
import Products from '../../views/Products'
import Product from '../../views/Product'
import Layout  from "../../componentes/Layouts/LayoutLoged";
import ProfileSettings from "../../views/ProfileSettings";
import ProfileProducts from '../../views/ProfileProducts'
import ProfileNewProduct from "../../views/NewProduct";
import EditProduct from "../../views/EditProduct";
import PrivateRoute from "./PrivateRoute";


//estilos
import "../../assets/styles/App.scss";

//funciones de auth
import { auth } from '../../firebase.config'

const App = (props)=> {
  
  const {user, isLoadingAuthentication, setUser, setLoadingUser} = props

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged((user)=>{

      //possible error when register, the user change ( we dont want to re-render) 
      //we need to prevent the user state change when email is not verified ()
      //and aproach maybe (register out of provider user to prevent re-render)
      if(user && !user.emailVerified){
          return
      }

      setUser(user)
      setLoadingUser(false)
    })

    return () => unSub()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoadingAuthentication){
    return true 
  }
  else{

    return (

      <BrowserRouter>

        <Switch>

          <Route exact path="/login">
            { user  && <Redirect to='/profile/settings'/>}
            { !user  && <Login/>}
          </Route>
  
          <Route exact path="/register">
            { user && <Redirect to='profile/settings'/> }
            { !user && <Register/> }
          </Route>

          <Route exact path="/recovery">
            { user && <Redirect to='profile/settings'/> }
            { !user && <PasswordRecovery/> }
          </Route>

          <Layout>
            
            <Switch>
              
              <Route exact path="/" component={Home} />

              <Route exact path='/products' component={Products} />

              <Route exact path='/product/:id' component={Product}/>

              <PrivateRoute exact path='/profile/settings'>
                <ProfileSettings /> 
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products'> 
                <ProfileProducts /> 
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products/new'> 
                <ProfileNewProduct /> 
              </PrivateRoute>

              <PrivateRoute exact path='/profile/products/:idProduct/edit'> 
                <EditProduct /> 
              </PrivateRoute>

              <Route component={()=><h1 style={{textAlign:'center'}}>404 not found</h1>}/>
            
            </Switch>

          </Layout>

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
