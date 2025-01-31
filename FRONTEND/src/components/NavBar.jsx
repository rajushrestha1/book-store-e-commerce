import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"

const NavBar = () => {
  const[nav, setNav] =useState()
    const links=[
        {
        title :"Home",
        link:"/",
        },
        
           
            {
                title :"All Books",
                link:"/all-books",
                },
                {
                    title :"Cart",
                    link:"/cart",
                    },
                    {
                        title :"Profile",
                        link:"/profile",
                        },
                        // {
                        //   title: "Admin Profile",
                        //   link: "/profile",
                        // },
    ]
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(2, 2);
  }

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }

  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }


    return (
      <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src=""
            alt="Book Pasal Logo"
            className="w-10 h-10 bg-gray-300 rounded-full"
          />
          <h1 className="text-2xl font-bold tracking-wide">Book Pasal</h1>
        </div>
  
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="hover:text-blue-500 transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
          <Link
            to="/signin"
            className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-black transition duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
  
        {/* Mobile Menu Icon */}
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 md:hidden"
        >
          {nav ? <MenuOpenIcon /> : <MenuIcon />}
        </div>
  
        {/* Mobile Navigation Links */}
        {nav && (
          <div className="absolute top-16 left-0 w-full bg-zinc-800 p-6 flex flex-col gap-6 md:hidden">
            {links.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                onClick={() => setNav(false)}
                className="hover:text-blue-500 transition-colors duration-300"
              >
                {item.title}
              </Link>
            ))}
            <Link
              to="/signin"
              onClick={() => setNav(false)}
              className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-black transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setNav(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
}

export default NavBar
