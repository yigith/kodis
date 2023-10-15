import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-svg-core/styles.css";
import './index.css'
import App from './App.jsx'
import NotFound from './pages/NotFound/NotFound';


const router = createBrowserRouter([
  {
    path: "/:path?",
    element: <App />,
  },
  {
    path: "404",
    element: <NotFound />,
  }
]);

document.documentElement.setAttribute('data-bs-theme', localStorage.getItem('theme') || 'light');


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);
