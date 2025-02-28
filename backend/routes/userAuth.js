const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Extract the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Correct split by space

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    // Verify the token
    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token. Please sign in again." });
        }

        // Attach user information to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
};

module.exports = { authenticateToken };
