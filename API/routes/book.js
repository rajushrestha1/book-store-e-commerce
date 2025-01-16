const router=require("express").Router()
const User = require("../models/user")
const jwt= require("jsonwebtoken")
const Book=require("../models/book")
const {authenticateToken}  =require("./userAuth")

//add book-admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is missing in the headers" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "admin") {
            return res.status(403).json({ message: "You dont have any permission to perform admin work" });
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        await book.save();
        res.status(200).json({ message: "New book added successfully" });
    } catch (err) {
        console.error("Error in /add-book route:", err); // Logs the error for debugging
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
module.exports=router;