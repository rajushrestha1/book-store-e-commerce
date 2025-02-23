import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [status, setStatus] = useState("Processing...");

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    const amount = searchParams.get("amount");
    const mobile = searchParams.get("mobile");
    const purchaseOrderId = searchParams.get("purchase_order_id");
    const purchaseOrderName = searchParams.get("purchase_order_name");
    const paymentStatus = searchParams.get("status");

    if (transactionId && amount && mobile && purchaseOrderId && purchaseOrderName && paymentStatus) {
      setPaymentDetails({
        transactionId,
        amount,
        mobile,
        purchaseOrderId,
        purchaseOrderName,
        status: paymentStatus,
      });

      if (paymentStatus === "Completed") {
        setStatus("Payment Successful!");
      } else {
        setStatus("Payment Failed or Pending.");
      }
    } else {
      setStatus("Invalid Payment Data");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        {paymentDetails?.status === "Completed" ? (
          <>
           
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{status}</h2>
            <p className="text-gray-600 mt-2">Thank you for your purchase.</p>
          </>
        ) : (
          <>
           
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{status}</h2>
            <p className="text-gray-600 mt-2">Something went wrong.</p>
          </>
        )}

        {paymentDetails && (
          <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
            <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
            <p><strong>Amount Paid:</strong> NPR {paymentDetails.amount}</p>
            <p><strong>Mobile:</strong> {paymentDetails.mobile}</p>
            <p><strong>Order ID:</strong> {paymentDetails.purchaseOrderId}</p>
            <p><strong>Product:</strong> {paymentDetails.purchaseOrderName}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;