import React, { useState } from "react";
import { initiatePayment } from "./khaltiService";

const PaymentComponent = ({ cartItems, totalAmount }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setMessage("");

    // Fetch user details (assuming stored in localStorage)
    const user = {
      name: localStorage.getItem("username") || "Guest User",
      email: localStorage.getItem("email") || "guest@example.com",
      phone: localStorage.getItem("phone") || "9800000000",
    };

    // Format cart items for Khalti API
    const formattedCartItems = cartItems.map((item) => ({
      identity: item._id,
      name: item.title,
      total_price: item.price,
      quantity: item.quantity || 1,
      unit_price: item.price,
    }));

    const paymentData = {
      return_url: "http://localhost:5173/payment-success",
      website_url: "http://localhost:5173/",
      amount: totalAmount * 100, // Convert to paisa
      purchase_order_id: `order_${Date.now()}`,
      purchase_order_name: "Book Purchase",
      customer_info: user,
      amount_breakdown: [{ label: "Total", amount: totalAmount * 100 }],
      product_details: formattedCartItems,
    };

    try {
      const response = await initiatePayment(paymentData);
      console.log("Payment Response:", response);
      window.location.href = response.payment_url;
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      setMessage(error.response?.data?.detail || "Payment initiation failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition-all"
        onClick={handlePayment}
      >
        {loading ? "Processing..." : `Pay NPR ${totalAmount}`}
      </button>
      <div className="mt-4 flex justify-between">
        <img src="src/assets/khalti_logo.jpg" alt="Khalti" className="h-10" />
      </div>
    </div>
  );
};

export default PaymentComponent;