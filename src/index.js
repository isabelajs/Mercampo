import React from 'react';
import ReactDOM from 'react-dom';
//necesarias para hacer el redux
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';

import App from './componentes/router/App.jsx';

const initialState ={
  user : null,
  statusModal : {
    error: null,
    message: '',
    isOpen: false,
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancers())


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
