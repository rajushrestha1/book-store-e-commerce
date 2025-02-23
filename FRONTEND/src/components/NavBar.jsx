import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Define all possible links
  const allLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart", icon: <ShoppingCartIcon fontSize="large" /> },
    { title: role === "admin" ? "Admin Dashboard" : "Profile", link: "/profile" },
  ];

  // Filter links based on authentication and role
  const filteredLinks = allLinks.filter((item) => {
    if (!isLoggedIn) {
      return !["Cart", "Profile", "Admin Dashboard"].includes(item.title);
    }
    return true;
  });

  return (
    <>
      <nav className="z-50 relative flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 mr-2"
            src="https://w7.pngwing.com/pngs/391/829/png-transparent-diwan-bookstore-logo-publishing-book-angle-text-reading-thumbnail.png"
            alt="logo"
          />
          <h1 className="font-poppins text-4xl font-bold">
            Book<span className="text-blue-500">Pasal</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {filteredLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-lg font-poppins hover:text-green-500 transition-all duration-300 flex items-center"
            >
              {item.icon ? item.icon : item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/SignIn"
                className="px-4 py-2 border border-green-500 rounded-lg text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileNav && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center z-50">
          {filteredLinks.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="text-white text-3xl mb-6 font-semibold hover:text-green-400 transition-all duration-300 flex items-center"
              onClick={() => setMobileNav(false)}
            >
              {item.icon ? item.icon : item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/SignIn"
                className="px-6 py-2 mb-4 text-2xl font-semibold border border-green-400 text-white rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all duration-300"
                onClick={() => setMobileNav(false)}
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="px-6 py-2 text-2xl font-semibold bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all duration-300"
                onClick={() => setMobileNav(false)}
              >
                Sign Up
              </Link>
            </>
          )}
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setMobileNav(false)}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;