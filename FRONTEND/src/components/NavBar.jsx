import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState("hidden");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Define all possible links
  const allLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
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
      <nav className="z-50 relative flex   px-6 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 mr-2"
            src="https://w7.pngwing.com/pngs/391/829/png-transparent-diwan-bookstore-logo-publishing-book-angle-text-reading-thumbnail.png"
            alt="logo"
          />
          <h1 className=" font-poppins text-4xl font-bold">
            Book<span className="font-poppins text-green-400">Pasal</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          {filteredLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-xl font-poppins hover:text-green-300 transition-all duration-300"
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/SignIn"
                className="px-4 py-2 border border-green-300 rounded hover:bg-green-300 hover:text-purple-700 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-2 bg-green-500  rounded hover:bg-green-400 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl hover:text-green-300"
          onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}
        >
          <MenuIcon />
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`${mobileNav} bg-purple-600 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {filteredLinks.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="text-white text-4xl mb-8 font-semibold hover:text-green-300 transition-all duration-300 cursor-pointer"
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/SignIn"
              className="px-8 mb-8 text-3xl font-semibold py-2 border border-green-300 rounded text-white hover:bg-green-300 hover:text-purple-700 transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              className="px-8 mb-8 text-3xl font-semibold py-2 bg-green-500 rounded hover:bg-green-400 hover:text-white transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
