import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utility/config";

const genreImages = {
  "Arts & Photography": "https://source.unsplash.com/100x100/?art",
  "Boxed Sets": "https://source.unsplash.com/100x100/?books",
  "Business and Investing": "https://source.unsplash.com/100x100/?business",
  "Fiction and Literature": "https://source.unsplash.com/100x100/?literature",
  "Foreign Languages": "https://source.unsplash.com/100x100/?language",
  "History, Biography, and Memoir":
    "https://source.unsplash.com/100x100/?history",
  "Kids and Teens": "https://source.unsplash.com/100x100/?kids",
  "Learning and Reference": "https://source.unsplash.com/100x100/?learning",
  "Lifestyle and Wellness": "https://source.unsplash.com/100x100/?wellness",
  "Manga and Graphic Novels": "https://source.unsplash.com/100x100/?manga",
};

const GenresList = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_BASE_URL+"/book/genres")
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Genres</h1>
      <p className="text-gray-600 mb-4">
        Browse Our Extensive Collection of Books Across Different Genres.
      </p>

      {/* Scrollable Genres List */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide p-4">
        {genres.map((genre, index) => (
          <button
            key={index}
            className="px-8 py-4 bg-gray-100 text-gray-900 text-lg rounded-xl shadow-lg hover:bg-gray-200 hover:shadow-xl transition-all font-bold"
            onClick={() => navigate(`/genre/${genre}`)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresList;
