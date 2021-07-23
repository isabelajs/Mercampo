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
import {PublicLayout,PrivateLayout} from "../../componentes/Layouts/LayoutLoged";
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

      if(user && !user.emailVerified){
          auth.signOut()
          console.log('ese man no esta autenticado', auth.currentUser)
          return
      }

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
              { user  && <Redirect to='/profile/settings'/>}
              { !user  && <Login/>}
            </Route>
    
            <Route exact path="/register">
              { user && <Redirect to='profile/settings'/> }
              { !user && <Register/> }
            </Route>
          <Switch>

            <Route exact path={['/','/products']}>
              <PublicLayout>
                <Route exact path="/" component={Home} />
                <Route exact path='/products' component={Products} />
              </PublicLayout>
            </Route>

            <Route exact path='/profile/*'>
                <PrivateLayout>
                  <PrivateRoute exact path='/profile/settings'>
                    <ProfileSettings /> 
                  </PrivateRoute>

                  <PrivateRoute exact path='/profile/products'> 
                    <ProfileProducts /> 
                  </PrivateRoute>

                  <PrivateRoute exact path='/profile/products/new'> 
                    <ProfileNewProduct /> 
                  </PrivateRoute>

                  <PrivateRoute exact path='/profile/products/edit/:idProduct'> 
                    <EditProduct /> 
                  </PrivateRoute>

                </PrivateLayout>
            </Route>

            <Route component={()=><div>404 not found</div>}/>

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
