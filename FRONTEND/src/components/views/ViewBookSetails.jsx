import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_BASE_URL } from "../utility/config";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(
        API_BASE_URL+  `/book/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetchBook();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      API_BASE_URL+  "/favourite/add-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      API_BASE_URL+ "/cart/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      API_BASE_URL+  "/book/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {Data ? (
        <div className="px-4 md:px-12 py-8 flex flex-col lg:flex-row gap-8 font-poppins">
          {/* Book Image */}
          <div className="w-full lg:w-2/5">
            <img
              src={Data.url}
              alt={Data.title}
              className="h-[70vh] w-full object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Book Details */}
          <div className="w-full lg:w-3/5">
            <h1 className="text-4xl font-bold">{Data.title}</h1>
            <p className="text-lg text-gray-600 mt-1">{Data.author}</p>
            <p className="text-gray-700 mt-4">{Data.desc}</p>

            {/* Language */}
            <p className="flex items-center mt-4 text-gray-500">
              <LanguageIcon className="mr-2" /> {Data.language}
            </p>

            {/* Stock Status */}
            <p className="mt-4 flex items-center text-md">
              <span className={`mr-2 ${Data.stock <= 5 ? "text-red-500" : "text-green-500"}`}>
                {Data.stock <= 5 ? "⚠ Low stock" : "✔ In stock"}
              </span>
            </p>

            {/* Price */}
            <p className="mt-4 text-3xl font-semibold text-gray-900">
              Rs. {Data.price}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-lg">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-l-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-r-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {isLoggedIn && role === "user" && (
                <>
                  <button
                    className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                    onClick={handleFavourite}
                  >
                    <FavoriteIcon className="mr-2" /> Save for Later
                  </button>
                  <button
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    onClick={handleCart}
                  >
                    <ShoppingCartIcon className="mr-2" /> Add to Cart
                  </button>
                </>
              )}
              {isLoggedIn && role === "admin" && (
                <>
                  <Link
                    to={`/updateBook/${id}`}
                    className="flex items-center px-4 py-2 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <EditCalendarIcon className="mr-2" /> Edit
                  </Link>
                  <button
                    className="flex items-center px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                    onClick={deleteBook}
                  >
                    <DeleteIcon className="mr-2" /> Delete Book
                  </button>
                </>
              )}
            </div>

            {/* Promo Banner */}
            <div className="mt-8 p-4 border border-gray-300 rounded-lg bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-semibold text-blue-700">Fresh Pages, Fresh Deals</p>
                <p className="text-sm text-gray-600">
                  Refresh your bookshelf with 10% off! Use code: <span className="text-blue-700 font-semibold">BOOKS</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;