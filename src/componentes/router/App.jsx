import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Register from "../../views/Register";
import LayoutLoged from "../../componentes/Layouts/LayoutLoged";
import ProfileSettings from "../../views/ProfileSettings";
import ProfileProducts from '../../views/ProfileProducts'
import "../../assets/styles/App.scss";



function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <LayoutLoged>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/settings" component={ProfileSettings} />
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