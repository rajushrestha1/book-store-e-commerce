// routes/carousel.js
const express = require("express");
const router = express.Router();
const Carousel = require("../models/carousel_slider");

// Create a new carousel slide
router.post("/add-carousel-slider", async (req, res) => {
    try {
        const { title, image, link, } = req.body;
        const newSlide = new Carousel({ title, image, link, });
        await newSlide.save();
        res.status(201).json({ message: "Carousel slide created successfully", newSlide });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all carousel slides

router.get("/get-carousel-slides", async (req, res) => {
    try {
        const slides = await Carousel.find();
        if (!slides) {
            return res.status(404).json({ message: "No carousel slides found" });
            
        }

        res.status(200).json(slides);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update a carousel slide by ID

router.put("/update-carousel-slide/:id", async (req, res) => {
    try {
        const slide = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
        res.status(200).json(slide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
);

// Delete a carousel slide by ID


router.delete("/delete-carousel-slide/:id", async (req, res) => {
    try {
        const slide = await Carousel.findByIdAndDelete(req.params.id);
        res.status(200).json(slide);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





module.exports = router;

