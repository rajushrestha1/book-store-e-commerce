const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const Book = require("../models/book");

// 📌 Add a new author
router.post("/add-author", async (req, res) => {
  try {
    const { name, bio, profileImage, socialLinks } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Author name is required" });
    }

    const newAuthor = new Author({
      name,
      bio: bio || "No biography available.",
      profileImage: profileImage || "https://example.com/default-profile.png",
      socialLinks: socialLinks || {},
    });

    await newAuthor.save();

    res.json({ status: "success", message: "Author added successfully", data: newAuthor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📌 Get all authors
router.get("/list", async (req, res) => {
    try {
      const authors = await Author.find().select("name profileImage books followerCount");
      res.json({ status: "success", data: authors });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });


  // 📌 Get books by author ID
  router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find author by ID
        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({ status: "error", message: "Author not found" });
        }

        // Find books associated with the given author ID
        const books = await Book.find({ author: id });

        res.json({
            status: "success",
            data: {
                author: author, // Full author details
                books: books,   // Full book details instead of just book IDs
            }
        });

    } catch (error) {
        console.error("Error fetching books by author:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;