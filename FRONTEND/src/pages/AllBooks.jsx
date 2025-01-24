import BookCard from "../components/BookCard";
import { useState, useEffect } from "react";
import axios from "axios";

const AllBooks = () => {
  const [Data, setData] = useState([]);  // Default to an empty array
  const [loading, setLoading] = useState(true);  // Loading state to manage UI

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/get-all-books");
        console.log(response.data);  // Check the API response structure
        setData(response.data.data || []);  // Set data if exists
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);  // Set loading to false after request completes
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="font-bold">All Books</h4>
      {loading ? (
        <p>Loading...</p>  // Display a loading message while fetching
      ) : Data.length === 0 ? (
        <p>No books available</p>  // Handle case if data is empty
      ) : (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-4">
          {Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
