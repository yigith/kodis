import { useEffect, useRef, useState } from "react";
import { AppContext } from "./AppContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from './Layout.jsx'
import NotFound from './pages/NotFound/NotFound';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Notebook, { notebookLoader } from './pages/Notebook/Notebook';
import StartScreen, { startScreenLoader } from './pages/StartScreen/StartScreen';
import Loading from './components/Loading/Loading';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

function App() {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [auth, setAuth] = useState({ 
    loggedIn: Boolean(accessToken && refreshToken), 
    user: accessToken ? jwtDecode(accessToken) : null, 
    accessToken, 
    refreshToken 
  });
  const refAppContext = useRef({ loaded: false, notebook: null });

  useEffect(() => {

    if (accessToken && refreshToken) {
      // axios bearer
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      axios.post(`${baseUrl}/Account/Check`)
        .then((response) => {
          setAuth({ loggedIn: true, user: jwtDecode(accessToken), accessToken, refreshToken });
          console.log(jwtDecode(accessToken));
        })
        .catch((error) => {
          axios.post(`${baseUrl}/Account/RefreshLogin`, { refreshToken })
            .then((response) => {
              localStorage.setItem('accessToken', response.data.accessToken);
              localStorage.setItem('refreshToken', response.data.refreshToken);
              setAuth({ ...auth, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
              console.log(jwtDecode(response.data.accessToken));
            })
            .catch((error) => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              setAuth({ loggedIn: false, user: null, accessToken: null, refreshToken: null });
            });
        });
    }
  }, [auth.accessToken]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <StartScreen />,
          loader: startScreenLoader
        },
        {
          path: "/404",
          element: <NotFound />
        },
        {
          path: "/new",
          loader: notebookLoader,
          element: <Notebook mode="create" />
        },
        {
          path: "/:path",
          loader: async ({ params, request }) => await notebookLoader(params, request, refAppContext),
          element: <Notebook mode="edit" />
        }
      ]
    }
  ]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppContext.Provider value={refAppContext}>
        <GoogleOAuthProvider clientId="272145913743-86i08ju9ruhdv18foecbrvtrucsntl2f.apps.googleusercontent.com">
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </GoogleOAuthProvider>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;