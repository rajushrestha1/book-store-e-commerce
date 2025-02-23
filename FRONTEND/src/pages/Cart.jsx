import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import PaymentComponent from "../utility/PaymentComponent";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/cart/user-cart",
        { headers }
      );
      setCart(response.data.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const deleteItem = async (bookid) => {
    try {
      await axios.put(
        "http://localhost:3000/cart/remove-from-cart",
        {},
        { 
          headers: { 
            ...headers,    
            bookid: bookid 
          } 
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  useEffect(() => {
    let total = Cart.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);
  }, [Cart]);

  return (
    <div className="container mx-auto px-6 py-8">
      {Cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-semibold">Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-semibold mb-6">Shopping Cart ({Cart.length})</h1>
            {Cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b py-4">
                {/* Book Image */}
                <img src={item.url} alt={item.title} className="h-24 w-16 object-cover rounded-lg" />

                {/* Book Details */}
                <div className="flex flex-col flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500 text-sm">by {item.author}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center border px-3 py-1 rounded">
                  <button className="px-2 text-lg">−</button>
                  <span className="mx-2">{item.quantity || 1}</span>
                  <button className="px-2 text-lg">+</button>
                </div>

                {/* Price */}
                <h2 className="text-xl font-semibold ml-4">Rs. {item.price}</h2>

                {/* Remove Button */}
                <button onClick={() => deleteItem(item._id)} className="text-red-500 ml-4">
                  <DeleteIcon />
                </button>
              </div>
            ))}
            <a href="/" className="text-blue-500 mt-4 inline-block">← Continue Shopping</a>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>Rs. {Total}</p>
            </div>
            <PaymentComponent cartItems={Cart} totalAmount={Total} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;