import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import App from './App';
import { SnackbarProvider } from 'notistack';
// import { AuthProvider } from './contexts/JWTContext';
import { AuthProvider } from './contexts/SolanaContext';
import { SettingsProvider } from './contexts/SettingsContext';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { Button, IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

// add action to all snackbars
const notistackRef: React.Ref<SnackbarProvider> = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}


ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider
              dense
              preventDuplicate
              maxSnack={3}
              ref={notistackRef}
              action={(key) => (
                <IconButton onClick={onClickDismiss(key)}>
                  <CancelIcon />
                </IconButton>
              )}
            >
              <SettingsProvider>
                <BrowserRouter>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </BrowserRouter>
              </SettingsProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
