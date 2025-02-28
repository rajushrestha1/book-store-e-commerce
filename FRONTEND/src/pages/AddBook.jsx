import axios from "axios";
import { useState, useEffect } from "react";
const API_BASE_URL = "https://legendary-books-backend.vercel.app";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
    genre: "",
    isFeatured: false,
  });

  const [authors, setAuthors] = useState([]); // Store fetched authors

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Fetch authors from the backend
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(API_BASE_URL+"/author/list");
      setAuthors(response.data.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...Data, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async () => {
    try {
      if (
        !Data.url ||
        !Data.title ||
        !Data.author ||
        !Data.price ||
        !Data.desc ||
        !Data.language ||
        !Data.genre
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          API_BASE_URL+"/book/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
          genre: "",
          isFeatured: false,
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4  rounded">
        <div>
          <label className="">Image</label>
          <input
            type="text"
            className="w-full mt-2   p-2 "
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="">Title of book</label>
          <input
            type="text"
            className="w-full mt-2  p-2 "
            placeholder="Title of the book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        {/* Dropdown for selecting author */}
        <div className="mt-4">
          <label className="">Author</label>
          <select
            className="w-full mt-2  p-2 "
            name="author"
            required
            value={Data.author}
            onChange={change}
          >
            <option value="">Select an Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label className="">Language</label>
            <input
              type="text"
              className="w-full mt-2 p-2 "
              placeholder="Language of the book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label className="">Price</label>
            <input
              type="number"
              className="w-full mt-2  p-2 "
              placeholder="Price of the book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="">Genre</label>
          <input
            type="text"
            className="w-full mt-2  p-2 "
            placeholder="Genre of the book"
            name="genre"
            required
            value={Data.genre}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label className="">Description of book</label>
          <textarea
            className="w-full mt-2  p-2 "
            rows="5"
            placeholder="Description of the book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        {/* Checkbox for marking as featured */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            className="w-5 h-5"
            name="isFeatured"
            checked={Data.isFeatured}
            onChange={change}
          />
          <label className=" ">Mark as Featured</label>
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;