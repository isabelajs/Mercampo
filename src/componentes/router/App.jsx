import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../../views/Home";
import Login from "../../views/Login";
import Layout from "../../componentes/Layouts/Layout";
import "../../assets/styles/App.scss";
import ProfileConfiguration from "../../views/ProfileConfiguration";

//definir cuantos layout existen..

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={ProfileConfiguration} />
          <Route exact path="/profile/products"/>
          <Route exact path="/profile/products/new" />
          <Route exact path="/profile/products/edit/:product" />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
