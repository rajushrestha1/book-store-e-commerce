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
        
        res.status(500).json({ message: "Server error" });
    }
});


//update book

router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        },
        { new: true, runValidators: true }
    );
        res.status(200).json({ message: "Book updated successfully" });
    } catch (err) {
        
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

//delete book

router.delete("/delete-book", authenticateToken, async(req,res)=>{
    try{
        const { bookid }= req.headers;
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({message:"Book deleted succesfully"})
    }catch(err){
        return res.status(500).json({message:"error comming"})
    }
})

//get all books

router.get("/get-all-books", async(req,res) => {
    try{
        const books= await Book.find().sort({createdAt: -1})
        console.log("Fetched Books:", books);
        return res.json({
            status: "success",
            data: books,
        })
    }catch(err){
        console.error("Error in /get-all-books:", err);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
})

//get recently added book

router.get("/recent-book", async(req,res) =>{

    try{
        const books= await Book.find().sort({createdAt: -1}).limit(4)
        console.log("Fetched Books:", books);
        return res.json({
            status: "success",
            data: books,
        })

    }catch(err){
        console.log("err")
        return res.status(500).json({message: "error go away"})
    }
})

//get book by id

router.get("/get-book-by-id/:id", async(req,res) =>{

    try{
        const { id } = req.params;  
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book,
        })

    }catch(err){
        console.log("err")
        return res.status(500).json({message: "error go away"})
    }
})

module.exports=router;
