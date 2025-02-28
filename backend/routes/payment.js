const express = require("express");
const router = express.Router();
const axios = require("axios"); // Add this line!


const KHALTI_SECRET_KEY = "86e0c069d43a44fb9d077bcb0356f29e"; // Replace with actual key
const KHALTI_API_URL = "https://dev.khalti.com/api/v2/epayment/initiate/";
const KHALTI_LOOKUP_API = "https://dev.khalti.com/api/v2/epayment/lookup/";


router.post("/khalti/initiate", async (req, res) => {
    try {
        const response = await axios.post(KHALTI_API_URL, req.body, {
            headers: {
                Authorization:"key " + KHALTI_SECRET_KEY,
                "Content-Type": "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || {
            message: "Something went wrong with payment initiation! Please try again later." + error.message,
        });
    }
});




router.post("/khalti/lookup", async (req, res) => {
    try {
        const response = await axios.post(KHALTI_LOOKUP_API, req.body, {
            headers: {
                Authorization: `Key ${KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: "Something went wrong with payment verification. " + error.message,
        });
    }
});


module.exports = router;