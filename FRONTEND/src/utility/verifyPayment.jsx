const BACKEND_URL = "http://localhost:5000/payment/khalti/lookup"; // Replace with your backend URL

const verifyPayment = async () => {
  const pidx = searchParams.get("pidx");
  if (!pidx) {
    setStatus("Invalid Payment Data");
    return;
  }

  try {
    const response = await axios.post(BACKEND_URL, { pidx });

    if (response.data.status === "Completed") {
      setStatus("Payment Successful!");

     

      // Call API to delete cart items
      await axios.delete("http://localhost:3000/cart/clear", {
        headers: {
          id: localStorage.getItem("id"),
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTimeout(() => {
        navigate("/"); // Redirect to home after clearing the cart
      }, 2000);
    } else {
      setStatus("Payment Failed or Pending.");
    }
  } catch (error) {
    setStatus("Error verifying payment. " + error.message);
  }
};

export default verifyPayment;