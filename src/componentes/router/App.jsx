import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import LayoutLoged from "../../componentes/Layouts/LayoutLoged";
import "../../assets/styles/App.scss";
import Profile from "../../views/Profile";

//definir cuantos layout existen..

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <LayoutLoged>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/products"/>
          <Route exact path="/profile/products/new" />
          <Route exact path="/profile/products/edit/:product" />
        </LayoutLoged>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
