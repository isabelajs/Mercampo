import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import LayoutLoged from "../../componentes/Layouts/LayoutLoged";
import ProfileSettings from "../../views/ProfileSettings";
import ProfileProducts from '../../views/ProfileProducts'
import "../../assets/styles/App.scss";
import { auth } from "../../firebase.config";


const  useAuth = ()=>{
  const [user, setUser] = useState(null);
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{


      //dispatch de redux 
      setUser(user);
      setIsLoadingAuthentication(false);
    })
    return ()=> unsubscribe();
  },[])

  return {user, isLoadingAuthentication}

}


function App() {
  
  const {user, isLoadingAuthentication} = useAuth()
  console.log(user)
//TODO: FUNCIONA PERO HAY UN PEQUEÑO PARPADEO PINTA LOGIN Y LUEGO SI PINTA LA RUTA CORRECTA :C AVERIGUAR COMO QUITAR ESE PARPADEO
//TODO HACER UN DISEÑO PARA CARGAR

  return (

    <BrowserRouter>
      <Switch>


        <Route exact path="/login">
          {isLoadingAuthentication  && <h1>esta cargando ...</h1>}
          {user && !isLoadingAuthentication && <Redirect to='/'/>}
          {!user && !isLoadingAuthentication && <Login/>}
        </Route>

        <Route exact path="/register" component={Register} />
        <Switch>
          <LayoutLoged>
            <Route exact path="/" component={Home} />

            <Route exact path="/profile/settings">
              {isLoadingAuthentication  && <h1>esta cargando ...</h1>}
              {user && !isLoadingAuthentication && <ProfileSettings/>}
              {!user && !isLoadingAuthentication && <Redirect to='/login'/>}
            </Route>

            <Route exact path="/profile/products" component={ProfileProducts}/>
            <Route exact path="/profile/products/new" />
            <Route exact path="/profile/products/edit/:product" />
          </LayoutLoged>
        </Switch>
      </Switch>
          
    </BrowserRouter>
  );
}

export default App;


//TODO modal de alert 