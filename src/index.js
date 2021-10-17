import React from 'react';
import ReactDOM from 'react-dom';
//necesarias para hacer el redux
import { Provider} from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';
//componente react
import App from '@components/router/App.jsx';


const initialState ={
  user : null,
  isLoadingAuthentication: true,
  userInfo: null,
  
  statusAlert:{
    error:null,
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
