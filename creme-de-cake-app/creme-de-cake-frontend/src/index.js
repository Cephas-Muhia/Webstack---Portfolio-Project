import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 uses 'react-dom/client'
import App from './App';  // Import the main App component
import './styles.css';  // Import your global styles

// Create a root for React rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app in Strict Mode for highlighting potential problems
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

