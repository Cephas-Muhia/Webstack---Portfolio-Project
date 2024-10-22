import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 setup
import App from './App';  // Your main app component
import './styles.css';  // Global styles
import { GoogleOAuthProvider } from '@react-oauth/google';  // Google OAuth provider

// Create a root for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with GoogleOAuthProvider
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="505698084821-goohuj9c4u4ajr98fq1dd941usu24boc.apps.googleusercontent.com"> 
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

