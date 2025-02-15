import { Link } from "react-router-dom";
import heroBg from '../assets/home_image.jpg';

const Hero = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row   "
    style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover" }}
    
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center px-6 lg:px-16 text-center lg:text-left">
        <h1 className="font-poppins text-5xl font-bold ">
          Get your new book 📚
        </h1>
        <p className="mt-4 font-poppins text-xl">
        The only limit to our realization of tomorrow is our doubts of today.        </p>
        <Link
          to="/all-books"
          className="mt-6 px-6 font-poppins py-3 bg-green-500 hover:bg-green-400 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300"
        >
          Discover Books
        </Link>
      </div>

     
    </div>
  );
};

export default Hero;
