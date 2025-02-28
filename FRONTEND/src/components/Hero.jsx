import { Link } from "react-router-dom";
import heroBg from "../assets/home_image.jpg";
import CarouselComponent from "./carosole";

const Hero = () => {
  return (
    <div
      className="w-full h-[600px] flex items-center justify-center bg-cover bg-center px-6 lg:px-16"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-center">
        {/* Left Section: Text & CTA */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Discover Your Next <span className="text-green-600">Great Read</span> 📖
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">
            "The only limit to our realization of tomorrow is our doubts of today."
          </p>
          <Link
            to="/all-books"
            className="mt-6 inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:scale-105 transition-all duration-300"
          >
            Browse Books
          </Link>
        </div>

       
      </div>
    </div>
  );
};

export default Hero;