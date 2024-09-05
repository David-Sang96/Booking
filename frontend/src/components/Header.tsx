import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

import SignOutBtn from "./SignOutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">FreshHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                to={"/hotel/my-bookings"}
                className="flex items-center rounded px-3 font-bold text-white duration-300 hover:bg-blue-400"
              >
                My Bookings
              </Link>
              <Link
                to={"/my-hotels"}
                className="flex items-center rounded px-3 font-bold text-white duration-300 hover:bg-blue-400"
              >
                My Hotels
              </Link>
              <SignOutBtn />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center rounded bg-white px-3 font-bold text-blue-500 duration-300 hover:bg-gray-100 hover:text-blue-700"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
