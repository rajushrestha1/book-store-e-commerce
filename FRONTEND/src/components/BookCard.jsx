import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../utility/config";

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };


  const handleCart = async () => {
    const response = await axios.put(
      API_BASE_URL+"/cart/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };


  const handleRemoveBook = async () => {
    const response = await axios.put(
      API_BASE_URL+"/favourite/remove-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-white font-poppins rounded-lg p-4 shadow-lg border transition-all duration-300 hover:shadow-2xl w-72">
      {/* Book Cover Image */}
      <Link to={`/view-book-details/${data._id}`} className="block">
        <div className="bg-gray-200 font-poppins rounded-lg overflow-hidden">
          <img 
            src={data.url} 
            alt={data.title} 
            className="h-60 w-full font-poppins object-cover rounded-lg" 
          />
        </div>

        {/* Book Title & Author */}
        <h2 className="mt-4 text-lg font-poppins font-semibold text-gray-900">{data.title}</h2>
        <p className="text-sm font-poppins text-gray-600">by {data.author.name}</p>

        {/* Price */}
        <p className="mt-2 text-lg font-poppins font-bold text-gray-900">Rs. {data.price}</p>
      </Link>

      {/* Favourite Button */}
      {favourite ? (
        <button
          className="mt-4 w-full py-2 font-poppins border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-50 transition-all"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      ) : (
        <button className="mt-4 w-full font-poppins py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"  onClick={handleCart} >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;