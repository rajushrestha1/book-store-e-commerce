
const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL of the image
        required: true,
    },
    link: {
        type: String, // Link to navigate when clicked
        required: false,
    },


},
{ timestamps: true });

module.exports = mongoose.model("Carousel", carouselSchema);
// This is the model for the carousel slider. It defines the structure of the data stored in the database for each slide in the carousel. The schema includes fields like title, image URL, link, status, and position. The model is exported for use in other parts of the application.