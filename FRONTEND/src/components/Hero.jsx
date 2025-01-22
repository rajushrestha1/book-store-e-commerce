import { Link } from "react-router-dom";

const Hero = () => {
    return (
      <div className="h-[75vh] flex flex-col lg:flex-row bg-gray-500">
        <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center px-6 lg:px-16 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold text-pink-200">
            Discover Your Book
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-zinc-300">
            Get your knowledge by reading books. Reading books is like meditation.
          </p>
          <div className="mt-8">
            <Link to="all-books" className="px-6 py-3 text-lg lg:text-2xl font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded transition duration-300 shadow-md">
              Discover Books
            </Link>
          </div>
        </div>
  
        <div className="w-full lg:w-3/6 h-auto flex items-center justify-center">
          <img
            src="photo.webp"
            alt="Hero"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    );
  };
  
  export default Hero;
  