import { useRef } from "react";
import { AppContext } from "./AppContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.jsx'
import NotFound from './pages/NotFound/NotFound';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Notebook, { notebookLoader } from './pages/Notebook/Notebook';
import StartScreen, { startScreenLoader } from './pages/StartScreen/StartScreen';
import Loading from './components/Loading/Loading';

function CustomRouterProvider() {
  const refAppContext = useRef({ loaded: false, notebook: null });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
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
    <AppContext.Provider value={ refAppContext }>
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </AppContext.Provider>
  );
}

export default CustomRouterProvider;