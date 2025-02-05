import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);  // Default to an empty array
  const [loading, setLoading] = useState(true);  // Loading state to manage UI

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/recent-book");
        console.log(response.data);  // Log to check the structure of the response
        setData(response.data.data || []);  // Safely set data
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      } finally {
        setLoading(false);  // Stop loading state once request completes
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="font-bold text-4xl">Recently Added Books</h4>
      {loading ? (
        <p>Loading...</p>  // Show a loading message while fetching data
      ) : Data.length === 0 ? (
        <p>No recently added books found.</p>  // Show a message if no books are found
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

export default RecentlyAdded;
