import axios from "axios";
import { API_BASE_URL } from "./config";

const KHALTI_API_URL = API_BASE_URL+"/payment/khalti/initiate"; // Replace with actual URL
const AUTH_KEY = "86e0c069d43a44fb9d077bcb0356f29e"; // Replace with actual key

export const initiatePayment = async (paymentData) => {
  try {
    const response = await axios.post(KHALTI_API_URL, paymentData, {
      headers: {
        Authorization: AUTH_KEY,
        "Content-Type": "application/json",
      },
    });

    return response.data; // Returns payment_url & pidx
  } catch (error) {
    console.error("Error initiating Khalti payment:", error);
    throw error;
  }
};