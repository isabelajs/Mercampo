import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore} from 'redux';
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

const store = createStore(reducer, initialState)


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
