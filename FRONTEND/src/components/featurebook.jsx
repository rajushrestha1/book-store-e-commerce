import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const FeatureBooks = () => {
  const [Data, setData] = useState([]);  // Default to an empty array
  const [loading, setLoading] = useState(true);  // Loading state to manage UI

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book//featured-books");
        console.log(response.data);  // Log to check the structure of the response
        setData(response.data.data || []);  // Safely set data
      } catch (error) {
        console.error("Error fetching Feature Books:", error);
      } finally {
        setLoading(false);  // Stop loading state once request completes
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
                 <h1 className="text-3xl font-bold mb-2">Feature Books</h1>
            <p className="text-gray-600 mb-4">  books recomended by our readers you can explore </p>
            
      {loading ? (
        <p>Loading...</p>  // Show a loading message while fetching data
      ) : Data.length === 0 ? (
        <p>No Feature Books found.</p>  // Show a message if no books are found
      ) : (
        <div className="my-4 grid font-poppins grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-4">
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

export default FeatureBooks;
