import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/index';

const theme = createTheme ({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffb74d',
    },
    secondary: {
      main: 'rgba(201,43,43,0.66)',
    },
    warning: {
      main: '#ed6c02',
    },
  },
  typography: {
    fontWeightMedium: 600,
    h2: {
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0.03em',
    },
    h5: {
      fontSize: '1.7rem',
      fontWeight: 500,
    },
    h3: {
      fontWeight: 400,
    },
    button: {
      letterSpacing: '0.03em',
    },
    body1: {
      fontWeight: 300,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
}); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Ernesto Gabriel Suárez Barrera