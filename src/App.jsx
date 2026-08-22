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
import api, { authStateFromStorage, setSessionLostHandler, signedOut } from "./api";

const GOOGLE_CLIENT_ID = "272145913743-86i08ju9ruhdv18foecbrvtrucsntl2f.apps.googleusercontent.com";

function App() {
  const [auth, setAuth] = useState(authStateFromStorage);
  const refAppContext = useRef({ loaded: false, notebook: null });

  // The axios interceptor signs us out when a refresh fails; this is how that
  // gets reflected in React state.
  useEffect(() => {
    setSessionLostHandler(() => setAuth(signedOut));
  }, []);

  // Confirm once, on load, that the stored session still works. A 401 here is
  // handled by the interceptor: it refreshes, or clears the tokens and calls
  // the handler above.
  useEffect(() => {
    if (!authStateFromStorage().loggedIn) {
      return;
    }

    api.post("/Account/Check")
      .then(() => setAuth(authStateFromStorage()))
      .catch(() => { /* already handled by the interceptor */ });
  }, []);

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
          loader: () => notebookLoader({}),
          element: <Notebook mode="create" />
        },
        {
          path: "/:path",
          loader: ({ params }) => notebookLoader(params, refAppContext),
          element: <Notebook mode="edit" />
        }
      ]
    }
  ]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <AppContext.Provider value={refAppContext}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </GoogleOAuthProvider>
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
