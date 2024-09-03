import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import Layout from "../layouts/Layout";
import AddHotel from "../pages/AddHotel";
import Booking from "../pages/Booking";
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
          // element: isLoggedIn ? <Home /> : <Navigate to={"/sign-in"} replace />,
          element: <Home />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/sign-in",
          element: <SignIn />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/details/:hotelId",
          element: <HotelDetails />,
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
          path: "/hotel/:hotelId/booking",
          element: isLoggedIn ? (
            <Booking />
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
