import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />

      <div className="container mx-auto">
        <SearchBar />
      </div>

      <div className="container mx-auto flex-1 py-4">
        <Outlet />
      </div>
      <Footer />
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 4000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
    </div>
  );
};

export default Layout;
