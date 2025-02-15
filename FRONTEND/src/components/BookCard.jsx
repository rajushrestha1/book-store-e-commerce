import axios from "axios";
import { Link } from "react-router-dom";
const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:3000/favourite/remove-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-grey-200 rounded-lg p-4 flex flex-col shadow-lg border transition-all duration-300 hover:shadow-2xl">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="relative">
          {/* Image Container with Rounded Borders */}
          <div className="bg-zinc-900 rounded-lg flex items-center justify-center overflow-hidden">
            <img src={data.url} alt="/" className="h-[25vh] w-full object-cover rounded-lg" />
          </div>

          {/* Fading Foreground Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent rounded-lg"></div>
        </div>

        {/* Book Details */}
        <h2 className="mt-4 text-xl font-poppins font-semibold">{data.title}</h2>
        <p className="mt-2 font-poppins font-semibold">by {data.author}</p>
        <p className="mt-2 font-poppins font-semibold text-xl">&#8377; {data.price}</p>
      </Link>

      {/* Favourite Button */}
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-100 transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;