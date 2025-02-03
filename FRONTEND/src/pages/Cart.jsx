import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/cart/user-cart",
          { headers }
        );
        setCart(response.data.data);  // assuming your API returns { data: [...] }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetch();
  }, []); // Empty dependency array so the effect runs only once

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/cart/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      // Re-fetch the cart after removing an item
      fetchCart();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

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

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price;
      });
      setTotal(total);
    }
  }, [Cart]);  // Update total when Cart changes

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/order/place-order",
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error("Failed to place order:", error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {!Cart || Cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-semibold text-zinc-400">Empty Cart</h1>
            <img src="./empty-cart.webp" alt="empty cart" className="lg:h-[50vh]" />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
          {Cart.map((item, i) => (
            <div className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center" key={i}>
              <img src={item.url} alt="/" className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">{item.title}</h1>
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{item.desc.slice(0, 100)}...</p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">{item.desc.slice(0, 65)}...</p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">{item.desc.slice(0, 100)}...</p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold">&#8377; {item.price}</h2>
                <button className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12" onClick={() => deleteItem(item._id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{Cart.length} books</h2> <h2>&#8377; {Total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200" onClick={placeOrder}>
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
