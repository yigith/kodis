import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import "@fortawesome/fontawesome-svg-core/styles.css";
import './index.css'
import CustomRouterProvider from './CustomRouterProvider';

document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('colorMode') || 'light');

ReactDOM.createRoot(document.getElementById('root')).render(
  <CustomRouterProvider />
);
