import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Counter from './context/Counter';
import CardContext from './context/CardContext';

import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App/>
  </Provider>
);

