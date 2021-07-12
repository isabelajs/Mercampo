import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//componentes de react
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import LayoutLoged from "../../componentes/Layouts/LayoutLoged";
import ProfileSettings from "../../views/ProfileSettings";
import ProfileProducts from '../../views/ProfileProducts'
import ProfileNewProduct from "../../views/NewProduct";
//estilos
import "../../assets/styles/App.scss";

//funciones firebase
import { auth } from "../../firebase.config";


const  useAuth = ()=>{
  const [user, setUser] = useState(null);
  const [isLoadingAuthentication, setIsLoadingAuthentication] = useState(true);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((user)=>{

      setUser(user);
      setIsLoadingAuthentication(false);
    })
    return ()=> unsubscribe();
  },[])

  return {user, isLoadingAuthentication}

}


const App = ()=> {
  
  const {user, isLoadingAuthentication} = useAuth()

  if(isLoadingAuthentication){
    return <div>...Loading</div>
  }
  else{

    return (

      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            {user && !isLoadingAuthentication && <Redirect to='/'/>}
            {!user && !isLoadingAuthentication && <Login/>}
          </Route>
  
          <Route exact path="/register" component={Register} />
          <Switch>
            <LayoutLoged>
              <Route exact path="/" component={Home} />
  
              <Route exact path="/profile/settings">
                {user && !isLoadingAuthentication && <ProfileSettings/>}
                {!user && !isLoadingAuthentication && <Redirect to='/login'/>}
              </Route>
  
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

export default App;
