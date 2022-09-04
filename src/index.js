import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from "redux-first-history/rr6"

// styles
import './index.css';

// componenets
import App from './App';
import { store, history } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <Router history={history}>
      <App />
    </Router>
  </Provider>
  
);