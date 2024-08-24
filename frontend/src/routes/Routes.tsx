import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";

const Routes = () => {
  const { isLoggedIn } = useAppContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: isLoggedIn ? <Home /> : <Navigate to={"/sign-in"} replace />,
        },
        {
          path: "/search",
          element: isLoggedIn ? (
            <Search />
          ) : (
            <Navigate to={"/sign-in"} replace />
          ),
        },
        {
          path: "/register",
          element: !isLoggedIn ? <Register /> : <Navigate to={"/"} replace />,
        },
        {
          path: "/sign-in",
          element: !isLoggedIn ? <SignIn /> : <Navigate to={"/"} replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
