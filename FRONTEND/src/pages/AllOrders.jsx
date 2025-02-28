import  { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SeeUserData from "./SeeUserData";
import { API_BASE_URL } from "../utility/config";

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});
  const [UserDiv, setUserDiv] = useState("hidden");
  const [UserDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Update useEffect to handle undefined data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL+"/order/get-all-order",
          { headers }
        );
        
        // Add validation for response structure
        if (!response.data?.data) {
          throw new Error("Invalid response structure");
        }
        
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Order fetch error:", {
          error: error.response?.data || error.message,
          status: error.response?.status
        });
      }
    };
    fetchOrders();
  }, []);

  const change = (e, orderId) => {
    const { value } = e.target;
    setOrderStatuses((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

  const toggleDropdown = (index) => {
    if (openDropdowns.includes(index)) {
      setOpenDropdowns(openDropdowns.filter((i) => i !== index));
    } else {
      setOpenDropdowns([...openDropdowns, index]);
    }
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const status = orderStatuses[id] || AllOrders[i].status;
    try {
      const response = await axios.put(
        API_BASE_URL+`/order/update-status/${id}`,
        { status },
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredOrders = AllOrders.slice(0, -1);

  return (
    <>
      {AllOrders.length === 0 && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">
                <PersonIcon />
              </h1>
            </div>
          </div>

          {filteredOrders.map((items, i) => (
            <div key={items._id} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book.desc.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">&#8377; {items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => toggleDropdown(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div
                    className={`${openDropdowns.includes(i) ? "flex" : "hidden"} flex mt-4`}
                  >
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={(e) => change(e, items._id)}
                      value={orderStatuses[items._id] || items.status}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, i) => (
                        <option value={status} key={i}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        toggleDropdown(i);
                        submitChanges(i);
                      }}
                    >
                      <CheckCircleIcon />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <OpenInNewIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {UserDivData && (
        <SeeUserData
          UserDivData={UserDivData}
          UserDiv={UserDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;