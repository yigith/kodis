import React from 'react'
import ReactDOM from 'react-dom/client'
import "@fortawesome/fontawesome-svg-core/styles.css";
import './index.css'
import App from './App';

document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('colorMode') || 'light');

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
