import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import './index.css'
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: "/:slug?",
    element: <App />,
  },
]);

document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme') || 'light');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
