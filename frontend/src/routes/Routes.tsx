import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Layout from "../layouts/Layout";
import AddHotel from "../pages/AddHotel";
import Home from "../pages/Home";
import HotelDetails from "../pages/HotelDetails";
import MyHotels from "../pages/MyHotels";
import Register from "../pages/Register";
import Search from "../pages/Search";
import SignIn from "../pages/SignIn";
import UpdateHotel from "../pages/UpdateHotel";

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
          path: "/register",
          element: !isLoggedIn ? <Register /> : <Navigate to={"/"} replace />,
        },
        {
          path: "/sign-in",
          element: !isLoggedIn ? <SignIn /> : <Navigate to={"/"} replace />,
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
          path: "/add-hotel",
          element: isLoggedIn ? (
            <AddHotel />
          ) : (
            <Navigate to={"/sign-in"} replace />
          ),
        },
        {
          path: "/my-hotels",
          element: isLoggedIn ? (
            <MyHotels />
          ) : (
            <Navigate to={"/sign-in"} replace />
          ),
        },
        {
          path: "/edit-hotel/:hotelId",
          element: isLoggedIn ? (
            <UpdateHotel />
          ) : (
            <Navigate to={"/sign-in"} replace />
          ),
        },
        {
          path: "/details/:hotelId",
          element: isLoggedIn ? (
            <HotelDetails />
          ) : (
            <Navigate to={"/sign-in"} replace />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
