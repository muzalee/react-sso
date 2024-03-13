import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from "@azure/msal-browser";
import { msalConfig } from "./configs/msal-config";
import { MsalProvider } from "@azure/msal-react";

const msalInstance = new PublicClientApplication(msalConfig);
const accounts = msalInstance.getAllAccounts();

if (!msalInstance.getActiveAccount() && accounts?.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
        const authenticationResult = event.payload as AuthenticationResult;
        const account = authenticationResult.account;
        msalInstance.setActiveAccount(account);
    }
});

msalInstance.enableAccountStorageEvents();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={ import.meta.env.VITE_GOOGLE_CLIENT_ID as string }>
      <MsalProvider instance={msalInstance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
