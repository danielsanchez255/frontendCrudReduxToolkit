import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/Router.js';
import store from './store';
import { Provider } from 'react-redux';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);