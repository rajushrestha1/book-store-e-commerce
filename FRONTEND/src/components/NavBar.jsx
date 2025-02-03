import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
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
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>

        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-4">
            {filteredLinks.map((item, i) => (
              <div key={i} className="flex items-center justify-center">
                <Link
                  to={item.link}
                  className={
                    item.title === "Profile" || item.title === "Admin Profile"
                      ? "px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                      : "hover:text-blue-500 transition-all duration-300 cursor-pointer"
                  }
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Login/Signup Buttons (Desktop) */}
          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/LogIn"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() => setMobileNav(mobileNav === "hidden" ? "block" : "hidden")}
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {filteredLinks.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300 cursor-pointer"
            onClick={() => setMobileNav("hidden")} // Close menu on link click
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/SignIn"
              className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav("hidden")} // Close menu on link click
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={() => setMobileNav("hidden")} // Close menu on link click
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