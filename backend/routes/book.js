const router=require("express").Router()
const User = require("../models/user")
const jwt= require("jsonwebtoken")
const Author = require("../models/author"); // Import Author model
const Book = require("../models/book"); // Import Book model
const {authenticateToken}  =require("./userAuth")
// Add a new book
router.post("/add-book",authenticateToken, async (req, res) => {
    try {
      const { url, title, author, price, desc, language, genre, isFeatured } = req.body;
  
      if (!url || !title || !author || !price || !desc || !language || !genre) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if author exists
      const authorExists = await Author.findById(author);
      if (!authorExists) {
        return res.status(404).json({ message: "Author not found" });
      }
  
      const newBook = new Book({
        url,
        title,
        author,
        price,
        desc,
        language,
        genre,
        isFeatured: isFeatured || false,
      });
  
      await newBook.save();
  
      // Add book reference to author
      authorExists.books.push(newBook._id);
      await authorExists.save();
  
      res.json({ status: "success", message: "Book added successfully", data: newBook });
    } catch (error) {
      console.error(error);
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

// Example implementation for recent-book route
router.get("/recent-book", async (req, res) => {
    try {
      const recentBooks = await Book.find()
        .sort({ createdAt: -1 })
        .limit(10);
      res.json({ status: "success", data: recentBooks });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
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


/// ---------- feature Books  ------------

router.get("/featured-books", async (req, res) => {
    try {
        const featuredBooks = await Book.find({ isFeatured: true }).limit(10);
        res.json({ status: "success", data: featuredBooks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


/// ---------- genere  ------------

router.get("/books-by-genre/:genre", async (req, res) => {
    try {
        const { genre } = req.params;
        const books = await Book.find({ genre }).limit(20);
        res.json({ status: "success", data: books });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

/// ---------- get all genres ------------

router.get("/genres", async (req, res) => {
    try {
        const genres = await Book.distinct("genre");
        res.json({ status: "success", data: genres });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


/// ---------- best seller ------------

router.get("/best-sellers", async (req, res) => {
    try {
        const bestSellers = await Book.find()
            .sort({ salesCount: -1 }) // Assuming `salesCount` field exists
            .limit(10);
        res.json({ status: "success", data: bestSellers });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



// Search books by title, author, or description
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Use regex for partial matching
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { desc: { $regex: query, $options: "i" } },
            ]
        }).populate("author");

        res.json({ status: "success", data: books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports=router;
