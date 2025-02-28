import { API_BASE_URL } from "../utility/config";

const BACKEND_URL = API_BASE_URL+"/payment/khalti/lookup"; 
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
      await axios.delete(API_BASE_URL+"/cart/clear", {
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