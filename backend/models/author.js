const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "No biography available.",
    },
    profileImage: {
      type: String, // Store image URL
      default: "https://example.com/default-profile.png",
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "books", // References the Book model
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    socialLinks: {
      website: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("authors", authorSchema);