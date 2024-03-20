import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import config from './config';
import { enableRipple } from '@syncfusion/ej2-base';
import { registerLicense } from '@syncfusion/ej2-base';
import './index.css';
import App from './App';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF5cWWJCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWX5ccnRVRmBdVEV3WUM=');

const msalConfig = {
  auth: {
    clientId: config.clientId,
    authority: config.authority,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
enableRipple(true);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MsalProvider instance={msalInstance}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MsalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();