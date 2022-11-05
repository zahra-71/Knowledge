import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from "redux-first-history/rr6"

// styles
import './index.css';

// componenets
import App from './App';
import { store, history } from './store/store';
import { ThemeProvider } from '@emotion/react';
import Themes from './themes';
import ScrollToTop from './components/Scroll/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={Themes.default}>
    <Provider store={store} >
      <Router history={history}>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </Router>
    </Provider>
  </ThemeProvider>  
);